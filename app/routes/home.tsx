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
        { title: "NdraDev - Add Package System V5 | Professional IP Registration" },
        { name: "description", content: "Add Package System V5 - Professional IP address registration, management tools, and CPanel license solutions by NdraDev." },
        { name: "keywords", content: "IP registration, package management, NdraDev, CPanel license, server tools" },
        { name: "author", content: "NdraDev" },
        { name: "robots", content: "index, follow" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://addpackage.dev" },
        { property: "og:title", content: "NdraDev - Add Package System V5" },
        { property: "og:description", content: "Professional IP address registration and management tools" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:title", content: "NdraDev - Add Package System V5" },
        { property: "twitter:description", content: "Professional IP address registration tools" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

function AnimatedClouds() {
    const clouds = [
        { top: "top-16", left: "left-8", size: "w-24 h-24 md:w-32 md:h-32", opacity: "opacity-15", delay: 0 },
        { top: "top-32", right: "right-8", size: "w-20 h-20 md:w-24 md:h-24", opacity: "opacity-12", delay: 2 },
        { top: "top-1/2", left: "left-4", size: "w-28 h-28 md:w-40 md:h-40", opacity: "opacity-10", delay: 1 },
        { top: "top-2/3", right: "right-12", size: "w-16 h-16 md:w-24 md:h-24", opacity: "opacity-15", delay: 3 },
        { top: "bottom-32", left: "left-1/4", size: "w-24 h-24 md:w-32 md:h-32", opacity: "opacity-10", delay: 4 },
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {clouds.map((cloud, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${cloud.top} ${cloud.left || ""} ${cloud.right || ""} ${cloud.opacity}`}
                    animate={{
                        x: [0, 30 * (index % 2 === 0 ? 1 : -1), 0],
                        y: [0, -15 * (index % 3), 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 15 + index * 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: cloud.delay,
                    }}
                >
                    <Cloud className={`${cloud.size} text-blue-300 dark:text-blue-400`} />
                </motion.div>
            ))}
        </div>
    );
}

function NavigationMenu({ onClose }: { onClose?: () => void }) {
    const navItems = [
        { icon: Home, label: "Home", href: "#" },
        { icon: Package, label: "Packages", href: "#packages" },
        { icon: Server, label: "IP Server Terdaftar", href: "#ip-list" },
        { icon: FileText, label: "Artikel", href: "#artikel" },
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

function StatCard({ icon: Icon, label, value, color, delay }: { icon: any, label: string, value: string | number, color: string, delay: number }) {
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
                        </div>
                        <div className={`p-3 md:p-4 rounded-xl bg-gradient-to-br ${color.includes("blue") ? "from-blue-500 to-blue-600" : color.includes("green") ? "from-green-500 to-green-600" : "from-purple-500 to-purple-600"}`}>
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                    </div>
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
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
                                <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200">
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
                description: "Silakan masukkan alamat IP",
            });
            return;
        }

        if (!validateIP(ip.trim())) {
            toast({
                variant: "destructive",
                title: "Format IP Tidak Valid",
                description: "Masukkan format IP yang benar (contoh: 192.168.1.1)",
            });
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
                toast({
                    variant: "success",
                    title: "Berhasil!",
                    description: "IP address berhasil didaftarkan",
                });
                setIp("");
                fetchServerStats();
            } else {
                toast({
                    variant: "destructive",
                    title: "Registrasi Gagal",
                    description: data.error || "Gagal mendaftarkan IP",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Terjadi kesalahan. Silakan coba lagi.",
            });
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        toast({
            variant: "default",
            title: "Download Dimulai",
            description: "Package sedang disiapkan...",
        });
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
                        <div className="container mx-auto flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-1">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <Info className="w-5 h-5 flex-shrink-0" />
                                </motion.div>
                                <AlertDescription className="text-sm flex-1">
                                    <span className="font-semibold">Selamat Datang di Add Package System V5!</span> - Platform registrasi IP profesional
                                </AlertDescription>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAlert(false)}
                                className="text-white hover:bg-white/20 flex-shrink-0"
                            >
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
                transition={{ duration: 0.5 }}
                className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 sticky top-0 z-50 ${showAlert ? "mt-12" : ""}`}
            >
                <div className="container mx-auto px-4 py-3 md:py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center gap-2 md:gap-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <img src="/logo.png" alt="NdraDev Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                            <div className="hidden md:block">
                                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    NdraDev
                                </span>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Add Package System
                                </p>
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
                                        <img src="/logo.png" alt="NdraDev Logo" className="w-10 h-10" />
                                        <div>
                                            <span className="block">NdraDev</span>
                                            <span className="text-xs font-normal text-gray-500">Add Package System</span>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="mt-8">
                                    <NavigationMenu onClose={() => setSidebarOpen(false)} />
                                </div>
                            </SheetContent>
                        </Sheet>

                        <nav className="hidden lg:flex items-center gap-6">
                            {[
                                { icon: Home, label: "Home" },
                                { icon: Package, label: "Packages" },
                                { icon: Server, label: "IP Server Terdaftar" },
                                { icon: FileText, label: "Artikel" },
                            ].map((item) => (
                                <motion.a
                                    key={item.label}
                                    href="#"
                                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium"
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

            <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">
                <div className="max-w-6xl mx-auto space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            className="mb-4"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                        >
                            <img src="/vector.png" alt="Vector" className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto object-contain drop-shadow-2xl" />
                        </motion.div>

                        <motion.div
                            className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap className="w-4 h-4" />
                            <span className="font-semibold text-sm">V5.0 Latest Release</span>
                        </motion.div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            TOOLS Add{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Package
                            </span>
                        </h1>
                        <p className="text-base md:text-xl text-gray-600 dark:text-gray-300">
                            Professional IP Address Registration System
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard
                            icon={Server}
                            label="Total Server Terdaftar"
                            value={serverCount}
                            color="text-blue-600"
                            delay={0.3}
                        />
                        <StatCard
                            icon={Shield}
                            label="Server Aktif"
                            value={serverCount}
                            color="text-green-600"
                            delay={0.4}
                        />
                        <StatCard
                            icon={Activity}
                            label="Uptime"
                            value="99.9%"
                            color="text-purple-600"
                            delay={0.5}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Card className="mb-6 border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                        <Server className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Register IP Address</CardTitle>
                                        <CardDescription>
                                            Masukkan IP address Anda untuk mendaftar dalam sistem
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="ip-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        IP Address
                                    </label>
                                    <Input
                                        id="ip-input"
                                        type="text"
                                        value={ip}
                                        onChange={(e) => setIp(e.target.value)}
                                        placeholder="contoh: 192.168.1.1"
                                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                        disabled={loading}
                                    />
                                </div>
                                <Button
                                    onClick={handleRegister}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                                >
                                    {loading ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            Mendaftarkan...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            Register IP
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mb-6"
                    >
                        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                                        <Download className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Download Package</CardTitle>
                                        <CardDescription>
                                            Download versi package terbaru
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={handleDownload}
                                    variant="default"
                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Now
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mb-6"
                    >
                        <Card className="border-2 border-blue-200 dark:border-blue-800 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 backdrop-blur-lg overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                                            <ShoppingCart className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl">Buy CPanel License</CardTitle>
                                            <CardDescription className="text-lg">
                                                CPanel License Resmi - Rp15.000
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                        className="hidden md:block"
                                    >
                                        <img src="/vector.png" alt="Vector" className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-xl" />
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
                                        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300">
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
                                        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300">
                                            <MessageCircle className="w-5 h-5 mr-2" />
                                            Buy via WhatsApp
                                        </Button>
                                    </motion.a>
                                </div>
                                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                    <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />
                                    Aktivasi Instan - License Resmi - Support 24/7
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="mb-6"
                    >
                        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg overflow-hidden">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                                        <Server className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">IP Server Terdaftar</CardTitle>
                                        <CardDescription>
                                            Daftar server yang telah terdaftar ({serverCount} server)
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <IPList ips={registeredIPs} />
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center mt-8 space-y-2"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {loaderData.message}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                            <Shield className="w-3 h-3" />
                            <span>Secured by NdraDev</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="mt-12"
                    >
                        <Card className="border-0 shadow-xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                    >
                                        <Bug className="w-6 h-6 text-red-600" />
                                    </motion.div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                        Ada Bug? Silahkan Chat Owner
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                                    <motion.a
                                        href="https://wa.me/6287767867841"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Send className="w-4 h-4" />
                                        WhatsApp
                                    </motion.a>
                                    <motion.a
                                        href="https://t.me/ndradevid"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Telegram
                                    </motion.a>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>

            <motion.div
                className="fixed bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="fixed top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}
