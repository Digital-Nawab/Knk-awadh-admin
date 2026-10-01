import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";

const InteriorModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM interior_gallery LIMIT 1");
        } catch {
            await initDatabase();
        }
    },

    async create({ branch, imageUrl, title = "", altText = null, displayOrder = null, isActive = true }) {
        await this.ensureTable();

        const cleanBranch = (branch || "hazratganj").toLowerCase().trim();
        const effectiveTitle = (altText !== null && altText !== undefined ? altText : title) || "";

        let order = displayOrder;
        if (order === null || order === undefined || isNaN(order)) {
            const [maxRow] = await db.query(
                "SELECT COALESCE(MAX(display_order), 0) + 1 AS next_order FROM interior_gallery WHERE branch = ?",
                [cleanBranch]
            );
            order = maxRow[0]?.next_order || 1;
        }

        const [result] = await db.query(
            `INSERT INTO interior_gallery (branch, image_url, title, display_order, is_active) VALUES (?, ?, ?, ?, ?)`,
            [cleanBranch, imageUrl, effectiveTitle, order, isActive ? 1 : 0]
        );

        return {
            id: result.insertId,
            branch: cleanBranch,
            imageUrl,
            title: effectiveTitle,
            alt_text: effectiveTitle,
            displayOrder: order,
            isActive: isActive ? 1 : 0,
        };
    },

    async getAll({ branch = null, activeOnly = false, search = null } = {}) {
        await this.ensureTable();
        let query = "SELECT * FROM interior_gallery WHERE 1=1";
        const params = [];

        if (branch && branch !== "all") {
            query += " AND branch = ?";
            params.push(branch.toLowerCase().trim());
        }

        if (activeOnly) {
            query += " AND is_active = 1";
        }

        if (search && search.trim()) {
            query += " AND (title LIKE ? OR image_url LIKE ?)";
            const term = `%${search.trim()}%`;
            params.push(term, term);
        }

        query += " ORDER BY branch ASC, display_order ASC, id ASC";

        const [rows] = await db.query(query, params);
        return rows.map((row) => ({
            ...row,
            alt_text: row.title || "",
        }));
    },

    async getByBranch(branch, { activeOnly = true } = {}) {
        return this.getAll({ branch, activeOnly });
    },

    async getById(id) {
        await this.ensureTable();
        const [rows] = await db.query("SELECT * FROM interior_gallery WHERE id = ?", [id]);
        if (!rows[0]) return null;
        return {
            ...rows[0],
            alt_text: rows[0].title || "",
        };
    },

    async update(id, { branch, title, altText, isActive, displayOrder }) {
        await this.ensureTable();
        const fields = [];
        const params = [];

        if (branch !== undefined) {
            fields.push("branch = ?");
            params.push(branch.toLowerCase().trim());
        }
        const effectiveTitle = altText !== undefined ? altText : title;
        if (effectiveTitle !== undefined) {
            fields.push("title = ?");
            params.push(effectiveTitle ? String(effectiveTitle).trim() : "");
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
        await db.query(`UPDATE interior_gallery SET ${fields.join(", ")} WHERE id = ?`, params);
    },

    async updateStatus(id, isActive) {
        await this.ensureTable();
        await db.query("UPDATE interior_gallery SET is_active = ? WHERE id = ?", [isActive ? 1 : 0, id]);
    },

    async delete(id) {
        await this.ensureTable();
        await db.query("DELETE FROM interior_gallery WHERE id = ?", [id]);
    },
};

export default InteriorModel;
