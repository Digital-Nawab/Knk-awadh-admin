import { NextResponse } from "next/server";
import { authController } from "@/controllers/AuthController";

export async function POST(req) {
    const { email, password } = await req.json();
    const result = await authController.login(email, password);

    if (result.error) {
        return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const res = NextResponse.json({ success: true, user: result.user });
    res.cookies.set("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    return res;
}