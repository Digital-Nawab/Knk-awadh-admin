import { db } from "@/lib/db";

const MetaLeadModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM meta_leads LIMIT 1");
        } catch {
            await db.query(`
                CREATE TABLE IF NOT EXISTS meta_leads (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    lead_id VARCHAR(255) NULL,
                    form_id VARCHAR(100) NULL,
                    form_name VARCHAR(255) NULL,
                    campaign_id VARCHAR(100) NULL,
                    campaign_name VARCHAR(255) NULL,
                    adset_id VARCHAR(100) NULL,
                    adset_name VARCHAR(255) NULL,
                    ad_id VARCHAR(100) NULL,
                    ad_name VARCHAR(255) NULL,
                    platform VARCHAR(50) DEFAULT 'instagram',
                    name VARCHAR(255) NOT NULL,
                    phone VARCHAR(50) NOT NULL,
                    email VARCHAR(255) NULL,
                    city VARCHAR(100) NULL,
                    postal_code VARCHAR(50) NULL,
                    service_interested VARCHAR(255) NULL,
                    preferred_branch VARCHAR(100) NULL,
                    status VARCHAR(50) DEFAULT 'pending',
                    notes TEXT NULL,
                    assigned_to VARCHAR(100) NULL,
                    is_test TINYINT(1) DEFAULT 0,
                    custom_fields JSON NULL,
                    raw_payload JSON NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_status (status),
                    INDEX idx_phone (phone),
                    INDEX idx_platform (platform),
                    INDEX idx_created_at (created_at),
                    INDEX idx_lead_id (lead_id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            `);
        }
    },

    async create({
        leadId = null,
        formId = null,
        formName = null,
        campaignId = null,
        campaignName = null,
        adsetId = null,
        adsetName = null,
        adId = null,
        adName = null,
        platform = "instagram",
        name,
        phone,
        email = null,
        city = null,
        postalCode = null,
        serviceInterested = null,
        preferredBranch = null,
        status = "pending",
        notes = null,
        assignedTo = null,
        isTest = false,
        customFields = null,
        rawPayload = null,
    }) {
        await this.ensureTable();
        const [result] = await db.query(
            `INSERT INTO meta_leads 
            (lead_id, form_id, form_name, campaign_id, campaign_name, adset_id, adset_name, ad_id, ad_name, platform, name, phone, email, city, postal_code, service_interested, preferred_branch, status, notes, assigned_to, is_test, custom_fields, raw_payload)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                leadId,
                formId,
                formName,
                campaignId,
                campaignName,
                adsetId,
                adsetName,
                adId,
                adName,
                platform || "instagram",
                name || "Unknown Lead",
                phone,
                email,
                city,
                postalCode,
                serviceInterested,
                preferredBranch,
                status || "pending",
                notes,
                assignedTo,
                isTest ? 1 : 0,
                customFields ? JSON.stringify(customFields) : null,
                rawPayload ? JSON.stringify(rawPayload) : null,
            ]
        );
        return { id: result.insertId, name, phone, email, platform, status: status || "pending" };
    },

    async getAll({ status = null, platform = null, search = null, isTest = null, limit = 100, offset = 0 } = {}) {
        await this.ensureTable();
        let query = "SELECT * FROM meta_leads WHERE 1=1";
        const params = [];

        if (status && status !== "all") {
            if (status === "follow_up" || status === "follow-up") {
                query += " AND (status = 'follow_up' OR status = 'follow-up')";
            } else if (status === "confirmed" || status === "booked") {
                query += " AND (status = 'confirmed' OR status = 'booked')";
            } else {
                query += " AND status = ?";
                params.push(status);
            }
        }

        if (platform && platform !== "all") {
            const p = platform.toLowerCase();
            if (p.includes("ig") || p.includes("insta")) {
                query += " AND (platform LIKE '%instagram%' OR platform LIKE '%ig%')";
            } else if (p.includes("fb") || p.includes("face")) {
                query += " AND (platform LIKE '%facebook%' OR platform LIKE '%fb%')";
            } else {
                query += " AND platform = ?";
                params.push(platform);
            }
        }

        if (isTest !== null && isTest !== undefined && isTest !== "all") {
            query += " AND is_test = ?";
            params.push(isTest === true || isTest === 1 || isTest === "true" || isTest === "1" ? 1 : 0);
        }

        if (search && search.trim()) {
            query += " AND (name LIKE ? OR phone LIKE ? OR email LIKE ? OR city LIKE ? OR service_interested LIKE ? OR campaign_name LIKE ? OR ad_name LIKE ? OR form_name LIKE ? OR lead_id LIKE ?)";
            const s = `%${search.trim()}%`;
            params.push(s, s, s, s, s, s, s, s, s);
        }

        query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        params.push(Number(limit) || 100, Number(offset) || 0);

        const [rows] = await db.query(query, params);
        return rows;
    },

    async getStats() {
        await this.ensureTable();
        const [counts] = await db.query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = 'assigned' THEN 1 ELSE 0 END) as assigned,
                SUM(CASE WHEN status IN ('follow_up', 'follow-up') THEN 1 ELSE 0 END) as follow_up,
                SUM(CASE WHEN status IN ('confirmed', 'booked') THEN 1 ELSE 0 END) as confirmed,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
                SUM(CASE WHEN is_test = 1 THEN 1 ELSE 0 END) as test_leads,
                SUM(CASE WHEN created_at >= CURDATE() THEN 1 ELSE 0 END) as today_leads,
                SUM(CASE WHEN platform LIKE '%instagram%' OR platform LIKE '%ig%' THEN 1 ELSE 0 END) as instagram_leads,
                SUM(CASE WHEN platform LIKE '%facebook%' OR platform LIKE '%fb%' THEN 1 ELSE 0 END) as facebook_leads
            FROM meta_leads
        `);
        return counts[0] || {
            total: 0,
            pending: 0,
            assigned: 0,
            follow_up: 0,
            confirmed: 0,
            completed: 0,
            cancelled: 0,
            test_leads: 0,
            today_leads: 0,
            instagram_leads: 0,
            facebook_leads: 0,
        };
    },

    async getById(id) {
        await this.ensureTable();
        const [rows] = await db.query("SELECT * FROM meta_leads WHERE id = ? LIMIT 1", [id]);
        return rows[0] || null;
    },

    async updateStatus(id, status) {
        await this.ensureTable();
        await db.query("UPDATE meta_leads SET status = ? WHERE id = ?", [status, id]);
        return { id, status };
    },

    async updateNotes(id, notes) {
        await this.ensureTable();
        await db.query("UPDATE meta_leads SET notes = ? WHERE id = ?", [notes, id]);
        return { id, notes };
    },

    async updateAssignedTo(id, assignedTo, preferredBranch) {
        await this.ensureTable();
        await db.query(
            "UPDATE meta_leads SET assigned_to = ?, preferred_branch = COALESCE(?, preferred_branch), status = CASE WHEN status = 'pending' THEN 'assigned' ELSE status END WHERE id = ?",
            [assignedTo, preferredBranch, id]
        );
        return { id, assignedTo };
    },

    async delete(id) {
        await this.ensureTable();
        await db.query("DELETE FROM meta_leads WHERE id = ?", [id]);
        return { id };
    },

    async bulkUpdateStatus(ids, status) {
        await this.ensureTable();
        if (!ids || ids.length === 0) return { affectedRows: 0 };
        const [result] = await db.query(
            `UPDATE meta_leads SET status = ? WHERE id IN (?)`,
            [status, ids]
        );
        return { affectedRows: result.affectedRows };
    },

    async bulkDelete(ids) {
        await this.ensureTable();
        if (!ids || ids.length === 0) return { affectedRows: 0 };
        const [result] = await db.query(
            `DELETE FROM meta_leads WHERE id IN (?)`,
            [ids]
        );
        return { affectedRows: result.affectedRows };
    },
};

export default MetaLeadModel;
