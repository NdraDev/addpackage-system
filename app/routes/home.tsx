import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Server, Download, CheckCircle, Menu, X, Home, Package, FileText,
    Shield, Zap, Globe, ShoppingCart, MessageCircle, ExternalLink,
    Clock, Loader2, TrendingUp, Users, BarChart3, Sparkles, ChevronRight,
    Code, Database, Cloud, Settings, Send, Bug, Box,
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Skeleton } from "../components/ui/skeleton";
import { Spinner } from "../components/ui/spinner";
import { useToast } from "../hooks/use-toast";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "WHM API Automation - Add Package System V5 | Auto Create cPanel Accounts" },
        { name: "description", content: "Professional WHM API automation system for auto add package, create cPanel accounts, install LiteSpeed, SMTP integration. Script addpkg addpackage automation tools." },
        { name: "keywords", content: "whm api, addpackage, addpkg, addpack, script addpkg, auto install litespeed, whm api create account, smtp whm api, whm api automation, whmcpanel, cpanel automation, whm package creator, hosting automation" },
        { name: "author", content: "NdraDev" },
        { name: "robots", content: "index, follow" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://addpackage.dev" },
        { property: "og:title", content: "WHM API Automation - Add Package System V5" },
        { property: "og:description", content: "Automated WHM API system for package creation and account management" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:title", content: "WHM API Automation V5" },
        { property: "twitter:description", content: "Professional WHM automation tools" },
    ];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

function StatCard({ icon: Icon, label, value, trend, delay, loading }: any) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
            <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <Skeleton className="h-8 w-20 mb-2" />
                    ) : (
                        <div className="text-2xl font-bold">{value}</div>
                    )}
                    {trend && <p className="text-xs text-muted-foreground flex items-center mt-1"><TrendingUp className="h-3 w-3 mr-1" />{trend}</p>}
                    <Progress value={75} className="mt-3 h-1.5" />
                </CardContent>
            </Card>
        </motion.div>
    );
}

function FeatureCard({ icon: Icon, title, description }: any) {
    return (
        <Card className="glass hover:shadow-lg transition-all duration-300">
            <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
            </CardHeader>
        </Card>
    );
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
    const [ip, setIp] = useState("");
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [serverCount, setServerCount] = useState(0);
    const [registeredIPs, setRegisteredIPs] = useState<any[]>([]);
    const [statsLoading, setStatsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(true);
    const [ipRegistered, setIpRegistered] = useState(false);
    const { toast } = useToast();

    useEffect(() => { 
        fetchStats(); 
        const i = setInterval(fetchStats, 10000); 
        return () => clearInterval(i); 
    }, []);

    useEffect(() => { 
        const t = setTimeout(() => setShowAlert(false), 3000); 
        return () => clearTimeout(t); 
    }, []);

    const fetchStats = async () => {
        setStatsLoading(true);
        try {
            const res = await fetch("/api/ip/list");
            const data = await res.json();
            if (data.success) { 
                setServerCount(data.total || 0); 
                setRegisteredIPs(data.data || []); 
            }
        } catch (e) { console.error(e); }
        finally { setStatsLoading(false); }
    };

    const validateIP = (ip: string) => /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split(".").map(Number).every(n => n >= 0 && n <= 255);

    const handleRegister = async () => {
        if (!ip.trim()) { toast({ variant: "destructive", title: "Error", description: "Masukkan IP" }); return; }
        if (!validateIP(ip.trim())) { toast({ variant: "destructive", title: "Invalid", description: "Format IP salah" }); return; }
        
        try {
            const check = await fetch(`/api/ip/check/${encodeURIComponent(ip.trim())}`);
            const checkData = await check.json();
            if (checkData.registered) { 
                setIpRegistered(true); 
                toast({ title: "IP Terdaftar", description: "IP sudah terdaftar. Selamat menikmati!" }); 
                return; 
            }
            
            setLoading(true);
            const res = await fetch("/api/register", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify({ ip: ip.trim() }) 
            });
            const data = await res.json();
            if (data.success) { 
                toast({ title: "Berhasil!", description: "IP terdaftar" }); 
                setIp(""); 
                fetchStats(); 
            } else if (data.error?.includes("already")) { 
                setIpRegistered(true); 
                toast({ title: "IP Terdaftar", description: "IP sudah ada" }); 
            } else { 
                toast({ variant: "destructive", title: "Gagal", description: data.error }); 
            }
        } catch { 
            toast({ variant: "destructive", title: "Error", description: "Terjadi kesalahan" }); 
        } finally { 
            setLoading(false); 
        }
    };

    const features = [
        { icon: Code, title: "WHM API Integration", desc: "Full API integration untuk automation WHM/cPanel" },
        { icon: Database, title: "Auto Add Package", desc: "Script addpkg otomatis untuk create package" },
        { icon: Cloud, title: "LiteSpeed Install", desc: "Auto install LiteSpeed Enterprise via API" },
        { icon: Settings, title: "SMTP Integration", desc: "SMTP WHM API terintegrasi penuh" },
    ];

    const faqs = [
        { q: "Apa itu WHM API?", a: "WHM API adalah interface untuk automasi manajemen server WHM/cPanel termasuk create account, manage packages, dan konfigurasi server." },
        { q: "Bagaimana cara menggunakan script addpkg?", a: "Script addpkg dapat dijalankan via API untuk membuat package baru di WHM secara otomatis." },
        { q: "Apakah support LiteSpeed?", a: "Ya, sistem kami support auto installation LiteSpeed Enterprise melalui API." },
        { q: "Apakah ada SMTP integration?", a: "Ya, tersedia SMTP integration untuk pengiriman email otomatis dari WHM." },
    ];

    const navItems = [
        { icon: Home, label: "Home", href: "/" }, 
        { icon: Package, label: "Packages", href: "/packages" }, 
        { icon: Server, label: "IP Server", href: "/ip-server-terdaftar" }, 
        { icon: FileText, label: "API Docs", href: "/documentation" },
    ];

    return (
        <div className="min-h-screen bg-background relative">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-slate-950 to-background" />
                {[...Array(3)].map((_, i) => (
                    <motion.div key={i} className="absolute opacity-[0.02]" style={{ top: `${20 + i * 30}%`, left: `${15 + i * 25}%` }} animate={{ y: [0, -20, 0] }} transition={{ duration: 20 + i * 5, repeat: Infinity }}>
                        <img src="/cloud.png" alt="" className="w-32 h-32 md:w-40 md:h-40" />
                    </motion.div>
                ))}
            </div>

            {/* Alert */}
            <AnimatePresence>
                {showAlert && (
                    <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }} className="fixed top-0 left-0 right-0 z-50 border-b glass">
                        <div className="container mx-auto px-4 py-2.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}><Sparkles className="w-4 h-4 text-primary" /></motion.div>
                                    <div><p className="text-xs font-semibold">WHM API Automation V5</p><p className="text-[10px] text-muted-foreground">Auto Add Package & Account Creation</p></div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setShowAlert(false)} className="h-7 w-7 p-0"><X className="w-3.5 h-3.5" /></Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`sticky top-0 z-40 border-b glass ${showAlert ? "mt-[46px]" : ""}`}>
                <div className="container mx-auto px-4">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
                            <div className="hidden sm:block"><span className="text-base md:text-lg font-bold">NdraDev</span><p className="text-[10px] text-muted-foreground">WHM Automation</p></div>
                        </div>
                        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                            <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden"><Menu className="w-5 h-5" /></Button></SheetTrigger>
                            <SheetContent side="right" className="w-72 glass"><SheetHeader><SheetTitle className="flex items-center gap-2"><img src="/logo.png" alt="" className="w-8 h-8" />NdraDev</SheetTitle></SheetHeader><nav className="mt-6 space-y-1">{navItems.map(item => (<a key={item.label} href={item.href} onClick={() => setSidebarOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-accent text-sm"><item.icon className="w-4 h-4" />{item.label}</a>))}</nav></SheetContent>
                        </Sheet>
                        <nav className="hidden lg:flex items-center gap-5">{navItems.map(item => (<a key={item.label} href={item.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">{item.label}</a>))}</nav>
                    </div>
                </div>
            </motion.header>

            {/* Main */}
            <main className="container mx-auto px-4 py-10 relative z-10">
                <div className="max-w-6xl mx-auto space-y-10">
                    {/* Hero - SUPER LARGE VECTOR */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5 text-center">
                        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, type: "spring" }}>
                            <img src="/vector.png" alt="WHM Automation" className="w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] mx-auto object-contain" />
                        </motion.div>
                        <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs"><Sparkles className="w-3 h-3" />V5.0 - WHM API Automation</Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">WHM API <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Automation</span></h1>
                        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">Script addpkg addpackage untuk automasi WHM/cPanel - Auto create accounts, install LiteSpeed, SMTP integration</p>
                        <div className="flex flex-wrap justify-center gap-2">{["WHM API", "Add Package", "Auto Install", "SMTP API"].map(tag => (<Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>))}</div>
                    </motion.div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard icon={Server} label="Servers Registered" value={serverCount} trend="+12%" delay={0.1} loading={statsLoading} />
                        <StatCard icon={Users} label="Active Users" value="500+" trend="+25%" delay={0.2} loading={statsLoading} />
                        <StatCard icon={BarChart3} label="API Calls/Day" value="10K+" trend="+18%" delay={0.3} loading={statsLoading} />
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{features.map((f, i) => (<FeatureCard key={i} {...f} />))}</div>

                    {/* Tabs */}
                    <Tabs defaultValue="register" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50"><TabsTrigger value="register" className="text-sm py-2.5">Register IP</TabsTrigger><TabsTrigger value="download" className="text-sm py-2.5">Download</TabsTrigger></TabsList>
                        <TabsContent value="register">
                            <Card className="glass border-2">
                                <CardHeader><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center"><Server className="w-6 h-6 text-primary" /></div><div><CardTitle className="text-xl">Register IP</CardTitle><CardDescription>Daftarkan IP untuk akses WHM API</CardDescription></div></div></CardHeader>
                                <CardContent className="space-y-3">
                                    {ipRegistered ? (<Alert className="border-green-800 bg-green-950/50 text-green-400"><CheckCircle className="h-4 w-4 text-green-500" /><AlertTitle>IP Terdaftar</AlertTitle><AlertDescription>IP sudah terdaftar. Selamat menikmati!</AlertDescription></Alert>) : (<><div className="space-y-1.5"><label className="text-xs font-semibold">IP Address</label><Input value={ip} onChange={(e) => { setIp(e.target.value); setIpRegistered(false); }} placeholder="192.168.1.1" disabled={loading} className="h-10 text-sm bg-card/50 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all" /></div><Button onClick={handleRegister} disabled={loading} className="w-full h-10 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">{loading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Processing...</>) : (<><CheckCircle className="w-4 h-4 mr-2" />Register IP</>)}</Button></>)}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="download">
                            <Card className="glass border-2"><CardHeader><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center"><Download className="w-6 h-6 text-green-400" /></div><div><CardTitle className="text-xl">Download Package</CardTitle><CardDescription>Script automation terbaru</CardDescription></div></div></CardHeader><CardContent><Button className="w-full h-10 text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"><Download className="w-4 h-4 mr-2" />Download Now</Button></CardContent></Card>
                        </TabsContent>
                    </Tabs>

                    {/* CPanel License */}
                    <Card className="glass border-2 border-primary/20"><CardHeader><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center"><ShoppingCart className="w-6 h-6 text-orange-400" /></div><div><CardTitle className="text-xl">CPanel License</CardTitle><CardDescription className="text-green-400 font-semibold">Rp15.000</CardDescription></div></div></div></CardHeader><CardContent><div className="grid grid-cols-2 gap-3"><a href="https://license.addpackage.dev" target="_blank"><Button variant="outline" className="w-full h-10 text-xs border-border/50"><ExternalLink className="w-3.5 h-3.5 mr-1.5" />Website</Button></a><a href="https://wa.me/62895403630048" target="_blank"><Button className="w-full h-10 text-xs"><MessageCircle className="w-3.5 h-3.5 mr-1.5" />WhatsApp</Button></a></div></CardContent></Card>

                    {/* FAQ Accordion */}
                    <Card className="glass"><CardHeader><CardTitle className="text-lg">FAQ - WHM API</CardTitle><CardDescription>Pertanyaan umum tentang automation</CardDescription></CardHeader><CardContent><Accordion type="single" collapsible className="w-full">{faqs.map((faq, i) => (<AccordionItem key={i} value={`item-${i}`}><AccordionTrigger className="text-sm">{faq.q}</AccordionTrigger><AccordionContent className="text-sm">{faq.a}</AccordionContent></AccordionItem>))}</Accordion></CardContent></Card>

                    {/* IP List */}
                    <Card className="glass"><CardHeader><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center"><Server className="w-5 h-5 text-primary" /></div><div><CardTitle className="text-base">IP Registered</CardTitle><CardDescription className="text-xs">{registeredIPs.length} servers</CardDescription></div></div>{loading && <Spinner size="sm" />}</div></CardHeader><CardContent>{registeredIPs.length === 0 ? (<div className="text-center py-10"><Server className="w-12 h-12 text-muted-foreground mx-auto mb-3" /><p className="text-sm text-muted-foreground">Belum ada IP</p></div>) : (<div className="space-y-2 max-h-60 overflow-y-auto">{registeredIPs.map((item, i) => (<motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center justify-between p-3 rounded-md border bg-card/50"><div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10"><Server className="w-4 h-4" /></AvatarFallback></Avatar><div><p className="font-mono text-xs font-medium">{item.ip.split(".")[0] + ".*.*." + item.ip.split(".")[3]}</p><p className="text-[10px] text-muted-foreground">{new Date(item.created_at).toLocaleDateString("id-ID")}</p></div></div><Badge variant="secondary" className="text-[10px] px-2 py-0.5"><CheckCircle className="w-2.5 h-2.5 mr-1" />Active</Badge></motion.div>))}</div>)}{registeredIPs.length > 0 && (<CardFooter><Button variant="outline" className="w-full text-xs" asChild><a href="/ip-server-terdaftar">View All <ChevronRight className="w-3 h-3 ml-1" /></a></Button></CardFooter>)}</CardContent></Card>

                    {/* Bug Report */}
                    <Card className="glass border-orange-800/50"><CardHeader><CardTitle className="flex items-center gap-2 text-base"><Bug className="w-5 h-5" />Ada Bug? Chat Owner</CardTitle><CardDescription className="text-xs">Support via WhatsApp/Telegram</CardDescription></CardHeader><CardContent><div className="grid grid-cols-2 gap-3 max-w-xs mx-auto"><a href="https://wa.me/6287767867841" target="_blank"><Button variant="outline" className="w-full h-9 text-xs"><Send className="w-3.5 h-3.5 mr-1.5" />WhatsApp</Button></a><a href="https://t.me/ndradevid" target="_blank"><Button variant="outline" className="w-full h-9 text-xs"><MessageCircle className="w-3.5 h-3.5 mr-1.5" />Telegram</Button></a></div></CardContent></Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border/50 bg-gradient-to-b from-muted/20 to-background mt-16 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2.5 mb-4">
                                <motion.img src="/logo.png" alt="Logo" className="w-8 h-8" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} />
                                <div>
                                    <span className="font-bold text-base">NdraDev</span>
                                    <p className="text-[10px] text-muted-foreground">WHM API Automation</p>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">Professional WHM API automation system for hosting providers. Auto create packages, manage accounts, and streamline your workflow.</p>
                            <div className="flex gap-3">
                                <motion.a href="https://github.com/NdraDev" target="_blank" whileHover={{ y: -2 }} className="text-muted-foreground hover:text-foreground transition-colors"><Box className="w-5 h-5" /></motion.a>
                                <motion.a href="https://t.me/ndradevid" target="_blank" whileHover={{ y: -2 }} className="text-muted-foreground hover:text-foreground transition-colors"><Send className="w-5 h-5" /></motion.a>
                                <motion.a href="https://wa.me/62895403630048" target="_blank" whileHover={{ y: -2 }} className="text-muted-foreground hover:text-foreground transition-colors"><MessageCircle className="w-5 h-5" /></motion.a>
                            </div>
                        </div>
                        {[
                            { title: "Product", icon: Package, links: [{ l: "Features", h: "#" }, { l: "API Docs", h: "/documentation" }, { l: "Pricing", h: "/packages" }] },
                            { title: "Resources", icon: Database, links: [{ l: "Documentation", h: "/documentation" }, { l: "Tutorials", h: "/artikel" }, { l: "Support", h: "#" }] },
                            { title: "Company", icon: Cloud, links: [{ l: "About", h: "#" }, { l: "Contact", h: "#" }, { l: "Status", h: "#" }] },
                        ].map((section, i) => (
                            <div key={section.title}>
                                <div className="flex items-center gap-2 mb-3">
                                    <section.icon className="w-4 h-4 text-primary" />
                                    <h4 className="font-semibold text-xs">{section.title}</h4>
                                </div>
                                <ul className="space-y-2">{section.links.map((link, j) => (<li key={link.l}><a href={link.h} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"><ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{link.l}</a></li>))}</ul>
                            </div>
                        ))}
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-muted-foreground">© 2026 NdraDev. WHM API Automation. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
                            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
                            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
