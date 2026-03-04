"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Car {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    bhp: number;
    km: number;
    imageUrls: string;
}

interface Props {
    cars: Car[];
}

export default function FeaturedCarousel({ cars }: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header fade-in
            gsap.fromTo(
                ".carousel-header",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Cards stagger from right
            const cards = trackRef.current?.querySelectorAll(".car-card");
            if (cards) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, x: 60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: trackRef.current,
                            start: "top 85%",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [cars]);

    return (
        <section ref={sectionRef} className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div
                    className="carousel-header flex justify-between items-end mb-12"
                    style={{ opacity: 0 }}
                >
                    <div>
                        <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
                            Exclusive Fleet
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-heading text-white">
                            Featured Arrivals
                        </h3>
                    </div>
                    <Link
                        href="/showroom"
                        className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors border-b border-primary/30 pb-1"
                    >
                        View All Inventory <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Horizontal scroll-snap track */}
                <div
                    ref={trackRef}
                    className="flex gap-6 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
                    style={{
                        scrollSnapType: "x mandatory",
                        scrollbarWidth: "none",
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    {cars.map((car) => {
                        const primaryImage = (() => {
                            try {
                                return JSON.parse(car.imageUrls)[0] || "";
                            } catch {
                                return "";
                            }
                        })();

                        return (
                            <div
                                key={car.id}
                                className="car-card flex-none w-[85vw] sm:w-[55vw] md:w-[40vw] lg:w-[320px] rounded-xl overflow-hidden border border-border/50 group relative"
                                style={{
                                    scrollSnapAlign: "start",
                                    background: "#0A0A0A",
                                    opacity: 0,
                                }}
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1.025,
                                        y: -6,
                                        duration: 0.35,
                                        ease: "power2.out",
                                    });
                                    const overlay = e.currentTarget.querySelector(
                                        ".specs-overlay"
                                    ) as HTMLElement;
                                    if (overlay)
                                        gsap.to(overlay, { opacity: 1, duration: 0.3 });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1,
                                        y: 0,
                                        duration: 0.35,
                                        ease: "power2.out",
                                    });
                                    const overlay = e.currentTarget.querySelector(
                                        ".specs-overlay"
                                    ) as HTMLElement;
                                    if (overlay)
                                        gsap.to(overlay, { opacity: 0, duration: 0.3 });
                                }}
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={primaryImage}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded font-bold uppercase">
                                        {car.year}
                                    </div>

                                    {/* Specs overlay (GSAP-controlled opacity) */}
                                    <div
                                        className="specs-overlay absolute inset-0 flex flex-col justify-end p-4"
                                        style={{
                                            opacity: 0,
                                            background:
                                                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
                                        }}
                                    >
                                        <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
                                            <div>
                                                <span className="text-primary/70 block uppercase tracking-wider text-[10px]">
                                                    Power
                                                </span>
                                                <span className="font-bold text-white">
                                                    {car.bhp} bhp
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-primary/70 block uppercase tracking-wider text-[10px]">
                                                    Mileage
                                                </span>
                                                <span className="font-bold text-white">
                                                    {car.km.toLocaleString()} km
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card body */}
                                <div className="p-5">
                                    <div className="mb-4">
                                        <p className="text-gray-400 text-sm">{car.brand}</p>
                                        <h4 className="text-xl text-white font-heading font-semibold">
                                            {car.model}
                                        </h4>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-border/50 pt-4">
                                        <span className="text-2xl text-primary font-bold">
                                            ${car.price.toLocaleString()}
                                        </span>
                                        <Link
                                            href={`/cars/${car.id}`}
                                            className="flex items-center gap-1 text-sm text-white hover:text-primary transition-colors uppercase tracking-wider"
                                        >
                                            Details <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/showroom"
                        className="flex items-center justify-center gap-2 text-primary border border-primary h-12 w-full text-sm uppercase tracking-wider font-semibold hover:bg-primary/10 transition-colors glass"
                    >
                        VIEW ALL INVENTORY <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
