import type { Route } from "./+types/tools-whm-cpanel";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Shield, Globe, Star, Award, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Tools WHM cPanel Terbaik 2026 - Auto Package Creator | NdraDev V5" },
        { name: "description", content: "Tools WHM cPanel terbaik dengan fitur auto add package, AI-powered automation. Solusi profesional untuk hosting provider Indonesia. Gratis trial!" },
        { name: "keywords", content: "tools WHM cPanel, WHM tools Indonesia, cPanel automation, auto package WHM, hosting tools, server management, WHMCS module, cPanel tools free, best WHM tools 2026" },
        { property: "og:title", content: "Tools WHM cPanel Terbaik 2026 - Auto Package Creator" },
        { property: "og:description", content: "Tools WHM cPanel dengan AI automation untuk hosting provider" },
    ];
}

export default function ToolsWHMcPanel() {
    const features = [
        { icon: Zap, title: "Auto Package Creation", desc: "Buat package WHM dalam 1 klik" },
        { icon: Shield, title: "Security First", desc: "Enkripsi data end-to-end" },
        { icon: Globe, title: "Global Access", desc: "Akses dari mana saja" },
        { icon: Star, title: "5-Star Support", desc: "Support 24/7 via WA & Telegram" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Hero Section */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <Badge className="mb-4 bg-blue-100 text-blue-700" variant="default">
                        <Zap className="w-3 h-3 mr-1" /> #1 Tools WHM cPanel Indonesia
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Tools WHM cPanel <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Terbaik 2026</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                        Solusi auto add package untuk WHM cPanel dengan teknologi AI. Hemat waktu hingga 90% dalam manajemen hosting server Anda.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                            Coba Gratis <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button size="lg" variant="outline">
                            Lihat Demo
                        </Button>
                    </div>
                </motion.div>

                {/* Alert Social Proof */}
                <Alert className="mb-8 bg-green-50 border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertTitle className="text-green-800">Dipercaya 1000+ Hosting Provider</AlertTitle>
                    <AlertDescription className="text-green-700">
                        Tools WHM cPanel paling populer di Indonesia dengan rating 4.9/5
                    </AlertDescription>
                </Alert>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((feature, i) => (
                        <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className="text-center border-0 shadow-lg">
                                <CardHeader>
                                    <feature.icon className="w-12 h-12 mx-auto mb-2 text-blue-600" />
                                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{feature.desc}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* SEO Content */}
                <Card className="mb-8 border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Mengapa Tools WHM cPanel Ini Terbaik?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-700">
                            <strong>Tools WHM cPanel</strong> dari NdraDev adalah solusi automation terbaik untuk hosting provider di Indonesia. 
                            Dengan fitur <em>auto add package</em>, Anda dapat membuat ratusan package WHM hanya dalam hitungan detik.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-600 mt-0.5" /><span>Interface user-friendly, cocok untuk pemula</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-600 mt-0.5" /><span>API lengkap untuk integrasi custom</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-600 mt-0.5" /><span>Support teknis 24/7 via WhatsApp dan Telegram</span></li>
                            <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-green-600 mt-0.5" /><span>Update gratis seumur hidup</span></li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Pricing CTA */}
                <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardContent className="p-8 text-center">
                        <Award className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                        <h2 className="text-3xl font-bold mb-4">Harga Terjangkau, Fitur Premium</h2>
                        <p className="text-xl mb-6">CPanel License hanya <strong>Rp15.000</strong></p>
                        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                            Beli Sekarang <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
