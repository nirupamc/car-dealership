"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function Showroom() {
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch("/api/cars", { cache: "no-store" });
                const data = await res.json();
                setCars(data);
            } catch (err) {
                console.error("Failed to load cars", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    const handleLoadMore = () => {
        setLoadingMore(true);
        // Fake Infinite scroll delay
        setTimeout(() => {
            setPage(prev => prev + 1);
            setLoadingMore(false);
        }, 1000);
    };

    if (loading) return <div className="min-h-screen pt-32 pb-24 flex items-center justify-center text-primary">Loading inventory...</div>;

    // Fake pagination logic for MVP
    const visibleCars = cars.slice(0, page * 6);
    const hasMore = visibleCars.length < cars.length;

    return (
        <div className="pt-32 pb-24 bg-background min-h-screen">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-12 border-b border-border pb-8">
                    <h1 className="text-4xl md:text-5xl font-heading text-white mb-4">Inventory</h1>
                    <p className="text-gray-400">Showing {visibleCars.length} of {cars.length} engineered masterpieces.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="sticky top-32 glass p-6 rounded-xl">
                            <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg border-b border-border pb-4">
                                <SlidersHorizontal className="w-5 h-5 text-primary" /> Filters
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-3">Make</h4>
                                    <div className="space-y-3">
                                        {["Ferrari", "Lamborghini", "Porsche", "McLaren", "Aston Martin"].map(make => (
                                            <div key={make} className="flex items-center space-x-2">
                                                <Checkbox id={make} className="border-gray-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                                <label htmlFor={make} className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    {make}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <h4 className="text-sm font-semibold text-white mb-3">Price Range</h4>
                                    <div className="space-y-3">
                                        {["Under $300k", "$300k - $500k", "$500k - $1M", "Over $1M"].map(range => (
                                            <div key={range} className="flex items-center space-x-2">
                                                <Checkbox id={range} className="border-gray-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                                <label htmlFor={range} className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    {range}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleCars.map((car: any) => {
                                const primaryImage = JSON.parse(car.imageUrls)[0] || '';
                                return (
                                    <Card key={car.id} className="bg-card border-border overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                                        <div className="relative h-56 overflow-hidden">
                                            <img src={primaryImage} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded font-bold uppercase">
                                                {car.year}
                                            </div>
                                            {car.status !== "AVAILABLE" && (
                                                <div className="absolute top-4 left-4 bg-primary/90 text-black text-xs px-3 py-1 rounded font-bold uppercase">
                                                    {car.status}
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="p-5">
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider">{car.brand}</h4>
                                                <h5 className="text-lg text-white font-heading font-semibold truncate">{car.model}</h5>
                                            </div>
                                            <div className="space-y-1 mb-5 text-sm text-gray-400">
                                                <div className="flex justify-between"><span>Power:</span> <span className="text-white">{car.bhp} bhp</span></div>
                                                <div className="flex justify-between"><span>Mileage:</span> <span className="text-white">{car.km.toLocaleString()} km</span></div>
                                            </div>
                                            <div className="flex items-center justify-between border-t border-border pt-4">
                                                <span className="text-xl text-primary font-bold">${car.price.toLocaleString()}</span>
                                                <Link href={`/cars/${car.id}`} className="text-white hover:text-primary transition-colors text-xs uppercase tracking-wider flex items-center gap-1 group-hover:underline cursor-pointer">
                                                    Details <ArrowRight className="w-3 h-3" />
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>

                        {/* Infinite Scroll / Load More */}
                        {hasMore && (
                            <div className="mt-12 text-center">
                                <Button
                                    variant="outline"
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="text-primary border-primary w-full md:w-auto h-12 px-12 rounded-none glass glow-hover"
                                >
                                    {loadingMore ? "LOADING..." : "LOAD MORE VEHICLES"}
                                </Button>
                            </div>
                        )}
                        {!hasMore && cars.length > 0 && (
                            <div className="mt-12 text-center text-sm text-gray-500">
                                You have reached the end of our current inventory.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
