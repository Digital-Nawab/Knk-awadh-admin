import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";

const BookingModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM bookings LIMIT 1");
            // Ensure status column supports all 6 pipeline statuses without enum truncation
            try {
                await db.query("ALTER TABLE bookings MODIFY COLUMN status VARCHAR(50) DEFAULT 'pending'");
            } catch {
                // Ignore if permission issue or already modified
            }
        } catch {
            await initDatabase();
            try {
                await db.query("ALTER TABLE bookings MODIFY COLUMN status VARCHAR(50) DEFAULT 'pending'");
            } catch {
                // Ignore
            }
        }
    },

    async create({
        formType,
        name,
        phone,
        email = null,
        serviceOrCourse = null,
        branchLocation = null,
        bookingDate = null,
        bookingTime = null,
        guests = 1,
        city = null,
        message = null,
        ipAddress = null,
    }) {
        await this.ensureTable();
        const [result] = await db.query(
            `INSERT INTO bookings 
            (form_type, name, phone, email, service_or_course, branch_location, booking_date, booking_time, guests, city, message, ip_address, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
            [
                formType,
                name,
                phone,
                email,
                serviceOrCourse,
                branchLocation,
                bookingDate,
                bookingTime,
                guests || 1,
                city,
                message,
                ipAddress,
            ]
        );
        return { id: result.insertId, formType, name, phone, email, status: "pending" };
    },

    async getAll({ status = null, formType = null, search = null } = {}) {
        await this.ensureTable();
        let query = "SELECT * FROM bookings WHERE 1=1";
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

        if (formType && formType !== "all") {
            if (formType === "home_page" || formType === "home") {
                query += " AND form_type IN ('hero_concierge', 'luxury_booking', 'home', 'home_concierge')";
            } else if (formType === "popup" || formType === "popup_modal" || formType === "modal") {
                query += " AND form_type IN ('modal_booking', 'popup_modal', 'booking_modal')";
            } else if (formType === "landing_page" || formType === "landing_pages" || formType === "landing") {
                query += " AND form_type IN ('bridal_landing_page', 'bridal_landing_modal', 'makeup_landing_page', 'landing_page', 'landing_page_bridal', 'makeup-artist-lucknow', 'makeup-landing-page', 'salon_landing_page', 'salon_landing_modal', 'salon-landing-page', 'salon-services-lucknow')";
            } else if (formType === "bridal_landing" || formType === "bridal_landing_page" || formType === "landing-page" || formType === "makeup-landing-page" || formType === "makeup_landing_page" || formType === "makeup-artist-lucknow") {
                query += " AND (form_type = 'bridal_landing_page' OR form_type = 'bridal_landing_modal' OR form_type = 'makeup_landing_page' OR form_type = 'landing_page' OR form_type = 'landing_page_bridal' OR form_type = 'makeup-artist-lucknow' OR form_type = 'makeup-landing-page')";
            } else if (formType === "salon_landing" || formType === "salon_landing_page" || formType === "salon-landing-page" || formType === "salon-services-lucknow") {
                query += " AND (form_type = 'salon_landing_page' OR form_type = 'salon_landing_modal' OR form_type = 'salon-landing-page' OR form_type = 'salon-services-lucknow')";
            } else if (formType === "website") {
                query += " AND form_type NOT IN ('bridal_landing_page', 'bridal_landing_modal', 'makeup_landing_page', 'landing_page', 'landing_page_bridal', 'salon_landing_page', 'salon_landing_modal', 'salon-landing-page', 'makeup-artist-lucknow', 'salon-services-lucknow')";
            } else if (formType === "contact_us" || formType === "contact") {
                query += " AND (form_type = 'contact_us' OR form_type = 'contact')";
            } else if (formType === "makeup" || formType === "makeup_page_booking") {
                query += " AND (form_type = 'makeup' OR form_type = 'makeup_page_booking')";
            } else {
                query += " AND form_type = ?";
                params.push(formType);
            }
        }

        if (search) {
            query += " AND (name LIKE ? OR phone LIKE ? OR email LIKE ? OR service_or_course LIKE ? OR form_type LIKE ?)";
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
        }

        query += " ORDER BY created_at DESC";

        const [rows] = await db.query(query, params);
        return rows;
    },

    async getById(id) {
        await this.ensureTable();
        const [rows] = await db.query("SELECT * FROM bookings WHERE id = ? LIMIT 1", [id]);
        return rows[0] || null;
    },

    async updateStatus(id, status) {
        await this.ensureTable();
        await db.query("UPDATE bookings SET status = ? WHERE id = ?", [status, id]);
        return { id, status };
    },

    async delete(id) {
        await this.ensureTable();
        await db.query("DELETE FROM bookings WHERE id = ?", [id]);
        return { id };
    },

    async deleteMany(ids) {
        if (!Array.isArray(ids) || ids.length === 0) return { count: 0 };
        await this.ensureTable();
        const placeholders = ids.map(() => "?").join(",");
        const [result] = await db.query(`DELETE FROM bookings WHERE id IN (${placeholders})`, ids);
        return { count: result.affectedRows };
    },

    async getStats() {
        await this.ensureTable();
        const [totalRows] = await db.query("SELECT COUNT(*) as total FROM bookings");
        const [pendingRows] = await db.query("SELECT COUNT(*) as pending FROM bookings WHERE status = 'pending'");
        const [assignedRows] = await db.query("SELECT COUNT(*) as assigned FROM bookings WHERE status = 'assigned'");
        const [followUpRows] = await db.query("SELECT COUNT(*) as follow_up FROM bookings WHERE status IN ('follow_up', 'follow-up')");
        const [confirmedRows] = await db.query("SELECT COUNT(*) as confirmed FROM bookings WHERE status IN ('confirmed', 'booked')");
        const [completedRows] = await db.query("SELECT COUNT(*) as completed FROM bookings WHERE status = 'completed'");
        const [cancelledRows] = await db.query("SELECT COUNT(*) as cancelled FROM bookings WHERE status = 'cancelled'");
        const [todayRows] = await db.query("SELECT COUNT(*) as today FROM bookings WHERE DATE(created_at) = CURDATE()");

        // Lead sources:
        // 1. Home Page: hero_concierge, luxury_booking
        const [homePageRows] = await db.query("SELECT COUNT(*) as count FROM bookings WHERE form_type IN ('hero_concierge', 'luxury_booking', 'home', 'home_concierge')");
        // 2. Popup Modal: modal_booking, popup_modal
        const [popupRows] = await db.query("SELECT COUNT(*) as count FROM bookings WHERE form_type IN ('modal_booking', 'popup_modal', 'booking_modal')");
        // 3. Landing Pages: bridal landing + salon landing
        const [landingPageRows] = await db.query("SELECT COUNT(*) as count FROM bookings WHERE form_type IN ('bridal_landing_page', 'bridal_landing_modal', 'makeup_landing_page', 'landing_page', 'landing_page_bridal', 'makeup-artist-lucknow', 'makeup-landing-page', 'salon_landing_page', 'salon_landing_modal', 'salon-landing-page', 'salon-services-lucknow')");

        const [bridalRows] = await db.query("SELECT COUNT(*) as count FROM bookings WHERE form_type IN ('bridal_landing_page', 'bridal_landing_modal', 'makeup_landing_page', 'landing_page', 'landing_page_bridal', 'makeup-artist-lucknow', 'makeup-landing-page')");
        const [salonRows] = await db.query("SELECT COUNT(*) as count FROM bookings WHERE form_type IN ('salon_landing_page', 'salon_landing_modal', 'salon-landing-page', 'salon-services-lucknow')");
        const [websiteRows] = await db.query("SELECT COUNT(*) as count FROM bookings WHERE form_type NOT IN ('bridal_landing_page', 'bridal_landing_modal', 'makeup_landing_page', 'landing_page', 'landing_page_bridal', 'salon_landing_page', 'salon_landing_modal', 'salon-landing-page', 'makeup-artist-lucknow', 'salon-services-lucknow')");

        return {
            total: totalRows[0]?.total || 0,
            pending: pendingRows[0]?.pending || 0,
            assigned: assignedRows[0]?.assigned || 0,
            follow_up: followUpRows[0]?.follow_up || 0,
            confirmed: confirmedRows[0]?.confirmed || 0,
            completed: completedRows[0]?.completed || 0,
            cancelled: cancelledRows[0]?.cancelled || 0,
            today: todayRows[0]?.today || 0,
            homePage: homePageRows[0]?.count || 0,
            popup: popupRows[0]?.count || 0,
            landingPages: landingPageRows[0]?.count || 0,
            bridalLanding: bridalRows[0]?.count || 0,
            salonLanding: salonRows[0]?.count || 0,
            website: websiteRows[0]?.count || 0,
        };
    },
};

export default BookingModel;
