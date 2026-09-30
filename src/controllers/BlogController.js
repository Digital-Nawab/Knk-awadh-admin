import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import BlogModel from "@/models/BlogModel";
import { getSafeOriginalFilename } from "@/lib/uploadHelper";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const UPLOAD_DIR = path.join(process.cwd(), "public", "admin-assets", "blogs");

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}

function calculateReadTime(text) {
    if (!text) return "3 min read";
    const words = text.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 180));
    return `${minutes} min read`;
}

export async function createBlog(request) {
    try {
        const formData = await request.formData();

        const title = formData.get("title");
        let slug = formData.get("slug");
        const excerpt = formData.get("excerpt");
        const content = formData.get("content");
        const category = formData.get("category");
        const author = formData.get("author") || "KNK Editorial Team";
        const tags = formData.get("tags") || "";
        const isPublished = formData.get("isPublished") === "true";
        const coverImageFile = formData.get("coverImage");

        if (!title || !title.trim()) {
            return { status: 400, body: { error: "Blog title is required." } };
        }
        if (!excerpt || !excerpt.trim()) {
            return { status: 400, body: { error: "Short excerpt is required." } };
        }
        if (!content || !content.trim()) {
            return { status: 400, body: { error: "Blog content is required." } };
        }
        if (!category || !category.trim()) {
            return { status: 400, body: { error: "Please choose a category." } };
        }

        if (!slug || !slug.trim()) {
            slug = slugify(title);
        } else {
            slug = slugify(slug);
        }

        // Check slug collision
        const existing = await BlogModel.getBySlug(slug);
        if (existing) {
            slug = `${slug}-${Date.now().toString().slice(-4)}`;
        }

        let coverImageUrl = "/assets/images/new/home/celebrity/7.webp";

        if (coverImageFile && typeof coverImageFile !== "string" && coverImageFile.size > 0) {
            if (!IMAGE_TYPES.includes(coverImageFile.type)) {
                return { status: 400, body: { error: "Cover image must be JPG, PNG, or WEBP." } };
            }

            const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, coverImageFile.name, ".webp");
            const buffer = Buffer.from(await coverImageFile.arrayBuffer());
            await writeFile(filePath, buffer);
            coverImageUrl = `/admin-assets/blogs/${fileName}`;
        }

        const readTime = calculateReadTime(content);

        const blog = await BlogModel.create({
            title: title.trim(),
            slug,
            excerpt: excerpt.trim(),
            content: content.trim(),
            coverImage: coverImageUrl,
            category: category.trim(),
            author: author.trim(),
            readTime,
            tags: tags.trim(),
            isPublished,
        });

        return { status: 201, body: { success: true, message: "Blog post published successfully.", blog } };
    } catch (error) {
        console.error("Create blog error:", error);
        return { status: 500, body: { error: "Failed to create blog post." } };
    }
}

export async function listBlogs(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category") || "all";
        const publishedOnly = searchParams.get("publishedOnly") === "true";

        const blogs = await BlogModel.getAll({ search, category, publishedOnly });
        return { status: 200, body: { blogs } };
    } catch (error) {
        console.error("List blogs error:", error);
        return { status: 500, body: { error: "Failed to fetch blogs." } };
    }
}

export async function getBlogById(id) {
    try {
        const blog = await BlogModel.getById(id);
        if (!blog) return { status: 404, body: { error: "Blog post not found." } };
        return { status: 200, body: { blog } };
    } catch (error) {
        console.error("Get blog by id error:", error);
        return { status: 500, body: { error: "Failed to fetch blog post." } };
    }
}

export async function getBlogBySlug(slug) {
    try {
        const blog = await BlogModel.getBySlug(slug);
        if (!blog) return { status: 404, body: { error: "Blog article not found." } };
        await BlogModel.incrementViews(blog.id);
        return { status: 200, body: { blog } };
    } catch (error) {
        console.error("Get blog by slug error:", error);
        return { status: 500, body: { error: "Failed to fetch blog article." } };
    }
}

export async function updateBlog(id, request) {
    try {
        const formData = await request.formData();

        const title = formData.get("title");
        let slug = formData.get("slug");
        const excerpt = formData.get("excerpt");
        const content = formData.get("content");
        const category = formData.get("category");
        const author = formData.get("author") || "KNK Editorial Team";
        const tags = formData.get("tags") || "";
        const isPublished = formData.get("isPublished") === "true";
        const coverImageFile = formData.get("coverImage");

        if (!title || !title.trim()) {
            return { status: 400, body: { error: "Blog title is required." } };
        }

        slug = slug ? slugify(slug) : slugify(title);

        let coverImageUrl = null;
        if (coverImageFile && typeof coverImageFile !== "string" && coverImageFile.size > 0) {
            if (!IMAGE_TYPES.includes(coverImageFile.type)) {
                return { status: 400, body: { error: "Cover image must be JPG, PNG, or WEBP." } };
            }
            const { fileName, filePath } = await getSafeOriginalFilename(UPLOAD_DIR, coverImageFile.name, ".webp");
            const buffer = Buffer.from(await coverImageFile.arrayBuffer());
            await writeFile(filePath, buffer);
            coverImageUrl = `/admin-assets/blogs/${fileName}`;
        }

        const readTime = calculateReadTime(content);

        await BlogModel.update(id, {
            title: title.trim(),
            slug,
            excerpt: excerpt ? excerpt.trim() : "",
            content: content ? content.trim() : "",
            coverImage: coverImageUrl,
            category: category ? category.trim() : "General",
            author: author.trim(),
            readTime,
            tags: tags.trim(),
            isPublished,
        });

        return { status: 200, body: { success: true, message: "Blog post updated successfully." } };
    } catch (error) {
        console.error("Update blog error:", error);
        return { status: 500, body: { error: "Failed to update blog post." } };
    }
}

export async function toggleBlogPublish(id, request) {
    try {
        const { isPublished } = await request.json();
        await BlogModel.togglePublish(id, isPublished);
        return { status: 200, body: { success: true, message: `Status updated.` } };
    } catch (error) {
        console.error("Toggle publish error:", error);
        return { status: 500, body: { error: "Failed to update publish status." } };
    }
}

export async function deleteBlog(id) {
    try {
        const blog = await BlogModel.getById(id);
        if (!blog) return { status: 404, body: { error: "Blog not found." } };

        if (blog.cover_image && blog.cover_image.startsWith("/admin-assets/blogs/")) {
            const filePath = path.join(process.cwd(), "public", blog.cover_image);
            try {
                await unlink(filePath);
            } catch (err) {
                if (err.code !== "ENOENT") console.error("Error deleting image:", err);
            }
        }

        await BlogModel.delete(id);
        return { status: 200, body: { success: true, message: "Blog post deleted." } };
    } catch (error) {
        console.error("Delete blog error:", error);
        return { status: 500, body: { error: "Failed to delete blog." } };
    }
}
