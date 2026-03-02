import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// GET single car (Public)
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const car = await prisma.car.findUnique({
            where: { id: id },
        });

        if (!car) {
            return NextResponse.json({ error: "Car not found" }, { status: 404 });
        }

        return NextResponse.json(car);
    } catch (error) {
        console.error("Error fetching car:", error);
        return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
    }
}

// PUT update car (Protected - Admin only)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const id = (await params).id;
        const formData = await request.formData();

        let imageUrlsStr = formData.get("existingImageUrls") as string;
        let finalImageUrls = imageUrlsStr ? JSON.parse(imageUrlsStr) : [];

        // Handle new file uploads
        const images = formData.getAll("images") as File[];
        if (images.length > 0) {
            const uploadDir = path.join(process.cwd(), "public", "uploads", "cars", id);
            await fs.mkdir(uploadDir, { recursive: true }).catch(() => { }); // handle if already exists

            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                if (file && file.size > 0 && typeof file !== "string") {
                    const ext = file.name.split('.').pop();
                    const fileName = `img_${Date.now()}_${i}.${ext}`;
                    const filePath = path.join(uploadDir, fileName);

                    const arrayBuffer = await file.arrayBuffer();
                    const buffer = new Uint8Array(arrayBuffer);
                    await fs.writeFile(filePath, buffer);

                    finalImageUrls.push(`/uploads/cars/${id}/${fileName}`);
                }
            }
        }

        const updatedCar = await prisma.car.update({
            where: { id: id },
            data: {
                brand: formData.get("brand") as string,
                model: formData.get("model") as string,
                year: formData.get("year") ? parseInt(formData.get("year") as string) : undefined,
                price: formData.get("price") ? parseFloat(formData.get("price") as string) : undefined,
                km: formData.get("km") ? parseInt(formData.get("km") as string) : undefined,
                transmission: formData.get("transmission") as string,
                engine: formData.get("engine") as string,
                bhp: formData.get("bhp") ? parseInt(formData.get("bhp") as string) : undefined,
                torque: formData.get("torque") ? parseInt(formData.get("torque") as string) : undefined,
                zeroTo100: formData.get("zeroTo100") ? parseFloat(formData.get("zeroTo100") as string) : undefined,
                description: formData.get("description") as string || null,
                status: formData.get("status") as string,
                imageUrls: JSON.stringify(finalImageUrls),
            }
        });

        return NextResponse.json(updatedCar);
    } catch (error) {
        console.error("Error updating car:", error);
        return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
    }
}

// DELETE a car (Protected - Admin only)
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const id = (await params).id;

        // Optional: delete associated files
        try {
            const uploadDir = path.join(process.cwd(), "public", "uploads", "cars", id);
            await fs.rm(uploadDir, { recursive: true, force: true });
        } catch (e) {
            console.log("Could not delete associated files for " + id);
        }

        await prisma.car.delete({
            where: { id: id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting car:", error);
        return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
    }
}
