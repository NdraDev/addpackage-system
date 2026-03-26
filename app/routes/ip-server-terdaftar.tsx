import type { Route } from "./+types/ip-server-terdaftar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Server, Search, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "IP Server Terdaftar - Add Package System | Tools WHM cPanel" },
        { name: "description", content: "Daftar IP server yang terdaftar di Add Package System V5" },
    ];
}

export default function IPServerTerdaftar() {
    const [ips, setIps] = useState<Array<{ id: number; ip: string; created_at: string }>>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIPs();
    }, []);

    const fetchIPs = async () => {
        try {
            const response = await fetch("/api/ip/list");
            const data = await response.json();
            if (data.success) {
                setIps(data.data || []);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const maskIP = (ip: string) => {
        const parts = ip.split(".");
        return parts.length === 4 ? `${parts[0]}.*.*.${parts[3]}` : ip;
    };

    const filteredIPs = ips.filter((item) => item.ip.includes(search) || maskIP(item.ip).includes(search));

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <Badge className="mb-4" variant="outline"><Server className="w-3 h-3 mr-1" /> IP Server</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">IP Server Terdaftar</h1>
                    <p className="text-xl text-gray-600 mb-6">{ips.length} server aktif terdaftar</p>
                    
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input placeholder="Cari IP..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
                    </div>
                </motion.div>

                {loading ? (
                    <Card><CardContent className="p-6 text-center">Loading...</CardContent></Card>
                ) : filteredIPs.length === 0 ? (
                    <Card><CardContent className="p-6 text-center"><Server className="w-12 h-12 text-gray-400 mx-auto mb-3" /><p>Belum ada IP terdaftar</p></CardContent></Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredIPs.map((item, i) => (
                            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                                <Card className="border-l-4 border-l-blue-500">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 rounded-lg"><Server className="w-5 h-5 text-blue-600" /></div>
                                                <div>
                                                    <p className="font-mono font-semibold">{maskIP(item.ip)}</p>
                                                    <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(item.created_at).toLocaleDateString("id-ID")}</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
