import type { Route } from "./+types/packages";
import { motion } from "framer-motion";
import { Package, CheckCircle, Star, Zap, Shield, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Packages - Add Package System V5 | Tools WHM cPanel" },
        { name: "description", content: "Package tools WHM cPanel terlengkap untuk automation hosting dengan fitur AI-powered" },
    ];
}

export default function Packages() {
    const packages = [
        { name: "Basic Package", price: "Free", features: ["IP Registration", "Basic API Access", "Community Support"], popular: false },
        { name: "Pro Package", price: "Rp15.000", features: ["All Basic Features", "Auto Add Package", "Priority Support", "API Rate Limit 1000/hour"], popular: true },
        { name: "Enterprise", price: "Custom", features: ["All Pro Features", "Custom Integration", "24/7 Support", "Unlimited API"], popular: false },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-12">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <Badge className="mb-4" variant="outline"><Package className="w-3 h-3 mr-1" /> Packages</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Package</h1>
                    <p className="text-xl text-gray-600">Tools WHM cPanel dengan harga terbaik</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {packages.map((pkg, i) => (
                        <motion.div key={pkg.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className={`h-full border-0 shadow-xl ${pkg.popular ? "ring-2 ring-blue-500 scale-105" : ""}`}>
                                <CardHeader>
                                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                                    <CardDescription className="text-3xl font-bold text-blue-600">{pkg.price}</CardDescription>
                                    {pkg.popular && <Badge>Most Popular</Badge>}
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {pkg.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-sm">{feature}</span>
                                        </div>
                                    ))}
                                    <Button className="w-full mt-4" variant={pkg.popular ? "default" : "outline"}>
                                        Get Started
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
