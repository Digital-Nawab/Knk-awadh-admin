import GoogleLeadModel from "@/models/GoogleLeadModel";
import { sendLeadEmail } from "@/lib/mail";

const DEFAULT_SECRET_KEY = process.env.GOOGLE_LEADS_KEY || "knk_google_leads_2026";

/**
 * Parses Google Ads Lead Form webhook payload
 * Handles both Google Ads standard user_column_data structure
 * and direct key-value formats (Zapier, Make, manual simulator, etc.)
 */
export function parseGoogleAdsPayload(body) {
    if (!body || typeof body !== "object") {
        return {
            name: "Unknown Lead",
            phone: "N/A",
            rawPayload: body,
        };
    }

    let name = "";
    let phone = "";
    let email = "";
    let city = "";
    let postalCode = "";
    let serviceInterested = "";
    let preferredBranch = "";
    const customFields = {};

    // 1. Parse Google Ads standard user_column_data array
    if (Array.isArray(body.user_column_data)) {
        for (const col of body.user_column_data) {
            const colId = String(col.column_id || "").toUpperCase().trim();
            const colName = String(col.column_name || "").toLowerCase().trim();
            const val = String(col.string_value || "").trim();

            if (!val) continue;

            if (colId === "FULL_NAME") {
                name = val;
            } else if (colId === "FIRST_NAME") {
                name = name ? `${val} ${name}` : val;
            } else if (colId === "LAST_NAME") {
                name = name ? `${name} ${val}` : val;
            } else if (colId === "PHONE_NUMBER" || colId === "PHONE") {
                phone = val;
            } else if (colId === "EMAIL" || colId === "WORK_EMAIL") {
                email = val;
            } else if (colId === "CITY") {
                city = val;
            } else if (colId === "POSTAL_CODE" || colId === "ZIP_CODE") {
                postalCode = val;
            } else if (colName.includes("service") || colName.includes("treatment") || colId.includes("SERVICE")) {
                serviceInterested = val;
            } else if (colName.includes("branch") || colName.includes("location") || colId.includes("BRANCH")) {
                preferredBranch = val;
            } else {
                customFields[col.column_name || col.column_id] = val;
            }
        }
    }

    // 2. Direct property fallbacks (Zapier, Make, third-party webhook or test simulator)
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

    const leadId = body.lead_id || body.leadId || null;
    const formId = body.form_id || body.formId ? String(body.form_id || body.formId) : null;
    const campaignId = body.campaign_id || body.campaignId ? String(body.campaign_id || body.campaignId) : null;
    const campaignName = body.campaign_name || body.campaignName || null;
    const gclId = body.gcl_id || body.gclid || null;
    const isTest = Boolean(body.is_test || body.isTest || (leadId && String(leadId).toLowerCase().includes("test")));

    return {
        leadId,
        formId,
        campaignId,
        campaignName,
        name: name || "Google Ads Lead",
        phone: phone || "Not Provided",
        email: email || null,
        city: city || null,
        postalCode: postalCode || null,
        serviceInterested: serviceInterested || null,
        preferredBranch: preferredBranch || null,
        isTest,
        gclId,
        customFields: Object.keys(customFields).length > 0 ? customFields : null,
        rawPayload: body,
    };
}

/**
 * Public Webhook Handler for incoming Google Ads leads
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
        const bodyKey = body.google_key || body.googleKey || body.key || body.token;
        const providedKey = queryKey || bodyKey;

        // Verify key if env variable is set or key provided
        if (process.env.GOOGLE_LEADS_KEY && providedKey && providedKey !== process.env.GOOGLE_LEADS_KEY) {
            console.warn("[Google Leads Webhook] Key mismatch:", { provided: providedKey });
            // Don't fail test leads from Google Ads verification tester
            if (!body.is_test && !body.isTest) {
                return {
                    status: 401,
                    body: { error: "Unauthorized: Invalid google_key" },
                };
            }
        }

        const parsed = parseGoogleAdsPayload(body);

        const newLead = await GoogleLeadModel.create({
            leadId: parsed.leadId,
            formId: parsed.formId,
            campaignId: parsed.campaignId,
            campaignName: parsed.campaignName,
            name: parsed.name,
            phone: parsed.phone,
            email: parsed.email,
            city: parsed.city,
            postalCode: parsed.postalCode,
            serviceInterested: parsed.serviceInterested,
            preferredBranch: parsed.preferredBranch,
            status: "pending",
            isTest: parsed.isTest,
            gclId: parsed.gclId,
            customFields: parsed.customFields,
            rawPayload: parsed.rawPayload,
        });

        // Send instant email notification to admin (safe: non-blocking)
        try {
            sendLeadEmail({
                id: newLead.id,
                formType: parsed.isTest ? "Google Ads Lead Form (TEST)" : "Google Ads Lead Form",
                name: parsed.name,
                phone: parsed.phone,
                email: parsed.email,
                serviceOrCourse: parsed.serviceInterested || "Google Ads Inquiry",
                branchLocation: parsed.preferredBranch || "KNK Salon Lucknow",
                city: parsed.city,
                message: `Lead ID: ${parsed.leadId || "N/A"} | Campaign ID: ${parsed.campaignId || "N/A"}${parsed.gclId ? ` | GCLID: ${parsed.gclId}` : ""}`,
            }).catch(() => {});
        } catch {
            // Ignore email errors so webhook returns 200 to Google
        }

        return {
            status: 200,
            body: {
                success: true,
                message: "Lead processed and saved to CRM successfully",
                leadId: newLead.id,
                isTest: parsed.isTest,
            },
        };
    } catch (error) {
        console.error("[Google Leads Webhook Error]:", error);
        return {
            status: 500,
            body: { error: "Failed to process Google Ads lead webhook", details: error.message },
        };
    }
}

/**
 * Admin: Get all leads with status & search filtering + stats counts
 */
export async function listLeads(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status") || "all";
        const search = searchParams.get("search") || "";
        const isTest = searchParams.get("isTest");
        const limit = Number(searchParams.get("limit")) || 100;
        const offset = Number(searchParams.get("offset")) || 0;

        const [leads, stats] = await Promise.all([
            GoogleLeadModel.getAll({ status, search, isTest, limit, offset }),
            GoogleLeadModel.getStats(),
        ]);

        return {
            status: 200,
            body: { success: true, leads, stats },
        };
    } catch (error) {
        console.error("List Google leads error:", error);
        return {
            status: 500,
            body: { error: "Failed to fetch Google Ads leads", details: error.message },
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
        await GoogleLeadModel.updateStatus(id, status);
        return {
            status: 200,
            body: { success: true, message: `Status updated to ${status}.` },
        };
    } catch (error) {
        console.error("Update Google lead status error:", error);
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
        await GoogleLeadModel.updateNotes(id, notes);
        return {
            status: 200,
            body: { success: true, message: "Notes updated successfully." },
        };
    } catch (error) {
        console.error("Update Google lead notes error:", error);
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
        await GoogleLeadModel.updateAssignedTo(id, assignedTo, preferredBranch);
        return {
            status: 200,
            body: { success: true, message: "Lead assigned successfully." },
        };
    } catch (error) {
        console.error("Assign Google lead error:", error);
        return { status: 500, body: { error: "Failed to assign lead." } };
    }
}

/**
 * Admin: Delete a lead
 */
export async function deleteLead(id) {
    try {
        await GoogleLeadModel.delete(id);
        return {
            status: 200,
            body: { success: true, message: "Lead deleted successfully." },
        };
    } catch (error) {
        console.error("Delete Google lead error:", error);
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
            await GoogleLeadModel.bulkUpdateStatus(ids, status);
            return {
                status: 200,
                body: { success: true, message: `${ids.length} leads updated to ${status}.` },
            };
        }

        if (action === "delete") {
            await GoogleLeadModel.bulkDelete(ids);
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
 * Admin: Generate Simulated Google Ads Lead for instant live testing
 */
export async function simulateTestLead(request) {
    try {
        const body = await request.json().catch(() => ({}));
        const sampleNames = ["Priya Verma", "Aarav Kapoor", "Ananya Singh", "Rohan Mehta", "Sanya Gupta"];
        const sampleServices = ["Bridal Makeup & Hair Styling", "Nanoplastia Hair Treatment", "HydraFacial Glow Therapy", "Keratin Hair Smoothening", "Balayage & Global Colour"];
        const sampleBranches = ["KNK Mahanagar", "KNK Gomti Nagar", "KNK Hazratganj"];
        const sampleCities = ["Lucknow", "Kanpur", "Ayodhya", "Varanasi"];

        const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
        const randomService = sampleServices[Math.floor(Math.random() * sampleServices.length)];
        const randomBranch = sampleBranches[Math.floor(Math.random() * sampleBranches.length)];
        const randomCity = sampleCities[Math.floor(Math.random() * sampleCities.length)];
        const randomPhone = `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`;
        const testId = `test_google_${Date.now()}`;

        const simulatedLead = await GoogleLeadModel.create({
            leadId: testId,
            formId: "form_knk_awadh_leadgen",
            campaignId: "campaign_lucknow_search_2026",
            campaignName: body.campaignName || "Google Ads - Lucknow Hair & Bridal Search Campaign",
            name: body.name || randomName,
            phone: body.phone || randomPhone,
            email: body.email || `${(body.name || randomName).toLowerCase().replace(/\s+/g, ".")}@example.com`,
            city: body.city || randomCity,
            postalCode: "226010",
            serviceInterested: body.service || randomService,
            preferredBranch: body.branch || randomBranch,
            status: "pending",
            notes: "Simulated test lead generated from Admin CRM testing console.",
            isTest: true,
            gclId: `CjwKCAjw_${Date.now().toString(36)}`,
            customFields: {
                "Preferred Time": "Weekend Morning",
                "Heard About Us": "Google Search Ad",
            },
            rawPayload: {
                lead_id: testId,
                api_version: "1.0",
                is_test: true,
                campaign_id: "987654321",
                user_column_data: [
                    { column_id: "FULL_NAME", string_value: body.name || randomName },
                    { column_id: "PHONE_NUMBER", string_value: body.phone || randomPhone },
                    { column_id: "EMAIL", string_value: `${(body.name || randomName).toLowerCase().replace(/\s+/g, ".")}@example.com` },
                    { column_id: "CITY", string_value: body.city || randomCity },
                ],
            },
        });

        return {
            status: 201,
            body: {
                success: true,
                message: "Test Google Ads lead simulated and saved to CRM!",
                lead: simulatedLead,
            },
        };
    } catch (error) {
        console.error("Simulate test lead error:", error);
        return { status: 500, body: { error: "Failed to simulate test lead." } };
    }
}

/**
 * Return Webhook setup configuration for Google Ads
 */
export function getWebhookConfig(request) {
    const origin = request?.nextUrl?.origin || process.env.NEXT_PUBLIC_SITE_URL || "https://knksalonawadh.com";
    const webhookUrl = `${origin}/api/webhooks/google-leads`;
    const secretKey = DEFAULT_SECRET_KEY;

    return {
        status: 200,
        body: {
            success: true,
            webhookUrl,
            secretKey,
            apiVersion: "1.0",
            steps: [
                "Sign in to your Google Ads account.",
                "In the left page menu, click 'Campaigns' > 'Assets'.",
                "Find or create your 'Lead form' asset and scroll down to 'Lead delivery option'.",
                "Select 'Manage your leads with a webhook'.",
                "Paste the Webhook URL and the Key shown above.",
                "Click 'Send test data' in Google Ads to verify the connection.",
                "Save your Lead Form.",
            ],
        },
    };
}
