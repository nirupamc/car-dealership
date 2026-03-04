"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname.startsWith("/admin")) return null;

    const navLinks = [
        { name: "Inventory", href: "/showroom" },
        { name: "About Us", href: "/about" },
        { name: "Sell Your Vehicle", href: "/sell" },
        { name: "Contact Us", href: "/contact" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                        ? "glass py-4 shadow-lg backdrop-blur-md"
                        : "bg-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group z-50">
                        <Image
                            src="/titan-logo.png"
                            alt="Titan Motors Logo"
                            width={66}
                            height={66}
                            className="object-contain transition-transform group-hover:scale-105 brightness-0 invert"
                        />
                        <span className="font-heading text-2xl font-bold tracking-wider text-white">
                            {/* TITAN MOTORS */}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex flex-1 items-center justify-center space-x-10">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-sm font-sans tracking-wide transition-all duration-300 py-2 group ${isActive ? "text-primary font-bold" : "text-white hover:text-primary hover:-translate-y-0.5 glow-hover-text"
                                        }`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transition-all duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-white hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-white z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[#121212]/95 backdrop-blur-xl pt-28 pb-8 px-6 flex flex-col items-center md:hidden">
                    <div className="flex flex-col space-y-8 w-full max-w-md items-center text-center">
                        <button className="text-white hover:text-primary transition-colors p-4 rounded-full bg-white/5 mb-4">
                            <Search className="w-6 h-6" />
                        </button>

                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-2xl font-sans tracking-wide transition-colors ${isActive ? "text-primary font-bold" : "text-white hover:text-primary"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}