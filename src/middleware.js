import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    let isValid = false;
    if (token) {
        try {
            await jwtVerify(token, SECRET);
            isValid = true;
        } catch {
            isValid = false;
        }
    }

    if (pathname.startsWith("/admin") && !isValid) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname === "/login" && isValid) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    const res = NextResponse.next();

    if (pathname.startsWith("/admin")) {
        res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    }

    return res;
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};