import { GET as getHandler, PUT as putHandler } from "@/app/api/services/process/route";

export const dynamic = "force-dynamic";

export async function GET(request) {
    return getHandler(request);
}

export async function PUT(request) {
    return putHandler(request);
}
