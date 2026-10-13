import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ success: true, message: "Logged out successfully" });
    res.cookies.set("token", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
        expires: new Date(0),
    });
    return res;
}