"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, CarFront, Users, PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddEditCarForm } from "@/components/admin/AddEditCarForm";
import { toast } from "sonner";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<"inventory" | "leads">("inventory");
    const [cars, setCars] = useState<any[]>([]);
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<any>(null);

    // Auth protection fallback
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    const fetchData = async () => {
        if (status !== "authenticated") return;
        try {
            const [carsRes, leadsRes] = await Promise.all([
                fetch("/api/cars", { cache: "no-store" }),
                fetch("/api/leads", { cache: "no-store" })
            ]);
            if (carsRes.ok) setCars(await carsRes.json());
            if (leadsRes.ok) setLeads(await leadsRes.json());
        } catch (err) {
            console.error("Failed to load admin data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [status]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this vehicle?")) return;

        try {
            const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Delete failed");

            toast.success("Vehicle deleted successfully");
            fetchData(); // Refresh local list
            router.refresh(); // Refresh Next.js cache
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete vehicle");
        }
    };

    const handleEdit = (car: any) => {
        setEditingCar(car);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingCar(null);
        setIsFormOpen(true);
    };

    if (status === "loading" || loading) {
        return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-primary font-bold tracking-widest uppercase">Initializing Secure Container...</div>;
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">

            {/* Sidebar Nav */}
            <aside className="w-full md:w-64 bg-card border-r border-border md:min-h-screen flex flex-col">
                <div className="p-6 border-b border-border flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary text-black flex items-center justify-center font-bold">AV</div>
                    <span className="font-heading font-bold text-white tracking-widest uppercase">Admin</span>
                </div>

                <div className="flex-1 py-6 space-y-2 px-4">
                    <button
                        onClick={() => setActiveTab("inventory")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "inventory" ? "bg-primary text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                    >
                        <CarFront className="w-5 h-5" /> Inventory Management
                    </button>
                    <button
                        onClick={() => setActiveTab("leads")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "leads" ? "bg-primary text-black" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                    >
                        <div className="relative">
                            <Users className="w-5 h-5" />
                            {leads.filter(l => l.status === "NEW").length > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                            )}
                        </div>
                        Acquisition Leads
                    </button>
                </div>

                <div className="p-6 border-t border-border">
                    <div className="text-xs text-gray-500 mb-4 truncate">{session.user?.email}</div>
                    <Button variant="outline" onClick={() => signOut()} className="w-full justify-start text-gray-400 border-border hover:text-white hover:border-gray-500">
                        <LogOut className="w-4 h-4 mr-2" /> End Session
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-10 overflow-auto">

                {/* Inventory View */}
                {activeTab === "inventory" && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6">
                            <div>
                                <h1 className="text-3xl font-heading text-white mb-2">Fleet Management</h1>
                                <p className="text-gray-400">Total Active Units: {cars.length}</p>
                            </div>
                            <Button onClick={handleAdd} className="bg-primary text-black hover:bg-primary/90 rounded-none font-bold glow-hover">
                                <PlusCircle className="w-4 h-4 mr-2" /> ADD VEHICLE
                            </Button>
                        </div>

                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-400">
                                    <thead className="bg-white/5 text-gray-300 uppercase font-semibold text-xs tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Vehicle</th>
                                            <th className="px-6 py-4">Stock #</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Price</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {cars.map((car) => (
                                            <tr key={car.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-white">{car.brand} {car.model}</div>
                                                    <div className="text-xs">{car.year} | {car.km.toLocaleString()} km</div>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-xs">{car.id.substring(0, 8)}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${car.status === 'AVAILABLE' ? 'bg-green-500/10 text-green-500' : car.status === 'RESERVED' ? 'bg-orange-500/10 text-orange-500' : 'bg-gray-500/10 text-gray-500'}`}>
                                                        {car.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-primary font-medium">${car.price.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="sm" onClick={() => handleEdit(car)} className="text-gray-400 hover:text-white">Edit</Button>
                                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(car.id)} className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Modal renders over the dashboard */}
                        <AddEditCarForm
                            open={isFormOpen}
                            onOpenChange={setIsFormOpen}
                            carData={editingCar}
                            onSuccess={fetchData}
                        />
                    </div>
                )}

                {/* Leads View */}
                {activeTab === "leads" && (
                    <div className="space-y-6">
                        <div className="border-b border-border pb-6">
                            <h1 className="text-3xl font-heading text-white mb-2">Acquisition Inbox</h1>
                            <p className="text-gray-400">Pending seller appraisals: {leads.filter(l => l.status === "NEW").length}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {leads.length === 0 ? (
                                <div className="text-center py-12 text-gray-500 glass rounded-xl border-dashed border-2 border-border">
                                    No active leads at this time.
                                </div>
                            ) : (
                                leads.map(lead => (
                                    <div key={lead.id} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                {lead.status === "NEW" && <span className="bg-[#00F0FF]/20 text-[#00F0FF] text-[10px] uppercase font-bold px-2 py-0.5 rounded">Action Required</span>}
                                                <h3 className="text-lg font-bold text-white">{lead.year} {lead.make} {lead.model}</h3>
                                            </div>
                                            <div className="text-sm text-gray-400 space-y-1">
                                                <div><span className="text-gray-500">Owner:</span> {lead.contactName}</div>
                                                <div className="flex gap-4">
                                                    <span><span className="text-gray-500">E:</span> {lead.email}</span>
                                                    <span><span className="text-gray-500">P:</span> {lead.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 md:self-center">
                                            <Button variant="outline" className="text-primary border-primary hover:bg-primary/10 glass">
                                                View Details
                                            </Button>
                                            <Button className="bg-primary text-black hover:bg-primary/90 font-bold">
                                                Mark Contacted
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
