import { handleWebhook, handleVerification } from "@/controllers/MetaLeadController";

export const dynamic = "force-dynamic";

/**
 * Meta (Facebook & Instagram) Lead Ads Webhook Endpoint
 * Meta sends POST JSON payloads here when a user submits an instant lead form.
 */
export async function POST(request) {
    const result = await handleWebhook(request);
    return Response.json(result.body, { status: result.status });
}

/**
 * Meta Webhook Verification & Health Check Endpoint
 * Meta performs a GET request with hub.challenge and hub.verify_token during webhook registration.
 */
export async function GET(request) {
    const result = handleVerification(request);
    if (result.text !== undefined) {
        return new Response(result.text, {
            status: result.status,
            headers: { "Content-Type": "text/plain" },
        });
    }
    return Response.json(result.body, { status: result.status });
}

export async function HEAD() {
    return new Response(null, { status: 200 });
}
