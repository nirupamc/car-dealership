"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const carFormSchema = z.object({
    brand: z.string().min(2, "Brand is required"),
    model: z.string().min(1, "Model is required"),
    year: z.string().regex(/^\d{4}$/, "Must be a valid year"),
    price: z.string().min(1, "Price is required"),
    km: z.string().min(1, "Mileage is required"),
    transmission: z.string().min(1, "Transmission is required"),
    engine: z.string().min(1, "Engine is required"),
    bhp: z.string().min(1, "BHP is required"),
    torque: z.string().min(1, "Torque is required"),
    zeroTo100: z.string().min(1, "0-100 time is required"),
    status: z.enum(["AVAILABLE", "RESERVED", "SOLD"]),
    description: z.string().max(500, "Description max 500 characters").optional(),
});

export type CarFormData = z.infer<typeof carFormSchema>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    carData?: any; // If provided, we are in Edit mode
    onSuccess: () => void;
}

export function AddEditCarForm({ open, onOpenChange, carData, onSuccess }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const isEdit = !!carData;

    const form = useForm<CarFormData>({
        resolver: zodResolver(carFormSchema),
        defaultValues: carData ? {
            brand: carData.brand || "",
            model: carData.model || "",
            year: carData.year?.toString() || "",
            price: carData.price?.toString() || "",
            km: carData.km?.toString() || "",
            transmission: carData.transmission || "Automatic",
            engine: carData.engine || "",
            bhp: carData.bhp?.toString() || "",
            torque: carData.torque?.toString() || "",
            zeroTo100: carData.zeroTo100?.toString() || "",
            status: carData.status || "AVAILABLE",
            description: carData.description || "",
        } : {
            brand: "",
            model: "",
            year: "",
            price: "",
            km: "",
            transmission: "Automatic",
            engine: "",
            bhp: "",
            torque: "",
            zeroTo100: "",
            status: "AVAILABLE",
            description: "",
        },
    });

    useEffect(() => {
        if (open) {
            if (carData) {
                form.reset({
                    brand: carData.brand || "",
                    model: carData.model || "",
                    year: carData.year?.toString() || "",
                    price: carData.price?.toString() || "",
                    km: carData.km?.toString() || "",
                    transmission: carData.transmission || "Automatic",
                    engine: carData.engine || "",
                    bhp: carData.bhp?.toString() || "",
                    torque: carData.torque?.toString() || "",
                    zeroTo100: carData.zeroTo100?.toString() || "",
                    status: carData.status || "AVAILABLE",
                    description: carData.description || "",
                });
            } else {
                form.reset({
                    brand: "",
                    model: "",
                    year: "",
                    price: "",
                    km: "",
                    transmission: "Automatic",
                    engine: "",
                    bhp: "",
                    torque: "",
                    zeroTo100: "",
                    status: "AVAILABLE",
                    description: "",
                });
            }
            setSelectedFiles([]); // Reset file input preview
        }
    }, [open, carData, form]);

    const onSubmit = async (values: CarFormData) => {
        setLoading(true);
        try {
            const formData = new FormData();

            // Append all scalar fields
            Object.entries(values).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });

            // Append new files
            selectedFiles.forEach((file) => {
                formData.append("images", file);
            });

            // If editing, preserve existing valid images 
            if (isEdit && carData.imageUrls) {
                formData.append("existingImageUrls", typeof carData.imageUrls === 'string' ? carData.imageUrls : JSON.stringify(carData.imageUrls));
            }

            const url = isEdit ? `/api/cars/${carData.id}` : `/api/cars`;
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                // Do NOT set Content-Type header when sending FormData, the browser handles it (with boundary)
                body: formData,
            });

            if (!res.ok) throw new Error("Failed to save car");

            toast.success(isEdit ? "Vehicle updated successfully" : "Vehicle added to inventory");
            onSuccess();
            onOpenChange(false);
            setSelectedFiles([]);

            // Critical: refresh the Next.js router cache to show new data on the dashboard + frontend
            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] bg-card border-border text-white">
                <DialogHeader>
                    <DialogTitle className="font-heading text-2xl text-primary">{isEdit ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <ScrollArea className="h-[60vh] pr-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">

                            <div className="space-y-2">
                                <Label>Brand</Label>
                                <Input {...form.register("brand")} className="bg-white/5 border-border" placeholder="e.g. Porsche" />
                                {form.formState.errors.brand && <span className="text-red-500 text-xs">{form.formState.errors.brand.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Model</Label>
                                <Input {...form.register("model")} className="bg-white/5 border-border" placeholder="e.g. 911 GT3 RS" />
                                {form.formState.errors.model && <span className="text-red-500 text-xs">{form.formState.errors.model.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Year</Label>
                                <Input {...form.register("year")} className="bg-white/5 border-border" placeholder="e.g. 2024" />
                                {form.formState.errors.year && <span className="text-red-500 text-xs">{form.formState.errors.year.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Price ($)</Label>
                                <Input type="number" {...form.register("price")} className="bg-white/5 border-border" placeholder="e.g. 295000" />
                                {form.formState.errors.price && <span className="text-red-500 text-xs">{form.formState.errors.price.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Mileage (km)</Label>
                                <Input type="number" {...form.register("km")} className="bg-white/5 border-border" placeholder="e.g. 1500" />
                                {form.formState.errors.km && <span className="text-red-500 text-xs">{form.formState.errors.km.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Transmission</Label>
                                <Select
                                    disabled={loading}
                                    onValueChange={(val) => form.setValue("transmission", val)}
                                    defaultValue={form.getValues("transmission")}
                                >
                                    <SelectTrigger className="bg-white/5 border-border">
                                        <SelectValue placeholder="Select transmission" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card text-white border-border">
                                        <SelectItem value="Automatic">Automatic (PDK/DCT)</SelectItem>
                                        <SelectItem value="Manual">Manual</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.transmission && <span className="text-red-500 text-xs">{form.formState.errors.transmission.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Engine Configuration</Label>
                                <Input {...form.register("engine")} className="bg-white/5 border-border" placeholder="e.g. 4.0L Flat-6" />
                                {form.formState.errors.engine && <span className="text-red-500 text-xs">{form.formState.errors.engine.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Horsepower (BHP)</Label>
                                <Input type="number" {...form.register("bhp")} className="bg-white/5 border-border" placeholder="e.g. 518" />
                                {form.formState.errors.bhp && <span className="text-red-500 text-xs">{form.formState.errors.bhp.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>Torque (Nm)</Label>
                                <Input type="number" {...form.register("torque")} className="bg-white/5 border-border" placeholder="e.g. 465" />
                                {form.formState.errors.torque && <span className="text-red-500 text-xs">{form.formState.errors.torque.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <Label>0-100 km/h (sec)</Label>
                                <Input type="number" step="0.1" {...form.register("zeroTo100")} className="bg-white/5 border-border" placeholder="e.g. 3.2" />
                                {form.formState.errors.zeroTo100 && <span className="text-red-500 text-xs">{form.formState.errors.zeroTo100.message}</span>}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>Status</Label>
                                <Select
                                    disabled={loading}
                                    onValueChange={(val) => form.setValue("status", val as "AVAILABLE" | "RESERVED" | "SOLD")}
                                    defaultValue={form.getValues("status")}
                                >
                                    <SelectTrigger className="bg-white/5 border-border">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card text-white border-border">
                                        <SelectItem value="AVAILABLE">Available</SelectItem>
                                        <SelectItem value="RESERVED">Reserved</SelectItem>
                                        <SelectItem value="SOLD">Sold</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>Vehicle Overview (Description)</Label>
                                <textarea
                                    {...form.register("description")}
                                    className="w-full flex min-h-[100px] rounded-md border border-border bg-white/5 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-white"
                                    placeholder="Write a short, luxurious description... (max 500 characters)"
                                />
                                {form.formState.errors.description && <span className="text-red-500 text-xs">{form.formState.errors.description.message}</span>}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>Upload Images</Label>
                                <Input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="bg-white/5 border-border text-white file:text-primary file:font-semibold"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            const filesArray = Array.from(e.target.files);
                                            // Handle Max 15 images
                                            let allowedFiles = filesArray;
                                            const existingCount = isEdit && carData?.imageUrls ? (Array.isArray(carData.imageUrls) ? carData.imageUrls.length : JSON.parse(carData.imageUrls || "[]").length) : 0;

                                            if (existingCount + filesArray.length > 15) {
                                                toast.error(`Maximum 15 images allowed per vehicle. You can only add ${Math.max(0, 15 - existingCount)} more.`);
                                                allowedFiles = filesArray.slice(0, Math.max(0, 15 - existingCount));
                                            }

                                            // Validate size (max 5MB per image)
                                            const vFiles = allowedFiles.filter(f => f.size <= 5 * 1024 * 1024);
                                            if (vFiles.length < allowedFiles.length) {
                                                toast.error("Some images exceeded 5MB and were removed.");
                                            }
                                            setSelectedFiles(vFiles);
                                        }
                                    }}
                                />
                                <p className="text-xs text-gray-500">Max 5MB per image.</p>
                            </div>

                            {/* Local New Image Previews */}
                            {selectedFiles.length > 0 && (
                                <div className="space-y-2 md:col-span-2 mt-4">
                                    <Label className="text-xs text-gray-400">New Files Preview</Label>
                                    <div className="flex gap-4 overflow-x-auto pb-2">
                                        {selectedFiles.map((file, i) => (
                                            <div key={i} className="h-24 w-36 flex-shrink-0 rounded bg-background/50 border border-border overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Existing Images Preview (if Edit Mode) */}
                            {isEdit && carData?.imageUrls && (
                                <div className="space-y-2 md:col-span-2 mt-2">
                                    <Label className="text-xs text-gray-400">Existing Images</Label>
                                    <div className="flex gap-4 overflow-x-auto pb-2">
                                        {Array.isArray(carData.imageUrls) ? carData.imageUrls.map((url: string, i: number) => (
                                            <div key={i} className="h-24 w-36 flex-shrink-0 rounded bg-background/50 border border-border overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={url} alt="existing preview" className="w-full h-full object-cover" />
                                            </div>
                                        )) : (typeof carData.imageUrls === 'string' && carData.imageUrls.length > 5 ? JSON.parse(carData.imageUrls).map((url: string, i: number) => (
                                            <div key={i} className="h-24 w-36 flex-shrink-0 rounded bg-background/50 border border-border overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={url} alt="existing preview" className="w-full h-full object-cover" />
                                            </div>
                                        )) : null)}
                                    </div>
                                </div>
                            )}

                        </div>
                    </ScrollArea>

                    <div className="pt-6 flex justify-end gap-3 border-t border-border mt-4">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="text-white border-border" disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-primary text-black font-bold glow-hover">
                            {loading ? "Saving..." : "Save Vehicle"}
                        </Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    );
}
