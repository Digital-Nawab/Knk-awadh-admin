import { NextResponse } from "next/server";
import { authController } from "@/controllers/AuthController";

export async function POST(req) {
    try {
        const body = await req.json().catch(() => ({}));
        const { email, password, rememberMe = false } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const result = await authController.login(email, password, Boolean(rememberMe));

        if (result.error) {
            return NextResponse.json(
                { error: result.error },
                { status: result.status || 401 }
            );
        }

        // Determine if request is truly HTTPS.
        // On VPS / IP deployments accessed via plain HTTP (e.g. http://187.126.121.195:3000),
        // browsers strictly REJECT any cookie that includes the 'Secure' attribute.
        // Therefore, secure MUST be false whenever the origin or request is HTTP.
        const origin = req.headers.get("origin") || "";
        const referer = req.headers.get("referer") || "";
        const forwardedProto = req.headers.get("x-forwarded-proto");

        let isHttps = false;
        if (process.env.COOKIE_SECURE !== undefined) {
            isHttps = process.env.COOKIE_SECURE === "true";
        } else if (
            origin.startsWith("http://") ||
            referer.startsWith("http://") ||
            forwardedProto === "http" ||
            req.nextUrl.protocol === "http:"
        ) {
            isHttps = false;
        } else if (
            forwardedProto === "https" ||
            origin.startsWith("https://") ||
            referer.startsWith("https://") ||
            req.nextUrl.protocol === "https:"
        ) {
            isHttps = true;
        }

        const res = NextResponse.json({
            success: true,
            message: "Login successful! Redirecting...",
            user: result.user,
        });

        const cookieOptions = {
            httpOnly: true,
            secure: isHttps,
            sameSite: "lax",
            path: "/",
        };

        if (result.rememberMe) {
            cookieOptions.maxAge = 60 * 60 * 24 * 30; // 30 days
            cookieOptions.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
        }

        res.cookies.set("token", result.token, cookieOptions);

        return res;
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json(
            { error: err.message || "Login failed. Please try again." },
            { status: 500 }
        );
    }
}