import { NextResponse } from "next/server";
import { getBlogById, updateBlog, deleteBlog, toggleBlogPublish } from "@/controllers/BlogController";

export async function GET(req, { params }) {
    const { id } = await params;
    const result = await getBlogById(id);
    return NextResponse.json(result.body, { status: result.status });
}

export async function PUT(req, { params }) {
    const { id } = await params;
    const result = await updateBlog(id, req);
    return NextResponse.json(result.body, { status: result.status });
}

export async function PATCH(req, { params }) {
    const { id } = await params;
    const result = await toggleBlogPublish(id, req);
    return NextResponse.json(result.body, { status: result.status });
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    const result = await deleteBlog(id);
    return NextResponse.json(result.body, { status: result.status });
}
