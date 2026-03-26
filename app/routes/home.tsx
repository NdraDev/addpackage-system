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
    Activity,
    AlertCircle,
    Info,
    Clock,
    Award,
    TrendingUp,
    Target,
    ChevronRight,
    ArrowRight,
    Loader2,
    Building2,
    Users,
    BarChart3,
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
        { title: "Add Package System V5 - Enterprise IP Registration & Management Platform" },
        { name: "description", content: "Enterprise-grade IP registration and management system. Professional tools for hosting providers and server administrators with advanced automation." },
        { name: "keywords", content: "IP registration, server management, hosting automation, enterprise tools, cloud management, WHM cPanel, server administration" },
        { name: "author", content: "NdraDev Enterprise" },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://addpackage.dev" },
        { property: "og:title", content: "Add Package System V5 - Enterprise Platform" },
        { property: "og:description", content: "Professional IP registration and management system" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:title", content: "Add Package System V5" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

function AnimatedClouds() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${i % 2 === 0 ? "left" : "right"}-${(i * 10 + 10)} opacity-${15 - i * 2}`}
                    animate={{ 
                        x: [0, (i % 2 === 0 ? 1 : -1) * 40, 0], 
                        y: [0, -20 * (i % 3), 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 25 + i * 5, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
                >
                    <img src="/cloud.png" alt="Cloud" className={`w-${24 + i * 8} h-${24 + i * 8} md:w-${32 + i * 8} md:h-${32 + i * 8} object-contain`} />
                </motion.div>
            ))}
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
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">{item.label}</span>
                </motion.a>
            ))}
        </div>
    );
}

function StatCard({ icon: Icon, label, value, color, delay, description }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ scale: 1.03, y: -3 }}
        >
            <Card className="relative overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                            <motion.p 
                                className={`text-4xl font-bold ${color}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {value}
                            </motion.p>
                            {description && <p className="text-xs text-gray-400 mt-2">{description}</p>}
                        </div>
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${color.includes("blue") ? "from-blue-500 to-blue-600" : color.includes("green") ? "from-green-500 to-green-600" : "from-purple-500 to-purple-600"} shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                </CardContent>
            </Card>
        </motion.div>
    );
}

function IPList({ ips, onRegister }: { ips: Array<{ id: number; ip: string; created_at: string }>, onRegister: (ip: string) => void }) {
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
                <CardContent className="p-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <Server className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Belum ada server terdaftar</p>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Jadilah yang pertama untuk mendaftarkan IP Anda</p>
                    <Button onClick={() => onRegister("")} className="bg-gradient-to-r from-blue-600 to-purple-600">
                        Register IP Sekarang <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ips.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                >
                    <Card className="border-l-4 border-l-blue-600 border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-mono text-base font-semibold text-gray-800 dark:text-gray-200">
                                            {maskIP(item.ip)}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(item.created_at).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200">
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

export default function HomePage({ loaderData }: Route.ComponentProps) {
    const [ip, setIp] = useState("");
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [serverCount, setServerCount] = useState(0);
    const [registeredIPs, setRegisteredIPs] = useState<Array<{ id: number; ip: string; created_at: string }>>([]);
    const [showAlert, setShowAlert] = useState(true);
    const [isCheckingIP, setIsCheckingIP] = useState(false);
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
            console.error("Error fetching stats:", error);
        }
    };

    const checkIPExists = (ipToCheck: string): boolean => {
        return registeredIPs.some(item => item.ip === ipToCheck);
    };

    const validateIP = (ipString: string): boolean => {
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipRegex.test(ipString)) return false;
        const octets = ipString.split(".").map(Number);
        return octets.every((octet) => octet >= 0 && octet <= 255);
    };

    const handleRegister = async () => {
        if (!ip.trim()) {
            toast({ 
                variant: "destructive", 
                title: "Validasi Error", 
                description: "Masukkan IP address yang ingin didaftarkan" 
            });
            return;
        }
        if (!validateIP(ip.trim())) {
            toast({ 
                variant: "destructive", 
                title: "Format Invalid", 
                description: "Format IP tidak valid. Gunakan format: xxx.xxx.xxx.xxx" 
            });
            return;
        }

        setIsCheckingIP(true);
        try {
            const checkResponse = await fetch(`/api/ip/check/${encodeURIComponent(ip.trim())}`);
            const checkData = await checkResponse.json();
            
            if (checkData.registered) {
                setIpAlreadyRegistered(true);
                toast({
                    variant: "default",
                    title: "IP Sudah Terdaftar",
                    description: "IP address Anda sudah terdaftar di sistem. Tidak perlu daftarkan lagi. Selamat menikmati layanan kami!",
                    className: "bg-green-50 border-green-200 text-green-800",
                });
                return;
            }

            setIsCheckingIP(false);
            setLoading(true);

            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ip: ip.trim() }),
            });

            const data = await response.json();

            if (data.success) {
                toast({ 
                    variant: "success", 
                    title: "Berhasil!", 
                    description: "IP address berhasil didaftarkan ke sistem" 
                });
                setIp("");
                setIpAlreadyRegistered(false);
                fetchServerStats();
            } else {
                if (data.error && data.error.includes("already registered")) {
                    setIpAlreadyRegistered(true);
                    toast({
                        variant: "default",
                        title: "IP Sudah Terdaftar",
                        description: "IP address ini sudah terdaftar. Tidak perlu daftarkan lagi. Selamat menikmati layanan kami!",
                        className: "bg-green-50 border-green-200 text-green-800",
                    });
                } else {
                    toast({ 
                        variant: "destructive", 
                        title: "Gagal", 
                        description: data.error || "Gagal mendaftarkan IP" 
                    });
                }
            }
        } catch (error) {
            toast({ 
                variant: "destructive", 
                title: "Error", 
                description: "Terjadi kesalahan. Silakan coba lagi." 
            });
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
            setIsCheckingIP(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.5 }}
                        className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 text-white px-4 py-4 shadow-2xl"
                    >
                        <div className="container mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <motion.div 
                                    animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="p-2 bg-white/20 rounded-full"
                                >
                                    <Info className="w-6 h-6" />
                                </motion.div>
                                <div>
                                    <AlertTitle className="font-bold text-lg">Add Package System V5 - Enterprise Edition</AlertTitle>
                                    <AlertDescription className="text-sm opacity-90">
                                        Platform registrasi IP profesional untuk enterprise dan hosting provider
                                    </AlertDescription>
                                </div>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setShowAlert(false)} 
                                className="text-white hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatedClouds />

            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 sticky top-0 z-50 ${showAlert ? "mt-16" : ""}`}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div 
                            className="flex items-center gap-4" 
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img src="/logo.png" alt="NdraDev Logo" className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-lg" />
                            </motion.div>
                            <div>
                                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 bg-clip-text text-transparent">
                                    NdraDev
                                </span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                                    ENTERPRISE SOLUTIONS
                                </p>
                            </div>
                        </motion.div>

                        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 bg-white dark:bg-gray-900">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-3">
                                        <img src="/logo.png" alt="Logo" className="w-12 h-12" />
                                        <div>
                                            <span className="block text-xl font-bold">NdraDev</span>
                                            <span className="text-xs text-gray-500">Enterprise Solutions</span>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>
                                <NavigationMenu onClose={() => setSidebarOpen(false)} />
                            </SheetContent>
                        </Sheet>

                        <nav className="hidden lg:flex items-center gap-8">
                            {[
                                { icon: Home, label: "Home" },
                                { icon: Package, label: "Packages" },
                                { icon: Server, label: "IP Server" },
                                { icon: FileText, label: "Artikel" },
                                { icon: FileText, label: "API" },
                            ].map((item) => (
                                <motion.a 
                                    key={item.label} 
                                    href="#" 
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                                    whileHover={{ y: -2 }}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </motion.a>
                            ))}
                        </nav>
                    </div>
                </div>
            </motion.header>

            <main className="container mx-auto px-4 py-12 relative z-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Hero Section with SUPER LARGE Vector */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <motion.div 
                            initial={{ scale: 0, rotate: -180, opacity: 0 }} 
                            animate={{ scale: 1, rotate: 0, opacity: 1 }} 
                            transition={{ duration: 1.2, type: "spring", stiffness: 150, delay: 0.3 }}
                            className="mb-6"
                        >
                            <img 
                                src="/vector.png" 
                                alt="Vector" 
                                className="w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] mx-auto object-contain drop-shadow-2xl"
                            />
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Badge className="mb-6 px-4 py-2 text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200" variant="outline">
                                <Zap className="w-3 h-3 mr-2" /> 
                                V5.0 Enterprise Edition - Latest Release
                            </Badge>
                        </motion.div>

                        <motion.h1 
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                        >
                            Enterprise IP
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Management System
                            </span>
                        </motion.h1>

                        <motion.p 
                            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.9 }}
                        >
                            Professional-grade infrastructure for IP registration, server management, and hosting automation
                        </motion.p>

                        <motion.div 
                            className="flex flex-wrap justify-center gap-4 mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                        >
                            {[
                                { icon: Shield, text: "Enterprise Security" },
                                { icon: Zap, text: "Lightning Fast" },
                                { icon: Globe, text: "Global Infrastructure" },
                                { icon: Award, text: "Industry Standard" },
                            ].map((item, i) => (
                                <Badge key={i} variant="outline" className="px-4 py-2 text-sm">
                                    <item.icon className="w-3 h-3 mr-2" />
                                    {item.text}
                                </Badge>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Stats Section - ONLY Total Server Terdaftar */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mb-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard 
                                icon={Server} 
                                label="Total Server Terdaftar" 
                                value={loading ? <Loader2 className="w-8 h-8 animate-spin" /> : serverCount} 
                                color="text-blue-600" 
                                delay={0.6} 
                                description="IP addresses aktif dalam sistem" 
                            />
                            <StatCard 
                                icon={Building2} 
                                label="Enterprise Clients" 
                                value="500+" 
                                color="text-purple-600" 
                                delay={0.7} 
                                description="Perusahaan terpercaya" 
                            />
                            <StatCard 
                                icon={BarChart3} 
                                label="API Requests/Hari" 
                                value="10K+" 
                                color="text-green-600" 
                                delay={0.8} 
                                description="High performance" 
                            />
                        </div>
                    </motion.div>

                    {/* Register IP Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                    >
                        <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
                            <CardHeader className="pb-6">
                                <div className="flex items-center gap-4">
                                    <motion.div 
                                        className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Server className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <div>
                                        <CardTitle className="text-3xl font-bold">Register IP Address</CardTitle>
                                        <CardDescription className="text-base mt-1">
                                            Daftarkan IP server enterprise Anda untuk akses penuh ke platform
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {ipAlreadyRegistered ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl"
                                    >
                                        <div className="flex items-start gap-4">
                                            <CheckCircle className="w-8 h-8 text-green-600 mt-1" />
                                            <div>
                                                <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                                                    IP Sudah Terdaftar!
                                                </h4>
                                                <p className="text-green-700 dark:text-green-400">
                                                    IP address Anda sudah terdaftar di sistem. Tidak perlu daftarkan lagi. 
                                                    <strong> Selamat menikmati layanan kami!</strong>
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="space-y-3">
                                            <label htmlFor="ip-input" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                IP Address
                                            </label>
                                            <Input
                                                id="ip-input"
                                                type="text"
                                                value={ip}
                                                onChange={(e) => {
                                                    setIp(e.target.value);
                                                    setIpAlreadyRegistered(false);
                                                }}
                                                placeholder="contoh: 192.168.1.1"
                                                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-14 text-lg"
                                                disabled={loading || isCheckingIP}
                                            />
                                        </div>
                                        <Button
                                            onClick={handleRegister}
                                            disabled={loading || isCheckingIP}
                                            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-gradient hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] h-14"
                                        >
                                            {isCheckingIP ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                    Memeriksa IP...
                                                </>
                                            ) : loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                    Mendaftarkan...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-5 h-5 mr-2" />
                                                    Register IP Sekarang
                                                </>
                                            )}
                                        </Button>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Download Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                    >
                        <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900">
                            <CardHeader className="pb-6">
                                <div className="flex items-center gap-4">
                                    <motion.div 
                                        className="p-4 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl"
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Download className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <div>
                                        <CardTitle className="text-3xl font-bold">Download Package</CardTitle>
                                        <CardDescription className="text-base mt-1">
                                            Download enterprise package versi terbaru
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button 
                                    className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-[length:200%_auto] hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white font-bold py-6 text-lg shadow-2xl transition-all duration-300 hover:scale-[1.02] h-14"
                                    onClick={() => {
                                        toast({
                                            title: "Download Started",
                                            description: "Package sedang disiapkan...",
                                        });
                                    }}
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Download Enterprise Package
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* CPanel License */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                    >
                        <Card className="border-2 border-blue-200 dark:border-blue-800 shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
                            <CardHeader className="pb-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <motion.div 
                                            className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl"
                                            whileHover={{ scale: 1.1, rotate: 10 }}
                                        >
                                            <ShoppingCart className="w-8 h-8 text-white" />
                                        </motion.div>
                                        <div>
                                            <CardTitle className="text-3xl font-bold">Buy CPanel License</CardTitle>
                                            <CardDescription className="text-base mt-1">
                                                License Resmi - Rp15.000
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: [0, 15, -15, 0], y: [0, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                        className="hidden lg:block"
                                    >
                                        <img src="/vector.png" alt="Vector" className="w-24 h-24 object-contain" />
                                    </motion.div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <motion.a 
                                        href="https://license.addpackage.dev" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-6 text-lg shadow-xl h-14">
                                            <ExternalLink className="w-5 h-5 mr-2" />
                                            Buy via Website
                                        </Button>
                                    </motion.a>
                                    <motion.a 
                                        href="https://wa.me/62895403630048" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 text-lg shadow-xl h-14">
                                            <MessageCircle className="w-5 h-5 mr-2" />
                                            Buy via WhatsApp
                                        </Button>
                                    </motion.a>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-4">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>Aktivasi Instan</span>
                                    <span className="mx-2">•</span>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>License Resmi</span>
                                    <span className="mx-2">•</span>
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>Support 24/7</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* IP List */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.0 }}
                    >
                        <Card className="border-0 shadow-2xl overflow-hidden">
                            <CardHeader className="pb-6">
                                <div className="flex items-center gap-4">
                                    <motion.div 
                                        className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <Server className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <div>
                                        <CardTitle className="text-3xl font-bold">IP Server Terdaftar</CardTitle>
                                        <CardDescription className="text-base mt-1">
                                            {serverCount} server enterprise terdaftar di platform
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <IPList ips={registeredIPs} onRegister={() => {}} />
                                <Button variant="outline" className="w-full mt-6 h-12 text-base" asChild>
                                    <a href="/ip-server-terdaftar">
                                        Lihat Semua Server <ArrowRight className="w-4 h-4 ml-2" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Bug Report */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.1 }}
                    >
                        <Card className="border-0 shadow-2xl bg-gradient-to-r from-red-50 via-orange-50 to-red-50 dark:from-red-900/20 dark:via-orange-900/20 dark:to-red-900/20">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-center gap-3 mb-6">
                                    <motion.div 
                                        animate={{ rotate: [0, 15, -15, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    >
                                        <Bug className="w-8 h-8 text-red-600" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Ada Bug? Silahkan Chat Owner
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                                    <motion.a 
                                        href="https://wa.me/6287767867841" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 h-14 shadow-lg">
                                            <Send className="w-5 h-5 mr-2" />
                                            WhatsApp Support
                                        </Button>
                                    </motion.a>
                                    <motion.a 
                                        href="https://t.me/ndradevid" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 h-14 shadow-lg">
                                            <MessageCircle className="w-5 h-5 mr-2" />
                                            Telegram Support
                                        </Button>
                                    </motion.a>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>

            {/* Animated Background Orbs */}
            <motion.div
                className="fixed bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="fixed top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1.3, 1, 1.3], opacity: [0.6, 0.3, 0.6] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}
