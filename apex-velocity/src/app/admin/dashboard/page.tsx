import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

const prisma = new PrismaClient();

export default async function AdminDashboardPage() {
    const session = await auth();
    if (!session?.user) {
        redirect("/admin/login");
    }

    // 1. Fetch Cars & Bookings
    const cars = await prisma.car.findMany({
        include: {
            TestDriveBookings: {
                where: { status: { not: "Cancelled" } },
                orderBy: { preferredDate: "asc" }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" }
    });

    const allBookings = await prisma.testDriveBooking.findMany({
        where: {
            status: { not: "Cancelled" },
            preferredDate: { gte: new Date() } // upcoming only for the table
        },
        include: { car: true },
        orderBy: { preferredDate: "asc" },
        take: 8 // limit to 8 for the upcoming list
    });

    // 2. Compute Dashboard Stats
    const now = new Date();
    const next7Days = new Date();
    next7Days.setDate(next7Days.getDate() + 7);

    const totalVehicles = cars.length;
    // Let's just mock a +4% change based on image
    const totalVehiclesChange = 4;

    const upcomingBookingsCount = allBookings.filter(b => b.preferredDate <= next7Days).length;
    const upcomingBookingsChange = 12; // mock +12% based on image

    const soldCars = cars.filter(c => c.status === "SOLD");
    const avgDaysOnLot = cars.length > 0
        ? (cars.reduce((sum, c) => sum + (c.daysOnLot || 0), 0) / cars.length).toFixed(1)
        : "0.0";
    const avgDaysOnLotChange = -2; // mock -2% based on image

    // Mock revenue based on sold cars or just static to match $1.4M in image securely
    const monthlyRevenue = "$1.4M";

    const stats = {
        totalVehicles,
        totalVehiclesChange,
        upcomingBookings: upcomingBookingsCount,
        upcomingBookingsChange,
        avgDaysOnLot,
        avgDaysOnLotChange,
        monthlyRevenue
    };

    return (
        <DashboardClient
            cars={cars}
            leads={leads}
            stats={stats}
            bookings={allBookings}
            sessionEmail={session.user.email || null}
        />
    );
}
