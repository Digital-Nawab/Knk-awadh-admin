import { db } from "@/lib/db";

const ServiceModel = {
    // =========================================================================
    // 1. SERVICES (Individual treatments e.g. Luxury Manicure, French Nail Art)
    // =========================================================================

    async createService({
        categoryId = null,
        categoryName,
        categorySlug,
        name,
        title = null,
        slug,
        shortDesc = null,
        description = null,
        image,
        displayOrder = 1,
        tags = null,
        filterCategory = null,
        price = "On request",
        isActive = true,
    }) {
        const formattedTags = Array.isArray(tags) ? JSON.stringify(tags) : (typeof tags === "string" ? tags : null);
        const [result] = await db.query(
            `INSERT INTO services 
            (category_id, category_name, category_slug, name, title, slug, short_desc, description, image, display_order, tags, filter_category, price, is_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                categoryId,
                categoryName,
                categorySlug,
                name,
                title || name,
                slug,
                shortDesc,
                description,
                image,
                displayOrder || 1,
                formattedTags,
                filterCategory,
                price || "On request",
                isActive ? 1 : 0,
            ]
        );
        return {
            id: result.insertId,
            categoryId,
            categoryName,
            categorySlug,
            name,
            title: title || name,
            slug,
            shortDesc,
            description,
            image,
            displayOrder,
            tags: formattedTags,
            filterCategory,
            price,
            isActive,
        };
    },

    async getAllServices({ category = null, isActive = null, search = null } = {}) {
        let query = `SELECT * FROM services WHERE deleted_at IS NULL`;
        const params = [];

        if (category && category !== "all") {
            const cleanCat = String(category).toLowerCase().trim();
            const numericId = parseInt(cleanCat, 10);
            if (!isNaN(numericId) && String(numericId) === cleanCat) {
                query += ` AND category_id = ?`;
                params.push(numericId);
            } else {
                query += ` AND (LOWER(category_slug) = ? OR LOWER(category_name) = ? OR (LOWER(category_slug) = 'nail-art' AND ? = 'nails') OR (LOWER(category_slug) = 'nails' AND ? = 'nail-art'))`;
                params.push(cleanCat, cleanCat, cleanCat, cleanCat);
            }
        }

        if (isActive !== null && isActive !== "all") {
            query += ` AND is_active = ?`;
            params.push(isActive ? 1 : 0);
        }

        if (search && search.trim()) {
            query += ` AND (name LIKE ? OR title LIKE ? OR short_desc LIKE ? OR category_name LIKE ?)`;
            const term = `%${search.trim()}%`;
            params.push(term, term, term, term);
        }

        query += ` ORDER BY display_order ASC, created_at DESC`;
        const [rows] = await db.query(query, params);
        return rows.map(this.formatServiceRow);
    },

    async getActiveServices(category = null) {
        return this.getAllServices({ category, isActive: true });
    },

    async getServiceById(id) {
        const [rows] = await db.query(
            `SELECT * FROM services WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
            [id]
        );
        return rows[0] ? this.formatServiceRow(rows[0]) : null;
    },

    async getServiceBySlug(slug, categorySlug = null) {
        let query = `SELECT * FROM services WHERE slug = ? AND deleted_at IS NULL`;
        const params = [slug];

        if (categorySlug) {
            query += ` AND (category_slug = ? OR (category_slug = 'nails' AND ? = 'nail-art') OR (category_slug = 'nail-art' AND ? = 'nails'))`;
            params.push(categorySlug, categorySlug, categorySlug);
        }

        query += ` LIMIT 1`;
        const [rows] = await db.query(query, params);
        if (!rows[0]) return null;

        const service = this.formatServiceRow(rows[0]);
        try {
            const [relRows] = await db.query(
                `SELECT * FROM services WHERE (category_id = ? OR category_slug = ?) AND id != ? AND is_active = 1 AND deleted_at IS NULL ORDER BY display_order ASC LIMIT 4`,
                [service.category_id || -1, service.category_slug, service.id]
            );
            service.relatedServices = relRows.map((r) => this.formatServiceRow(r));
        } catch {
            service.relatedServices = [];
        }

        return service;
    },

    async updateService(id, {
        categoryId = null,
        categoryName,
        categorySlug,
        name,
        title,
        slug,
        shortDesc,
        description,
        image = null,
        displayOrder = 1,
        tags = null,
        filterCategory = null,
        price = "On request",
        isActive = true,
    }) {
        const formattedTags = Array.isArray(tags) ? JSON.stringify(tags) : (typeof tags === "string" ? tags : null);

        if (image) {
            await db.query(
                `UPDATE services SET 
                    category_id = ?, category_name = ?, category_slug = ?, 
                    name = ?, title = ?, slug = ?, short_desc = ?, description = ?, 
                    image = ?, display_order = ?, tags = ?, filter_category = ?, 
                    price = ?, is_active = ?
                WHERE id = ? AND deleted_at IS NULL`,
                [
                    categoryId,
                    categoryName,
                    categorySlug,
                    name,
                    title || name,
                    slug,
                    shortDesc,
                    description,
                    image,
                    displayOrder || 1,
                    formattedTags,
                    filterCategory,
                    price || "On request",
                    isActive ? 1 : 0,
                    id,
                ]
            );
        } else {
            await db.query(
                `UPDATE services SET 
                    category_id = ?, category_name = ?, category_slug = ?, 
                    name = ?, title = ?, slug = ?, short_desc = ?, description = ?, 
                    display_order = ?, tags = ?, filter_category = ?, 
                    price = ?, is_active = ?
                WHERE id = ? AND deleted_at IS NULL`,
                [
                    categoryId,
                    categoryName,
                    categorySlug,
                    name,
                    title || name,
                    slug,
                    shortDesc,
                    description,
                    displayOrder || 1,
                    formattedTags,
                    filterCategory,
                    price || "On request",
                    isActive ? 1 : 0,
                    id,
                ]
            );
        }
        return this.getServiceById(id);
    },

    async updateServiceStatus(id, isActive) {
        await db.query(
            `UPDATE services SET is_active = ? WHERE id = ? AND deleted_at IS NULL`,
            [isActive ? 1 : 0, id]
        );
    },

    async softDeleteService(id) {
        await db.query(
            `UPDATE services SET deleted_at = NOW() WHERE id = ?`,
            [id]
        );
    },

    formatServiceRow(row) {
        let parsedTags = [];
        try {
            if (row.tags) {
                parsedTags = typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags;
                if (!Array.isArray(parsedTags)) parsedTags = [String(parsedTags)];
            }
        } catch {
            parsedTags = row.tags ? row.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
        }

        return {
            ...row,
            highlights: parsedTags,
            tagsList: parsedTags,
            url: `/services/${row.category_slug}/${row.slug}`,
            moreDesc: row.description,
            shortDesc: row.short_desc,
            isActive: Boolean(row.is_active),
        };
    },

    // =========================================================================
    // 2. CATEGORIES (e.g. Nails, Hair, Makeup, Beauty, Men's Grooming, etc.)
    // =========================================================================

    async createCategory({ name, title = null, shortDesc = null, content = null, items = null, slug, image = null, isActive = true, displayOrder = 1 }) {
        const [result] = await db.query(
            `INSERT INTO service_categories (name, title, short_desc, content, items, slug, image, is_active, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, title || name, shortDesc, content, items, slug, image, isActive ? 1 : 0, displayOrder || 1]
        );
        return { id: result.insertId, name, title: title || name, shortDesc, content, items, slug, image, isActive, displayOrder };
    },

    async getAllCategories({ isActive = null } = {}) {
        let query = `SELECT * FROM service_categories WHERE deleted_at IS NULL`;
        const params = [];
        if (isActive !== null) {
            query += ` AND is_active = ?`;
            params.push(isActive ? 1 : 0);
        }
        query += ` ORDER BY display_order ASC, name ASC, id ASC`;
        const [rows] = await db.query(query, params);
        return rows;
    },

    async getActiveCategories() {
        return this.getAllCategories({ isActive: true });
    },

    async getCategoryById(id) {
        const [rows] = await db.query(
            `SELECT * FROM service_categories WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
            [id]
        );
        return rows[0] || null;
    },

    async getCategoryBySlug(slug) {
        const [rows] = await db.query(
            `SELECT * FROM service_categories WHERE (slug = ? OR (slug = 'nails' AND ? = 'nail-art') OR (slug = 'nail-art' AND ? = 'nails')) AND deleted_at IS NULL LIMIT 1`,
            [slug, slug, slug]
        );
        return rows[0] || null;
    },

    async updateCategory(id, { name, title, shortDesc, content = null, items = null, slug, image = null, isActive = true, displayOrder = 1 }) {
        if (image) {
            await db.query(
                `UPDATE service_categories SET name = ?, title = ?, short_desc = ?, content = ?, items = ?, slug = ?, image = ?, is_active = ?, display_order = ? WHERE id = ?`,
                [name, title || name, shortDesc, content, items, slug, image, isActive ? 1 : 0, displayOrder || 1, id]
            );
        } else {
            await db.query(
                `UPDATE service_categories SET name = ?, title = ?, short_desc = ?, content = ?, items = ?, slug = ?, is_active = ?, display_order = ? WHERE id = ?`,
                [name, title || name, shortDesc, content, items, slug, isActive ? 1 : 0, displayOrder || 1, id]
            );
        }
        return this.getCategoryById(id);
    },

    async updateCategoryStatus(id, isActive) {
        await db.query(`UPDATE service_categories SET is_active = ? WHERE id = ?`, [isActive ? 1 : 0, id]);
        return this.getCategoryById(id);
    },

    async softDeleteCategory(id) {
        await db.query(`UPDATE service_categories SET deleted_at = NOW() WHERE id = ?`, [id]);
    },

    // Backward compatibility aliases
    create(data) { return this.createCategory(data); },
    getAll(opts) { return this.getAllCategories(opts); },
    getActive() { return this.getActiveCategories(); },
    getById(id) { return this.getCategoryById(id); },
    getBySlug(slug) { return this.getCategoryBySlug(slug); },
    update(id, data) { return this.updateCategory(id, data); },
    updateStatus(id, status) { return this.updateCategoryStatus(id, status); },
    softDelete(id) { return this.softDeleteCategory(id); },
};

export default ServiceModel;