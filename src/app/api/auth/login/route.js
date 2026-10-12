import { NextResponse } from "next/server";
import { authController } from "@/controllers/AuthController";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const result = await authController.login(email, password);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: result.status });
        }

        const isHttps =
            req.headers.get("x-forwarded-proto") === "https" ||
            req.nextUrl.protocol === "https:";

        const res = NextResponse.json({ success: true, user: result.user });
        res.cookies.set("token", result.token, {
            httpOnly: true,
            secure: isHttps,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        return res;
    } catch (err) {
        console.error("Login error:", err);
        return NextResponse.json(
            { error: err.message || "Login failed. Please try again." },
            { status: 500 }
        );
    }
}