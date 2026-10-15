import { handleWebhook, getWebhookConfig } from "@/controllers/GoogleLeadController";

export const dynamic = "force-dynamic";

/**
 * Google Ads Lead Form Webhook Endpoint
 * Google Ads will HTTP POST JSON payloads here when users submit lead forms on ads.
 */
export async function POST(request) {
    const result = await handleWebhook(request);
    return Response.json(result.body, { status: result.status });
}

/**
 * Health check & verification for Google Ads Webhook
 */
export async function GET(request) {
    const config = getWebhookConfig(request);
    return Response.json({
        status: "active",
        service: "KNK Awadh Google Ads Leads Webhook",
        webhookUrl: config.body.webhookUrl,
        message: "Webhook endpoint is online and ready to receive Google Ads leads.",
    }, { status: 200 });
}

export async function HEAD() {
    return new Response(null, { status: 200 });
}
