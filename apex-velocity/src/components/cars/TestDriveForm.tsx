"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function TestDriveForm({ carId }: { carId: string }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        notes: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/test-drives", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    carId,
                    ...formData,
                }),
            });

            if (!res.ok) throw new Error("Failed to submit request");

            toast.success("Test drive requested — we'll contact you soon!");
            setFormData({ name: "", email: "", phone: "", preferredDate: "", notes: "" });
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit test drive request. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl p-6 mt-8">
            <h3 className="text-xl font-heading text-white mb-6 uppercase tracking-widest">Book a Test Drive</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" required value={formData.name} onChange={handleChange} className="bg-white/5 border-border text-white" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" name="email" required value={formData.email} onChange={handleChange} className="bg-white/5 border-border text-white" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} className="bg-white/5 border-border text-white" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="preferredDate">Preferred Date *</Label>
                    <Input id="preferredDate" type="date" name="preferredDate" required value={formData.preferredDate} onChange={handleChange} className="bg-white/5 border-border text-white [color-scheme:dark]" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full flex min-h-[100px] rounded-md border border-border bg-white/5 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary text-white"
                        placeholder="Any special requests?"
                    />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-primary text-black hover:bg-primary/90 font-bold glow-hover">
                    {loading ? "Submitting..." : "REQUEST TEST DRIVE"}
                </Button>
            </form>
        </div>
    );
}
