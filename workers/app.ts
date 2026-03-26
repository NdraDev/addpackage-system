import { createRequestHandler } from "react-router";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

// API Handler for IP registration with D1 Database
async function handleAPI(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const path = url.pathname;

	// Handle CORS
	const corsHeaders = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Max-Age": "86400",
	};

	// Handle preflight
	if (request.method === "OPTIONS") {
		return new Response(null, { headers: corsHeaders });
	}

	try {
		// POST /api/register - Register a new IP
		if (path === "/api/register" && request.method === "POST") {
			const body = await request.json();
			const { ip } = body;

			if (!ip) {
				return Response.json(
					{ success: false, error: "IP address is required" },
					{ status: 400, headers: corsHeaders }
				);
			}

			// Validate IP format
			const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
			if (!ipRegex.test(ip)) {
				return Response.json(
					{ success: false, error: "Invalid IP address format" },
					{ status: 400, headers: corsHeaders }
				);
			}

			// Additional validation: check each octet is 0-255
			const octets = ip.split(".").map(Number);
			if (octets.some((octet) => octet < 0 || octet > 255)) {
				return Response.json(
					{ success: false, error: "Invalid IP address: octets must be 0-255" },
					{ status: 400, headers: corsHeaders }
				);
			}

			// Check if IP already exists in D1 Database
			const existing = await env.IP_DB.prepare(
				"SELECT id, ip, created_at FROM ip_addresses WHERE ip = ?"
			)
				.bind(ip)
				.first();

			if (existing) {
				return Response.json(
					{ success: false, error: "IP address already registered" },
					{ status: 409, headers: corsHeaders }
				);
			}

			// Insert new IP into D1 Database
			const result = await env.IP_DB.prepare(
				"INSERT INTO ip_addresses (ip) VALUES (?)"
			)
				.bind(ip)
				.run();

			return Response.json(
				{
					success: true,
					message: "IP registered successfully",
					data: { 
						id: result.meta?.last_row_id || 0, 
						ip, 
						registered_at: new Date().toISOString() 
					},
				},
				{ headers: corsHeaders }
			);
		}

		// GET /api/ip/check/:ip - Check if an IP is registered
		if (path.startsWith("/api/ip/check/") && request.method === "GET") {
			const ip = decodeURIComponent(path.split("/").pop() || "");
			
			const result = await env.IP_DB.prepare(
				"SELECT id, ip, created_at FROM ip_addresses WHERE ip = ?"
			)
				.bind(ip)
				.first();

			if (result) {
				return Response.json(
					{ success: true, registered: true, data: result },
					{ headers: corsHeaders }
				);
			} else {
				return Response.json(
					{ success: true, registered: false },
					{ headers: corsHeaders }
				);
			}
		}

		// GET /api/ip/list - List all registered IPs from D1 Database
		if (path === "/api/ip/list" && request.method === "GET") {
			// First, let's check if the database binding exists
			if (!env.IP_DB) {
				console.error("IP_DB binding not found!");
				return Response.json(
					{ 
						success: false, 
						error: "Database not configured",
						debug: "IP_DB binding is missing"
					},
					{ status: 500, headers: corsHeaders }
				);
			}

			// Query the database
			const stmt = env.IP_DB.prepare(
				"SELECT id, ip, created_at FROM ip_addresses ORDER BY created_at DESC"
			);
			
			const response = await stmt.all();
			
			console.log("D1 Query Result:", response);
			console.log("Results:", response.results);
			console.log("Total:", response.results?.length || 0);

			return Response.json(
				{ 
					success: true, 
					data: response.results || [], 
					total: response.results?.length || 0,
					debug: {
						hasResults: response.results?.length > 0,
						rawResponse: response
					}
				},
				{ headers: corsHeaders }
			);
		}

		// 404 for unknown API routes
		return Response.json(
			{ error: "Not found" },
			{ status: 404, headers: corsHeaders }
		);
	} catch (error) {
		console.error("API Error:", error);
		return Response.json(
			{ 
				success: false, 
				error: error instanceof Error ? error.message : "Internal server error",
				stack: error instanceof Error ? error.stack : undefined
			},
			{ status: 500, headers: corsHeaders }
		);
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(request, env, ctx) {
		try {
			const url = new URL(request.url);

			// Route API requests to the API handler
			if (url.pathname.startsWith("/api/")) {
				return handleAPI(request, env);
			}

			// Route all other requests to React Router
			return requestHandler(request, {
				cloudflare: { env, ctx },
			});
		} catch (error) {
			console.error("Worker error:", error);
			return new Response("Internal Server Error", { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
