"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, Car, CheckCircle2, ChevronRight, Contact, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Zod Schema for validation
const formSchema = z.object({
    make: z.string().min(2, "Make is required"),
    model: z.string().min(2, "Model is required"),
    year: z.string().min(4, "Valid year required"),
    contactName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Valid phone number required"),
});

export default function SellPage() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            make: "",
            model: "",
            year: "",
            contactName: "",
            email: "",
            phone: "",
        },
    });

    const nextStep = async () => {
        let isValid = false;
        if (step === 1) {
            isValid = await form.trigger(["make", "model", "year"]);
        } else if (step === 2) {
            isValid = true; // Bypassing photo upload validation for MVP
        }

        if (isValid) setStep(current => current + 1);
    };

    const prevStep = () => setStep(current => current - 1);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                console.error("Submission failed");
            }
        } catch (error) {
            console.error("API Error", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-24 flex items-center justify-center">
                <div className="max-w-md w-full glass p-10 rounded-xl text-center border-t-4 border-primary">
                    <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
                    <h2 className="text-3xl font-heading text-white mb-4">Submission Received</h2>
                    <p className="text-gray-400 mb-8">
                        Our pricing engineers are currently reviewing your masterpiece. Expect a firm offer within the next 29 minutes.
                    </p>
                    <Button onClick={() => window.location.href = '/'} className="w-full h-12 bg-primary text-black glow-hover text-lg font-bold rounded-none">
                        RETURN HOME
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">

            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-2/3 h-full opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
                <img src="https://images.unsplash.com/photo-1542385108-7dafe10f9247?w=1200&h=800&fit=crop" alt="bg" className="w-full h-full object-cover" />
            </div>

            <div className="max-w-3xl mx-auto px-6 relative z-10">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading text-white mb-4 font-bold">Sell Your Masterpiece</h1>
                    <p className="text-gray-400">Unlock the true value of your vehicle through our exclusive acquisition program.</p>
                </div>

                {/* Stepper Header */}
                <div className="flex justify-between items-center mb-12 relative max-w-lg mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 -translate-y-1/2" />

                    <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-gray-500'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-black' : 'bg-card border border-border text-gray-500'}`}>
                            <Car className="w-5 h-5" />
                        </div>
                        <span className="text-xs uppercase tracking-wider font-semibold bg-background px-2">Vehicle</span>
                    </div>

                    <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-gray-500'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-black' : 'bg-card border border-border text-gray-500'}`}>
                            <Camera className="w-5 h-5" />
                        </div>
                        <span className="text-xs uppercase tracking-wider font-semibold bg-background px-2">Photos</span>
                    </div>

                    <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-gray-500'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-black' : 'bg-card border border-border text-gray-500'}`}>
                            <Contact className="w-5 h-5" />
                        </div>
                        <span className="text-xs uppercase tracking-wider font-semibold bg-background px-2">Contact</span>
                    </div>
                </div>

                <div className="glass p-8 md:p-12 rounded-xl shadow-2xl relative">

                    {/* We Buy In 29 Minutes Banner */}
                    <div className="absolute -top-4 -right-4 bg-primary text-black px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg transform rotate-2">
                        Firm Offer in 29 Mins
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* STEP 1: Vehicle */}
                            {step === 1 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h3 className="text-xl text-white font-heading font-semibold border-b border-border pb-3 mb-6">Vehicle Intelligence</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="make"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300">Make</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Lamborghini" className="bg-background border-border text-white h-12" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="model"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300">Model</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. Aventador SVJ" className="bg-background border-border text-white h-12" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="year"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Year of Manufacture</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. 2021" type="number" className="bg-background border-border text-white h-12" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="pt-6 flex justify-end">
                                        <Button type="button" onClick={nextStep} className="bg-primary text-black h-12 px-8 rounded-none font-bold glow-hover">
                                            NEXT STEP <ChevronRight className="w-5 h-5 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: Photos */}
                            {step === 2 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h3 className="text-xl text-white font-heading font-semibold border-b border-border pb-3 mb-6">Visual Assessment</h3>

                                    <div className="border-2 border-dashed border-border rounded-xl p-12 text-center glass cursor-pointer hover:border-primary transition-colors group">
                                        <UploadCloud className="w-12 h-12 text-gray-500 group-hover:text-primary mx-auto mb-4 transition-colors" />
                                        <h4 className="text-white font-semibold mb-2">Drag & Drop 3-5 high quality images</h4>
                                        <p className="text-sm text-gray-400 mb-6">Include exterior angles and engine bay for the most accurate valuation.</p>
                                        <Button type="button" variant="outline" className="text-white border-gray-500 hover:text-primary hover:border-primary">
                                            Browse Files
                                        </Button>
                                    </div>

                                    <div className="pt-6 flex justify-between items-center">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="text-gray-400 hover:text-white">
                                            Back
                                        </Button>
                                        <Button type="button" onClick={nextStep} className="bg-primary text-black h-12 px-8 rounded-none font-bold glow-hover">
                                            NEXT STEP <ChevronRight className="w-5 h-5 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Contact */}
                            {step === 3 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h3 className="text-xl text-white font-heading font-semibold border-b border-border pb-3 mb-6">Concierge Details</h3>

                                    <FormField
                                        control={form.control}
                                        name="contactName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-300">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" className="bg-background border-border text-white h-12" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300">Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john@example.com" type="email" className="bg-background border-border text-white h-12" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-300">Phone / WhatsApp</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+1 (555) 000-0000" className="bg-background border-border text-white h-12" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-red-400" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="pt-6 flex justify-between items-center">
                                        <Button type="button" variant="ghost" onClick={prevStep} className="text-gray-400 hover:text-white">
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-primary text-black h-12 px-8 rounded-none font-bold glow-hover w-full md:w-auto"
                                        >
                                            {isSubmitting ? "PROCESSING..." : "SUBMIT FOR VALUATION"}
                                        </Button>
                                    </div>
                                </div>
                            )}

                        </form>
                    </Form>

                </div>
            </div>
        </div>
    );
}
