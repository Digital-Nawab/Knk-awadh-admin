import { NextResponse } from "next/server";
import { createBlog, listBlogs } from "@/controllers/BlogController";

export async function GET(req) {
    const result = await listBlogs(req);
    return NextResponse.json(result.body, { status: result.status });
}

export async function POST(req) {
    const result = await createBlog(req);
    return NextResponse.json(result.body, { status: result.status });
}
