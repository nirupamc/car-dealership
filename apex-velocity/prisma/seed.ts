const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // Check if we already have cars to avoid duplicating on multiple runs
    // Force cleanup on re-seed for testing dashboard
    await prisma.car.deleteMany()

    const supercars = [
        {
            brand: 'Lamborghini',
            model: 'Aventador SVJ',
            year: 2021,
            price: 650000,
            km: 4500,
            transmission: 'Automatic',
            engine: '6.5L V12',
            bhp: 759,
            torque: 720,
            zeroTo100: 2.8,
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1627454819213-f56f46b2b719?w=1200&h=800&fit=crop'
            ]),
            status: 'AVAILABLE',
            daysOnLot: 12
        },
        {
            brand: 'Ferrari',
            model: 'SF90 Stradale',
            year: 2022,
            price: 580000,
            km: 2100,
            transmission: 'Automatic',
            engine: '4.0L V8 Hybrid',
            bhp: 986,
            torque: 800,
            zeroTo100: 2.5,
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=800&fit=crop'
            ]),
            status: 'AVAILABLE',
            daysOnLot: 5
        },
        {
            brand: 'Porsche',
            model: '911 GT3 RS',
            year: 2023,
            price: 320000,
            km: 800,
            transmission: 'PDK',
            engine: '4.0L Flat-6',
            bhp: 518,
            torque: 465,
            zeroTo100: 3.2,
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1503376760341-a18de1ca39c1?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&h=800&fit=crop'
            ]),
            status: 'AVAILABLE',
            daysOnLot: 2
        },
        {
            brand: 'McLaren',
            model: '765LT',
            year: 2021,
            price: 450000,
            km: 3200,
            transmission: 'Automatic',
            engine: '4.0L V8 Twin-Turbo',
            bhp: 759,
            torque: 720,
            zeroTo100: 2.8,
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1620882814836-9bba144f80e0?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1620882855179-881c1c9afba4?w=1200&h=800&fit=crop'
            ]),
            status: 'AVAILABLE',
            daysOnLot: 18
        },
        {
            brand: 'Aston Martin',
            model: 'DBS Superleggera',
            year: 2020,
            price: 285000,
            km: 8500,
            transmission: 'Automatic',
            engine: '5.2L V12 Twin-Turbo',
            bhp: 715,
            torque: 900,
            zeroTo100: 3.4,
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1542385108-7dafe10f9247?w=1200&h=800&fit=crop'
            ]),
            status: 'AVAILABLE',
            daysOnLot: 30
        },
        {
            brand: 'Lamborghini',
            model: 'Huracan EVO',
            year: 2022,
            price: 295000,
            km: 5600,
            transmission: 'Automatic',
            engine: '5.2L V10',
            bhp: 562,
            torque: 600,
            zeroTo100: 3.8,
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1627454819213-f56f46b2b719?w=1200&h=800&fit=crop'
            ]),
            status: 'RESERVED',
            daysOnLot: 8
        },
        {
            brand: 'Ferrari',
            model: '812 Superfast',
            year: 2019,
            price: 365000,
            km: 12400,
            transmission: 'Automatic',
            engine: '6.5L V12',
            bhp: 789,
            torque: 718,
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=800&fit=crop'
            ]),
            status: 'AVAILABLE',
            daysOnLot: 22
        },
        {
            brand: 'Rolls-Royce',
            model: 'Wraith Black Badge',
            year: 2021,
            price: 420000,
            km: 9800,
            transmission: 'Automatic',
            engine: '6.6L V12 Twin-Turbo',
            bhp: 624,
            torque: 870,
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1631295846985-abdbb2ce8f73?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1631295846747-c0e5a6fc635d?w=1200&h=800&fit=crop'
            ]),
            status: 'AVAILABLE',
            daysOnLot: 45
        },
        {
            brand: 'Bentley',
            model: 'Continental GT Speed',
            year: 2022,
            price: 310000,
            km: 6200,
            transmission: 'Automatic',
            engine: '6.0L W12 Twin-Turbo',
            bhp: 650,
            torque: 900,
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1503376760341-a18de1ca39c1?w=1200&h=800&fit=crop'
            ]),
            status: 'AVAILABLE',
            daysOnLot: 15
        },
        {
            brand: 'Mercedes-AMG',
            model: 'GT Black Series',
            year: 2021,
            price: 415000,
            km: 1500,
            transmission: 'Automatic',
            engine: '4.0L V8 Twin-Turbo',
            bhp: 720,
            torque: 800,
            imageUrls: JSON.stringify([
                'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop',
                'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=800&fit=crop'
            ]),
            status: 'SOLD',
            daysOnLot: 0
        }
    ];

    for (const car of supercars) {
        await prisma.car.create({
            data: car,
        });
    }

    console.log(`Seeding complete. Inserted ${supercars.length} vehicles.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
