import type { Route } from "./+types/ip-server-terdaftar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Server, Search, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "IP Server Terdaftar - WHM API Automation" },
        { name: "description", content: "List of registered IP servers in the WHM API automation system" },
    ];
}

export default function IPServerTerdaftar() {
    const [ips, setIps] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchIPs(); }, []);

    const fetchIPs = async () => {
        try {
            const res = await fetch("/api/ip/list");
            const data = await res.json();
            if (data.success) setIps(data.data || []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const maskIP = (ip: string) => {
        const parts = ip.split(".");
        return parts.length === 4 ? `${parts[0]}.*.*.${parts[3]}` : ip;
    };

    const filteredIPs = ips.filter((item) => item.ip.includes(search) || maskIP(item.ip).includes(search));

    return (
        <div className="min-h-screen bg-background pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <Badge variant="secondary" className="mb-4"><Server className="w-3 h-3 mr-1" /> IP Servers</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">IP Server Terdaftar</h1>
                    <p className="text-lg text-muted-foreground mb-6">{ips.length} servers registered</p>
                    
                    <div className="relative mb-6 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input placeholder="Search IP..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
                    </div>
                </motion.div>

                {loading ? (
                    <Card className="glass"><CardContent className="p-6 text-center">Loading...</CardContent></Card>
                ) : filteredIPs.length === 0 ? (
                    <Card className="glass"><CardContent className="p-6 text-center"><Server className="w-12 h-12 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground">No IPs found</p></CardContent></Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredIPs.map((item, i) => (
                            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}>
                                <Card className="glass border-l-4 border-l-primary">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-lg"><Server className="w-5 h-5 text-primary" /></div>
                                                <div>
                                                    <p className="font-mono text-sm font-semibold">{maskIP(item.ip)}</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(item.created_at).toLocaleDateString("id-ID")}</p>
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="text-xs"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Button variant="outline" asChild><a href="/">← Back to Home</a></Button>
                </div>
            </div>
        </div>
    );
}
