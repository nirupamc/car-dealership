"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, CheckCircle2 } from "lucide-react";
import Confetti from "react-confetti";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().optional(),
    preferredDate: z.date(),
    notes: z.string().max(300, "Notes cannot exceed 300 characters.").optional(),
});

type FormData = z.infer<typeof formSchema>;

export function TestDriveModal({
    carId,
    carName,
    children,
}: {
    carId: string;
    carName: string;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            notes: "",
        },
    });

    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = form;

    const preferredDate = watch("preferredDate");

    // Handle Modal Open/Close
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setTimeout(() => {
                setStep(1);
                setIsSuccess(false);
                reset();
            }, 300); // slightly delay reset until animation finishes
        } else {
            setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
        }
    };

    const nextStep = async () => {
        let isValid = false;
        if (step === 1) {
            isValid = await trigger(["name", "email", "phone"]);
        } else if (step === 2) {
            isValid = await trigger(["preferredDate"]);
        }

        if (isValid) {
            setStep((p) => p + 1);
        }
    };

    const prevStep = () => {
        setStep((p) => p - 1);
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/test-drives", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    carId,
                    ...data,
                }),
            });

            if (!res.ok) throw new Error("Failed to submit");

            setIsSuccess(true);
            toast.success("Test drive requested successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit test drive request.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-[#121212] border border-border text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-heading text-primary uppercase tracking-wider">
                        {isSuccess ? "Request Confirmed" : `Book Test Drive – ${carName}`}
                    </DialogTitle>
                </DialogHeader>

                {isSuccess ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                        <Confetti
                            width={windowDimensions.width}
                            height={windowDimensions.height}
                            numberOfPieces={300}
                            recycle={false}
                            gravity={0.2}
                            style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
                        />
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold font-heading text-white">You&apos;re All Set!</h3>
                        <p className="text-gray-400">
                            Your test drive for the {carName} has been requested. Our concierge team will reach out shortly to confirm your booking.
                        </p>
                        <Button
                            className="mt-6 bg-primary text-black font-bold hover:bg-primary/90 glow-hover"
                            onClick={() => handleOpenChange(false)}
                        >
                            Close Window
                        </Button>
                    </div>
                ) : (
                    <div className="py-4">
                        {/* Stepper Header */}
                        <div className="flex items-center justify-between mb-8 relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 -z-10" />
                            {[1, 2, 3].map((num) => (
                                <div
                                    key={num}
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors z-10",
                                        step === num
                                            ? "bg-primary text-black"
                                            : step > num
                                                ? "bg-primary/50 text-white"
                                                : "bg-[#1A1A1A] text-gray-500 border border-border"
                                    )}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Step 1: Personal Info */}
                            <div className={cn("space-y-4", step !== 1 && "hidden")}>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        {...register("name")}
                                        id="name"
                                        className="bg-white/5 border-border focus-visible:ring-primary text-white"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        {...register("email")}
                                        id="email"
                                        type="email"
                                        className="bg-white/5 border-border focus-visible:ring-primary text-white"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                                    <Input
                                        {...register("phone")}
                                        id="phone"
                                        type="tel"
                                        className="bg-white/5 border-border focus-visible:ring-primary text-white"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>

                            {/* Step 2: Preferred Date */}
                            <div className={cn("space-y-4", step !== 2 && "hidden")}>
                                <div className="space-y-2 flex flex-col">
                                    <Label>Preferred Date *</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal bg-white/5 border-border hover:bg-white/10 hover:text-white",
                                                    !preferredDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {preferredDate ? format(preferredDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-card border-border text-white" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={preferredDate}
                                                onSelect={(date) => {
                                                    setValue("preferredDate", date as Date, { shouldValidate: true });
                                                }}
                                                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.preferredDate && <p className="text-sm text-red-500">{errors.preferredDate.message}</p>}
                                </div>
                            </div>

                            {/* Step 3: Notes & Confirm */}
                            <div className={cn("space-y-4", step !== 3 && "hidden")}>
                                <div className="bg-white/5 border border-border rounded-lg p-4 space-y-2 mb-6">
                                    <h4 className="font-heading text-primary text-sm uppercase">Booking Summary</h4>
                                    <div className="text-sm text-gray-300 grid grid-cols-2 gap-2">
                                        <span className="text-gray-500">Name:</span> <span className="truncate">{watch("name")}</span>
                                        <span className="text-gray-500">Email:</span> <span className="truncate">{watch("email")}</span>
                                        <span className="text-gray-500">Date:</span> <span>{preferredDate ? format(preferredDate, "PPP") : ""}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <textarea
                                        {...register("notes")}
                                        id="notes"
                                        className="w-full flex min-h-[100px] rounded-md border border-border bg-white/5 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-white"
                                        placeholder="Any special accommodations or specific questions?"
                                    />
                                    {errors.notes && <p className="text-sm text-red-500">{errors.notes.message}</p>}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-4 border-t border-white/10 mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={step === 1 || isSubmitting}
                                    className="border-border text-gray-300 hover:text-white"
                                >
                                    Back
                                </Button>

                                {step < 3 ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="bg-primary text-black font-bold hover:bg-primary/90"
                                    >
                                        Next Step
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-primary text-black font-bold hover:bg-primary/90 glow-hover"
                                    >
                                        {isSubmitting ? (
                                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting</>
                                        ) : (
                                            "Request Test Drive"
                                        )}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
