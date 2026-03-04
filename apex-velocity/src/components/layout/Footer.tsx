import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                    {/* Brand Col */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <Image
                                src="/titan-logo.png"
                                alt="Titan Motors Logo"
                                width={40}
                                height={40}
                                className="object-contain brightness-0 invert"
                            />
                            <span className="font-heading text-xl font-bold tracking-wider text-white">
                                <span className="text-primary">TITAN</span> MOTORS
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
                            The pinnacle of pre-owned luxury. Discover an exclusive collection of engineered masterpieces tailored for the ultimate driving aficionado.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors hover:scale-110">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors hover:scale-110">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors hover:scale-110">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors hover:scale-110">
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Quick */}
                    <div>
                        <h4 className="font-heading text-white text-lg font-semibold mb-6">Showroom</h4>
                        <ul className="space-y-4">
                            <li><Link href="/showroom" className="text-muted-foreground hover:text-primary transition-colors text-sm">View Inventory</Link></li>
                            <li><Link href="/showroom?brand=Ferrari" className="text-muted-foreground hover:text-primary transition-colors text-sm">Ferrari Collection</Link></li>
                            <li><Link href="/showroom?brand=Lamborghini" className="text-muted-foreground hover:text-primary transition-colors text-sm">Lamborghini</Link></li>
                            <li><Link href="/showroom?brand=Porsche" className="text-muted-foreground hover:text-primary transition-colors text-sm">Porsche Series</Link></li>
                        </ul>
                    </div>

                    {/* Links Discover */}
                    <div>
                        <h4 className="font-heading text-white text-lg font-semibold mb-6">Services</h4>
                        <ul className="space-y-4">
                            <li><Link href="/sell" className="text-muted-foreground hover:text-primary transition-colors text-sm">Sell Your Masterpiece</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Global Sourcing</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Bespoke Finance</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">151-Point Inspection</Link></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h4 className="font-heading text-white text-lg font-semibold mb-6">Concierge</h4>
                        <ul className="space-y-4">
                            <li className="text-muted-foreground text-sm">
                                <span className="block text-white font-medium mb-1">Location</span>
                                Hyderabad, Telangana,<br />India
                            </li>
                            <li className="text-muted-foreground text-sm mt-4">
                                <span className="block text-white font-medium mb-1">Contact</span>
                                +91 (800) TITAN<br />
                                concierge@titanmotors.in
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} Titan Motors. All Rights Reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-muted-foreground hover:text-white text-sm transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-muted-foreground hover:text-white text-sm transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
