import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// GET all cars (Public)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const brand = searchParams.get("brand");

        // Optional query parsing for filtering future implementations
        const where = brand ? { brand: { contains: brand } } : {};

        const cars = await prisma.car.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
    }
}

// POST new car (Protected - Admin only)
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();

        // 1. Create the database record first to get the ID
        const newCar = await prisma.car.create({
            data: {
                brand: formData.get("brand") as string,
                model: formData.get("model") as string,
                year: parseInt(formData.get("year") as string),
                price: parseFloat(formData.get("price") as string),
                km: parseInt(formData.get("km") as string),
                transmission: formData.get("transmission") as string,
                engine: formData.get("engine") as string,
                bhp: parseInt(formData.get("bhp") as string),
                torque: parseInt(formData.get("torque") as string),
                zeroTo100: parseFloat(formData.get("zeroTo100") as string),
                description: formData.get("description") as string || null,
                status: (formData.get("status") as string) || "AVAILABLE",
                daysOnLot: 0,
                imageUrls: "[]", // placeholder
            }
        });

        // 2. Handle File Uploads
        const images = formData.getAll("images") as File[];
        const uploadedPaths: string[] = [];

        if (images.length > 0) {
            const uploadDir = path.join(process.cwd(), "public", "uploads", "cars", newCar.id);
            await fs.mkdir(uploadDir, { recursive: true });

            for (let i = 0; i < images.length; i++) {
                const file = images[i];
                if (file && file.size > 0 && typeof file !== "string") {
                    const ext = file.name.split('.').pop();
                    const fileName = `img_${i + 1}_${Date.now()}.${ext}`;
                    const filePath = path.join(uploadDir, fileName);

                    const arrayBuffer = await file.arrayBuffer();
                    const buffer = new Uint8Array(arrayBuffer);
                    await fs.writeFile(filePath, buffer);

                    // Store relative URL for the frontend
                    uploadedPaths.push(`/uploads/cars/${newCar.id}/${fileName}`);
                }
            }

            // 3. Update the car record with the real image paths
            if (uploadedPaths.length > 0) {
                await prisma.car.update({
                    where: { id: newCar.id },
                    data: { imageUrls: JSON.stringify(uploadedPaths) }
                });
                return NextResponse.json({ ...newCar, imageUrls: JSON.stringify(uploadedPaths) }, { status: 201 });
            }
        }

        return NextResponse.json(newCar, { status: 201 });
    } catch (error) {
        console.error("Error creating car:", error);
        return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
    }
}
