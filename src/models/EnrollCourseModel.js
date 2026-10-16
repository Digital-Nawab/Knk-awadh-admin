import { db } from "@/lib/db";

const DEFAULT_COURSES = [
    {
        title: "Professional Bridal Makeup Masterclass",
        altText: "Professional Bridal Makeup Masterclass at KNK Academy Lucknow",
        imageUrl: "/assets/images/new/academy.webp",
        displayOrder: 1,
        isActive: 1,
    },
    {
        title: "Advanced Hair Styling & Balayage Certification",
        altText: "Advanced Hair Styling and Chemical Work at KNK Academy Lucknow",
        imageUrl: "/assets/images/new/academyimg.webp",
        displayOrder: 2,
        isActive: 1,
    },
    {
        title: "Complete Cosmetology & Skin Aesthetics Diploma",
        altText: "Complete Cosmetology & Skin Aesthetics Diploma at KNK Academy",
        imageUrl: "/assets/images/about/academy-training.webp",
        displayOrder: 3,
        isActive: 1,
    },
];

const EnrollCourseModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM enroll_courses LIMIT 1");
        } catch {
            await db.query(`
                CREATE TABLE IF NOT EXISTS enroll_courses (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    alt_text VARCHAR(255) NULL,
                    image_url VARCHAR(255) NOT NULL,
                    display_order INT DEFAULT 1,
                    is_active TINYINT(1) DEFAULT 1,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_display_order (display_order),
                    INDEX idx_is_active (is_active)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            `);

            // Seed initial courses if empty
            const [rows] = await db.query("SELECT COUNT(*) as count FROM enroll_courses");
            if (!rows || rows[0].count === 0) {
                for (const course of DEFAULT_COURSES) {
                    await db.query(
                        `INSERT INTO enroll_courses (title, alt_text, image_url, display_order, is_active)
                         VALUES (?, ?, ?, ?, ?)`,
                        [course.title, course.altText, course.imageUrl, course.displayOrder, course.isActive]
                    );
                }
            }
        }
    },

    async getAll({ activeOnly = false, search = null } = {}) {
        await this.ensureTable();
        let query = "SELECT * FROM enroll_courses WHERE 1=1";
        const params = [];

        if (activeOnly) {
            query += " AND is_active = 1";
        }

        if (search && search.trim()) {
            query += " AND (title LIKE ? OR alt_text LIKE ?)";
            const s = `%${search.trim()}%`;
            params.push(s, s);
        }

        query += " ORDER BY display_order ASC, created_at DESC";
        const [rows] = await db.query(query, params);

        return rows.map((r) => ({
            id: r.id,
            title: r.title,
            altText: r.alt_text || r.title,
            imageUrl: r.image_url,
            displayOrder: Number(r.display_order) || 0,
            isActive: Boolean(r.is_active),
            createdAt: r.created_at,
            updatedAt: r.updated_at,
        }));
    },

    async getById(id) {
        await this.ensureTable();
        const [rows] = await db.query("SELECT * FROM enroll_courses WHERE id = ? LIMIT 1", [id]);
        if (!rows || rows.length === 0) return null;
        const r = rows[0];
        return {
            id: r.id,
            title: r.title,
            altText: r.alt_text || r.title,
            imageUrl: r.image_url,
            displayOrder: Number(r.display_order) || 0,
            isActive: Boolean(r.is_active),
            createdAt: r.created_at,
            updatedAt: r.updated_at,
        };
    },

    async create({ title, altText = "", imageUrl, displayOrder = null, isActive = true }) {
        await this.ensureTable();

        let order = displayOrder;
        if (order === null || order === undefined || isNaN(order)) {
            const [maxRow] = await db.query(
                "SELECT COALESCE(MAX(display_order), 0) + 1 AS next_order FROM enroll_courses"
            );
            order = maxRow[0]?.next_order || 1;
        }

        const alt = (altText || title || "").trim();

        const [result] = await db.query(
            `INSERT INTO enroll_courses 
            (title, alt_text, image_url, display_order, is_active)
            VALUES (?, ?, ?, ?, ?)`,
            [title, alt || null, imageUrl, order, isActive ? 1 : 0]
        );

        return {
            id: result.insertId,
            title,
            altText: alt,
            imageUrl,
            displayOrder: order,
            isActive: Boolean(isActive),
        };
    },

    async update(id, { title, altText, imageUrl, displayOrder, isActive }) {
        await this.ensureTable();

        const existing = await this.getById(id);
        if (!existing) return null;

        const updatedTitle = title !== undefined ? title : existing.title;
        const updatedAlt = altText !== undefined ? altText : existing.altText;
        const updatedImage = imageUrl !== undefined ? imageUrl : existing.imageUrl;
        const updatedOrder = displayOrder !== undefined && !isNaN(displayOrder) ? Number(displayOrder) : existing.displayOrder;
        const updatedActive = isActive !== undefined ? (isActive ? 1 : 0) : (existing.isActive ? 1 : 0);

        await db.query(
            `UPDATE enroll_courses SET 
                title = ?, 
                alt_text = ?, 
                image_url = ?, 
                display_order = ?, 
                is_active = ?
             WHERE id = ?`,
            [updatedTitle, updatedAlt, updatedImage, updatedOrder, updatedActive, id]
        );

        return this.getById(id);
    },

    async delete(id) {
        await this.ensureTable();
        const existing = await this.getById(id);
        if (!existing) return false;

        await db.query("DELETE FROM enroll_courses WHERE id = ?", [id]);
        return existing;
    },

    async toggleStatus(id, isActive) {
        await this.ensureTable();
        const activeVal = isActive ? 1 : 0;
        await db.query("UPDATE enroll_courses SET is_active = ? WHERE id = ?", [activeVal, id]);
        return this.getById(id);
    },
};

export default EnrollCourseModel;
