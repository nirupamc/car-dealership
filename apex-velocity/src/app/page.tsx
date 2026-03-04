"use client";

import { useEffect, useState } from "react";
import AnimatedHero from "@/components/AnimatedHero";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import ApexStandardSection from "@/components/ApexStandardSection";
import SellTimeline from "@/components/SellTimeline";
import WhatsAppBubble from "@/components/WhatsAppBubble";

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/cars", { cache: "no-store" });
        const data = await res.json();
        setFeaturedCars(data.slice(0, 6));
      } catch (err) {
        console.error("Failed to load featured cars", err);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Animated Hero */}
      <AnimatedHero />

      {/* 2. Featured Arrivals Carousel */}
      <FeaturedCarousel cars={featuredCars} />

      {/* 3. The Apex Standard – animated cards */}
      <ApexStandardSection />

      {/* 4. Sell Your Masterpiece – timeline */}
      <SellTimeline />

      {/* Floating WhatsApp bubble */}
      <WhatsAppBubble />
    </div>
  );
}
