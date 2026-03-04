import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Console logging the received data for now
        // Eventually could map natively to prisma DB directly
        console.log(`[Contact API] Form Submission Received at ${new Date().toISOString()}`);
        console.log('--- Incoming Data ---');
        console.log(`Name:`, body.name);
        console.log(`Email:`, body.email);
        console.log(`Phone:`, body.phone);
        console.log(`Interest:`, body.interest);
        console.log(`Message:`, body.message);
        console.log('---------------------');

        return NextResponse.json(
            { success: true, message: 'Message successfully handled and logged format' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact Submission Form Error:', error);

        return NextResponse.json(
            { success: false, error: 'Internal Contact configuration processing failure limit' },
            { status: 500 }
        );
    }
}
