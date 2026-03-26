import type { Route } from "./+types/artikel";
import { motion } from "framer-motion";
import { FileText, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Artikel - WHM API Automation Tutorials" },
        { name: "description", content: "Articles and tutorials about WHM cPanel automation" },
    ];
}

export default function Artikel() {
    const articles = [
        { title: "Cara Install Tools WHM cPanel untuk Pemula", excerpt: "Panduan lengkap instalasi dan konfigurasi tools WHM cPanel...", category: "Tutorial", date: "2026-03-25" },
        { title: "10 Tips Optimasi Server cPanel", excerpt: "Tips dan trik untuk mengoptimalkan performa server cPanel...", category: "Tips", date: "2026-03-24" },
        { title: "Auto Add Package: Hemat Waktu 90%", excerpt: "Bagaimana cara menghemat waktu manajemen package dengan automation...", category: "Guide", date: "2026-03-23" },
    ];

    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                    <Badge variant="secondary" className="mb-4"><FileText className="w-3 h-3 mr-1" /> Artikel</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Artikel & Tutorial</h1>
                    <p className="text-lg text-muted-foreground">Panduan lengkap WHM cPanel dan hosting automation</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, i) => (
                        <motion.div key={article.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className="h-full glass hover:shadow-lg transition-all">
                                <CardHeader>
                                    <Badge className="w-fit mb-2" variant="secondary">{article.category}</Badge>
                                    <CardTitle className="text-lg">{article.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 text-xs"><Clock className="w-3 h-3" />{article.date}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                                    <Button variant="outline" size="sm" className="w-full">
                                        Baca Selengkapnya <ChevronRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center"><Button variant="outline" asChild><a href="/">← Back to Home</a></Button></div>
            </div>
        </div>
    );
}
