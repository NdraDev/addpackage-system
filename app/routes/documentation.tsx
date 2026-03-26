import type { Route } from "./+types/documentation";
import { motion } from "framer-motion";
import { Book, Globe, Server, CheckCircle, Code, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "API Documentation - Add Package System V5 | Swagger-like Docs" },
        { name: "description", content: "Dokumentasi API lengkap untuk Add Package System V5 dengan contoh integrasi WHM cPanel" },
    ];
}

export default function Documentation() {
    const endpoints = [
        { method: "POST", path: "/api/register", description: "Register new IP address", params: [{ name: "ip", type: "string", required: true, description: "IP address to register" }] },
        { method: "GET", path: "/api/ip/list", description: "List all registered IPs", params: [] },
        { method: "GET", path: "/api/ip/check/:ip", description: "Check if IP is registered", params: [{ name: "ip", type: "string", required: true, description: "IP to check" }] },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <Badge className="mb-4" variant="outline"><Book className="w-3 h-3 mr-1" /> API Docs</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">API Documentation</h1>
                    <p className="text-xl text-gray-600">Complete REST API reference for Add Package System</p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6">
                    {endpoints.map((endpoint, i) => (
                        <motion.div key={endpoint.path} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className="border-0 shadow-lg">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Badge className={endpoint.method === "POST" ? "bg-blue-600" : "bg-green-600"}>{endpoint.method}</Badge>
                                        <code className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">{endpoint.path}</code>
                                    </div>
                                    <CardDescription className="text-base">{endpoint.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {endpoint.params.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-2">Parameters:</h4>
                                            <div className="space-y-2">
                                                {endpoint.params.map((param) => (
                                                    <div key={param.name} className="flex items-start gap-2 text-sm">
                                                        <Code className="w-4 h-4 text-blue-600 mt-0.5" />
                                                        <span className="font-mono">{param.name}</span>
                                                        <span className="text-gray-500">({param.type})</span>
                                                        {param.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                                                        <span className="text-gray-600">{param.description}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
                                        <pre className="text-green-400 text-sm font-mono">
                                            {endpoint.method === "POST" 
                                                ? `curl -X POST https://addpackage.dev${endpoint.path} \\
  -H "Content-Type: application/json" \\
  -d '{"ip": "192.168.1.1"}'`
                                                : `curl -X GET https://addpackage.dev${endpoint.path}`}
                                        </pre>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5" /> Quick Start Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Register your IP using POST /api/register</p>
                        <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Get list of registered IPs with GET /api/ip/list</p>
                        <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Check IP status with GET /api/ip/check/:ip</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
