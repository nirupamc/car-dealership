import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

// POST new lead (Public - Sell Your Car form)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Server-side validation (basic example)
        if (!body.make || !body.model || !body.contactName || !body.email || !body.phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newLead = await prisma.lead.create({
            data: {
                make: body.make,
                model: body.model,
                year: parseInt(body.year),
                contactName: body.contactName,
                email: body.email,
                phone: body.phone,
                photos: body.photos ? JSON.stringify(body.photos) : null,
                status: "NEW",
            }
        });

        return NextResponse.json(newLead, { status: 201 });
    } catch (error) {
        console.error("Error creating lead:", error);
        return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
    }
}

// GET all leads (Protected - Admin only)
export async function GET(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(leads);
    } catch (error) {
        console.error("Error fetching leads:", error);
        return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }
}
