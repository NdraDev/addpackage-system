import type { Route } from "./+types/tools-ai-whm";
import { motion } from "framer-motion";
import { Zap, Brain, Cpu, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Tools AI WHM - Artificial Intelligence untuk Hosting Automation | NdraDev" },
        { name: "description", content: "Tools AI WHM dengan machine learning untuk optimasi server hosting. Automation cerdas untuk manajemen package dan resource allocation." },
        { name: "keywords", content: "tools AI WHM, AI hosting automation, machine learning cPanel, smart server management, AI package optimizer, intelligent hosting tools" },
    ];
}

export default function ToolsAIWHM() {
    const aiFeatures = [
        { icon: Brain, title: "Smart Package Recommendation", desc: "AI menganalisis usage pattern untuk rekomendasi package optimal" },
        { icon: Cpu, title: "Resource Prediction", desc: "Prediksi kebutuhan resource dengan akurasi 94%" },
        { icon: Sparkles, title: "Auto Optimization", desc: "Optimasi konfigurasi server secara otomatis" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <Badge className="mb-4 bg-purple-100 text-purple-700" variant="default">
                        <Zap className="w-3 h-3 mr-1" /> AI-Powered
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Tools AI WHM <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Intelligent Automation</span>
                    </h1>
                    <p className="text-xl text-gray-600">Machine learning untuk optimasi server hosting Anda</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {aiFeatures.map((feature, i) => (
                        <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className="text-center border-0 shadow-lg">
                                <CardHeader>
                                    <feature.icon className="w-12 h-12 mx-auto mb-2 text-purple-600" />
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{feature.desc}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-blue-50">
                    <CardHeader>
                        <CardTitle>Keunggulan AI WHM Tools</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-700">
                            Dengan teknologi <strong>Artificial Intelligence</strong> dan <strong>Machine Learning</strong>, 
                            tools WHM kami dapat mempelajari pola penggunaan server Anda dan memberikan rekomendasi optimal 
                            untuk alokasi resource, package configuration, dan performance tuning.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" /><span>Predictive analytics untuk server load</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" /><span>Automated troubleshooting</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" /><span>Smart resource allocation</span></li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function CheckCircle({ className, children }: any) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
}
