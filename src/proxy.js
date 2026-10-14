import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "knk_awadh_jwt_secret_key_2026_secure");

export async function proxy(req) {
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
        const loginUrl = new URL("/login", req.url);
        if (token) {
            loginUrl.searchParams.set("error", "session_expired");
        }
        return NextResponse.redirect(loginUrl);
    }

    if ((pathname === "/login" || pathname === "/admin") && isValid) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    const res = NextResponse.next();

    if (pathname.startsWith("/admin")) {
        res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    }

    return res;
}

export default proxy;

export const config = {
    matcher: ["/admin", "/admin/:path*", "/login"],
};
