"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHero() {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctasRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap
                .timeline({ defaults: { ease: "power3.out" } })
                .fromTo(
                    headlineRef.current,
                    { opacity: 0, y: 80 },
                    { opacity: 1, y: 0, duration: 1.2 }
                )
                .fromTo(
                    subtitleRef.current,
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 1 },
                    "-=0.8"
                )
                .fromTo(
                    ctasRef.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.9 },
                    "-=0.6"
                )
                .fromTo(
                    searchRef.current,
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8 },
                    "-=0.5"
                );

            if (videoRef.current && containerRef.current) {
                gsap.to(videoRef.current, {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 0.5,
                    },
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="
        relative w-full
        pt-24
        md:pt-40
        min-h-[calc(100dvh-6rem)]
        md:min-h-[calc(100dvh-7rem)]
        flex items-center justify-center overflow-hidden bg-black
      "
        >
            {/* Video Background */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                src="https://www.pexels.com/download/video/5309381/"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.65] scale-105"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/60 to-[#121212]/90" />

            {/* Orbs */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle at 30% 30%, #D4AF77, transparent)" }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle at 70% 70%, #00F0FF, transparent)" }}
            />

            {/* Content */}
            <div
                ref={contentRef}
                className="relative z-20 text-center px-5 sm:px-8 md:px-12 max-w-5xl mx-auto flex flex-col items-center"
            >
                <h1
                    ref={headlineRef}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading text-white font-bold leading-tight mb-6 md:mb-8 drop-shadow-2xl"
                >
                    THE ART OF{" "}
                    <span className="text-[#D4AF77] italic">PRE-OWNED</span> EXCELLENCE
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-lg sm:text-xl md:text-2xl text-gray-200/90 mb-8 md:mb-10 max-w-3xl font-light leading-relaxed"
                >
                    Discover a curated collection of world-class automotive masterpieces, engineered for the elite.
                </p>

                <div
                    ref={ctasRef}
                    className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center mb-12 md:mb-16"
                >
                    <Button
                        asChild
                        size="lg"
                        className="min-w-[220px] h-14 px-10 text-lg font-semibold bg-[#D4AF77] text-black hover:bg-[#D4AF77]/90 rounded-full glow-hover transition-all"
                    >
                        <Link href="/showroom">VIEW SHOWROOM</Link>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="min-w-[220px] h-14 px-10 text-lg font-semibold border-[#D4AF77] text-[#D4AF77] hover:bg-[#D4AF77]/10 rounded-full glass transition-all"
                    >
                        <Link href="/sell">SELL YOUR MASTERPIECE</Link>
                    </Button>
                </div>

                {/* Search Bar */}
                <div
                    ref={searchRef}
                    className="glass w-full max-w-2xl mx-auto p-4 md:p-6 rounded-2xl shadow-2xl border border-white/5 backdrop-blur-xl"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="flex-1 w-full">
                            <span className="block text-xs uppercase tracking-widest text-[#D4AF77] font-bold mb-2">
                                Find Your Vehicle
                            </span>
                            <input
                                type="text"
                                placeholder="e.g. Porsche 911 GT3 RS"
                                className="w-full bg-transparent border-b border-white/30 focus:border-[#D4AF77] outline-none text-white py-3 text-base md:text-lg placeholder:text-gray-500 transition-colors"
                            />
                        </div>

                        <Button className="w-full sm:w-auto min-w-[140px] h-12 md:h-14 bg-[#D4AF77] text-black hover:bg-[#D4AF77]/90 rounded-full glow-hover font-bold text-base md:text-lg">
                            SEARCH <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}