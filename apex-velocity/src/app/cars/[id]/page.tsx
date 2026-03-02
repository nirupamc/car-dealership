"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Calendar, ShieldCheck, Gauge, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VehicleDetail() {
    const { id } = useParams();
    const [car, setCar] = useState<any>(null);
    const [activeImage, setActiveImage] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await fetch(`/api/cars/${id}`);
                if (!res.ok) throw new Error("Car not found");
                const data = await res.json();
                const images = JSON.parse(data.imageUrls);
                data.imagesArray = images;
                setCar(data);
                setActiveImage(images[0] || "");
            } catch (err) {
                console.error("Failed to load car details", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchCar();
    }, [id]);

    if (loading) return <div className="min-h-screen pt-32 pb-24 flex items-center justify-center text-primary">Loading vehicle details...</div>;
    if (!car) return <div className="min-h-screen pt-32 pb-24 flex items-center justify-center text-white">Vehicle not found.</div>;

    const handleWhatsApp = () => {
        const message = `Hello Apex Velocity, I'm interested in the ${car.year} ${car.brand} ${car.model} mapped under ID #${car.id}.`;
        window.open(`https://wa.me/18001234567?text=${encodeURIComponent(message)}`, "_blank");
    };

    return (
        <div className="bg-background min-h-screen relative pb-24">

            {/* Top Banner & Breadcrumb */}
            <div className="pt-24 pb-6 border-b border-border">
                <div className="max-w-7xl mx-auto px-6 flex items-center gap-4 text-sm text-gray-400">
                    <Link href="/showroom" className="hover:text-primary transition-colors flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" /> Back to Inventory
                    </Link>
                    <span>/</span>
                    <span>{car.brand}</span>
                    <span>/</span>
                    <span className="text-white">{car.model}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column - Gallery */}
                    <div className="lg:col-span-8 space-y-4">
                        {/* Main Image */}
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden glass">
                            <img src={activeImage} alt={car.model} className="w-full h-full object-cover" />
                            {car.status !== "AVAILABLE" && (
                                <div className="absolute top-4 left-4 bg-primary text-black font-bold uppercase tracking-widest px-4 py-2 rounded">
                                    {car.status}
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {car.imagesArray.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary scale-[1.02]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Description Section */}
                        <div className="mt-12">
                            <h3 className="text-2xl font-heading text-white mb-6">Vehicle Overview</h3>
                            <p className="text-gray-400 leading-relaxed mb-6 whitespace-pre-wrap">
                                {car.description || "No description available yet."}
                            </p>

                            <div className="bg-card p-6 rounded-xl border border-border flex flex-col md:flex-row gap-6 mt-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 text-primary mb-2">
                                        <ShieldCheck className="w-6 h-6" />
                                        <span className="font-bold text-white uppercase tracking-wider text-sm">Certified Masterpiece</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Comprehensively inspected, verified history, and guaranteed pedigree.</p>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 text-primary mb-2">
                                        <Gauge className="w-6 h-6" />
                                        <span className="font-bold text-white uppercase tracking-wider text-sm">Track Ready</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Fresh fluids, optimized telemetry, and race-ready component validation.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Specs & Pricing */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 lg:h-max space-y-8">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h1 className="text-4xl font-heading text-white font-bold">{car.brand} <br /><span className="text-3xl font-normal text-gray-300">{car.model}</span></h1>
                                <button className="text-gray-500 hover:text-white transition-colors"><Share2 className="w-6 h-6" /></button>
                            </div>
                            <div className="text-sm text-gray-500 mb-6 uppercase tracking-widest">Stock #{car.id.substring(0, 8)}</div>

                            <div className="text-4xl text-primary font-bold tracking-tight mb-8">
                                ${car.price.toLocaleString()}
                            </div>

                            {/* Primary CTAs */}
                            <div className="flex flex-col gap-4">
                                <Button
                                    className="w-full h-14 bg-primary text-black hover:bg-primary/90 text-lg font-bold glow-hover rounded-none flex items-center justify-center gap-3"
                                    disabled={car.status === "SOLD"}
                                >
                                    <Calendar className="w-5 h-5" /> BOOK TEST DRIVE
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleWhatsApp}
                                    className="w-full h-14 border-primary text-white hover:bg-primary/10 rounded-none glass items-center justify-center gap-3"
                                >
                                    <MessageCircle className="w-5 h-5 text-green-500" /> WHATSAPP CONCIERGE
                                </Button>
                            </div>
                        </div>

                        <div className="border-t border-border pt-8 mt-8">
                            <h3 className="text-xl font-heading text-white mb-6 uppercase tracking-widest">Technical Specifications</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-border/50 pb-3">
                                    <span className="text-gray-500">Year</span>
                                    <span className="text-white font-semibold">{car.year}</span>
                                </div>
                                <div className="flex justify-between border-b border-border/50 pb-3">
                                    <span className="text-gray-500">Mileage</span>
                                    <span className="text-white font-semibold">{car.km.toLocaleString()} km</span>
                                </div>
                                <div className="flex justify-between border-b border-border/50 pb-3">
                                    <span className="text-gray-500">Engine</span>
                                    <span className="text-white font-semibold">{car.engine}</span>
                                </div>
                                <div className="flex justify-between border-b border-border/50 pb-3">
                                    <span className="text-gray-500">Power</span>
                                    <span className="text-white font-semibold">{car.bhp} BHP</span>
                                </div>
                                <div className="flex justify-between border-b border-border/50 pb-3">
                                    <span className="text-gray-500">Torque</span>
                                    <span className="text-white font-semibold">{car.torque} Nm</span>
                                </div>
                                <div className="flex justify-between border-b border-border/50 pb-3">
                                    <span className="text-gray-500">Transmission</span>
                                    <span className="text-white font-semibold">{car.transmission}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Sticky Mobile Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-primary/20 p-4 z-40 flex items-center justify-between gap-4">
                <div className="text-xl text-primary font-bold">
                    ${car.price.toLocaleString()}
                </div>
                <div className="flex gap-2">
                    <Button size="icon" onClick={handleWhatsApp} className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full">
                        <MessageCircle className="w-5 h-5" />
                    </Button>
                    <Button className="bg-primary text-black hover:bg-primary/90 rounded-none font-bold px-6">
                        RESERVE NOW
                    </Button>
                </div>
            </div>
        </div>
    );
}
