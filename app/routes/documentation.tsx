import type { Route } from "./+types/documentation";
import { motion } from "framer-motion";
import { Book, Globe, Server, CheckCircle, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "API Documentation - WHM API Automation" },
        { name: "description", content: "Complete API documentation for WHM automation system" },
    ];
}

export default function Documentation() {
    const endpoints = [
        { method: "POST", path: "/api/register", desc: "Register new IP address", params: [{ name: "ip", type: "string", required: true, desc: "IP address to register" }] },
        { method: "GET", path: "/api/ip/list", desc: "List all registered IPs", params: [] },
        { method: "GET", path: "/api/ip/check/:ip", desc: "Check if IP is registered", params: [{ name: "ip", type: "string", required: true, desc: "IP to check" }] },
    ];

    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                    <Badge variant="secondary" className="mb-4"><Book className="w-3 h-3 mr-1" /> Documentation</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">API Documentation</h1>
                    <p className="text-lg text-muted-foreground">Complete REST API reference for WHM automation</p>
                </motion.div>

                <div className="space-y-6">
                    {endpoints.map((endpoint, i) => (
                        <motion.div key={endpoint.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className="glass">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Badge className={endpoint.method === "POST" ? "bg-blue-600" : "bg-green-600"}>{endpoint.method}</Badge>
                                        <code className="text-lg font-mono bg-muted px-3 py-1 rounded">{endpoint.path}</code>
                                    </div>
                                    <CardDescription className="text-base">{endpoint.desc}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {endpoint.params.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2 text-sm">Parameters:</h4>
                                            <div className="space-y-2">
                                                {endpoint.params.map((param) => (
                                                    <div key={param.name} className="flex items-start gap-2 text-sm">
                                                        <Code className="w-4 h-4 text-primary mt-0.5" />
                                                        <span className="font-mono">{param.name}</span>
                                                        <span className="text-muted-foreground">({param.type})</span>
                                                        {param.required && <Badge variant="destructive" className="text-xs h-5">Required</Badge>}
                                                        <span className="text-muted-foreground">{param.desc}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-4 bg-muted rounded-lg overflow-x-auto">
                                        <pre className="text-xs text-muted-foreground font-mono">
                                            {endpoint.method === "POST" 
                                                ? `curl -X POST https://addpackage.dev${endpoint.path} \\\n  -H "Content-Type: application/json" \\\n  -d '{"ip": "192.168.1.1"}'`
                                                : `curl -X GET https://addpackage.dev${endpoint.path}`}
                                        </pre>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <Card className="glass mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" /> Quick Start Guide</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" /> Register your IP using POST /api/register</p>
                        <p className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" /> Get list of registered IPs with GET /api/ip/list</p>
                        <p className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-green-500" /> Check IP status with GET /api/ip/check/:ip</p>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center"><Button variant="outline" asChild><a href="/">← Back to Home</a></Button></div>
            </div>
        </div>
    );
}
