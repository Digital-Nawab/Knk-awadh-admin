import path from "path";
import EnrollCourseModel from "@/models/EnrollCourseModel";
import { getSafeOriginalFilename, writeUploadBuffer, deleteUploadFile } from "@/lib/uploadHelper";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/jpg"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "courses");

export async function listCourses(request) {
    try {
        let activeOnly = false;
        let search = null;

        if (request && request.url) {
            const { searchParams } = new URL(request.url);
            activeOnly = searchParams.get("activeOnly") === "true";
            search = searchParams.get("search");
        }

        const courses = await EnrollCourseModel.getAll({ activeOnly, search });
        return { status: 200, body: { courses } };
    } catch (error) {
        console.error("List courses error:", error);
        return { status: 500, body: { error: "Failed to fetch courses.", details: error.message } };
    }
}

export async function getCourse(id) {
    try {
        const course = await EnrollCourseModel.getById(id);
        if (!course) {
            return { status: 404, body: { error: "Course flyer not found." } };
        }
        return { status: 200, body: { course } };
    } catch (error) {
        console.error("Get course error:", error);
        return { status: 500, body: { error: "Failed to fetch course details." } };
    }
}

export async function createCourse(request) {
    try {
        const contentType = request.headers.get("content-type") || "";

        let title = "";
        let altText = "";
        let imageUrl = "";
        let displayOrder = null;
        let isActive = true;

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();

            title = (formData.get("title") || "").trim();
            altText = (formData.get("altText") || formData.get("alt_text") || title || "").trim();
            if (!title) title = altText;
            if (!altText) altText = title;

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
                imageUrl = `/admin-assets/courses/${fileName}`;
            } else {
                imageUrl = (formData.get("imageUrl") || formData.get("image_url") || "").trim();
            }
        } else {
            const data = await request.json();
            title = (data.title || data.altText || data.alt_text || "").trim();
            altText = (data.altText || data.alt_text || title || "").trim();
            if (!title) title = altText;
            if (!altText) altText = title;
            imageUrl = (data.imageUrl || data.image_url || "").trim();
            if (data.displayOrder !== undefined && !isNaN(Number(data.displayOrder))) {
                displayOrder = Number(data.displayOrder);
            }
            if (data.isActive !== undefined) {
                isActive = Boolean(data.isActive);
            }
        }

        if (!title && !altText) {
            return { status: 400, body: { error: "Course flyer alt text is required." } };
        }
        if (!imageUrl) {
            return { status: 400, body: { error: "Course flyer image is required (upload an image or provide URL)." } };
        }

        const newCourse = await EnrollCourseModel.create({
            title,
            altText,
            imageUrl,
            displayOrder,
            isActive,
        });

        return {
            status: 201,
            body: { success: true, message: "Course flyer created successfully.", course: newCourse },
        };
    } catch (error) {
        console.error("Create course error:", error);
        return { status: 500, body: { error: "Failed to create course flyer.", details: error.message } };
    }
}

export async function updateCourse(id, request) {
    try {
        const existing = await EnrollCourseModel.getById(id);
        if (!existing) {
            return { status: 404, body: { error: "Course flyer not found." } };
        }

        const contentType = request.headers.get("content-type") || "";
        const updateData = {};

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();

            if (formData.has("title")) updateData.title = (formData.get("title") || "").trim();
            if (formData.has("altText") || formData.has("alt_text")) {
                const a = (formData.get("altText") || formData.get("alt_text") || "").trim();
                updateData.altText = a;
                if (!updateData.title && a) updateData.title = a;
            }
            if (formData.has("displayOrder") || formData.get("display_order")) {
                const val = formData.get("displayOrder") || formData.get("display_order");
                if (val !== null && val !== undefined && !isNaN(Number(val))) {
                    updateData.displayOrder = Number(val);
                }
            }
            if (formData.has("isActive") || formData.has("is_active")) {
                const val = formData.get("isActive") ?? formData.get("is_active");
                updateData.isActive = val === "true" || val === true || val === "1" || val === 1;
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
                updateData.imageUrl = `/admin-assets/courses/${fileName}`;

                // Clean up old file if it was uploaded to /admin-assets/courses/
                if (existing.imageUrl && existing.imageUrl.startsWith("/admin-assets/courses/")) {
                    await deleteUploadFile(existing.imageUrl);
                }
            } else if (formData.has("imageUrl") || formData.has("image_url")) {
                const url = (formData.get("imageUrl") || formData.get("image_url") || "").trim();
                if (url) updateData.imageUrl = url;
            }
        } else {
            const data = await request.json();
            if (data.altText !== undefined || data.alt_text !== undefined) {
                const a = (data.altText || data.alt_text || "").trim();
                updateData.altText = a;
                if (!updateData.title && a) updateData.title = a;
            }
            if (data.title !== undefined) updateData.title = (data.title || "").trim();
            if (data.imageUrl !== undefined || data.image_url !== undefined) {
                updateData.imageUrl = (data.imageUrl || data.image_url || "").trim();
            }
            if (data.displayOrder !== undefined && !isNaN(Number(data.displayOrder))) {
                updateData.displayOrder = Number(data.displayOrder);
            }
            if (data.isActive !== undefined) {
                updateData.isActive = Boolean(data.isActive);
            }
        }

        const updated = await EnrollCourseModel.update(id, updateData);
        return {
            status: 200,
            body: { success: true, message: "Course flyer updated successfully.", course: updated },
        };
    } catch (error) {
        console.error("Update course error:", error);
        return { status: 500, body: { error: "Failed to update course flyer.", details: error.message } };
    }
}

export async function deleteCourse(id) {
    try {
        const course = await EnrollCourseModel.getById(id);
        if (!course) {
            return { status: 404, body: { error: "Course flyer not found." } };
        }

        if (course.imageUrl && course.imageUrl.startsWith("/admin-assets/courses/")) {
            await deleteUploadFile(course.imageUrl);
        }

        await EnrollCourseModel.delete(id);
        return { status: 200, body: { success: true, message: "Course flyer deleted successfully." } };
    } catch (error) {
        console.error("Delete course error:", error);
        return { status: 500, body: { error: "Failed to delete course flyer." } };
    }
}

export async function toggleCourseStatus(id, request) {
    try {
        const body = await request.json();
        const isActive = Boolean(body.isActive ?? body.is_active);
        const updated = await EnrollCourseModel.toggleStatus(id, isActive);
        if (!updated) {
            return { status: 404, body: { error: "Course flyer not found." } };
        }
        return {
            status: 200,
            body: { success: true, message: `Course ${isActive ? "activated" : "deactivated"} successfully.`, course: updated },
        };
    } catch (error) {
        console.error("Toggle course status error:", error);
        return { status: 500, body: { error: "Failed to toggle course status." } };
    }
}
