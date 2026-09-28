import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";

const BlogModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM blogs LIMIT 1");
        } catch {
            await initDatabase();
        }
    },

    async create({
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        author = "KNK Editorial Team",
        readTime = "4 min read",
        tags = "",
        isPublished = true,
    }) {
        await this.ensureTable();
        const [result] = await db.query(
            `INSERT INTO blogs 
            (title, slug, excerpt, content, cover_image, category, author, read_time, tags, is_published, views_count)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
            [
                title,
                slug,
                excerpt,
                content,
                coverImage,
                category,
                author,
                readTime,
                tags,
                isPublished ? 1 : 0,
            ]
        );
        return { id: result.insertId, title, slug, coverImage, isPublished };
    },

    async getAll({ search = null, category = null, publishedOnly = false } = {}) {
        await this.ensureTable();
        let query = "SELECT * FROM blogs WHERE 1=1";
        const params = [];

        if (publishedOnly) {
            query += " AND is_published = 1";
        }

        if (category && category !== "all" && category !== "All") {
            query += " AND category = ?";
            params.push(category);
        }

        if (search) {
            query += " AND (title LIKE ? OR excerpt LIKE ? OR tags LIKE ?)";
            const s = `%${search}%`;
            params.push(s, s, s);
        }

        query += " ORDER BY published_at DESC, created_at DESC";

        const [rows] = await db.query(query, params);
        return rows;
    },

    async getById(id) {
        await this.ensureTable();
        const [rows] = await db.query("SELECT * FROM blogs WHERE id = ? LIMIT 1", [id]);
        return rows[0] || null;
    },

    async getBySlug(slug) {
        await this.ensureTable();
        const [rows] = await db.query(
            "SELECT * FROM blogs WHERE slug = ? AND is_published = 1 LIMIT 1",
            [slug]
        );
        return rows[0] || null;
    },

    async update(id, {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        author,
        readTime,
        tags,
        isPublished,
    }) {
        await this.ensureTable();
        if (coverImage) {
            await db.query(
                `UPDATE blogs 
                SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?, category = ?, author = ?, read_time = ?, tags = ?, is_published = ?
                WHERE id = ?`,
                [
                    title,
                    slug,
                    excerpt,
                    content,
                    coverImage,
                    category,
                    author,
                    readTime,
                    tags,
                    isPublished ? 1 : 0,
                    id,
                ]
            );
        } else {
            await db.query(
                `UPDATE blogs 
                SET title = ?, slug = ?, excerpt = ?, content = ?, category = ?, author = ?, read_time = ?, tags = ?, is_published = ?
                WHERE id = ?`,
                [
                    title,
                    slug,
                    excerpt,
                    content,
                    category,
                    author,
                    readTime,
                    tags,
                    isPublished ? 1 : 0,
                    id,
                ]
            );
        }
        return { id, title, slug };
    },

    async togglePublish(id, isPublished) {
        await this.ensureTable();
        await db.query("UPDATE blogs SET is_published = ? WHERE id = ?", [
            isPublished ? 1 : 0,
            id,
        ]);
        return { id, isPublished };
    },

    async delete(id) {
        await this.ensureTable();
        await db.query("DELETE FROM blogs WHERE id = ?", [id]);
        return { id };
    },

    async incrementViews(id) {
        await this.ensureTable();
        await db.query("UPDATE blogs SET views_count = views_count + 1 WHERE id = ?", [id]);
    },
};

export default BlogModel;
