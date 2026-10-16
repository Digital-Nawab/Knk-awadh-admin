import {
    updateLeadStatus,
    updateLeadNotes,
    assignLead,
    deleteLead,
} from "@/controllers/MetaLeadController";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const body = await request.clone().json().catch(() => ({}));

    if (body.status !== undefined) {
        const result = await updateLeadStatus(id, body);
        return Response.json(result.body, { status: result.status });
    }

    if (body.notes !== undefined) {
        const result = await updateLeadNotes(id, body);
        return Response.json(result.body, { status: result.status });
    }

    if (body.assignedTo !== undefined || body.preferredBranch !== undefined) {
        const result = await assignLead(id, body);
        return Response.json(result.body, { status: result.status });
    }

    return Response.json({ error: "No valid update field provided." }, { status: 400 });
}

export async function DELETE(request, { params }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const result = await deleteLead(id);
    return Response.json(result.body, { status: result.status });
}
