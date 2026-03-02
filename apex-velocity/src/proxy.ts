import { auth } from "./auth";
import { NextResponse } from "next/server";

export default async function middleware(request: any) {
    const session = await auth();

    if (request.nextUrl.pathname.startsWith("/admin")) {
        if (request.nextUrl.pathname === "/admin/login") {
            if (session?.user) {
                return NextResponse.redirect(new URL("/admin/dashboard", request.url));
            }
            return NextResponse.next();
        }

        if (!session?.user) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
