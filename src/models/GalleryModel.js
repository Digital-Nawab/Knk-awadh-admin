import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";

const GalleryModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM gallery LIMIT 1");
        } catch {
            await initDatabase();
        }
    },

    async create({ imageUrl, title = "", displayOrder = null, isActive = true }) {
        await this.ensureTable();

        let order = displayOrder;
        if (order === null || order === undefined || isNaN(order)) {
            const [maxRow] = await db.query(
                "SELECT COALESCE(MAX(display_order), 0) + 1 AS next_order FROM gallery"
            );
            order = maxRow[0]?.next_order || 1;
        }

        const [result] = await db.query(
            `INSERT INTO gallery (image_url, title, display_order, is_active) VALUES (?, ?, ?, ?)`,
            [imageUrl, title, order, isActive ? 1 : 0]
        );

        return {
            id: result.insertId,
            imageUrl,
            title,
            displayOrder: order,
            isActive: isActive ? 1 : 0,
        };
    },

    async getAll({ activeOnly = false, search = null } = {}) {
        await this.ensureTable();
        let query = "SELECT * FROM gallery WHERE 1=1";
        const params = [];

        if (activeOnly) {
            query += " AND is_active = 1";
        }

        if (search && search.trim()) {
            query += " AND (title LIKE ? OR image_url LIKE ?)";
            const term = `%${search.trim()}%`;
            params.push(term, term);
        }

        query += " ORDER BY display_order ASC, id ASC";

        const [rows] = await db.query(query, params);
        return rows;
    },

    async getActive() {
        return this.getAll({ activeOnly: true });
    },

    async getById(id) {
        await this.ensureTable();
        const [rows] = await db.query("SELECT * FROM gallery WHERE id = ?", [id]);
        return rows[0] || null;
    },

    async update(id, { title, isActive, displayOrder }) {
        await this.ensureTable();
        const fields = [];
        const params = [];

        if (title !== undefined) {
            fields.push("title = ?");
            params.push(title);
        }
        if (isActive !== undefined) {
            fields.push("is_active = ?");
            params.push(isActive ? 1 : 0);
        }
        if (displayOrder !== undefined && displayOrder !== null && !isNaN(displayOrder)) {
            fields.push("display_order = ?");
            params.push(Number(displayOrder));
        }

        if (fields.length === 0) return;

        params.push(id);
        await db.query(`UPDATE gallery SET ${fields.join(", ")} WHERE id = ?`, params);
    },

    async updateStatus(id, isActive) {
        await this.ensureTable();
        await db.query("UPDATE gallery SET is_active = ? WHERE id = ?", [isActive ? 1 : 0, id]);
    },

    async delete(id) {
        await this.ensureTable();
        await db.query("DELETE FROM gallery WHERE id = ?", [id]);
    },
};

export default GalleryModel;
