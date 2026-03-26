import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cloud,
    Server,
    Download,
    CheckCircle,
    Menu,
    X,
    Home,
    Package,
    FileText,
    Shield,
    Zap,
    Globe,
    ShoppingCart,
    MessageCircle,
    Bug,
    ExternalLink,
    Send,
    Users,
    Activity,
    AlertCircle,
    Info,
    Clock,
    Star,
    TrendingUp,
    Target,
    Award,
    ChevronRight,
    ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { useToast } from "../hooks/use-toast";

export function meta({}: Route.MetaArgs) {
    return [
        // Primary Meta Tags - Optimized for high-volume keywords
        { title: "Tools WHM cPanel - Auto Add Package V5 | NdraDev Professional Hosting Tools" },
        { name: "description", content: "Tools WHM cPanel terbaik untuk auto add package, IP registration, dan hosting automation. Solusi profesional untuk server management dengan teknologi AI." },
        { name: "keywords", content: "tools WHM cPanel, auto addpackage WHM, tools AI WHM, cPanel automation, WHM tools Indonesia, hosting automation, server management tools, cPanel package creator, WHMCS module, hosting business tools" },
        
        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://addpackage.dev" },
        { property: "og:title", content: "Tools WHM cPanel - Auto Add Package V5 | NdraDev" },
        { property: "og:description", content: "Tools profesional untuk WHM cPanel dengan fitur auto add package, IP registration, dan AI-powered automation" },
        
        // Twitter
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:title", content: "Tools WHM cPanel - Auto Add Package V5" },
        { property: "twitter:description", content: "Tools profesional untuk WHM cPanel dengan AI automation" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

function AnimatedClouds() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div
                className="absolute top-20 left-10 opacity-20"
                animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            >
                <img src="/cloud.png" alt="Cloud" className="w-32 h-32 md:w-40 md:h-40 object-contain" />
            </motion.div>
            <motion.div
                className="absolute top-40 right-20 opacity-15"
                animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
                <img src="/cloud.png" alt="Cloud" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
            </motion.div>
            <motion.div
                className="absolute bottom-40 left-1/4 opacity-10"
                animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <img src="/cloud.png" alt="Cloud" className="w-40 h-40 md:w-48 md:h-48 object-contain" />
            </motion.div>
        </div>
    );
}

function NavigationMenu({ onClose }: { onClose?: () => void }) {
    const navItems = [
        { icon: Home, label: "Home", href: "/" },
        { icon: Package, label: "Packages", href: "/packages" },
        { icon: Server, label: "IP Server Terdaftar", href: "/ip-server-terdaftar" },
        { icon: FileText, label: "Artikel", href: "/artikel" },
        { icon: FileText, label: "API Docs", href: "/documentation" },
    ];

    return (
        <div className="space-y-2">
            {navItems.map((item, index) => (
                <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-300 group"
                >
                    <item.icon className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                    <span className="font-medium">{item.label}</span>
                </motion.a>
            ))}
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color, delay, description }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05, y: -5 }}
        >
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                            <p className={`text-2xl md:text-3xl font-bold ${color}`}>{value}</p>
                            {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
                        </div>
                        <div className={`p-3 md:p-4 rounded-xl bg-gradient-to-br ${color.includes("blue") ? "from-blue-500 to-blue-600" : color.includes("green") ? "from-green-500 to-green-600" : "from-purple-500 to-purple-600"}`}>
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function IPList({ ips }: { ips: Array<{ id: number; ip: string; created_at: string }> }) {
    const maskIP = (ip: string) => {
        const parts = ip.split(".");
        if (parts.length === 4) {
            return `${parts[0]}.*.*.${parts[3]}`;
        }
        return ip;
    };

    if (!ips || ips.length === 0) {
        return (
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                    <Server className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">Belum ada server terdaftar</p>
                    <p className="text-xs text-gray-400 mt-2">Jadilah yang pertama untuk mendaftarkan IP Anda</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {ips.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                >
                    <Card className="border-l-4 border-l-blue-500 border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <Server className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-mono text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200">
                                            {maskIP(item.ip)}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(item.created_at).toLocaleDateString("id-ID")}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Active
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}

function KeywordLandingPage({ keyword, description, features }: any) {
    return (
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                        <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">{keyword}</CardTitle>
                        <CardDescription>Solusi terbaik untuk {keyword.toLowerCase()}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
                <ul className="space-y-2">
                    {features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
    const [ip, setIp] = useState("");
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [serverCount, setServerCount] = useState(0);
    const [registeredIPs, setRegisteredIPs] = useState<Array<{ id: number; ip: string; created_at: string }>>([]);
    const [showAlert, setShowAlert] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchServerStats();
        const interval = setInterval(fetchServerStats, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchServerStats = async () => {
        try {
            console.log("Fetching server stats...");
            const response = await fetch("/api/ip/list");
            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("API Response:", data);
            
            if (data.success) {
                setServerCount(data.total || 0);
                setRegisteredIPs(data.data || []);
            } else {
                console.error("API returned error:", data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const validateIP = (ipString: string): boolean => {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ipString)) return false;
        const octets = ipString.split(".").map(Number);
        return octets.every((octet) => octet >= 0 && octet <= 255);
    };

    const handleRegister = async () => {
        if (!ip.trim()) {
            toast({ variant: "destructive", title: "Error", description: "Masukkan IP address" });
            return;
        }
        if (!validateIP(ip.trim())) {
            toast({ variant: "destructive", title: "Format Invalid", description: "Format IP tidak valid" });
            return;
        }
        setLoading(true);
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ip: ip.trim() }),
            });
            const data = await response.json();
            if (data.success) {
                toast({ variant: "success", title: "Berhasil!", description: "IP berhasil didaftarkan" });
                setIp("");
                fetchServerStats();
            } else {
                toast({ variant: "destructive", title: "Gagal", description: data.error });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Terjadi kesalahan" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 shadow-lg"
                    >
                        <div className="container mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                                    <Info className="w-5 h-5" />
                                </motion.div>
                                <AlertDescription className="text-sm">
                                    <span className="font-semibold">Tools WHM cPanel Terbaik!</span> - Auto Add Package dengan teknologi AI
                                </AlertDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setShowAlert(false)} className="text-white hover:bg-white/20">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatedClouds />

            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 ${showAlert ? "mt-12" : ""}`}
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
                            <img src="/logo.png" alt="NdraDev Logo" className="w-10 h-10 md:w-12 md:h-12" />
                            <div className="hidden md:block">
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NdraDev</span>
                                <p className="text-xs text-gray-500">Add Package System</p>
                            </div>
                        </motion.div>

                        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-3">
                                        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                                        NdraDev
                                    </SheetTitle>
                                </SheetHeader>
                                <NavigationMenu onClose={() => setSidebarOpen(false)} />
                            </SheetContent>
                        </Sheet>

                        <nav className="hidden lg:flex items-center gap-6">
                            {[
                                { icon: Home, label: "Home" },
                                { icon: Package, label: "Packages" },
                                { icon: Server, label: "IP Server" },
                                { icon: FileText, label: "Artikel" },
                                { icon: FileText, label: "API" },
                            ].map((item) => (
                                <motion.a key={item.label} href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium" whileHover={{ y: -2 }}>
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </motion.a>
                            ))}
                        </nav>
                    </div>
                </div>
            </motion.header>

            <main className="container mx-auto px-4 py-8 relative z-10">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Hero Section with Vector */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.8, type: "spring" }}>
                            <img src="/vector.png" alt="Vector" className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto object-contain drop-shadow-2xl" />
                        </motion.div>
                        <Badge className="mb-4 bg-blue-100 text-blue-700" variant="default">
                            <Zap className="w-3 h-3 mr-1" /> V5.0 Latest Release
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                            TOOLS Add <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Package</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
                            Tools WHM cPanel profesional dengan teknologi AI untuk automation hosting
                        </p>
                        
                        {/* SEO Keywords Section */}
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {["Tools WHM cPanel", "Auto Add Package", "Tools AI WHM", "cPanel Automation", "Hosting Tools"].map((keyword) => (
                                <Badge key={keyword} variant="outline" className="text-sm">
                                    {keyword}
                                </Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard icon={Server} label="Total Server Terdaftar" value={serverCount} color="text-blue-600" delay={0.3} description="IP aktif terdaftar" />
                        <StatCard icon={Shield} label="Server Aktif" value={serverCount} color="text-green-600" delay={0.4} description="99.9% uptime" />
                        <StatCard icon={Activity} label="Uptime" value="99.9%" color="text-purple-600" delay={0.5} description="Reliability tinggi" />
                    </div>

                    {/* Register IP Card */}
                    <Card className="border-0 shadow-2xl">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                                    <Server className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle>Register IP Address</CardTitle>
                                    <CardDescription>Daftarkan IP server Anda untuk akses penuh</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input id="ip-input" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="contoh: 192.168.1.1" disabled={loading} />
                            <Button onClick={handleRegister} disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                                {loading ? (
                                    <motion.div animate={{ rotate: 360 }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5 mr-2" /> Register IP
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Download Card */}
                    <Card className="border-0 shadow-2xl">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                                    <Download className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle>Download Package</CardTitle>
                                    <CardDescription>Download tools terbaru</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                                <Download className="w-5 h-5 mr-2" /> Download Now
                            </Button>
                        </CardContent>
                    </Card>

                    {/* CPanel License */}
                    <Card className="border-2 border-blue-200 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                                        <ShoppingCart className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle>Buy CPanel License</CardTitle>
                                        <CardDescription>Rp15.000 - License Resmi</CardDescription>
                                    </div>
                                </div>
                                <motion.img src="/vector.png" alt="Vector" className="w-20 h-20 hidden md:block" animate={{ rotate: [0, 10, -10, 0] }} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <motion.a href="https://license.addpackage.dev" target="_blank" whileHover={{ scale: 1.05 }}>
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                                        <ExternalLink className="w-4 h-4 mr-2" /> Website
                                    </Button>
                                </motion.a>
                                <motion.a href="https://wa.me/62895403630048" target="_blank" whileHover={{ scale: 1.05 }}>
                                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                                        <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                                    </Button>
                                </motion.a>
                            </div>
                        </CardContent>
                    </Card>

                    {/* IP List Preview */}
                    <Card className="border-0 shadow-xl">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                                    <Server className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <CardTitle>IP Server Terdaftar</CardTitle>
                                    <CardDescription>{serverCount} server terdaftar</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <IPList ips={registeredIPs} />
                            <Button variant="outline" className="w-full mt-4" asChild>
                                <a href="/ip-server-terdaftar">
                                    Lihat Semua <ArrowRight className="w-4 h-4 ml-2" />
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* SEO Landing Pages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <KeywordLandingPage
                            keyword="Tools WHM cPanel"
                            description="Solusi terbaik untuk manajemen server WHM cPanel dengan fitur lengkap dan automation canggih."
                            features={["Auto Package Creation", "IP Management", "User Automation", "API Integration"]}
                        />
                        <KeywordLandingPage
                            keyword="Auto Add Package WHM"
                            description="Otomatisasi pembuatan package di WHM dengan satu klik. Hemat waktu dan tingkatkan produktivitas."
                            features={["One-Click Package", "Bulk Operations", "Custom Configuration", "Error Handling"]}
                        />
                    </div>

                    {/* Bug Report */}
                    <Card className="border-0 shadow-xl bg-gradient-to-r from-red-50 to-orange-50">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <motion.div animate={{ rotate: [0, 10, -10, 0] }}>
                                    <Bug className="w-6 h-6 text-red-600" />
                                </motion.div>
                                <h3 className="text-xl font-bold">Ada Bug? Chat Owner</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                <motion.a href="https://wa.me/6287767867841" target="_blank" whileHover={{ scale: 1.05 }}>
                                    <Button className="w-full bg-green-600">
                                        <Send className="w-4 h-4 mr-2" /> WhatsApp
                                    </Button>
                                </motion.a>
                                <motion.a href="https://t.me/ndradevid" target="_blank" whileHover={{ scale: 1.05 }}>
                                    <Button className="w-full bg-blue-600">
                                        <MessageCircle className="w-4 h-4 mr-2" /> Telegram
                                    </Button>
                                </motion.a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
