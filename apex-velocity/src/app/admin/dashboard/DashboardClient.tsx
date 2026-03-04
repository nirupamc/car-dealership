"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, CarFront, Users, PlusCircle, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddEditCarForm } from "@/components/admin/AddEditCarForm";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

export default function DashboardClient({
    cars,
    leads,
    stats,
    bookings,
    sessionEmail,
}: {
    cars: any[];
    leads: any[];
    stats: any;
    bookings: any[];
    sessionEmail: string | null;
}) {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<"inventory" | "leads">("inventory");
    const [filterMode, setFilterMode] = useState<"All Vehicles" | "Active" | "Sold" | "Booked">("All Vehicles");

    // Modal state
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<any>(null);

    // Processing filter
    const filteredCars = cars.filter((car) => {
        if (filterMode === "Active") return car.status === "AVAILABLE";
        if (filterMode === "Sold") return car.status === "SOLD";
        if (filterMode === "Booked") return car.TestDriveBookings?.length > 0;
        return true; // "All Vehicles"
    });

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this vehicle?")) return;

        try {
            const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Delete failed");

            toast.success("Vehicle deleted successfully");
            router.refresh();
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

    const getNextBookingText = (carBookings: any[]) => {
        if (!carBookings || carBookings.length === 0) return "— No booking";
        // Assuming bookings are sorted or we just pick the first upcoming one
        const upcoming = carBookings.find(b => new Date(b.preferredDate) >= new Date());
        if (!upcoming) return "— No booking";
        return `${format(new Date(upcoming.preferredDate), "dd MMM yyyy")} • ${upcoming.name}`;
    };

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Sidebar Nav */}
            <aside className="w-full md:w-64 bg-card border-r border-border md:min-h-screen flex flex-col">
                <div className="p-6 border-b border-border flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary text-black flex items-center justify-center font-bold">AV</div>
                    <span className="font-heading font-bold text-white tracking-widest uppercase text-sm">Admin Terminal</span>
                </div>

                <div className="flex-1 py-6 space-y-2 px-4">
                    <button
                        onClick={() => setActiveTab("inventory")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "inventory" ? "bg-primary text-black font-bold" : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <CarFront className="w-5 h-5" /> Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab("leads")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "leads" ? "bg-primary text-black font-bold" : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <div className="relative">
                            <Users className="w-5 h-5" />
                            {leads.filter((l) => l.status === "NEW").length > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                            )}
                        </div>
                        Leads
                    </button>
                </div>

                <div className="p-6 border-t border-border">
                    <div className="text-xs text-gray-500 mb-4 truncate">{sessionEmail}</div>
                    <Button
                        variant="outline"
                        onClick={() => signOut()}
                        className="w-full justify-start text-gray-400 border-border hover:text-white hover:border-gray-500"
                    >
                        <LogOut className="w-4 h-4 mr-2" /> End Session
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-10 overflow-auto">
                {activeTab === "inventory" && (
                    <div className="space-y-6 max-w-7xl mx-auto">
                        {/* Top KPIs */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                            <div className="bg-[#1A1E2E] rounded-xl p-5 border border-border flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><CarFront className="w-5 h-5" /></div>
                                    <span className="text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">+{stats.totalVehiclesChange}%</span>
                                </div>
                                <div className="text-gray-400 text-sm font-medium mb-1">Total Vehicles</div>
                                <div className="text-3xl font-heading font-bold text-white">{stats.totalVehicles}</div>
                            </div>

                            <div className="bg-[#1A1E2E] rounded-xl p-5 border border-border flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><Users className="w-5 h-5" /></div>
                                    <span className="text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">+{stats.upcomingBookingsChange}%</span>
                                </div>
                                <div className="text-gray-400 text-sm font-medium mb-1">Upcoming Bookings (7 days)</div>
                                <div className="text-3xl font-heading font-bold text-white">{stats.upcomingBookings}</div>
                            </div>

                            <div className="bg-[#1A1E2E] rounded-xl p-5 border border-border flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><LayoutDashboard className="w-5 h-5" /></div>
                                    <span className="text-xs font-bold bg-red-500/20 text-red-400 px-2 py-1 rounded">{stats.avgDaysOnLotChange}%</span>
                                </div>
                                <div className="text-gray-400 text-sm font-medium mb-1">Avg. Days on Lot</div>
                                <div className="text-3xl font-heading font-bold text-white">{stats.avgDaysOnLot}</div>
                            </div>

                            <div className="bg-[#1A1E2E] rounded-xl p-5 border border-border flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary"><span className="font-bold font-serif">$</span></div>
                                </div>
                                <div className="text-gray-400 text-sm font-medium mb-1">Monthly Revenue</div>
                                <div className="text-3xl font-heading font-bold text-white">{stats.monthlyRevenue}</div>
                            </div>
                        </div>

                        {/* Header Area */}
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-1">Inventory Overview</h1>
                                <p className="text-sm text-gray-400">Real-time status of current showroom stock.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border pb-6">
                            <div className="flex p-1 bg-white/5 rounded-lg text-sm text-gray-400 font-medium">
                                {["All Vehicles", "Active", "Booked", "Sold"].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setFilterMode(filter as any)}
                                        className={`px-4 py-1.5 rounded-md transition-colors ${filterMode === filter ? "bg-white/10 text-white" : "hover:text-white"
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="border-border text-gray-300 bg-white/5 hover:bg-white/10 hidden md:flex items-center gap-2 h-9">
                                    <LayoutDashboard className="w-4 h-4" /> Filter
                                </Button>
                                <Button onClick={handleAdd} className="bg-primary text-black hover:bg-primary/90 h-9 font-bold">
                                    <PlusCircle className="w-4 h-4 mr-2" /> Add New Listing
                                </Button>
                            </div>
                        </div>

                        {/* Inventory Table */}
                        <div className="bg-[#1A1E2E] rounded-xl border border-border overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-400 whitespace-nowrap">
                                    <thead className="border-b border-white/5 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Photo</th>
                                            <th className="px-6 py-4 text-white">Vehicle Details</th>
                                            <th className="px-6 py-4">Stock Status</th>
                                            <th className="px-6 py-4">Next Booking</th>
                                            <th className="px-6 py-4">Lot Age</th>
                                            <th className="px-6 py-4">Price</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredCars.map((car) => {
                                            const primaryImage = car.imageUrls ? (JSON.parse(car.imageUrls)[0] || '') : '';
                                            return (
                                                <tr key={car.id} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="w-16 h-10 rounded overflow-hidden bg-background">
                                                            {primaryImage ? (
                                                                <img src={primaryImage} alt="Car" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full bg-white/10 rounded"></div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-white text-base">{car.year} {car.brand} {car.model}</div>
                                                        <div className="text-xs font-mono text-gray-500 mt-0.5">VIN: {car.id.substring(0, 10).toUpperCase()}...</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`w-2 h-2 rounded-full ${car.status === 'AVAILABLE' ? 'bg-green-500' : car.status === 'RESERVED' ? 'bg-orange-500' : 'bg-gray-500'
                                                                }`}></span>
                                                            <span className="text-white font-medium capitalize">{car.status.toLowerCase()}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {getNextBookingText(car.TestDriveBookings)}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-white">{car.daysOnLot} Days</td>
                                                    <td className="px-6 py-4 font-bold text-white">${car.price.toLocaleString()}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(car)} className="text-gray-400 hover:text-white h-8 w-8">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(car.id)} className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 ml-1">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {filteredCars.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                                    No vehicles found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-4 bg-[#141824] border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                                <div>Showing {filteredCars.length} of {cars.length} results</div>
                                <div className="flex gap-1">
                                    {/* Dummy pagination matching image */}
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 text-white bg-white/5">1</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:bg-white/5 transition-colors">2</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:bg-white/5 transition-colors">...</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:bg-white/5 transition-colors">12</button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

                            {/* Upcoming Test Drives */}
                            <div className="lg:col-span-2 bg-[#1A1E2E] rounded-xl border border-border p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-white">Upcoming Test Drives</h3>
                                    <button className="text-sm font-bold text-primary hover:underline">View All Bookings</button>
                                </div>

                                <div className="space-y-3">
                                    {bookings.map((booking) => (
                                        <div key={booking.id} className="bg-background/80 flex items-center justify-between p-4 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center border border-primary/30">
                                                    {booking.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-white font-bold">{booking.car?.brand} {booking.car?.model} <span className="text-gray-500 text-xs ml-1 font-normal">{booking.car?.year}</span></div>
                                                    <div className="flex gap-4 text-sm text-gray-400 mt-0.5">
                                                        <span>{booking.name}</span>
                                                        <span>{format(new Date(booking.preferredDate), "dd MMM, hh:mm a")}</span>
                                                        <span className={booking.status === 'Confirmed' ? 'text-green-400' : 'text-orange-400'}>{booking.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <a
                                                href={`https://wa.me/${booking.phone?.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(booking.name)},%20regarding%20your%20upcoming%20test%20drive%20for%20the%20${encodeURIComponent(booking.car?.brand + ' ' + booking.car?.model)}...`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="px-4 py-2 border border-white/10 rounded text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                                            >
                                                Contact
                                            </a>
                                        </div>
                                    ))}
                                    {bookings.length === 0 && (
                                        <div className="text-center py-6 text-gray-500">
                                            No upcoming bookings.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Insights (Matching left side of Stitch screenshot right panel) */}
                            <div className="bg-[#1A1E2E] rounded-xl border border-border p-6 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-6">Quick Insights</h3>

                                <div className="space-y-6 flex-1">
                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-400 tracking-wider mb-2">
                                            <span>STOCK UTILIZATION</span>
                                            <span>84%</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-primary h-1.5 rounded-full w-[84%]"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between text-xs font-bold text-gray-400 tracking-wider mb-2">
                                            <span>LEAD CONVERSION</span>
                                            <span>12%</span>
                                        </div>
                                        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-primary h-1.5 rounded-full w-[12%]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 bg-[#251D14] border-l-4 border-primary rounded-r-lg p-4 relative overflow-hidden">
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/20 opacity-50 pointer-events-none">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 2v4c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm3.66 4.34c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-2.83 2.83c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l2.83-2.83zM21 11h-4c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1zm-4.34-3.66l2.83-2.83c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l-2.83 2.83c-.39.39-1.02.39-1.41 0-.38-.38-.38-1.01 0-1.4z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-primary font-bold text-sm mb-1 uppercase tracking-wider relative z-10">PRO TIP</h4>
                                    <p className="text-gray-300 text-xs leading-relaxed relative z-10">Vantage point models are selling 24% faster this week. Consider prioritizing restock.</p>
                                </div>
                            </div>

                        </div>

                        {/* Modal overrides */}
                        <AddEditCarForm
                            open={isFormOpen}
                            onOpenChange={setIsFormOpen}
                            carData={editingCar}
                            onSuccess={() => router.refresh()}
                        />
                    </div>
                )}

                {/* Placeholder Leads View */}
                {activeTab === "leads" && (
                    <div className="flex flex-col items-center justify-center p-20 glass rounded-xl border border-border mt-10 text-center">
                        <Users className="w-16 h-16 text-primary mb-6" />
                        <h2 className="text-3xl font-heading text-white mb-4">Full Leads Table Coming Soon</h2>
                        <p className="text-gray-400 max-w-md">We are building an advanced CRM interface to manage your acquisition leads. Check back in the next update.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
