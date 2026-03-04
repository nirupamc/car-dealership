"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        });

        // ✅ Critical: tell GSAP ScrollTrigger about Lenis scroll position
        lenis.on("scroll", ScrollTrigger.update);

        // ✅ Plug Lenis into GSAP's ticker (clock) so they stay in sync
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // ✅ Disable GSAP's default lag smoothing to avoid jank
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
        };
    }, []);

    return <>{children}</>;
}
