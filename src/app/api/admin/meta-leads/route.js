import { listLeads, simulateTestLead, bulkActions } from "@/controllers/MetaLeadController";

export const dynamic = "force-dynamic";

export async function GET(request) {
    const result = await listLeads(request);
    return Response.json(result.body, { status: result.status });
}

export async function POST(request) {
    try {
        const body = await request.clone().json().catch(() => ({}));
        if (body.action === "simulate" || body.action === "test") {
            const result = await simulateTestLead(request);
            return Response.json(result.body, { status: result.status });
        }
        if (body.action === "bulk_status" || body.action === "bulk_delete" || body.action === "update_status" || body.action === "delete") {
            const result = await bulkActions(request);
            return Response.json(result.body, { status: result.status });
        }
        return Response.json({ error: "Invalid action." }, { status: 400 });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
