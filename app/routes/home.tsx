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
    Box,
    Layers,
    Settings,
    LifeBuoy,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
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
            <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        top: `${25 * i}%`,
                        left: `${25 * (i % 2) + 12}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 15 * (i % 2 === 0 ? 1 : -1), 0],
                    }}
                    transition={{ duration: 25 + i * 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img src="/cloud.png" alt="" className="w-32 h-32 md:w-40 md:h-40" />
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
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{label}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    {trend && (
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {trend} from last month
                        </p>
                    )}
                    <Progress value={75} className="mt-4" />
                </CardContent>
            </Card>
        </motion.div>
    );
}

function FeatureCard({ icon: Icon, title, description, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Card className="h-full">
                <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-sm">{description}</CardDescription>
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
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Server className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle>IP Server Terdaftar</CardTitle>
                            <CardDescription>{ips.length} server aktif</CardDescription>
                        </div>
                    </div>
                    {loading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
                </div>
            </CardHeader>
            <CardContent>
                {ips.length === 0 ? (
                    <div className="text-center py-8">
                        <Server className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">Belum ada IP terdaftar</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        {ips.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-accent/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-primary/10">
                                            <Server className="w-4 h-4 text-primary" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-mono text-sm font-medium">{maskIP(item.ip)}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(item.created_at).toLocaleDateString("id-ID")}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="gap-1">
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
                    <Button variant="outline" className="w-full" asChild>
                        <a href="/ip-server-terdaftar">
                            View All <ChevronRight className="w-4 h-4 ml-2" />
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

    // Auto-hide alert after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 3000);
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
        { icon: Shield, title: "Enterprise Security", desc: "Keamanan tingkat enterprise untuk data Anda" },
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

            {/* Alert Banner */}
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                    >
                        <div className="container mx-auto px-4 py-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                                        <Sparkles className="w-5 h-5" />
                                    </motion.div>
                                    <div>
                                        <p className="text-sm font-medium">Add Package System V5</p>
                                        <p className="text-xs text-muted-foreground">Platform manajemen IP profesional</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setShowAlert(false)} className="h-8">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${showAlert ? "mt-[52px]" : ""}`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        <motion.div className="flex items-center gap-4" whileHover={{ scale: 1.02 }}>
                            <div className="flex items-center gap-3">
                                <img src="/logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
                                <div className="hidden md:block">
                                    <span className="text-lg font-bold">NdraDev</span>
                                    <p className="text-xs text-muted-foreground">Enterprise Solutions</p>
                                </div>
                            </div>
                        </motion.div>

                        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-3">
                                        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                                        NdraDev
                                    </SheetTitle>
                                    <SheetDescription>
                                        Platform manajemen IP profesional
                                    </SheetDescription>
                                </SheetHeader>
                                <nav className="mt-8 space-y-1">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
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
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="hidden md:flex">
                                Sign In
                            </Button>
                            <Button size="sm">Get Started</Button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 relative z-10">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img src="/vector.png" alt="Vector" className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto object-contain" />
                        </motion.div>

                        <Badge variant="secondary" className="gap-2">
                            <Sparkles className="w-3 h-3" />
                            V5.0 Enterprise Edition
                        </Badge>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                            IP Management Platform
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Professional-grade infrastructure for IP registration and server management
                        </p>

                        <div className="flex flex-wrap justify-center gap-2">
                            {["IP Registration", "Server Management", "API Integration", "24/7 Support"].map((tag) => (
                                <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard icon={Server} label="Total Server Terdaftar" value={serverCount} trend="+12%" delay={0.1} />
                        <StatCard icon={Users} label="Active Users" value="500+" trend="+25%" delay={0.2} />
                        <StatCard icon={BarChart3} label="API Requests/Day" value="10K+" trend="+18%" delay={0.3} />
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map((feature, i) => (
                            <FeatureCard key={i} {...feature} delay={0.1 + i * 0.1} />
                        ))}
                    </div>

                    {/* Main Content Tabs */}
                    <Tabs defaultValue="register" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="register">Register IP</TabsTrigger>
                            <TabsTrigger value="download">Download</TabsTrigger>
                        </TabsList>

                        <TabsContent value="register">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Server className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle>Register IP Address</CardTitle>
                                            <CardDescription>Daftarkan IP server Anda untuk akses penuh</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {ipAlreadyRegistered ? (
                                        <Alert>
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <AlertTitle>IP Sudah Terdaftar</AlertTitle>
                                            <AlertDescription>
                                                IP address Anda sudah terdaftar. Tidak perlu daftarkan lagi. Selamat menikmati layanan kami!
                                            </AlertDescription>
                                        </Alert>
                                    ) : (
                                        <>
                                            <div className="space-y-2">
                                                <label htmlFor="ip-input" className="text-sm font-medium">
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
                                                />
                                            </div>
                                            <Button
                                                onClick={handleRegister}
                                                disabled={loading}
                                                className="w-full"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="w-4 h-4 mr-2" />
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
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Download className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle>Download Package</CardTitle>
                                            <CardDescription>Download enterprise package terbaru</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* CPanel License */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <ShoppingCart className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle>Buy CPanel License</CardTitle>
                                        <CardDescription>Rp15.000 - License Resmi</CardDescription>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <motion.a href="https://license.addpackage.dev" target="_blank" whileHover={{ scale: 1.02 }}>
                                    <Button className="w-full" variant="outline">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Buy via Website
                                    </Button>
                                </motion.a>
                                <motion.a href="https://wa.me/62895403630048" target="_blank" whileHover={{ scale: 1.02 }}>
                                    <Button className="w-full">
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Buy via WhatsApp
                                    </Button>
                                </motion.a>
                            </div>
                        </CardContent>
                    </Card>

                    {/* IP List */}
                    <IPListCard ips={registeredIPs} loading={loading} />

                    {/* Bug Report */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bug className="w-5 h-5" />
                                Ada Bug? Silahkan Chat Owner
                            </CardTitle>
                            <CardDescription>Support cepat via WhatsApp atau Telegram</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <motion.a href="https://wa.me/6287767867841" target="_blank" whileHover={{ scale: 1.02 }}>
                                    <Button className="w-full" variant="outline">
                                        <Send className="w-4 h-4 mr-2" />
                                        WhatsApp Support
                                    </Button>
                                </motion.a>
                                <motion.a href="https://t.me/ndradevid" target="_blank" whileHover={{ scale: 1.02 }}>
                                    <Button className="w-full" variant="outline">
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Telegram Support
                                    </Button>
                                </motion.a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t bg-muted/40 mt-20 py-12 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                                <span className="font-bold">NdraDev</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Professional IP management solutions
                            </p>
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
                    <Separator className="mt-8" />
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        © 2026 NdraDev. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
