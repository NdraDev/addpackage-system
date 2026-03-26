import type { Route } from "./+types/tools-auto-addpackage";
import { motion } from "framer-motion";
import { CheckCircle, Zap, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Auto Add Package WHM cPanel - Automation Tools Terbaik | NdraDev" },
        { name: "description", content: "Auto add package WHM cPanel - Buat ratusan package hosting dalam hitungan detik. Tools automation terbaik untuk hosting provider Indonesia." },
        { name: "keywords", content: "auto addpackage WHM, WHM auto package, cPanel automation, bulk package creator, WHM批量创建, hosting automation tools" },
    ];
}

export default function ToolsAutoAddPackage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <Badge className="mb-4" variant="outline"><Zap className="w-3 h-3 mr-1" /> Automation</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Auto Add Package WHM cPanel</h1>
                    <p className="text-xl text-gray-600">Otomatisasi pembuatan package WHM - Hemat 95% waktu Anda</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <Clock className="w-12 h-12 text-blue-600 mb-2" />
                            <CardTitle>Hemat Waktu</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Dari 30 menit menjadi 30 detik per package</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <TrendingUp className="w-12 h-12 text-green-600 mb-2" />
                            <CardTitle>Produktivitas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Tingkatkan output tim Anda hingga 10x lipat</CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CheckCircle className="w-12 h-12 text-purple-600 mb-2" />
                            <CardTitle>Akurasi 100%</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Zero error dengan validasi otomatis</CardDescription>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-0 shadow-xl">
                    <CardHeader>
                        <CardTitle>Cara Kerja Auto Add Package</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ol className="space-y-3 list-decimal list-inside">
                            <li>Import daftar package dari CSV/Excel</li>
                            <li>Konfigurasi template package</li>
                            <li>Klik "Auto Create" dan tunggu proses selesai</li>
                            <li>Export laporan package yang berhasil dibuat</li>
                        </ol>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
