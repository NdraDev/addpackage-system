import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
	// Preconnect
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	// Fonts
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	// Favicon
	{
		rel: "icon",
		href: "/logo.png",
		type: "image/png",
	},
	{
		rel: "icon",
		href: "/logo.png",
		sizes: "any",
	},
	// Apple Touch Icon
	{
		rel: "apple-touch-icon",
		href: "/logo.png",
		sizes: "180x180",
	},
	// Web Manifest
	{
		rel: "manifest",
		href: "/site.webmanifest",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="id" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
				
				{/* Primary Meta Tags */}
				<meta name="title" content="NdraDev - Add Package System V5 | Professional IP Registration" />
				<meta name="description" content="Add Package System V5 - Professional IP address registration, management tools, and CPanel license solutions by NdraDev. Secure, fast, and reliable cloud-based package management." />
				<meta name="keywords" content="IP registration, package management, NdraDev, CPanel license, server tools, API management, cloud tools, web hosting, Indonesia developer tools" />
				<meta name="author" content="NdraDev" />
				<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
				<meta name="googlebot" content="index, follow" />
				<meta name="language" content="Indonesian" />
				<meta name="revisit-after" content="7 days" />
				<meta name="rating" content="general" />
				<meta name="distribution" content="global" />
				
				{/* Theme Color */}
				<meta name="theme-color" content="#2563eb" />
				<meta name="msapplication-TileColor" content="#2563eb" />
				
				{/* Mobile Web App */}
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="NdraDev" />
				<meta name="mobile-web-app-capable" content="yes" />
				
				{/* Canonical */}
				<link rel="canonical" href="https://addpackage.dev" />
				
				{/* Open Graph / Facebook */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://addpackage.dev" />
				<meta property="og:site_name" content="NdraDev - Add Package System" />
				<meta property="og:title" content="NdraDev - Add Package System V5 | Professional IP Registration" />
				<meta property="og:description" content="Professional IP address registration, management tools, and CPanel license solutions. Secure and reliable cloud-based package management system." />
				<meta property="og:image" content="https://addpackage.dev/og-image.png" />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:image:alt" content="NdraDev Add Package System Banner" />
				<meta property="og:locale" content="id_ID" />
				<meta property="og:locale:alternate" content="en_US" />
				
				{/* Twitter Card */}
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://addpackage.dev" />
				<meta property="twitter:site" content="@ndradevid" />
				<meta property="twitter:creator" content="@ndradevid" />
				<meta property="twitter:title" content="NdraDev - Add Package System V5" />
				<meta property="twitter:description" content="Professional IP address registration and CPanel license solutions" />
				<meta property="twitter:image" content="https://addpackage.dev/og-image.png" />
				<meta property="twitter:image:alt" content="NdraDev Add Package System Banner" />
				
				{/* Structured Data / JSON-LD */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebApplication",
							"name": "NdraDev Add Package System",
							"alternateName": "Add Package V5",
							"url": "https://addpackage.dev",
							"description": "Professional IP address registration, management tools, and CPanel license solutions",
							"applicationCategory": "DeveloperApplication",
							"operatingSystem": "Web",
							"browserRequirements": "Requires JavaScript",
							"author": {
								"@type": "Person",
								"name": "NdraDev",
								"url": "https://ndradev.com",
								"sameAs": [
									"https://github.com/NdraDev",
									"https://t.me/ndradevid"
								]
							},
							"offers": {
								"@type": "Offer",
								"price": "0",
								"priceCurrency": "IDR",
								"availability": "https://schema.org/InStock"
							},
							"featureList": "IP Registration, Package Management, CPanel License, API Tools",
							"keywords": "IP registration, package management, CPanel license, server tools, cloud tools",
							"inLanguage": "id",
							"datePublished": "2026-03-26",
							"dateModified": "2026-03-26"
						}),
					}}
				/>
				
				{/* Organization Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Organization",
							"name": "NdraDev",
							"url": "https://addpackage.dev",
							"logo": "https://addpackage.dev/logo.png",
							"description": "Professional developer tools and services",
							"founder": {
								"@type": "Person",
								"name": "NdraDev"
							},
							"sameAs": [
								"https://github.com/NdraDev",
								"https://t.me/ndradevid",
								"https://wa.me/6287767867841"
							],
							"contactPoint": {
								"@type": "ContactPoint",
								"contactType": "customer support",
								"availableLanguage": ["Indonesian", "English"]
							}
						}),
					}}
				/>

				<Meta />
				<Links />
			</head>
			<body className="min-h-screen bg-background font-sans antialiased">
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<>
			<Meta />
			<Outlet />
		</>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404 - Page Not Found" : "Error";
		details =
			error.status === 404
				? "The page you are looking for does not exist."
				: error.statusText || details;
	} else if (error instanceof Error) {
		details = error.message;
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
			<div className="text-center space-y-6 p-8">
				<div className="space-y-2">
					<img src="/logo.png" alt="NdraDev Logo" className="w-20 h-20 mx-auto mb-4" />
					<h1 className="text-6xl font-bold text-gray-900 dark:text-white">
						{message}
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300">{details}</p>
				</div>
				<a
					href="/"
					className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					Back to Home
				</a>
			</div>
		</div>
	);
}
