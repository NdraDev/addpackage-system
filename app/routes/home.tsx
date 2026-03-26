import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
    Clock,
    Loader2,
    TrendingUp,
    Users,
    BarChart3,
    Sparkles,
    ArrowRight,
    ChevronRight,
    Star,
    Award,
    Activity,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useToast } from "../hooks/use-toast";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Add Package System V5 - Professional IP Management Platform" },
        { name: "description", content: "Professional IP registration and management system with enterprise-grade features" },
        { name: "keywords", content: "IP registration, server management, hosting automation, enterprise tools" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Add Package System V5" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

function AnimatedBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute opacity-15"
                    style={{
                        top: `${20 * i}%`,
                        left: `${20 * (i % 2) + 10}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20 * (i % 2 === 0 ? 1 : -1), 0],
                    }}
                    transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img src="/cloud.png" alt="" className="w-24 h-24 md:w-32 md:h-32" />
                </motion.div>
            ))}
        </div>
    );
}

function StatCard({ icon: Icon, label, value, trend, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Card className="relative overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        {trend && (
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {trend}
                            </Badge>
                        )}
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
                        <Progress value={75} className="h-2" />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function FeatureCard({ icon: Icon, title, description, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.05, y: -5 }}
        >
            <Card className="h-full border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl w-fit">
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900 dark:text-white">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-center text-base text-slate-600 dark:text-slate-400">{description}</CardDescription>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function IPLicenseCard({ ips, loading }: { ips: Array<{ id: number; ip: string; created_at: string }>, loading: boolean }) {
    const maskIP = (ip: string) => {
        const parts = ip.split(".");
        return parts.length === 4 ? `${parts[0]}.*.*.${parts[3]}` : ip;
    };

    return (
        <Card className="border border-slate-200 dark:border-slate-700 shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                            <Server className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-slate-900 dark:text-white">IP Server Terdaftar</CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-400">{ips.length} server aktif</CardDescription>
                        </div>
                    </div>
                    {loading && <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />}
                </div>
            </CardHeader>
            <CardContent>
                {ips.length === 0 ? (
                    <div className="text-center py-8">
                        <Server className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">Belum ada IP terdaftar</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                        {ips.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700"
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                        <Server className="w-5 h-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-mono text-sm font-semibold text-slate-900 dark:text-white">{maskIP(item.ip)}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                                    </p>
                                </div>
                                <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Active
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                )}
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
    const [ipAlreadyRegistered, setIpAlreadyRegistered] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchServerStats();
        const interval = setInterval(fetchServerStats, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchServerStats = async () => {
        try {
            const response = await fetch("/api/ip/list");
            const data = await response.json();
            if (data.success) {
                setServerCount(data.total || 0);
                setRegisteredIPs(data.data || []);
            }
        } catch (error) {
            console.error("Error:", error);
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
            toast({ variant: "destructive", title: "Invalid", description: "Format IP tidak valid" });
            return;
        }

        try {
            const checkResponse = await fetch(`/api/ip/check/${encodeURIComponent(ip.trim())}`);
            const checkData = await checkResponse.json();
            
            if (checkData.registered) {
                setIpAlreadyRegistered(true);
                toast({
                    title: "IP Sudah Terdaftar",
                    description: "IP address Anda sudah terdaftar. Tidak perlu daftarkan lagi. Selamat menikmati layanan kami!",
                    className: "bg-green-50 border-green-200",
                });
                return;
            }

            setLoading(true);
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ip: ip.trim() }),
            });
            const data = await response.json();

            if (data.success) {
                toast({ variant: "success", title: "Berhasil!", description: "IP berhasil didaftarkan" });
                setIp("");
                setIpAlreadyRegistered(false);
                fetchServerStats();
            } else if (data.error?.includes("already registered")) {
                setIpAlreadyRegistered(true);
                toast({
                    title: "IP Sudah Terdaftar",
                    description: "Tidak perlu daftarkan lagi. Selamat menikmati layanan kami!",
                    className: "bg-green-50 border-green-200",
                });
            } else {
                toast({ variant: "destructive", title: "Gagal", description: data.error });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Terjadi kesalahan" });
        } finally {
            setLoading(false);
        }
    };

    const features = [
        { icon: Shield, title: "Enterprise Security", desc: "Keamanan tingkat enterprise untuk data Anda" },
        { icon: Zap, title: "Lightning Fast", desc: "Performa tinggi dengan response time minimal" },
        { icon: Globe, title: "Global Infrastructure", desc: "Jaringan global untuk akses dari mana saja" },
        { icon: Award, title: "Industry Standard", desc: "Mengikuti standar industri terbaik" },
    ];

    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />

            {/* Alert Banner */}
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white px-4 py-4 shadow-2xl"
                    >
                        <div className="container mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                                    <Sparkles className="w-6 h-6" />
                                </motion.div>
                                <div>
                                    <AlertTitle className="font-bold">Add Package System V5</AlertTitle>
                                    <AlertDescription className="text-sm opacity-90">
                                        Platform manajemen IP profesional
                                    </AlertDescription>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setShowAlert(false)} className="text-white hover:bg-white/20">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-200 dark:border-slate-700 ${showAlert ? "mt-16" : ""}`}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.05 }}>
                            <img src="/logo.png" alt="Logo" className="w-12 h-12 md:w-14 md:h-14" />
                            <div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NdraDev</span>
                                <p className="text-xs text-gray-500">Enterprise Solutions</p>
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
                                        <img src="/logo.png" alt="Logo" className="w-12 h-12" />
                                        NdraDev
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="mt-8 space-y-2">
                                    {[
                                        { icon: Home, label: "Home", href: "/" },
                                        { icon: Package, label: "Packages", href: "/packages" },
                                        { icon: Server, label: "IP Server", href: "/ip-server-terdaftar" },
                                        { icon: FileText, label: "Artikel", href: "/artikel" },
                                        { icon: FileText, label: "API", href: "/documentation" },
                                    ].map((item) => (
                                        <a key={item.label} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-medium">{item.label}</span>
                                        </a>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <nav className="hidden lg:flex items-center gap-6">
                            {["Home", "Packages", "IP Server", "Artikel", "API"].map((item) => (
                                <a key={item} href="#" className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 relative z-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 1, type: "spring" }}
                        >
                            <img src="/vector.png" alt="Vector" className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 mx-auto object-contain drop-shadow-2xl" />
                        </motion.div>

                        <Badge className="px-4 py-2 text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border border-indigo-200" variant="outline">
                            <Sparkles className="w-3 h-3 mr-2" />
                            V5.0 Enterprise Edition
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            IP Management Platform
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            Professional-grade infrastructure for IP registration and server management
                        </p>

                        <div className="flex flex-wrap justify-center gap-2">
                            {["IP Registration", "Server Management", "API Integration", "24/7 Support"].map((tag) => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard icon={Server} label="Total Server Terdaftar" value={serverCount} trend="+12%" delay={0.2} />
                        <StatCard icon={Users} label="Active Users" value="500+" trend="+25%" delay={0.3} />
                        <StatCard icon={BarChart3} label="API Requests/Day" value="10K+" trend="+18%" delay={0.4} />
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <FeatureCard key={i} {...feature} delay={0.2 + i * 0.1} />
                        ))}
                    </div>

                    {/* Tabs Section */}
                    <Tabs defaultValue="register" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="register" className="text-lg">Register IP</TabsTrigger>
                            <TabsTrigger value="download" className="text-lg">Download</TabsTrigger>
                        </TabsList>

                        <TabsContent value="register">
                            <Card className="border-0 shadow-2xl">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                                            <Server className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-3xl">Register IP Address</CardTitle>
                                            <CardDescription>Daftarkan IP server Anda untuk akses penuh</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {ipAlreadyRegistered ? (
                                        <Alert className="bg-green-50 border-green-200 text-green-800">
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                            <AlertTitle>IP Sudah Terdaftar</AlertTitle>
                                            <AlertDescription>
                                                IP address Anda sudah terdaftar. Tidak perlu daftarkan lagi. Selamat menikmati layanan kami!
                                            </AlertDescription>
                                        </Alert>
                                    ) : (
                                        <>
                                            <Input
                                                value={ip}
                                                onChange={(e) => {
                                                    setIp(e.target.value);
                                                    setIpAlreadyRegistered(false);
                                                }}
                                                placeholder="contoh: 192.168.1.1"
                                                className="h-14 text-lg"
                                                disabled={loading}
                                            />
                                            <Button
                                                onClick={handleRegister}
                                                disabled={loading}
                                                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="w-5 h-5 mr-2" />
                                                        Register IP
                                                    </>
                                                )}
                                            </Button>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="download">
                            <Card className="border-0 shadow-2xl">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                                            <Download className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-3xl">Download Package</CardTitle>
                                            <CardDescription>Download enterprise package terbaru</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-emerald-600">
                                        <Download className="w-5 h-5 mr-2" />
                                        Download Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* CPanel License */}
                    <Card className="border-2 border-blue-200 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
                                        <ShoppingCart className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-3xl">Buy CPanel License</CardTitle>
                                        <CardDescription>Rp15.000 - License Resmi</CardDescription>
                                    </div>
                                </div>
                                <motion.img src="/vector.png" alt="" className="w-20 h-20 hidden lg:block" animate={{ rotate: [0, 10, -10, 0] }} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.a href="https://license.addpackage.dev" target="_blank" whileHover={{ scale: 1.05 }}>
                                    <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600">
                                        <ExternalLink className="w-5 h-5 mr-2" />
                                        Buy via Website
                                    </Button>
                                </motion.a>
                                <motion.a href="https://wa.me/62895403630048" target="_blank" whileHover={{ scale: 1.05 }}>
                                    <Button className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600">
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Buy via WhatsApp
                                    </Button>
                                </motion.a>
                            </div>
                        </CardContent>
                    </Card>

                    {/* IP List */}
                    <IPLicenseCard ips={registeredIPs} loading={loading} />

                    {/* Bug Report */}
                    <Card className="border-0 shadow-xl bg-gradient-to-r from-red-50 via-orange-50 to-pink-50">
                        <CardContent className="p-8">
                            <div className="text-center mb-6">
                                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-4">
                                    <Bug className="w-12 h-12 text-red-600" />
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-2">Ada Bug? Silahkan Chat Owner</h3>
                                <p className="text-gray-600">Support cepat via WhatsApp atau Telegram</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                                <motion.a href="https://wa.me/6287767867841" target="_blank" whileHover={{ scale: 1.05 }}>
                                    <Button className="w-full h-14 bg-green-600 hover:bg-green-700">
                                        <Send className="w-5 h-5 mr-2" />
                                        WhatsApp Support
                                    </Button>
                                </motion.a>
                                <motion.a href="https://t.me/ndradevid" target="_blank" whileHover={{ scale: 1.05 }}>
                                    <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700">
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Telegram Support
                                    </Button>
                                </motion.a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t mt-20 py-12 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                                <span className="text-xl font-bold">NdraDev</span>
                            </div>
                            <p className="text-gray-600 text-sm">Professional IP management solutions</p>
                        </div>
                        {[
                            { title: "Product", links: ["Features", "Pricing", "API", "Documentation"] },
                            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
                            { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
                        ].map((section) => (
                            <div key={section.title}>
                                <h4 className="font-semibold mb-4">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-t mt-8 pt-8 text-center text-gray-600 text-sm">
                        © 2026 NdraDev. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
