import {
    getCourse,
    updateCourse,
    deleteCourse,
    toggleCourseStatus,
} from "@/controllers/EnrollCourseController";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
    const resolvedParams = await params;
    const result = await getCourse(resolvedParams.id);
    return Response.json(result.body, { status: result.status });
}

export async function PUT(request, { params }) {
    const resolvedParams = await params;
    const result = await updateCourse(resolvedParams.id, request);
    return Response.json(result.body, { status: result.status });
}

export async function PATCH(request, { params }) {
    const resolvedParams = await params;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        const cloned = request.clone();
        const body = await cloned.json().catch(() => ({}));
        if ((body.isActive !== undefined || body.is_active !== undefined) && Object.keys(body).length <= 2) {
            const result = await toggleCourseStatus(resolvedParams.id, request);
            return Response.json(result.body, { status: result.status });
        }
    }

    const result = await updateCourse(resolvedParams.id, request);
    return Response.json(result.body, { status: result.status });
}

export async function DELETE(request, { params }) {
    const resolvedParams = await params;
    const result = await deleteCourse(resolvedParams.id);
    return Response.json(result.body, { status: result.status });
}
