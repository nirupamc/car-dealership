"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ShieldCheck,
    FileSearch,
    Handshake,
    HeartPulse,
    Shield,
    Star,
    Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

const timelineItems = [
    {
        year: "2018",
        title: "The Foundation",
        desc: "Founded in Hyderabad by a collective of passionate collectors determined to redefine how exceptional vehicles change hands.",
        side: "right",
    },
    {
        year: "2020",
        title: "151-Point Certification",
        desc: "Introduced our rigorous 151-Point Apex Certification Program — setting a new industry standard for pre-owned luxury vehicles.",
        side: "left",
    },
    {
        year: "2022",
        title: "Global Network",
        desc: "Established an exclusive global sourcing network spanning Europe, the Middle East, and the Americas — securing off-market rarities.",
        side: "right",
    },
    {
        year: "2024",
        title: "500+ Deliveries & Certified Excellence",
        desc: "Delivered over 500 curated masterpieces with a 98% client satisfaction rate. Awarded Certified Excellence by the Global Auto Concierge Board.",
        side: "left",
    },
];

const ethosCards = [
    {
        icon: ShieldCheck,
        color: "#D4AF77",
        title: "Excellence Without Compromise",
        desc: "Every vehicle passes our strict 151-point inspection. We take zero shortcuts when it comes to mechanical and aesthetic perfection.",
    },
    {
        icon: FileSearch,
        color: "#00F0FF",
        title: "Transparency is Non-Negotiable",
        desc: "Full history reports, comprehensive VIN checks, and complete service records. Total clarity — no hidden faults, ever.",
    },
    {
        icon: Handshake,
        color: "#D4AF77",
        title: "Legacy Over Transaction",
        desc: "We build lifelong relationships with collectors, investing in your automotive journey far beyond the initial sale.",
    },
    {
        icon: HeartPulse,
        color: "#D4AF77",
        title: "Passion Drives Everything",
        desc: "Every car is hand-selected by genuine enthusiasts who understand the emotional resonance of modern masterpieces.",
    },
];

const teamMembers = [
    {
        name: "Olivia Reed",
        role: "Head of Acquisitions",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
        roleColor: "#D4AF77",
    },
    {
        name: "Marcus Thorne",
        role: "Chief Valuation Engineer",
        img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
        roleColor: "#00F0FF",
    },
    {
        name: "David Chen",
        role: "Global Sourcing Director",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
        roleColor: "#D4AF77",
    },
    {
        name: "Sarah Williams",
        role: "Client Experience Director",
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
        roleColor: "#D4AF77",
    },
];

const brands = ["FERRARI", "LAMBORGHINI", "PORSCHE", "McLAREN", "BUGATTI"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useSectionFade(ref: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!ref.current) return;
        const el = ref.current;
        gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                },
            }
        );
    }, [ref]);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    const heroRef = useRef<HTMLElement>(null);
    const heroH1Ref = useRef<HTMLHeadingElement>(null);
    const heroSubRef = useRef<HTMLParagraphElement>(null);
    const heroBtnsRef = useRef<HTMLDivElement>(null);
    const timelineSectionRef = useRef<HTMLElement>(null);
    const ethosSectionRef = useRef<HTMLElement>(null);
    const experienceSectionRef = useRef<HTMLElement>(null);
    const founderSectionRef = useRef<HTMLElement>(null);
    const brandsSectionRef = useRef<HTMLElement>(null);
    const ctaSectionRef = useRef<HTMLElement>(null);
    const timelineLineRef = useRef<HTMLDivElement>(null);

    useSectionFade(ethosSectionRef);
    useSectionFade(experienceSectionRef);
    useSectionFade(founderSectionRef);
    useSectionFade(brandsSectionRef);
    useSectionFade(ctaSectionRef);

    useEffect(() => {
        // ── Hero stagger ──
        const heroCtx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.fromTo(heroH1Ref.current, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1.1 })
                .fromTo(heroSubRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
                .fromTo(heroBtnsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");

            // Hero image parallax
            gsap.to(".about-hero-img", {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, heroRef);

        // ── Timeline vertical line draw ──
        if (timelineLineRef.current) {
            gsap.fromTo(
                timelineLineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 2,
                    ease: "power2.out",
                    transformOrigin: "top center",
                    scrollTrigger: {
                        trigger: timelineSectionRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        scrub: 0.5,
                    },
                }
            );
        }

        // ── Timeline item stagger ──
        const timelineItems = document.querySelectorAll(".timeline-item");
        timelineItems.forEach((item) => {
            const isLeft = item.classList.contains("item-left");
            gsap.fromTo(
                item,
                { opacity: 0, x: isLeft ? -80 : 80 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.85,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 82%",
                    },
                }
            );
        });

        return () => {
            heroCtx.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <main className="min-h-screen bg-background">

            {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
            <section
                ref={heroRef}
                id="hero"
                className="relative h-[100dvh] min-h-[700px] flex items-center justify-center overflow-hidden"
            >
                <img
                    src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2070&auto=format&fit=crop"
                    alt="Cinematic Supercar"
                    className="about-hero-img absolute inset-0 w-full h-full object-cover opacity-55 scale-110"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-background/50 to-background" />

                {/* ambient gold orb */}
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] opacity-15 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, #D4AF77, transparent)" }}
                />

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
                    <h1
                        ref={heroH1Ref}
                        className="text-5xl md:text-7xl lg:text-8xl font-heading text-white font-bold mb-6 drop-shadow-2xl leading-[1.1]"
                        style={{ opacity: 0 }}
                    >
                        We Don&apos;t Sell Cars.<br />
                        <span className="text-primary italic">We Curate Legacies.</span>
                    </h1>
                    <p
                        ref={heroSubRef}
                        className="text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed max-w-2xl mx-auto"
                        style={{ opacity: 0 }}
                    >
                        Shaping legacies since 2018. Redefining the luxury pre-owned experience
                        through unparalleled curation and concierge service.
                    </p>
                    <div
                        ref={heroBtnsRef}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        style={{ opacity: 0 }}
                    >
                        <Button
                            asChild
                            size="lg"
                            className="bg-primary text-black hover:bg-primary/90 rounded-none h-14 px-8 text-base font-bold glow-hover w-full sm:w-auto"
                        >
                            <a href="#journey">OUR STORY</a>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-primary text-primary hover:bg-primary/10 rounded-none h-14 px-8 text-base glass w-full sm:w-auto"
                        >
                            <a href="#team">MEET THE TEAM</a>
                        </Button>
                    </div>
                </div>

                {/* scroll cue */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                    <div className="w-px h-10 bg-primary/60" />
                </div>
            </section>

            {/* ── 2. Our Journey (Vertical Alternating Timeline) ──────────────────── */}
            <section
                ref={timelineSectionRef}
                id="journey"
                className="py-28 bg-background"
            >
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
                            Since 2018
                        </p>
                        <h2 className="text-4xl md:text-5xl font-heading text-white">
                            Our Journey
                        </h2>
                    </div>

                    {/* Vertical line + items */}
                    <div className="relative">
                        {/* Central gold line */}
                        <div
                            ref={timelineLineRef}
                            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top"
                            style={{ background: "linear-gradient(to bottom, #D4AF77, #D4AF7730)", scaleY: 0 } as React.CSSProperties}
                        />

                        <div className="space-y-20">
                            {timelineItems.map((item, i) => (
                                <div
                                    key={item.year}
                                    className={`timeline-item flex items-center gap-8 md:gap-16 ${item.side === "left"
                                        ? "item-left flex-row-reverse"
                                        : "flex-row"
                                        }`}
                                    style={{ opacity: 0 }}
                                >
                                    {/* Card */}
                                    <div className="flex-1">
                                        <div
                                            className="p-8 rounded-xl border border-border/40 hover:border-primary/40 transition-colors duration-300 group"
                                            style={{ background: "#0A0A0A" }}
                                            onMouseEnter={(e) => {
                                                gsap.to(e.currentTarget, {
                                                    y: -4,
                                                    boxShadow: "0 0 30px 4px rgba(212,175,119,0.12)",
                                                    duration: 0.3,
                                                });
                                            }}
                                            onMouseLeave={(e) => {
                                                gsap.to(e.currentTarget, {
                                                    y: 0,
                                                    boxShadow: "none",
                                                    duration: 0.3,
                                                });
                                            }}
                                        >
                                            <p className="text-4xl md:text-5xl font-heading text-primary font-bold mb-3">
                                                {item.year}
                                            </p>
                                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>

                                    {/* Dot on the line */}
                                    <div className="relative flex-none w-5 h-5 hidden md:flex">
                                        <div
                                            className="w-5 h-5 rounded-full border-2 border-primary bg-background z-10"
                                            style={{ boxShadow: "0 0 14px rgba(212,175,119,0.6)" }}
                                        />
                                    </div>

                                    {/* Spacer for the other side */}
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. The Apex Ethos (2×2 grid) ────────────────────────────────────── */}
            <section
                ref={ethosSectionRef}
                className="py-28 border-y border-border"
                style={{ background: "#0A0A0A", opacity: 0 }}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
                            Core Values
                        </p>
                        <h2 className="text-4xl md:text-5xl font-heading text-white">
                            The Apex Ethos
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ethosCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.title}
                                    className="p-8 rounded-xl border border-border/30 cursor-default group transition-all duration-300"
                                    style={{ background: "#111111" }}
                                    onMouseEnter={(e) => {
                                        gsap.to(e.currentTarget, {
                                            scale: 1.02,
                                            y: -4,
                                            boxShadow: `0 0 35px 6px rgba(212,175,119,0.13)`,
                                            duration: 0.3,
                                            ease: "power2.out",
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget, {
                                            scale: 1,
                                            y: 0,
                                            boxShadow: "none",
                                            duration: 0.3,
                                            ease: "power2.out",
                                        });
                                    }}
                                >
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                                        style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
                                    >
                                        <Icon className="w-7 h-7" style={{ color: card.color }} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed font-light">
                                        {card.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 4. The Apex Experience (two-column) ─────────────────────────────── */}
            <section
                ref={experienceSectionRef}
                className="py-28 bg-background overflow-hidden"
                style={{ opacity: 0 }}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left text */}
                        <div className="lg:w-1/2 space-y-8">
                            <div>
                                <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
                                    The Apex Experience
                                </p>
                                <h2 className="text-4xl md:text-5xl font-heading text-white leading-tight">
                                    Unrivaled White-Glove Experience
                                </h2>
                            </div>
                            <p className="text-lg text-gray-300 leading-relaxed font-light">
                                At Titan Motors, the acquisition of a vehicle transcends a transaction.
                                Our specialists accompany you through every step — from bespoke sourcing
                                to seamless handover — delivering a frictionless, white-glove service
                                unlike anything else in the market.
                            </p>

                            {/* Stat bar */}
                            <div className="flex gap-10 py-6 border-t border-border/40">
                                <div>
                                    <p className="text-4xl font-heading font-bold text-primary">98%</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Client Satisfaction</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-heading font-bold text-primary">29<span className="text-xl">min</span></p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Avg. Offer Response</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-heading font-bold text-primary">500+</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Deliveries</p>
                                </div>
                            </div>

                            {/* Founder quote */}
                            <blockquote className="border-l-2 border-primary/60 pl-6">
                                <p className="text-base text-gray-300 italic leading-relaxed font-light">
                                    &quot;No customer order will ever truly be routine for us — every acquisition
                                    is a privilege and a testimony to trust.&quot;
                                </p>
                                <p className="text-primary text-sm font-bold mt-3 uppercase tracking-wider">
                                    — Alexander Sterling, Founder
                                </p>
                            </blockquote>
                        </div>

                        {/* Right image */}
                        <div className="lg:w-1/2 relative group">
                            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                            <img
                                src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1200&auto=format&fit=crop"
                                alt="Luxury steering wheel interior"
                                className="relative z-10 w-full h-[520px] object-cover rounded-xl border border-white/10 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. Founder Spotlight + Team ─────────────────────────────────────── */}
            <section
                ref={founderSectionRef}
                id="team"
                className="py-28 border-y border-border"
                style={{ background: "#0A0A0A", opacity: 0 }}
            >
                <div className="max-w-7xl mx-auto px-6">
                    {/* Founder */}
                    <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                        {/* Circular photo */}
                        <div className="flex-none">
                            <div
                                className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/40 shadow-[0_0_40px_rgba(212,175,119,0.25)]"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
                                    alt="Alexander Sterling"
                                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div className="space-y-5 lg:pl-6">
                            <div>
                                <p className="text-sm font-bold text-primary uppercase tracking-widest mb-1">
                                    Founder &amp; CEO
                                </p>
                                <h2 className="text-4xl md:text-5xl font-heading text-white">
                                    Alexander Sterling
                                </h2>
                                <div className="w-16 h-[2px] bg-primary mt-4" />
                            </div>
                            <p className="text-lg text-gray-300 font-light leading-relaxed max-w-2xl">
                                With over a decade navigating the global exotic car market, Alexander
                                founded Titan Motors to create a sanctuary for automotive excellence —
                                a place where every vehicle has a story, and every client receives the
                                absolute pinnacle of service.
                            </p>
                            <blockquote className="border-l-2 border-primary/50 pl-6">
                                <p className="text-base text-gray-300 italic font-light leading-relaxed">
                                    &quot;I didn&apos;t want to create another dealership. I wanted to build
                                    a legacy — shaping history for the next generation of collectors.&quot;
                                </p>
                            </blockquote>
                        </div>
                    </div>

                    {/* Team Grid */}
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-heading text-white">Meet the Team</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member) => (
                            <div
                                key={member.name}
                                className="rounded-xl overflow-hidden border border-border/30 group hover:-translate-y-2 transition-transform duration-400 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,119,0.12)]"
                                style={{ background: "#111111" }}
                            >
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-5">
                                    <h4 className="text-lg font-bold text-white font-heading">{member.name}</h4>
                                    <p
                                        className="text-xs font-bold uppercase tracking-wider mt-1"
                                        style={{ color: member.roleColor }}
                                    >
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. Certified Masterpieces ────────────────────────────────────────── */}
            <section
                ref={brandsSectionRef}
                className="py-24 bg-background"
                style={{ opacity: 0 }}
            >
                <div className="max-w-5xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="flex justify-center mb-10">
                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-primary/40 relative"
                            style={{
                                background: "radial-gradient(circle at center, #D4AF7720, transparent)",
                                boxShadow: "0 0 30px rgba(212,175,119,0.2)",
                            }}
                        >
                            <Award className="w-10 h-10 text-primary" />
                            {/* Ring */}
                            <div className="absolute inset-[-8px] rounded-full border border-primary/20" />
                        </div>
                    </div>

                    <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
                        Apex Certified
                    </p>
                    <h2 className="text-4xl md:text-5xl font-heading text-white mb-6">
                        Certified Masterpieces
                    </h2>
                    <p className="text-base text-gray-400 font-light max-w-xl mx-auto mb-16 leading-relaxed">
                        Every vehicle undergoes our meticulous 151-point inspection. We curate
                        a network of the world&apos;s most coveted automotive brands.
                    </p>

                    {/* Brand names scroll */}
                    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
                        {brands.map((brand) => (
                            <span
                                key={brand}
                                className="text-xl md:text-2xl font-heading font-bold text-gray-500 hover:text-primary transition-colors duration-300 cursor-default tracking-widest"
                            >
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. Final CTA ─────────────────────────────────────────────────────── */}
            <section
                ref={ctaSectionRef}
                className="py-32 relative overflow-hidden border-t border-border"
                style={{ background: "#080808", opacity: 0 }}
            >
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, rgba(212,175,119,0.07) 0%, transparent 70%)",
                    }}
                />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <Star className="w-8 h-8 text-primary mx-auto mb-6 opacity-60" />
                    <h2 className="text-5xl md:text-6xl font-heading text-white mb-6 drop-shadow-lg leading-tight">
                        Ready to join the Titan Motors legacy?
                    </h2>
                    <p className="text-lg text-gray-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
                        Whether you&apos;re adding to your collection or parting with a treasured
                        masterpiece, our team stands ready to deliver perfection.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="bg-primary text-black hover:bg-primary/90 rounded-none h-14 px-10 text-lg font-bold glow-hover w-full sm:w-auto shadow-[0_0_20px_rgba(212,175,119,0.3)]"
                        >
                            <Link href="/showroom">
                                EXPLORE THE SHOWROOM <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-primary text-primary hover:bg-primary/10 rounded-none h-14 px-10 text-lg glass w-full sm:w-auto"
                        >
                            <Link href="/sell">SELL YOUR MASTERPIECE</Link>
                        </Button>
                    </div>
                </div>
            </section>

        </main>
    );
}
