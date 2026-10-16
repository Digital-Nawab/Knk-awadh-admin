import { listCourses, createCourse } from "@/controllers/EnrollCourseController";

export const dynamic = "force-dynamic";

export async function GET(request) {
    const result = await listCourses(request);
    return Response.json(result.body, { status: result.status });
}

export async function POST(request) {
    const result = await createCourse(request);
    return Response.json(result.body, { status: result.status });
}
