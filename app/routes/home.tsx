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
    Award,
    Activity,
    Cloud,
    Layers,
    Box,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { useToast } from "../hooks/use-toast";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Add Package System V5 - Professional IP Management" },
        { name: "description", content: "Professional IP registration and management system" },
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
            {/* Dark Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-slate-950 to-background" />
            
            {/* Animated Clouds - Dark Theme */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute opacity-[0.03]"
                    style={{
                        top: `${10 + i * 18}%`,
                        left: `${5 + i * 18}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 25 * (i % 2 === 0 ? 1 : -1), 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 25 + i * 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img src="/cloud.png" alt="" className="w-40 h-40 md:w-52 md:h-52" />
                </motion.div>
            ))}

            {/* Gradient Orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

function StatCard({ icon: Icon, label, value, trend, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
        >
            <Card className="relative overflow-hidden glass">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold mb-2">{value}</div>
                    {trend && (
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {trend} from last month
                        </p>
                    )}
                    <Progress value={75} className="mt-4 h-2" />
                </CardContent>
            </Card>
        </motion.div>
    );
}

function FeatureCard({ icon: Icon, title, description, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
        >
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 glass">
                <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-center text-sm text-muted-foreground">{description}</CardDescription>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function IPListCard({ ips, loading }: { ips: Array<{ id: number; ip: string; created_at: string }>, loading: boolean }) {
    const maskIP = (ip: string) => {
        const parts = ip.split(".");
        return parts.length === 4 ? `${parts[0]}.*.*.${parts[3]}` : ip;
    };

    return (
        <Card className="glass">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <Server className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">IP Server Terdaftar</CardTitle>
                            <CardDescription className="text-muted-foreground">{ips.length} server aktif</CardDescription>
                        </div>
                    </div>
                    {loading && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
                </div>
            </CardHeader>
            <CardContent>
                {ips.length === 0 ? (
                    <div className="text-center py-12">
                        <Server className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-base font-medium mb-1">Belum ada IP terdaftar</p>
                        <p className="text-sm text-muted-foreground">Jadilah yang pertama untuk mendaftarkan IP Anda</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {ips.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 transition-all duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-primary/10">
                                            <Server className="w-5 h-5 text-primary" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-mono text-base font-semibold">{maskIP(item.ip)}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(item.created_at).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="gap-1 px-3 py-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Active
                                </Badge>
                            </motion.div>
                        ))}
                    </div>
                )}
            </CardContent>
            {ips.length > 0 && (
                <CardFooter>
                    <Button variant="outline" className="w-full group border-border/50" asChild>
                        <a href="/ip-server-terdaftar">
                            View All Servers <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </CardFooter>
            )}
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

    useEffect(() => {
        const timer = setTimeout(() => setShowAlert(false), 3000);
        return () => clearTimeout(timer);
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
                toast({ title: "Berhasil!", description: "IP berhasil didaftarkan" });
                setIp("");
                setIpAlreadyRegistered(false);
                fetchServerStats();
            } else if (data.error?.includes("already registered")) {
                setIpAlreadyRegistered(true);
                toast({
                    title: "IP Sudah Terdaftar",
                    description: "Tidak perlu daftarkan lagi. Selamat menikmati layanan kami!",
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
        { icon: Shield, title: "Enterprise Security", desc: "Keamanan tingkat enterprise untuk melindungi data Anda" },
        { icon: Zap, title: "Lightning Fast", desc: "Performa tinggi dengan response time minimal" },
        { icon: Globe, title: "Global Access", desc: "Akses dari mana saja dengan infrastruktur global" },
        { icon: Award, title: "Industry Standard", desc: "Mengikuti standar industri terbaik" },
    ];

    const navItems = [
        { icon: Home, label: "Home", href: "/" },
        { icon: Package, label: "Packages", href: "/packages" },
        { icon: Server, label: "IP Server", href: "/ip-server-terdaftar" },
        { icon: FileText, label: "Artikel", href: "/artikel" },
        { icon: FileText, label: "API", href: "/documentation" },
    ];

    return (
        <div className="min-h-screen relative bg-background">
            <AnimatedBackground />

            {/* Alert Banner - Dark Theme */}
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass shadow-lg"
                    >
                        <div className="container mx-auto px-4 py-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </motion.div>
                                    <div>
                                        <p className="text-sm font-semibold">Add Package System V5</p>
                                        <p className="text-xs text-muted-foreground">Platform manajemen IP profesional</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setShowAlert(false)} className="h-8 text-muted-foreground hover:text-foreground hover:bg-accent">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header - Dark Theme */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`sticky top-0 z-40 border-b border-border/50 glass shadow-lg ${showAlert ? "mt-[52px]" : ""}`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
                            <div className="flex items-center gap-3">
                                <motion.img 
                                    src="/logo.png" 
                                    alt="Logo" 
                                    className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-lg"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                />
                                <div>
                                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">NdraDev</span>
                                    <p className="text-xs text-muted-foreground font-medium">Enterprise Solutions</p>
                                </div>
                            </div>
                        </motion.div>

                        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden text-muted-foreground hover:text-foreground">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 glass border-border/50">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-3">
                                        <img src="/logo.png" alt="Logo" className="w-12 h-12" />
                                        <div>
                                            <span className="block text-xl font-bold">NdraDev</span>
                                            <span className="text-xs text-muted-foreground">Enterprise Solutions</span>
                                        </div>
                                    </SheetTitle>
                                    <SheetDescription className="text-muted-foreground">
                                        Platform manajemen IP profesional
                                    </SheetDescription>
                                </SheetHeader>
                                <nav className="mt-8 space-y-1">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-colors"
                                        >
                                            <item.icon className="w-5 h-5 text-muted-foreground" />
                                            <span className="font-medium">{item.label}</span>
                                        </a>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <nav className="hidden lg:flex items-center gap-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </motion.header>

            {/* Main Content - Dark Theme */}
            <main className="container mx-auto px-4 py-12 relative z-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Hero Section with Vector Asset - Dark Theme */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
                            className="relative inline-block"
                        >
                            {/* Glow Effect - Dark */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
                            />
                            
                            {/* Vector Image */}
                            <motion.img 
                                src="/vector.png" 
                                alt="Hero" 
                                className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto object-contain drop-shadow-2xl"
                                animate={{ 
                                    y: [0, -15, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                                }}
                            />
                        </motion.div>

                        <Badge variant="secondary" className="gap-2 px-4 py-1.5 text-sm shadow-lg border-border/50">
                            <Sparkles className="w-3.5 h-3.5" />
                            V5.0 Enterprise Edition - Latest Release
                        </Badge>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                            IP Management
                            <br />
                            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Platform
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Professional-grade infrastructure for IP registration and server management with enterprise-level security
                        </p>

                        <div className="flex flex-wrap justify-center gap-2.5">
                            {["IP Registration", "Server Management", "API Integration", "24/7 Support"].map((tag) => (
                                <Badge key={tag} variant="outline" className="px-4 py-2 text-sm shadow-sm border-border/50">{tag}</Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats Section - Dark Theme */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard icon={Server} label="Total Server Terdaftar" value={serverCount} trend="+12%" delay={0.1} />
                        <StatCard icon={Users} label="Active Users" value="500+" trend="+25%" delay={0.2} />
                        <StatCard icon={BarChart3} label="API Requests/Day" value="10K+" trend="+18%" delay={0.3} />
                    </div>

                    {/* Features Section - Dark Theme */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <FeatureCard key={i} {...feature} delay={0.1 + i * 0.1} />
                        ))}
                    </div>

                    {/* Main Content Tabs - Dark Theme */}
                    <Tabs defaultValue="register" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 border border-border/50">
                            <TabsTrigger value="register" className="text-base py-3 data-[state=active]:bg-card">Register IP</TabsTrigger>
                            <TabsTrigger value="download" className="text-base py-3 data-[state=active]:bg-card">Download</TabsTrigger>
                        </TabsList>

                        <TabsContent value="register">
                            <Card className="border-2 border-border/50 glass">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-lg">
                                            <Server className="w-7 h-7 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl">Register IP Address</CardTitle>
                                            <CardDescription className="text-base text-muted-foreground">Daftarkan IP server Anda untuk akses penuh ke platform</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {ipAlreadyRegistered ? (
                                        <Alert className="border-green-800 bg-green-950/50 text-green-400">
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                            <AlertTitle className="text-base">IP Sudah Terdaftar</AlertTitle>
                                            <AlertDescription className="text-sm">
                                                IP address Anda sudah terdaftar. Tidak perlu daftarkan lagi. Selamat menikmati layanan kami!
                                            </AlertDescription>
                                        </Alert>
                                    ) : (
                                        <>
                                            <div className="space-y-2">
                                                <label htmlFor="ip-input" className="text-sm font-semibold">
                                                    IP Address
                                                </label>
                                                <Input
                                                    id="ip-input"
                                                    value={ip}
                                                    onChange={(e) => {
                                                        setIp(e.target.value);
                                                        setIpAlreadyRegistered(false);
                                                    }}
                                                    placeholder="192.168.1.1"
                                                    disabled={loading}
                                                    className="h-12 text-base bg-card/50 border-border/50"
                                                />
                                            </div>
                                            <Button
                                                onClick={handleRegister}
                                                disabled={loading}
                                                className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all bg-primary text-primary-foreground hover:bg-primary/90"
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
                            <Card className="border-2 border-border/50 glass">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center shadow-lg">
                                            <Download className="w-7 h-7 text-green-400" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl">Download Package</CardTitle>
                                            <CardDescription className="text-base text-muted-foreground">Download enterprise package versi terbaru</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
                                        <Download className="w-5 h-5 mr-2" />
                                        Download Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* CPanel License - Dark Theme */}
                    <Card className="border-2 border-primary/20 glass bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/30 to-red-500/10 flex items-center justify-center shadow-lg">
                                        <ShoppingCart className="w-7 h-7 text-orange-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl">Buy CPanel License</CardTitle>
                                        <CardDescription className="text-base font-semibold text-green-400">Rp15.000 - License Resmi</CardDescription>
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ rotate: [0, 15, -15, 0], y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                    className="hidden lg:block"
                                >
                                    <img src="/vector.png" alt="" className="w-24 h-24 object-contain" />
                                </motion.div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.a href="https://license.addpackage.dev" target="_blank" whileHover={{ scale: 1.03 }}>
                                    <Button className="w-full h-12 font-semibold shadow-lg border-border/50" variant="outline">
                                        <ExternalLink className="w-5 h-5 mr-2" />
                                        Buy via Website
                                    </Button>
                                </motion.a>
                                <motion.a href="https://wa.me/62895403630048" target="_blank" whileHover={{ scale: 1.03 }}>
                                    <Button className="w-full h-12 font-semibold shadow-lg bg-primary text-primary-foreground hover:bg-primary/90">
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Buy via WhatsApp
                                    </Button>
                                </motion.a>
                            </div>
                            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-4">
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle className="w-4 h-4 text-green-500" /> Aktivasi Instan
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle className="w-4 h-4 text-green-500" /> License Resmi
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle className="w-4 h-4 text-green-500" /> Support 24/7
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* IP List - Dark Theme */}
                    <IPListCard ips={registeredIPs} loading={loading} />

                    {/* Bug Report - Dark Theme */}
                    <Card className="border-2 border-orange-800/50 glass bg-gradient-to-br from-orange-950/30 via-red-950/30 to-pink-950/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <Bug className="w-6 h-6" />
                                </motion.div>
                                Ada Bug? Silahkan Chat Owner
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">Support cepat via WhatsApp atau Telegram</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                                <motion.a href="https://wa.me/6287767867841" target="_blank" whileHover={{ scale: 1.03 }}>
                                    <Button className="w-full h-12 font-semibold shadow-lg border-border/50" variant="outline">
                                        <Send className="w-5 h-5 mr-2" />
                                        WhatsApp Support
                                    </Button>
                                </motion.a>
                                <motion.a href="https://t.me/ndradevid" target="_blank" whileHover={{ scale: 1.03 }}>
                                    <Button className="w-full h-12 font-semibold shadow-lg border-border/50" variant="outline">
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Telegram Support
                                    </Button>
                                </motion.a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Footer - Dark Theme */}
            <footer className="border-t border-border/50 bg-muted/20 mt-20 py-12 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                                <span className="font-bold text-lg">NdraDev</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Professional IP management solutions
                            </p>
                            <div className="flex gap-3">
                                <a href="https://github.com/NdraDev" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <Box className="w-5 h-5" />
                                </a>
                                <a href="https://t.me/ndradevid" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <Send className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                        {[
                            { title: "Product", links: ["Features", "Pricing", "API", "Docs"] },
                            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
                            { title: "Legal", links: ["Privacy", "Terms", "Security"] },
                        ].map((section) => (
                            <div key={section.title}>
                                <h4 className="font-semibold mb-3 text-sm">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        © 2026 NdraDev. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
