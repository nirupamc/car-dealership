import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { carId, name, email, phone, preferredDate, notes } = body;

        if (!carId || !name || !email || !preferredDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const date = new Date(preferredDate);

        const newBooking = await prisma.testDriveBooking.create({
            data: {
                carId,
                name,
                email,
                phone: phone || null,
                preferredDate: date,
                notes: notes || null,
                status: "Pending" // Will use default anyway, but good to be explicit occasionally
            },
        });

        return NextResponse.json({ success: true, id: newBooking.id });
    } catch (error) {
        console.error("Error creating test drive booking:", error);
        return NextResponse.json({ error: "Failed to create test drive booking request." }, { status: 500 });
    }
}
