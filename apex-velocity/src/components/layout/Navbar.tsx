"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Hide on admin routes
    if (pathname.startsWith("/admin")) return null;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "glass py-4 shadow-lg" : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded bg-primary text-black flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-105">
                            AV
                        </div>
                        <span className="font-heading text-2xl font-bold tracking-wider text-white">
                            <span className="text-primary">APEX</span> VELOCITY
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/showroom" className="text-sm font-medium tracking-wide text-gray-300 hover:text-primary transition-colors">
                            INVENTORY
                        </Link>
                        <Link href="/sell" className="text-sm font-medium tracking-wide text-gray-300 hover:text-primary transition-colors">
                            SELL YOUR MASTERPIECE
                        </Link>
                        <Link href="/" className="text-sm font-medium tracking-wide text-gray-300 hover:text-primary transition-colors">
                            FINANCE
                        </Link>
                        <Link href="/" className="text-sm font-medium tracking-wide text-gray-300 hover:text-primary transition-colors">
                            SOURCING
                        </Link>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-white hover:text-primary transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <Button asChild className="bg-primary text-black hover:bg-primary/90 rounded-none font-semibold px-6 glow-hover">
                            <Link href="/showroom">VIEW INVENTORY</Link>
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 pb-8 px-6 flex flex-col md:hidden">
                    <div className="flex flex-col space-y-6">
                        <Link href="/showroom" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-heading text-white hover:text-primary">
                            Inventory
                        </Link>
                        <Link href="/sell" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-heading text-white hover:text-primary">
                            Sell Your Masterpiece
                        </Link>
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-heading text-white hover:text-primary">
                            Finance
                        </Link>
                        <Button asChild className="w-full mt-4 bg-primary text-black hover:bg-primary/90 text-lg py-6 glow-hover">
                            <Link href="/showroom" onClick={() => setIsMobileMenuOpen(false)}>VIEW INVENTORY</Link>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
