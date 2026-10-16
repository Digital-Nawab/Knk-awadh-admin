import MetaLeadModel from "@/models/MetaLeadModel";
import { sendLeadEmail } from "@/lib/mail";

const DEFAULT_SECRET_KEY = process.env.META_LEADS_KEY || "knk_meta_leads_2026";
const DEFAULT_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "knk_meta_verify_2026";

/**
 * Fetch lead details from Meta Graph API if leadgen_id is provided and access token is configured
 */
async function fetchMetaGraphLead(leadgenId) {
    const accessToken = process.env.META_ACCESS_TOKEN;
    if (!accessToken || !leadgenId) return null;

    try {
        const url = `https://graph.facebook.com/v20.0/${leadgenId}?access_token=${accessToken}`;
        const res = await fetch(url);
        if (res.ok) {
            return await res.json();
        }
        console.warn("[Meta Graph API] Failed to fetch lead data:", await res.text());
        return null;
    } catch (err) {
        console.error("[Meta Graph API Error]:", err);
        return null;
    }
}

/**
 * Parses Meta Lead Ads payload
 * Supports:
 * 1. Direct Meta Graph webhook payload (entry[0].changes[0].value)
 * 2. Meta Lead Ads field_data array structure
 * 3. Zapier, Make.com, Pabbly Connect & direct JSON webhook forwarding
 */
export async function parseMetaPayload(body) {
    if (!body || typeof body !== "object") {
        return {
            name: "Unknown Lead",
            phone: "N/A",
            platform: "instagram",
            rawPayload: body,
        };
    }

    let leadId = body.lead_id || body.leadId || body.leadgen_id || body.id || null;
    let formId = body.form_id || body.formId ? String(body.form_id || body.formId) : null;
    let formName = body.form_name || body.formName || null;
    let campaignId = body.campaign_id || body.campaignId ? String(body.campaign_id || body.campaignId) : null;
    let campaignName = body.campaign_name || body.campaignName || null;
    let adsetId = body.adset_id || body.adsetId || body.adgroup_id ? String(body.adset_id || body.adsetId || body.adgroup_id) : null;
    let adsetName = body.adset_name || body.adsetName || null;
    let adId = body.ad_id || body.adId ? String(body.ad_id || body.adId) : null;
    let adName = body.ad_name || body.adName || null;
    let platform = body.platform || body.publisher_platform || body.source || "instagram";

    let name = "";
    let phone = "";
    let email = "";
    let city = "";
    let postalCode = "";
    let serviceInterested = "";
    let preferredBranch = "";
    const customFields = {};

    // 1. Check if this is a standard Meta Leadgen Webhook entry
    // Structure: { object: "page", entry: [{ changes: [{ field: "leadgen", value: { leadgen_id, form_id, ad_id, ... } }] }] }
    let metaGraphData = null;
    if (Array.isArray(body.entry) && body.entry[0]?.changes?.[0]?.value) {
        const val = body.entry[0].changes[0].value;
        leadId = val.leadgen_id || leadId;
        formId = val.form_id || formId;
        adId = val.ad_id || adId;
        adsetId = val.adgroup_id || adsetId;
        if (val.platform) platform = val.platform;

        // Try to fetch lead details using Graph API if token available
        if (leadId) {
            metaGraphData = await fetchMetaGraphLead(leadId);
        }
    }

    // 2. Parse field_data array (from Meta Graph API, Meta Webhook Tester, or Zapier)
    const fieldData = body.field_data || metaGraphData?.field_data;
    if (Array.isArray(fieldData)) {
        for (const item of fieldData) {
            const key = String(item.name || "").toLowerCase().trim();
            const val = Array.isArray(item.values) ? String(item.values[0] || "").trim() : String(item.value || "").trim();

            if (!val) continue;

            if (key === "full_name" || key === "name") {
                name = val;
            } else if (key === "first_name") {
                name = name ? `${val} ${name}` : val;
            } else if (key === "last_name") {
                name = name ? `${name} ${val}` : val;
            } else if (key === "phone_number" || key === "phone" || key === "mobile") {
                phone = val;
            } else if (key === "email") {
                email = val;
            } else if (key === "city") {
                city = val;
            } else if (key === "post_code" || key === "postal_code" || key === "zip_code") {
                postalCode = val;
            } else if (key.includes("service") || key.includes("treatment") || key.includes("interested")) {
                serviceInterested = val;
            } else if (key.includes("branch") || key.includes("location") || key.includes("center")) {
                preferredBranch = val;
            } else {
                customFields[item.name || key] = val;
            }
        }
    }

    // 3. Flat property fallbacks (Zapier, Make, Pabbly, Custom Webhooks, Simulator)
    if (!name && (body.name || body.fullName || body.full_name)) {
        name = String(body.name || body.fullName || body.full_name || "").trim();
    }
    if (!phone && (body.phone || body.phoneNumber || body.phone_number || body.mobile)) {
        phone = String(body.phone || body.phoneNumber || body.phone_number || body.mobile || "").trim();
    }
    if (!email && (body.email || body.userEmail || body.user_email)) {
        email = String(body.email || body.userEmail || body.user_email || "").trim();
    }
    if (!city && (body.city || body.userCity)) {
        city = String(body.city || body.userCity || "").trim();
    }
    if (!postalCode && (body.postalCode || body.postal_code || body.zipCode || body.zip_code)) {
        postalCode = String(body.postalCode || body.postal_code || body.zipCode || body.zip_code || "").trim();
    }
    if (!serviceInterested && (body.service || body.serviceInterested || body.service_interested || body.treatment)) {
        serviceInterested = String(body.service || body.serviceInterested || body.service_interested || body.treatment || "").trim();
    }
    if (!preferredBranch && (body.branch || body.preferredBranch || body.preferred_branch)) {
        preferredBranch = String(body.branch || body.preferredBranch || body.preferred_branch || "").trim();
    }

    // Platform normalization
    const cleanPlatform = String(platform || "").toLowerCase();
    let finalPlatform = "instagram";
    if (cleanPlatform.includes("facebook") || cleanPlatform === "fb") {
        finalPlatform = "facebook";
    } else if (cleanPlatform.includes("instagram") || cleanPlatform === "ig") {
        finalPlatform = "instagram";
    }

    const isTest = Boolean(body.is_test || body.isTest || (leadId && String(leadId).toLowerCase().includes("test")));

    return {
        leadId,
        formId,
        formName,
        campaignId,
        campaignName,
        adsetId,
        adsetName,
        adId,
        adName,
        platform: finalPlatform,
        name: name || "Meta Ads Lead",
        phone: phone || "Not Provided",
        email: email || null,
        city: city || null,
        postalCode: postalCode || null,
        serviceInterested: serviceInterested || null,
        preferredBranch: preferredBranch || null,
        isTest,
        customFields: Object.keys(customFields).length > 0 ? customFields : null,
        rawPayload: body,
    };
}

/**
 * Public Webhook Handler for incoming Meta Leads
 * Handles both GET (Meta Hub challenge verification) and POST (Lead event)
 */
export async function handleWebhook(request) {
    try {
        let body;
        const contentType = request.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            body = await request.json();
        } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            body = {};
            for (const [key, value] of formData.entries()) {
                body[key] = value;
            }
        } else {
            const text = await request.text();
            try {
                body = JSON.parse(text);
            } catch {
                body = { rawText: text };
            }
        }

        const { searchParams } = new URL(request.url);
        const queryKey = searchParams.get("key") || searchParams.get("token") || searchParams.get("secret");
        const bodyKey = body?.meta_key || body?.metaKey || body?.key || body?.token;
        const providedKey = queryKey || bodyKey;

        // Verify key if env variable is set or key provided (allow test leads without strict fail)
        if (process.env.META_LEADS_KEY && providedKey && providedKey !== process.env.META_LEADS_KEY) {
            console.warn("[Meta Leads Webhook] Key mismatch:", { provided: providedKey });
            if (!body?.is_test && !body?.isTest) {
                return {
                    status: 401,
                    body: { error: "Unauthorized: Invalid meta_key" },
                };
            }
        }

        const parsed = await parseMetaPayload(body);

        const newLead = await MetaLeadModel.create({
            leadId: parsed.leadId,
            formId: parsed.formId,
            formName: parsed.formName,
            campaignId: parsed.campaignId,
            campaignName: parsed.campaignName,
            adsetId: parsed.adsetId,
            adsetName: parsed.adsetName,
            adId: parsed.adId,
            adName: parsed.adName,
            platform: parsed.platform,
            name: parsed.name,
            phone: parsed.phone,
            email: parsed.email,
            city: parsed.city,
            postalCode: parsed.postalCode,
            serviceInterested: parsed.serviceInterested,
            preferredBranch: parsed.preferredBranch,
            status: "pending",
            isTest: parsed.isTest,
            customFields: parsed.customFields,
            rawPayload: parsed.rawPayload,
        });

        // Send instant email notification to admin (safe: non-blocking)
        try {
            sendLeadEmail({
                id: newLead.id,
                formType: parsed.isTest
                    ? `Meta Lead Ads (TEST - ${parsed.platform.toUpperCase()})`
                    : `Meta Lead Ads (${parsed.platform.toUpperCase()})`,
                name: parsed.name,
                phone: parsed.phone,
                email: parsed.email,
                serviceOrCourse: parsed.serviceInterested || `${parsed.platform.toUpperCase()} Ad Inquiry`,
                branchLocation: parsed.preferredBranch || "KNK Salon Lucknow",
                city: parsed.city,
                message: `Platform: ${parsed.platform.toUpperCase()} | Form: ${parsed.formName || parsed.formId || "N/A"} | Campaign: ${parsed.campaignName || "N/A"} | Lead ID: ${parsed.leadId || "N/A"}`,
            }).catch(() => {});
        } catch {
            // Ignore email errors so webhook returns 200 to Meta
        }

        return {
            status: 200,
            body: {
                success: true,
                message: "Meta lead processed and saved to CRM successfully",
                leadId: newLead.id,
                platform: parsed.platform,
                isTest: parsed.isTest,
            },
        };
    } catch (error) {
        console.error("[Meta Leads Webhook Error]:", error);
        return {
            status: 500,
            body: { error: "Failed to process Meta lead webhook", details: error.message },
        };
    }
}

/**
 * Handle Meta Webhook Verification (GET request with hub.challenge)
 */
export function handleVerification(request) {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    const expectedToken = process.env.META_VERIFY_TOKEN || DEFAULT_VERIFY_TOKEN;

    if (mode === "subscribe" && token === expectedToken) {
        return {
            status: 200,
            text: challenge || "",
        };
    }

    // If query params are absent, provide a friendly JSON status response
    const config = getWebhookConfig(request);
    return {
        status: 200,
        body: {
            status: "active",
            service: "KNK Awadh Meta Leads Webhook",
            webhookUrl: config.body.webhookUrl,
            verifyToken: expectedToken,
            message: "Meta Leads webhook endpoint is online and ready for Meta verification & lead ingestion.",
        },
    };
}

/**
 * Admin: Get all leads with status, platform & search filtering + stats counts
 */
export async function listLeads(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status") || "all";
        const platform = searchParams.get("platform") || "all";
        const search = searchParams.get("search") || "";
        const isTest = searchParams.get("isTest");
        const limit = Number(searchParams.get("limit")) || 100;
        const offset = Number(searchParams.get("offset")) || 0;

        const [leads, stats] = await Promise.all([
            MetaLeadModel.getAll({ status, platform, search, isTest, limit, offset }),
            MetaLeadModel.getStats(),
        ]);

        return {
            status: 200,
            body: { success: true, leads, stats },
        };
    } catch (error) {
        console.error("List Meta leads error:", error);
        return {
            status: 500,
            body: { error: "Failed to fetch Meta leads", details: error.message },
        };
    }
}

/**
 * Admin: Update lead status
 */
export async function updateLeadStatus(id, requestOrBody) {
    try {
        const body = typeof requestOrBody?.json === "function" ? await requestOrBody.json() : requestOrBody;
        const status = body?.status;
        if (!status) {
            return { status: 400, body: { error: "Status is required." } };
        }
        await MetaLeadModel.updateStatus(id, status);
        return {
            status: 200,
            body: { success: true, message: `Status updated to ${status}.` },
        };
    } catch (error) {
        console.error("Update Meta lead status error:", error);
        return { status: 500, body: { error: "Failed to update status." } };
    }
}

/**
 * Admin: Update internal notes
 */
export async function updateLeadNotes(id, requestOrBody) {
    try {
        const body = typeof requestOrBody?.json === "function" ? await requestOrBody.json() : requestOrBody;
        const notes = body?.notes;
        await MetaLeadModel.updateNotes(id, notes);
        return {
            status: 200,
            body: { success: true, message: "Notes updated successfully." },
        };
    } catch (error) {
        console.error("Update Meta lead notes error:", error);
        return { status: 500, body: { error: "Failed to update notes." } };
    }
}

/**
 * Admin: Assign lead to staff / branch
 */
export async function assignLead(id, requestOrBody) {
    try {
        const body = typeof requestOrBody?.json === "function" ? await requestOrBody.json() : requestOrBody;
        const assignedTo = body?.assignedTo;
        const preferredBranch = body?.preferredBranch;
        await MetaLeadModel.updateAssignedTo(id, assignedTo, preferredBranch);
        return {
            status: 200,
            body: { success: true, message: "Lead assigned successfully." },
        };
    } catch (error) {
        console.error("Assign Meta lead error:", error);
        return { status: 500, body: { error: "Failed to assign lead." } };
    }
}

/**
 * Admin: Delete a lead
 */
export async function deleteLead(id) {
    try {
        await MetaLeadModel.delete(id);
        return {
            status: 200,
            body: { success: true, message: "Lead deleted successfully." },
        };
    } catch (error) {
        console.error("Delete Meta lead error:", error);
        return { status: 500, body: { error: "Failed to delete lead." } };
    }
}

/**
 * Admin: Bulk actions (update status or delete)
 */
export async function bulkActions(request) {
    try {
        const { action, ids, status } = await request.json();
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return { status: 400, body: { error: "No lead IDs selected." } };
        }

        if (action === "update_status") {
            if (!status) return { status: 400, body: { error: "Status is required." } };
            await MetaLeadModel.bulkUpdateStatus(ids, status);
            return {
                status: 200,
                body: { success: true, message: `${ids.length} leads updated to ${status}.` },
            };
        }

        if (action === "delete") {
            await MetaLeadModel.bulkDelete(ids);
            return {
                status: 200,
                body: { success: true, message: `${ids.length} leads deleted.` },
            };
        }

        return { status: 400, body: { error: "Invalid action." } };
    } catch (error) {
        console.error("Bulk actions error:", error);
        return { status: 500, body: { error: "Failed to perform bulk action." } };
    }
}

/**
 * Admin: Generate Simulated Meta Lead (Instagram or Facebook) for instant preview
 */
export async function simulateTestLead(request) {
    try {
        const host = request?.headers?.get?.("x-forwarded-host") || request?.headers?.get?.("host") || "";
        const isLive = host && !host.includes("localhost") && !host.includes("127.0.0.1") && !host.startsWith("192.168.");
        if (isLive || process.env.NODE_ENV === "production") {
            return {
                status: 403,
                body: { error: "Test lead simulation is disabled on live production to preserve real lead data." },
            };
        }

        const body = await request.json().catch(() => ({}));
        const sampleNames = ["Tanvi Sharma", "Ritika Saxena", "Shivani Dixit", "Pooja Chawla", "Aditi Rastogi"];
        const sampleServices = ["Bridal Makeup Consultation", "Instagram Special Keratin Hair Spa", "HydraFacial Glow", "Russian Manicure & Nail Art", "Pre-Bridal Luxury Package"];
        const sampleBranches = ["KNK Salon Mahanagar", "KNK Salon Gomti Nagar", "KNK Salon Hazratganj"];
        const sampleCities = ["Lucknow", "Kanpur", "Ayodhya", "Prayagraj"];
        const samplePlatforms = ["instagram", "facebook"];

        const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
        const randomService = sampleServices[Math.floor(Math.random() * sampleServices.length)];
        const randomBranch = sampleBranches[Math.floor(Math.random() * sampleBranches.length)];
        const randomCity = sampleCities[Math.floor(Math.random() * sampleCities.length)];
        const randomPlatform = samplePlatforms[Math.floor(Math.random() * samplePlatforms.length)];
        const randomPhone = `+91 91${Math.floor(10000000 + Math.random() * 90000000)}`;
        const testId = `meta_test_${Date.now()}`;

        const simulatedLead = await MetaLeadModel.create({
            leadId: testId,
            formId: "form_meta_bridal_2026",
            formName: "KNK Awadh - Bridal & Salon Instant Lead Form",
            campaignId: "camp_meta_lucknow_festive",
            campaignName: body.campaignName || "Meta Ads - Instagram Reels Bridal & Hair Campaign",
            adsetId: "adset_lucknow_women_22_35",
            adsetName: "Lucknow Women 20-35 Premium Audience",
            adId: "ad_bridal_reel_video_1",
            adName: "Bridal Transformation Reel Ad",
            platform: body.platform || randomPlatform,
            name: body.name || randomName,
            phone: body.phone || randomPhone,
            email: body.email || `${(body.name || randomName).toLowerCase().replace(/\s+/g, ".")}@example.com`,
            city: body.city || randomCity,
            postalCode: "226001",
            serviceInterested: body.service || randomService,
            preferredBranch: body.branch || randomBranch,
            status: "pending",
            notes: "Simulated Meta test lead generated from Admin CRM testing console.",
            isTest: true,
            customFields: {
                "Preferred Appointment Date": "Next Weekend",
                "Ad Format": "Instagram Sponsored Reel",
            },
            rawPayload: {
                leadgen_id: testId,
                form_id: "form_meta_bridal_2026",
                platform: body.platform || randomPlatform,
                created_time: Math.floor(Date.now() / 1000),
                field_data: [
                    { name: "full_name", values: [body.name || randomName] },
                    { name: "phone_number", values: [body.phone || randomPhone] },
                    { name: "email", values: [`${(body.name || randomName).toLowerCase().replace(/\s+/g, ".")}@example.com`] },
                    { name: "city", values: [body.city || randomCity] },
                ],
            },
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Test Meta lead simulated and saved to CRM!",
                lead: simulatedLead,
            },
        };
    } catch (error) {
        console.error("Simulate test Meta lead error:", error);
        return { status: 500, body: { error: "Failed to simulate test lead." } };
    }
}

/**
 * Return Webhook setup configuration for Meta Ads (Facebook & Instagram)
 */
export function getWebhookConfig(request) {
    const forwardedHost = request?.headers?.get?.("x-forwarded-host");
    const forwardedProto = request?.headers?.get?.("x-forwarded-proto");
    const host = forwardedHost || request?.headers?.get?.("host") || "";
    const proto = forwardedProto || (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");

    let liveOrigin = "";
    if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
        liveOrigin = `${proto}://${host}`;
    } else if (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")) {
        liveOrigin = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    } else {
        liveOrigin = "https://knksalonawadh.com";
    }

    const localOrigin = request?.nextUrl?.origin || "http://localhost:3000";
    const webhookUrl = `${liveOrigin}/api/webhooks/meta-leads`;
    const localWebhookUrl = `${localOrigin}/api/webhooks/meta-leads`;
    const verifyToken = process.env.META_VERIFY_TOKEN || DEFAULT_VERIFY_TOKEN;
    const secretKey = process.env.META_LEADS_KEY || DEFAULT_SECRET_KEY;

    return {
        status: 200,
        body: {
            success: true,
            webhookUrl,
            productionUrl: webhookUrl,
            localWebhookUrl,
            liveOrigin,
            verifyToken,
            secretKey,
            methods: [
                {
                    title: "Option 1: Meta Business Suite / Facebook App (Direct Webhook)",
                    steps: [
                        "Go to Meta for Developers (developers.facebook.com) > Your App > Webhooks.",
                        "Select 'Page' topic and click 'Subscribe to this object'.",
                        "Paste the Webhook Callback URL: " + webhookUrl,
                        "Paste the Verify Token: " + verifyToken,
                        "Click 'Verify and Save'.",
                        "Subscribe to the 'leadgen' field.",
                    ],
                },
                {
                    title: "Option 2: Zapier / Make.com / Pabbly Connect (Zero-Code Instant Setup)",
                    steps: [
                        "Create a new scenario/zap with trigger: 'Facebook Lead Ads' -> 'New Lead'.",
                        "Select your Facebook Page & Lead Form.",
                        "Add Action: 'Webhooks' -> 'POST'.",
                        "Enter URL: " + webhookUrl + "?key=" + secretKey,
                        "Map the fields: name, phone, email, city, service, campaign_name, platform.",
                        "Test and Turn On!",
                    ],
                },
            ],
        },
    };
}
