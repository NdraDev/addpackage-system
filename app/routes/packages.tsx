import type { Route } from "./+types/packages";
import { motion } from "framer-motion";
import { CheckCircle, Package, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Packages - WHM API Automation | Pricing Plans" },
        { name: "description", content: "Choose your WHM API automation package - Free, Pro, and Enterprise plans available" },
    ];
}

export default function Packages() {
    const packages = [
        { name: "Free", price: "Free", features: ["IP Registration", "Basic API Access (100/day)", "Community Support"], popular: false },
        { name: "Pro", price: "Rp15.000", features: ["All Free Features", "Auto Add Package", "Priority Support", "API Rate Limit 1000/hour", "LiteSpeed Auto Install"], popular: true },
        { name: "Enterprise", price: "Custom", features: ["All Pro Features", "Custom Integration", "24/7 Support", "Unlimited API Calls", "Dedicated Account Manager"], popular: false },
    ];

    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <Badge variant="secondary" className="mb-4"><Package className="w-3 h-3 mr-1" /> Pricing</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Package</h1>
                    <p className="text-lg text-muted-foreground">WHM API automation tools with flexible pricing</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {packages.map((pkg, i) => (
                        <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className={`h-full glass ${pkg.popular ? "border-2 border-primary" : ""}`}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                                        {pkg.popular && <Badge><Star className="w-3 h-3 mr-1" /> Popular</Badge>}
                                    </div>
                                    <CardDescription className="text-3xl font-bold text-primary">{pkg.price}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {pkg.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-muted-foreground">{feature}</span>
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
