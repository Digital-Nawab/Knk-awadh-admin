import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import OfferModel from "@/models/OfferModel";
import { getSafeOriginalFilename, writeUploadBuffer, deleteUploadFile } from "@/lib/uploadHelper";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "offers");

export async function listOffers(request) {
    try {
        let activeOnly = false;
        let category = null;
        let search = null;

        if (request && request.url) {
            const { searchParams } = new URL(request.url);
            activeOnly = searchParams.get("activeOnly") === "true";
            category = searchParams.get("category");
            search = searchParams.get("search");
        }

        const offers = await OfferModel.getAll({ activeOnly, category, search });
        return { status: 200, body: { offers } };
    } catch (error) {
        console.error("List offers error:", error);
        return { status: 500, body: { error: error.message || "Failed to load offers." } };
    }
}

export async function getOffer(id) {
    try {
        const offer = await OfferModel.getById(id);
        if (!offer) {
            return { status: 404, body: { error: "Offer not found." } };
        }
        return { status: 200, body: { offer } };
    } catch (error) {
        console.error("Get offer error:", error);
        return { status: 500, body: { error: error.message || "Failed to fetch offer." } };
    }
}

export async function createOffer(request) {
    try {
        await mkdir(UPLOAD_DIR, { recursive: true });

        const contentType = request.headers.get("content-type") || "";
        let title = "";
        let altText = "";
        let tagline = "";
        let servicesIncluded = "";
        let price = "";
        let originalPrice = "";
        let badge = "";
        let imageUrl = "";
        let category = "All";
        let validUntil = "";
        let terms = "";
        let displayOrder = null;
        let isActive = true;

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            title = (formData.get("title") || formData.get("altText") || formData.get("alt_text") || "").trim();
            altText = (formData.get("altText") || formData.get("alt_text") || title || "").trim();
            if (!title) title = altText;
            if (!altText) altText = title;
            tagline = (formData.get("tagline") || "").trim();
            servicesIncluded = (formData.get("servicesIncluded") || formData.get("services_included") || "").trim();
            price = (formData.get("price") || "").trim();
            originalPrice = (formData.get("originalPrice") || formData.get("original_price") || "").trim();
            badge = (formData.get("badge") || "").trim();
            category = (formData.get("category") || "All").trim();
            validUntil = (formData.get("validUntil") || formData.get("valid_until") || "").trim();
            terms = (formData.get("terms") || "").trim();

            const orderRaw = formData.get("displayOrder") || formData.get("display_order");
            if (orderRaw !== null && orderRaw !== undefined && !isNaN(Number(orderRaw))) {
                displayOrder = Number(orderRaw);
            }

            const activeRaw = formData.get("isActive") ?? formData.get("is_active");
            if (activeRaw !== null && activeRaw !== undefined) {
                isActive = activeRaw === "true" || activeRaw === true || activeRaw === "1" || activeRaw === 1;
            }

            // Check for file upload
            const file = formData.get("image") || formData.get("file");
            if (file && typeof file !== "string" && file.size > 0) {
                if (!IMAGE_TYPES.includes(file.type)) {
                    return {
                        status: 400,
                        body: { error: `Invalid image type for "${file.name}". Only JPG, PNG, WEBP, and AVIF are allowed.` },
                    };
                }
                const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, file.name, ".webp");
                const buffer = Buffer.from(await file.arrayBuffer());
                await writeUploadBuffer(filePath, buffer);
                imageUrl = `/admin-assets/offers/${fileName}`;
            } else {
                imageUrl = (formData.get("imageUrl") || formData.get("image_url") || "").trim();
            }
        } else {
            const data = await request.json();
            title = (data.title || data.altText || data.alt_text || "").trim();
            altText = (data.altText || data.alt_text || title || "").trim();
            if (!title) title = altText;
            if (!altText) altText = title;
            tagline = (data.tagline || "").trim();
            servicesIncluded = (data.servicesIncluded || data.services_included || "").trim();
            price = (data.price || "").trim();
            originalPrice = (data.originalPrice || data.original_price || "").trim();
            badge = (data.badge || "").trim();
            imageUrl = (data.imageUrl || data.image_url || "").trim();
            category = (data.category || "All").trim();
            validUntil = (data.validUntil || data.valid_until || "").trim();
            terms = (data.terms || "").trim();
            if (data.displayOrder !== undefined && data.displayOrder !== null) {
                displayOrder = Number(data.displayOrder);
            }
            if (data.isActive !== undefined) {
                isActive = Boolean(data.isActive);
            }
        }

        if (!title && !altText) {
            title = "Special Offer";
            altText = "Special Offer";
        }

        if (!imageUrl) {
            return { status: 400, body: { error: "Please upload an image or provide an image URL." } };
        }

        const newOffer = await OfferModel.create({
            title,
            altText,
            tagline,
            servicesIncluded,
            price,
            originalPrice,
            badge,
            imageUrl,
            category,
            validUntil,
            terms,
            displayOrder,
            isActive,
        });

        return {
            status: 201,
            body: {
                message: "Offer created successfully.",
                offer: newOffer,
            },
        };
    } catch (error) {
        console.error("Create offer error:", error);
        return { status: 500, body: { error: error.message || "Failed to create offer." } };
    }
}

export async function updateOffer(id, request) {
    try {
        await mkdir(UPLOAD_DIR, { recursive: true });

        const existing = await OfferModel.getById(id);
        if (!existing) {
            return { status: 404, body: { error: "Offer not found." } };
        }

        const contentType = request.headers.get("content-type") || "";
        const updateData = {};

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();

            if (formData.has("title")) updateData.title = (formData.get("title") || "").trim();
            if (formData.has("altText") || formData.has("alt_text")) {
                updateData.altText = (formData.get("altText") || formData.get("alt_text") || "").trim();
            }
            if (formData.has("tagline")) updateData.tagline = (formData.get("tagline") || "").trim();
            if (formData.has("servicesIncluded") || formData.has("services_included")) {
                updateData.servicesIncluded = (formData.get("servicesIncluded") || formData.get("services_included") || "").trim();
            }
            if (formData.has("price")) updateData.price = (formData.get("price") || "").trim();
            if (formData.has("originalPrice") || formData.has("original_price")) {
                updateData.originalPrice = (formData.get("originalPrice") || formData.get("original_price") || "").trim();
            }
            if (formData.has("badge")) updateData.badge = (formData.get("badge") || "").trim();
            if (formData.has("category")) updateData.category = (formData.get("category") || "All").trim();
            if (formData.has("validUntil") || formData.has("valid_until")) {
                updateData.validUntil = (formData.get("validUntil") || formData.get("valid_until") || "").trim();
            }
            if (formData.has("terms")) updateData.terms = (formData.get("terms") || "").trim();

            const orderRaw = formData.get("displayOrder") ?? formData.get("display_order");
            if (orderRaw !== null && orderRaw !== undefined && !isNaN(Number(orderRaw))) {
                updateData.displayOrder = Number(orderRaw);
            }

            const activeRaw = formData.get("isActive") ?? formData.get("is_active");
            if (activeRaw !== null && activeRaw !== undefined) {
                updateData.isActive = activeRaw === "true" || activeRaw === true || activeRaw === "1" || activeRaw === 1;
            }

            const file = formData.get("image") || formData.get("file");
            if (file && typeof file !== "string" && file.size > 0) {
                if (!IMAGE_TYPES.includes(file.type)) {
                    return {
                        status: 400,
                        body: { error: `Invalid image type for "${file.name}". Only JPG, PNG, WEBP, and AVIF are allowed.` },
                    };
                }
                const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, file.name, ".webp");
                const buffer = Buffer.from(await file.arrayBuffer());
                await writeUploadBuffer(filePath, buffer);
                updateData.imageUrl = `/admin-assets/offers/${fileName}`;
            } else if (formData.has("imageUrl") || formData.has("image_url")) {
                const url = (formData.get("imageUrl") || formData.get("image_url") || "").trim();
                if (url) updateData.imageUrl = url;
            }
        } else {
            const data = await request.json();
            if (data.title !== undefined) updateData.title = data.title.trim();
            if (data.altText !== undefined || data.alt_text !== undefined) {
                updateData.altText = (data.altText ?? data.alt_text ?? "").trim();
            }
            if (data.tagline !== undefined) updateData.tagline = data.tagline.trim();
            if (data.servicesIncluded !== undefined || data.services_included !== undefined) {
                updateData.servicesIncluded = (data.servicesIncluded || data.services_included || "").trim();
            }
            if (data.price !== undefined) updateData.price = data.price.trim();
            if (data.originalPrice !== undefined || data.original_price !== undefined) {
                updateData.originalPrice = (data.originalPrice || data.original_price || "").trim();
            }
            if (data.badge !== undefined) updateData.badge = data.badge.trim();
            if (data.category !== undefined) updateData.category = data.category.trim();
            if (data.validUntil !== undefined || data.valid_until !== undefined) {
                updateData.validUntil = (data.validUntil || data.valid_until || "").trim();
            }
            if (data.terms !== undefined) updateData.terms = data.terms.trim();
            if (data.displayOrder !== undefined && data.displayOrder !== null) {
                updateData.displayOrder = Number(data.displayOrder);
            }
            if (data.isActive !== undefined) {
                updateData.isActive = Boolean(data.isActive);
            }
            if (data.imageUrl || data.image_url) {
                updateData.imageUrl = (data.imageUrl || data.image_url).trim();
            }
        }

        await OfferModel.update(id, updateData);
        const updated = await OfferModel.getById(id);

        return {
            status: 200,
            body: {
                message: "Offer updated successfully.",
                offer: updated,
            },
        };
    } catch (error) {
        console.error("Update offer error:", error);
        return { status: 500, body: { error: error.message || "Failed to update offer." } };
    }
}

export async function toggleOfferStatus(id, request) {
    try {
        const body = await request.json();
        const isActive = Boolean(body.isActive ?? body.is_active);
        await OfferModel.updateStatus(id, isActive);
        return { status: 200, body: { message: `Offer ${isActive ? "activated" : "deactivated"} successfully.` } };
    } catch (error) {
        console.error("Toggle offer status error:", error);
        return { status: 500, body: { error: error.message || "Failed to update offer status." } };
    }
}

export async function deleteOffer(id) {
    try {
        const offer = await OfferModel.getById(id);
        if (!offer) {
            return { status: 404, body: { error: "Offer not found." } };
        }

        await OfferModel.delete(id);

        // Delete uploaded file if it was uploaded to /admin-assets/offers/
        if (offer.imageUrl && offer.imageUrl.startsWith("/admin-assets/offers/")) {
            await deleteUploadFile(offer.imageUrl);
        }

        return { status: 200, body: { message: "Offer deleted successfully." } };
    } catch (error) {
        console.error("Delete offer error:", error);
        return { status: 500, body: { error: error.message || "Failed to delete offer." } };
    }
}
