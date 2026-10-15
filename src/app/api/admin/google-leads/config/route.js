import { getWebhookConfig } from "@/controllers/GoogleLeadController";

export const dynamic = "force-dynamic";

export async function GET(request) {
    const result = getWebhookConfig(request);
    return Response.json(result.body, { status: result.status });
}
