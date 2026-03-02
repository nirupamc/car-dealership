"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Globe, Clock, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);

  useEffect(() => {
    // Fetch top 4 recent cars for featured section
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/cars", { cache: "no-store" });
        const data = await res.json();
        setFeaturedCars(data.slice(0, 4));
      } catch (err) {
        console.error("Failed to load featured cars", err);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section w/ Video */}
      <section className="relative h-[100dvh] min-h-[650px] w-full flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-at-night-1234-large.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-12 md:mt-20 pb-36 md:pb-0">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-white font-bold mb-6 drop-shadow-xl">
            THE ART OF <span className="text-primary italic">PRE-OWNED</span> EXCELLENCE
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            Discover a curated collection of world-class automotive masterpieces, engineered for the elite.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-black hover:bg-primary/90 rounded-none h-14 px-8 text-lg font-semibold glow-hover w-full sm:w-auto">
              <Link href="/showroom">VIEW SHOWROOM</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 rounded-none h-14 px-8 text-lg glass w-full sm:w-auto">
              <Link href="/sell">SELL YOUR MASTERPIECE</Link>
            </Button>
          </div>
        </div>

        {/* Floating Search Bar Teaser */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[92%] md:w-[90%] max-w-3xl glass p-5 md:p-6 rounded-xl flex flex-col md:flex-row gap-4 items-center z-50 shadow-2xl">
          <div className="flex-1 w-full flex flex-col">
            <span className="text-xs text-primary font-bold uppercase tracking-wider mb-1 drop-shadow-sm">Find Your Vehicle</span>
            <input type="text" placeholder="e.g. Porsche 911 GT3 RS" className="bg-transparent border-b border-gray-400 focus:border-primary outline-none text-white py-2 text-base md:text-lg w-full transition-colors" />
          </div>
          <Button className="w-full md:w-auto rounded-none bg-primary text-black glow-hover flex items-center justify-center gap-2 h-12 px-8 font-bold">
            SEARCH <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* 2. Featured Arrivals (Horizontal Scroll / Grid) */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Exclusive Fleet</h2>
              <h3 className="text-4xl md:text-5xl font-heading text-white">Featured Arrivals</h3>
            </div>
            <Link href="/showroom" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors border-b border-primary/30 pb-1">
              View All Inventory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => {
              const primaryImage = JSON.parse(car.imageUrls)[0] || '';
              return (
                <Card key={car.id} className="bg-card border-border overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img src={primaryImage} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded font-bold uppercase">
                      {car.year}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-gray-400 text-sm font-medium">{car.brand}</h4>
                        <h5 className="text-xl text-white font-heading font-semibold">{car.model}</h5>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6 text-sm text-gray-400">
                      <div className="flex justify-between"><span>Power:</span> <span className="text-white">{car.bhp} bhp</span></div>
                      <div className="flex justify-between"><span>Mileage:</span> <span className="text-white">{car.km.toLocaleString()} km</span></div>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <span className="text-2xl text-primary font-bold">${car.price.toLocaleString()}</span>
                      <Link href={`/cars/${car.id}`} className="text-white hover:text-primary transition-colors text-sm uppercase tracking-wider flex items-center gap-1 group-hover:underline cursor-pointer">
                        Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="text-primary border-primary w-full h-12 rounded-none glass">
              <Link href="/showroom">VIEW ALL INVENTORY <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us (Value Props) */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-heading text-white mb-16">The Apex Standard</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-primary mb-6 glow-hover">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">151-Point Certification</h3>
              <p className="text-gray-400 leading-relaxed max-w-sm">Every vehicle undergoes a rigorous, master-technician inspection to ensure uncompromising quality and performance.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-primary mb-6 glow-hover">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Sourcing</h3>
              <p className="text-gray-400 leading-relaxed max-w-sm">Can&apos;t find your dream car in our inventory? Our worldwide network grants us access to the rarest supercars on earth.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-primary mb-6 glow-hover">
                <Banknote className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bespoke Finance</h3>
              <p className="text-gray-400 leading-relaxed max-w-sm">Tailored financial packages with instant approvals, ensuring a seamless acquisition of your automotive investment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sell Your Masterpiece Teaser */}
      <section className="relative bg-background">
        {/* Mobile Image (top) */}
        <div className="w-full h-64 md:hidden">
          <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&h=800&fit=crop" alt="Sell background" className="w-full h-full object-cover" />
        </div>

        <div className="relative py-20 md:py-32 overflow-hidden">
          {/* Desktop Background Image (right half) */}
          <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&h=800&fit=crop" alt="Sell background" className="w-full h-full object-cover mask-image-gradient-l" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Acquisition Program</h2>
              <h3 className="text-4xl md:text-6xl font-heading text-white mb-6">Sell Your Masterpiece</h3>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                We are constantly seeking exceptional vehicles to join our collection. Experience a discreet, fluid, and highly competitive valuation process.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Submit Details</h4>
                    <p className="text-sm text-gray-400">Provide basic specifications and 3 photographs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Receive Firm Offer</h4>
                    <p className="text-sm text-gray-400">Our pricing engineers typically respond within 29 minutes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Instant Payment</h4>
                    <p className="text-sm text-gray-400">Secure transaction and complimentary vehicle collection.</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="bg-primary text-black hover:bg-primary/90 rounded-none h-14 px-8 text-lg font-semibold glow-hover w-full sm:w-auto">
                <Link href="/sell">START VALUATION <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
