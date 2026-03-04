"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, FileText, DollarSign, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        icon: FileText,
        title: "Submit Details",
        description: "Provide basic specifications and 3 photographs of your vehicle.",
    },
    {
        number: "02",
        icon: DollarSign,
        title: "Receive Firm Offer",
        description: "Our pricing engineers typically respond within 29 minutes.",
    },
    {
        number: "03",
        icon: Truck,
        title: "Instant Payment",
        description: "Secure transaction and complimentary vehicle collection.",
    },
];

export default function SellTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header fade-in
            gsap.fromTo(
                ".sell-header",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Timeline line draw
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.2,
                        ease: "power2.out",
                        transformOrigin: "left center",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                        },
                    }
                );
            }

            // Steps stagger from right
            stepsRef.current.forEach((step, i) => {
                if (!step) return;
                gsap.fromTo(
                    step,
                    { opacity: 0, x: 60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: i * 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                        },
                    }
                );
            });

            // Image parallax
            gsap.to(".sell-bg-img", {
                y: 60,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-background">
            {/* Mobile top image */}
            <div className="w-full h-64 md:hidden overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&h=800&fit=crop"
                    alt="Sell your car"
                    className="sell-bg-img w-full h-full object-cover"
                />
            </div>

            <div className="relative py-20 md:py-32 overflow-hidden">
                {/* Desktop right-side background */}
                <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full opacity-25 pointer-events-none overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&h=800&fit=crop"
                        alt="Sell background"
                        className="sell-bg-img w-full h-full object-cover"
                        style={{
                            maskImage: "linear-gradient(to right, transparent, black 60%)",
                            WebkitMaskImage:
                                "linear-gradient(to right, transparent, black 60%)",
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="w-full md:w-1/2 md:pr-8">
                        {/* Header */}
                        <div className="sell-header" style={{ opacity: 0 }}>
                            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
                                Acquisition Program
                            </h2>
                            <h3 className="text-4xl md:text-6xl font-heading text-white mb-6">
                                Sell Your Masterpiece
                            </h3>
                            <p className="text-lg text-gray-300 mb-12 leading-relaxed">
                                We are constantly seeking exceptional vehicles to join our
                                collection. Experience a discreet, fluid, and highly competitive
                                valuation process.
                            </p>
                        </div>

                        {/* Horizontal timeline on desktop, vertical on mobile */}
                        <div className="relative">
                            {/* Connecting line (desktop horizontal) */}
                            <div
                                ref={lineRef}
                                className="hidden md:block absolute top-10 left-0 right-0 h-[2px] origin-left"
                                style={{
                                    background:
                                        "linear-gradient(to right, #D4AF77, #D4AF7740)",
                                    transform: "scaleX(0)",
                                }}
                            />

                            <div className="flex flex-col md:flex-row gap-8 md:gap-0">
                                {steps.map((step, i) => {
                                    const Icon = step.icon;
                                    return (
                                        <div
                                            key={step.number}
                                            ref={(el) => {
                                                if (el) stepsRef.current[i] = el;
                                            }}
                                            className="flex md:flex-col items-start md:items-start gap-4 md:gap-0 md:flex-1 md:pr-6"
                                            style={{ opacity: 0 }}
                                        >
                                            {/* Connector dot + icon (desktop: stacked; mobile: inline) */}
                                            <div className="flex-shrink-0 flex flex-col md:flex-col items-center md:items-start">
                                                <div
                                                    className="w-12 h-12 md:mb-6 rounded-full flex items-center justify-center relative z-10"
                                                    style={{ background: "#1a1410", border: "2px solid #D4AF77" }}
                                                >
                                                    <Icon className="w-5 h-5 text-primary" />
                                                </div>
                                                {/* Mobile vertical connector */}
                                                {i < steps.length - 1 && (
                                                    <div className="md:hidden w-px h-8 bg-primary/30 ml-6 mt-2" />
                                                )}
                                            </div>

                                            <div className="md:pt-0 pt-1">
                                                <span className="text-primary/50 text-sm font-bold font-heading">
                                                    {step.number}
                                                </span>
                                                <h4 className="text-white font-bold text-lg mt-1 mb-1">
                                                    {step.title}
                                                </h4>
                                                <p className="text-sm text-gray-400 leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-10">
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary text-black hover:bg-primary/90 rounded-none h-14 px-8 text-lg font-semibold glow-hover w-full sm:w-auto"
                            >
                                <Link href="/sell">
                                    START VALUATION <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
