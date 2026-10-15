import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";

const OfferModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM offers LIMIT 1");
            try {
                await db.query("ALTER TABLE offers ADD COLUMN alt_text VARCHAR(255) NULL AFTER title");
            } catch {
                // column might already exist
            }
        } catch {
            await initDatabase();
        }
    },

    async create({
        title,
        altText = "",
        tagline = "",
        servicesIncluded = "",
        price = "",
        originalPrice = "",
        badge = "",
        imageUrl,
        category = "All",
        validUntil = "",
        terms = "",
        displayOrder = null,
        isActive = true,
    }) {
        await this.ensureTable();

        let order = displayOrder;
        if (order === null || order === undefined || isNaN(order)) {
            const [maxRow] = await db.query(
                "SELECT COALESCE(MAX(display_order), 0) + 1 AS next_order FROM offers"
            );
            order = maxRow[0]?.next_order || 1;
        }

        const alt = (altText || title || "").trim();

        const [result] = await db.query(
            `INSERT INTO offers 
            (title, alt_text, tagline, services_included, price, original_price, badge, image_url, category, valid_until, terms, display_order, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                alt || null,
                tagline || null,
                servicesIncluded || null,
                price || null,
                originalPrice || null,
                badge || null,
                imageUrl,
                category || "All",
                validUntil || null,
                terms || null,
                order,
                isActive ? 1 : 0,
            ]
        );

        return {
            id: result.insertId,
            title,
            altText: alt,
            tagline,
            servicesIncluded,
            price,
            originalPrice,
            badge,
            imageUrl,
            category,
            validUntil,
            terms,
            displayOrder: order,
            isActive: isActive ? 1 : 0,
        };
    },

    async getAll({ activeOnly = false, category = null, search = null } = {}) {
        await this.ensureTable();
        let query = "SELECT * FROM offers WHERE 1=1";
        const params = [];

        if (activeOnly) {
            query += " AND is_active = 1";
        }

        if (category && category !== "All" && category !== "all") {
            query += " AND (category = ? OR category = 'All')";
            params.push(category);
        }

        if (search && search.trim()) {
            query += " AND (title LIKE ? OR alt_text LIKE ?)";
            const term = `%${search.trim()}%`;
            params.push(term, term);
        }

        query += " ORDER BY display_order ASC, id DESC";

        const [rows] = await db.query(query, params);
        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            altText: row.alt_text || row.title || "",
            tagline: row.tagline || "",
            servicesIncluded: row.services_included || "",
            price: row.price || "",
            originalPrice: row.original_price || "",
            badge: row.badge || "",
            imageUrl: row.image_url,
            category: row.category || "All",
            validUntil: row.valid_until || "",
            terms: row.terms || "",
            displayOrder: row.display_order,
            isActive: Boolean(row.is_active),
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));
    },

    async getActive({ category = null } = {}) {
        return this.getAll({ activeOnly: true, category });
    },

    async getById(id) {
        await this.ensureTable();
        const [rows] = await db.query("SELECT * FROM offers WHERE id = ?", [id]);
        if (!rows || rows.length === 0) return null;
        const row = rows[0];
        return {
            id: row.id,
            title: row.title,
            altText: row.alt_text || row.title || "",
            tagline: row.tagline || "",
            servicesIncluded: row.services_included || "",
            price: row.price || "",
            originalPrice: row.original_price || "",
            badge: row.badge || "",
            imageUrl: row.image_url,
            category: row.category || "All",
            validUntil: row.valid_until || "",
            terms: row.terms || "",
            displayOrder: row.display_order,
            isActive: Boolean(row.is_active),
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        };
    },

    async update(id, data) {
        await this.ensureTable();
        const fields = [];
        const params = [];

        if (data.title !== undefined) {
            fields.push("title = ?");
            params.push(data.title);
        }
        if (data.altText !== undefined || data.alt_text !== undefined) {
            fields.push("alt_text = ?");
            params.push(data.altText ?? data.alt_text);
        }
        if (data.tagline !== undefined) {
            fields.push("tagline = ?");
            params.push(data.tagline);
        }
        if (data.servicesIncluded !== undefined) {
            fields.push("services_included = ?");
            params.push(data.servicesIncluded);
        }
        if (data.price !== undefined) {
            fields.push("price = ?");
            params.push(data.price);
        }
        if (data.originalPrice !== undefined) {
            fields.push("original_price = ?");
            params.push(data.originalPrice);
        }
        if (data.badge !== undefined) {
            fields.push("badge = ?");
            params.push(data.badge);
        }
        if (data.imageUrl !== undefined) {
            fields.push("image_url = ?");
            params.push(data.imageUrl);
        }
        if (data.category !== undefined) {
            fields.push("category = ?");
            params.push(data.category);
        }
        if (data.validUntil !== undefined) {
            fields.push("valid_until = ?");
            params.push(data.validUntil);
        }
        if (data.terms !== undefined) {
            fields.push("terms = ?");
            params.push(data.terms);
        }
        if (data.displayOrder !== undefined && data.displayOrder !== null && !isNaN(data.displayOrder)) {
            fields.push("display_order = ?");
            params.push(Number(data.displayOrder));
        }
        if (data.isActive !== undefined) {
            fields.push("is_active = ?");
            params.push(data.isActive ? 1 : 0);
        }

        if (fields.length === 0) return;

        params.push(id);
        await db.query(`UPDATE offers SET ${fields.join(", ")} WHERE id = ?`, params);
    },

    async updateStatus(id, isActive) {
        await this.ensureTable();
        await db.query("UPDATE offers SET is_active = ? WHERE id = ?", [isActive ? 1 : 0, id]);
    },

    async delete(id) {
        await this.ensureTable();
        await db.query("DELETE FROM offers WHERE id = ?", [id]);
    },
};

export default OfferModel;
