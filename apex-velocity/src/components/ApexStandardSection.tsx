"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Globe, Banknote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: ShieldCheck,
        title: "151-Point Certification",
        countTarget: 151,
        countSuffix: "-Point",
        description:
            "Every vehicle undergoes a rigorous, master-technician inspection to ensure uncompromising quality and performance.",
    },
    {
        icon: Globe,
        title: "Global Sourcing",
        countTarget: 80,
        countSuffix: "+ Countries",
        description:
            "Can't find your dream car in our inventory? Our worldwide network grants us access to the rarest supercars on earth.",
    },
    {
        icon: Banknote,
        title: "Bespoke Finance",
        countTarget: 29,
        countSuffix: "min Approval",
        description:
            "Tailored financial packages with instant approvals, ensuring a seamless acquisition of your automotive investment.",
    },
];

export default function ApexStandardSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const countersRef = useRef<HTMLSpanElement[]>([]);
    const iconsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section header fade-in
            gsap.fromTo(
                ".apex-header",
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

            // Cards stagger in
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: i * 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                    }
                );

                // Icon pulse on entry
                const icon = iconsRef.current[i];
                if (icon) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top 85%",
                        onEnter: () => {
                            gsap.fromTo(
                                icon,
                                { scale: 0.6, opacity: 0 },
                                {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 0.6,
                                    ease: "back.out(2)",
                                    delay: i * 0.15 + 0.3,
                                }
                            );
                        },
                    });
                }

                // Counter count-up
                const counter = countersRef.current[i];
                if (counter) {
                    const target = features[i].countTarget;
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top 85%",
                        onEnter: () => {
                            const proxy = { val: 0 };
                            gsap.to(proxy, {
                                val: target,
                                duration: 1.5,
                                ease: "power2.out",
                                delay: i * 0.15,
                                onUpdate: () => {
                                    counter.textContent = Math.round(proxy.val).toString();
                                },
                            });
                        },
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 border-y border-border"
            style={{ background: "#0A0A0A" }}
        >
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="apex-header" style={{ opacity: 0 }}>
                    <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">
                        Our Promise
                    </p>
                    <h2 className="text-3xl md:text-5xl font-heading text-white mb-16">
                        The Apex Standard
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feat, i) => {
                        const Icon = feat.icon;
                        return (
                            <div
                                key={feat.title}
                                ref={(el) => {
                                    if (el) cardsRef.current[i] = el;
                                }}
                                className="flex flex-col items-center p-8 rounded-xl border border-border/40 cursor-default group transition-all duration-300"
                                style={{
                                    opacity: 0,
                                    background: "#111111",
                                    boxShadow: "none",
                                }}
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, {
                                        y: -8,
                                        boxShadow: "0 0 30px 4px rgba(212, 175, 119, 0.18)",
                                        duration: 0.3,
                                        ease: "power2.out",
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, {
                                        y: 0,
                                        boxShadow: "none",
                                        duration: 0.3,
                                        ease: "power2.out",
                                    });
                                }}
                            >
                                <div
                                    ref={(el) => {
                                        if (el) iconsRef.current[i] = el;
                                    }}
                                    className="w-20 h-20 rounded-full glass flex items-center justify-center text-primary mb-6"
                                    style={{ opacity: 0 }}
                                >
                                    <Icon className="w-10 h-10" />
                                </div>

                                {/* Count-up stat */}
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span
                                        ref={(el) => {
                                            if (el) countersRef.current[i] = el;
                                        }}
                                        className="text-4xl font-bold text-primary font-heading"
                                    >
                                        0
                                    </span>
                                    <span className="text-sm text-primary/70">
                                        {feat.countSuffix}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">
                                    {feat.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed max-w-sm text-sm">
                                    {feat.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
