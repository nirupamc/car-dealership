"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function WhatsAppBubble() {
    const [visible, setVisible] = useState(false);
    const bubbleRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (visible && bubbleRef.current) {
            gsap.fromTo(
                bubbleRef.current,
                { scale: 0, opacity: 0, y: 20 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                }
            );
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <a
            ref={bubbleRef}
            href="https://wa.me/YOUR_NUMBER"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-8 right-6 z-[999] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-transform hover:scale-110"
            style={{ background: "#25D366" }}
        >
            {/* WhatsApp SVG Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-7 h-7"
            >
                <path d="M12.001 2C6.477 2 2 6.477 2 12.001c0 1.779.468 3.448 1.285 4.896L2.05 21.949l5.162-1.213A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12.001 2zm0 18a7.96 7.96 0 0 1-4.062-1.109l-.29-.174-3.063.72.739-2.985-.19-.307A7.955 7.955 0 0 1 4 12c0-4.411 3.589-8 8.001-8C16.41 4 20 7.589 20 12s-3.589 8-7.999 8zm4.378-5.932c-.24-.12-1.42-.7-1.639-.78-.218-.078-.376-.12-.535.12-.158.24-.614.78-.752.938-.139.16-.278.178-.518.06-.24-.12-1.013-.374-1.93-1.19-.713-.636-1.195-1.42-1.334-1.66-.139-.24-.015-.37.104-.49.107-.107.24-.277.36-.416.12-.138.16-.238.24-.398.08-.158.04-.298-.02-.417-.06-.12-.535-1.29-.733-1.767-.194-.466-.39-.402-.535-.41l-.457-.008c-.16 0-.418.06-.637.298-.22.24-.837.817-.837 1.993 0 1.175.857 2.31.977 2.47.12.158 1.686 2.573 4.087 3.607.572.247 1.018.394 1.366.504.574.182 1.097.156 1.51.095.46-.068 1.42-.58 1.62-1.14.2-.558.2-1.037.14-1.137-.06-.1-.218-.16-.458-.28z" />
            </svg>
        </a>
    );
}
