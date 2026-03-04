"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, Lock, Send, CheckCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Contact() {
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: 'General Inquiry',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', interest: 'General Inquiry', message: '' });

                // Clear success message after 5 seconds
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] flex flex-col items-center">
            {/* 1. Hero Section */}
            <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop"
                        alt="Supercar Showroom"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
                    <h1 className="text-5xl md:text-7xl font-heading text-[#D4AF77] font-bold mb-6 drop-shadow-2xl">
                        Get in Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light leading-relaxed">
                        Whether you&apos;re ready to claim your masterpiece or have questions about our process, our team is here to assist.
                    </p>
                    <p className="text-sm tracking-widest uppercase text-white font-bold opacity-80">
                        Hyderabad Showroom &bull; Global Concierge Service
                    </p>
                </div>
            </section>

            <div className="w-full max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* 2. Contact Information */}
                <div className="space-y-12">
                    <div>
                        <h2 className="text-3xl font-heading text-[#D4AF77] mb-8">Showroom Details</h2>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#D4AF77]/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-[#D4AF77]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Address</h3>
                                    <p className="text-gray-400 leading-relaxed font-light">
                                        Plot No. 123, Road No. 10, Jubilee Hills,<br />
                                        Hyderabad, Telangana 500033, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#D4AF77]/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-[#D4AF77]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Phone</h3>
                                    <p className="text-gray-400 font-light">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#D4AF77]/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-[#D4AF77]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Email</h3>
                                    <a href="mailto:concierge@apexvelocity.com" className="text-[#D4AF77] hover:underline font-light">
                                        concierge@apexvelocity.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#D4AF77]/10 flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5 text-[#D4AF77]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">Hours</h3>
                                    <p className="text-gray-400 font-light">Mon&ndash;Sat: 10:00 AM &ndash; 7:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="w-full h-80 bg-[#0A0A0A] rounded-xl border border-white/5 flex flex-col items-center justify-center text-gray-500 overflow-hidden relative group">
                        <MapPin className="w-8 h-8 opacity-20 mb-2" />
                        <span>Map Placeholder &ndash; Hyderabad Showroom</span>
                        <div className="absolute inset-0 bg-[#D4AF77]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                </div>

                {/* 3. Contact Form */}
                <div>
                    <div className="glass bg-[#0A0A0A]/90 p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF77]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                        <h2 className="text-3xl font-heading text-white mb-6 relative z-10">Send Us a Message</h2>

                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 rounded bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3">
                                <CheckCircle className="w-5 h-5" />
                                <p>Thank you! We&apos;ll respond within 24 hours.</p>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mb-6 p-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                There was an error sending your message. Please try again or contact us directly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-400 text-xs uppercase tracking-wider">Full Name *</Label>
                                    <Input
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white focus-visible:border-[#D4AF77] focus-visible:ring-1 focus-visible:ring-[#D4AF77] h-12"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-400 text-xs uppercase tracking-wider">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white focus-visible:border-[#D4AF77] focus-visible:ring-1 focus-visible:ring-[#D4AF77] h-12"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-400 text-xs uppercase tracking-wider">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white focus-visible:border-[#D4AF77] focus-visible:ring-1 focus-visible:ring-[#D4AF77] h-12"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="interest" className="text-gray-400 text-xs uppercase tracking-wider">Interested In</Label>
                                    <Select
                                        value={formData.interest}
                                        onValueChange={(val: string) => setFormData({ ...formData, interest: val })}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white focus-visible:border-[#D4AF77] focus-visible:ring-1 focus-visible:ring-[#D4AF77] h-12">
                                            <SelectValue placeholder="Select topic" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0A0A0A] border-white/10 text-white">
                                            <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                            <SelectItem value="Vehicle Inquiry">Vehicle Inquiry</SelectItem>
                                            <SelectItem value="Sell Your Car">Sell Your Car</SelectItem>
                                            <SelectItem value="Test Drive">Test Drive</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-gray-400 text-xs uppercase tracking-wider">Message *</Label>
                                <Textarea
                                    id="message"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="bg-white/5 border-white/10 text-white focus-visible:border-[#D4AF77] focus-visible:ring-1 focus-visible:ring-[#D4AF77] min-h-[120px] resize-none"
                                    placeholder="Tell us about your dream car or question..."
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={submitting}
                                className="w-full h-14 bg-[#D4AF77] text-black hover:bg-[#D4AF77]/90 font-bold uppercase tracking-wider glow-hover rounded transition-all mt-4"
                            >
                                {submitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </form>
                    </div>

                    {/* 4. Alternative Contact */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://wa.me/+919876543210?text=Hello%20Apex%20Velocity!"
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 h-14 rounded font-bold transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" /> Message us on WhatsApp
                        </a>
                        <a
                            href="mailto:concierge@apexvelocity.com"
                            className="hidden sm:flex flex-1 items-center justify-center gap-2 bg-white/5 text-white hover:bg-white/10 border border-white/10 h-14 rounded font-bold transition-colors"
                        >
                            <Mail className="w-5 h-5" /> Send Email
                        </a>
                    </div>
                </div>
            </div>

            {/* 5. Final Trust Note */}
            <div className="w-full border-t border-white/10 py-12 mt-auto">
                <p className="text-center text-gray-500 font-light text-sm flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4 opacity-50" />
                    All inquiries are handled with the utmost discretion and priority.
                </p>
                <div className="flex justify-center mt-6">
                    <a href="https://instagram.com/apexvelocity" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#D4AF77] hover:bg-white/10 transition-colors">
                        <Instagram className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
