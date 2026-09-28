import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";

function normalizePath(p) {
    if (!p) return "/";
    let cleaned = p.trim();
    if (!cleaned.startsWith("/")) cleaned = "/" + cleaned;
    if (cleaned.length > 1 && cleaned.endsWith("/")) cleaned = cleaned.slice(0, -1);
    return cleaned;
}

const SeoModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM seo_metadata LIMIT 1");
        } catch {
            await initDatabase();
        }
    },

    async create({
        pagePath,
        pageName,
        metaTitle,
        metaDescription,
        metaKeywords = "",
        ogImage = null,
        canonicalUrl = null,
        robots = "index, follow",
    }) {
        await this.ensureTable();
        const pathVal = normalizePath(pagePath);
        const [result] = await db.query(
            `INSERT INTO seo_metadata 
            (page_path, page_name, meta_title, meta_description, meta_keywords, og_image, canonical_url, robots)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                pathVal,
                pageName,
                metaTitle,
                metaDescription,
                metaKeywords,
                ogImage,
                canonicalUrl,
                robots,
            ]
        );
        return { id: result.insertId, pagePath: pathVal, metaTitle };
    },

    async getAll({ search = null } = {}) {
        await this.ensureTable();
        let query = "SELECT * FROM seo_metadata WHERE 1=1";
        const params = [];

        if (search) {
            query += " AND (page_path LIKE ? OR page_name LIKE ? OR meta_title LIKE ? OR meta_keywords LIKE ?)";
            const s = `%${search}%`;
            params.push(s, s, s, s);
        }

        query += " ORDER BY page_path ASC";
        const [rows] = await db.query(query, params);
        return rows;
    },

    async getById(id) {
        await this.ensureTable();
        const [rows] = await db.query("SELECT * FROM seo_metadata WHERE id = ? LIMIT 1", [id]);
        return rows[0] || null;
    },

    async getByPath(pagePath) {
        await this.ensureTable();
        const pathVal = normalizePath(pagePath);
        const [rows] = await db.query("SELECT * FROM seo_metadata WHERE page_path = ? LIMIT 1", [pathVal]);
        return rows[0] || null;
    },

    async update(id, {
        pagePath,
        pageName,
        metaTitle,
        metaDescription,
        metaKeywords,
        ogImage,
        canonicalUrl,
        robots,
    }) {
        await this.ensureTable();
        const pathVal = normalizePath(pagePath);

        if (ogImage) {
            await db.query(
                `UPDATE seo_metadata 
                SET page_path = ?, page_name = ?, meta_title = ?, meta_description = ?, meta_keywords = ?, og_image = ?, canonical_url = ?, robots = ?
                WHERE id = ?`,
                [
                    pathVal,
                    pageName,
                    metaTitle,
                    metaDescription,
                    metaKeywords,
                    ogImage,
                    canonicalUrl,
                    robots,
                    id,
                ]
            );
        } else {
            await db.query(
                `UPDATE seo_metadata 
                SET page_path = ?, page_name = ?, meta_title = ?, meta_description = ?, meta_keywords = ?, canonical_url = ?, robots = ?
                WHERE id = ?`,
                [
                    pathVal,
                    pageName,
                    metaTitle,
                    metaDescription,
                    metaKeywords,
                    canonicalUrl,
                    robots,
                    id,
                ]
            );
        }
        return { id, pagePath: pathVal };
    },

    async delete(id) {
        await this.ensureTable();
        await db.query("DELETE FROM seo_metadata WHERE id = ?", [id]);
        return { id };
    },
};

export default SeoModel;
