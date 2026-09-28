import { db } from "@/lib/db";

const HeroModel = {
    async create({ mediaUrl, mediaType, altText, isActive }) {
        const [result] = await db.query(
            `INSERT INTO heroes (media_url, media_type, alt_text, is_active) VALUES (?, ?, ?, ?)`,
            [mediaUrl, mediaType, altText, isActive ? 1 : 0]
        );
        return { id: result.insertId, mediaUrl, mediaType, altText, isActive };
    },

    async getAll() {
        const [rows] = await db.query(
            `SELECT * FROM heroes ORDER BY created_at DESC`
        );
        return rows;
    },

    async getActive() {
        const [rows] = await db.query(
            `SELECT * FROM heroes WHERE is_active = 1 ORDER BY created_at DESC`
        );
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query(
            `SELECT * FROM heroes WHERE id = ?`,
            [id]
        );
        return rows[0] || null;
    },

    async update(id, { altText, isActive, mediaUrl, mediaType }) {
        if (mediaUrl) {
            await db.query(
                `UPDATE heroes SET alt_text = ?, is_active = ?, media_url = ?, media_type = ? WHERE id = ?`,
                [altText, isActive ? 1 : 0, mediaUrl, mediaType, id]
            );
        } else {
            await db.query(
                `UPDATE heroes SET alt_text = ?, is_active = ? WHERE id = ?`,
                [altText, isActive ? 1 : 0, id]
            );
        }
    },
    async updateStatus(id, isActive) {
        await db.query(`UPDATE heroes SET is_active = ? WHERE id = ?`, [isActive ? 1 : 0, id]);
    },

    async hardDelete(id) {
        await db.query(`DELETE FROM heroes WHERE id = ?`, [id]);
    },
};

export default HeroModel;