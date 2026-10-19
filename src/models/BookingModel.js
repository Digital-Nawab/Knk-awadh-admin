import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";

/**
 * Returns current calendar date (YYYY-MM-DD) in Asia/Kolkata timezone (IST, UTC+05:30).
 * Midnight 12:00:00 AM IST marks the start of a new day, ending at 11:59:59 PM IST.
 */
export function getISTDateKey(date = new Date()) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(date));
}

const BookingModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM bookings LIMIT 1");
        } catch {
            await initDatabase();
        }

        try {
            await db.query("ALTER TABLE bookings MODIFY COLUMN status VARCHAR(50) DEFAULT 'pending'");
        } catch {}

        try {
            await db.query("ALTER TABLE bookings ADD COLUMN booking_number INT NULL DEFAULT NULL");
        } catch {}

        try {
            await db.query("ALTER TABLE bookings ADD COLUMN booking_date_ist VARCHAR(10) NULL DEFAULT NULL");
        } catch {}

        try {
            await db.query(`
                CREATE TABLE IF NOT EXISTS daily_booking_sequences (
                    date_key VARCHAR(10) PRIMARY KEY,
                    last_number INT NOT NULL DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
            `);
        } catch {}

        try {
            const [nullRows] = await db.query(
                "SELECT id, created_at FROM bookings WHERE booking_number IS NULL ORDER BY id ASC LIMIT 100"
            );
            for (const row of nullRows) {
                const d = new Date(row.created_at);
                const istDate = new Intl.DateTimeFormat("en-CA", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }).format(d);
                const [countRes] = await db.query(
                    "SELECT COUNT(*) as cnt FROM bookings WHERE (booking_date_ist = ? OR (booking_date_ist IS NULL AND DATE(created_at) = ?)) AND id <= ?",
                    [istDate, istDate, row.id]
                );
                const num = countRes[0]?.cnt || 1;
                await db.query(
                    "UPDATE bookings SET booking_number = ?, booking_date_ist = ? WHERE id = ?",
                    [num, istDate, row.id]
                );
            }
        } catch {}
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

        const dateKey = getISTDateKey(); // Current date in Asia/Kolkata (YYYY-MM-DD)
        const conn = await db.getConnection();
        let bookingNumber = 1;
        let insertId = null;

        try {
            await conn.beginTransaction();

            // Row-level lock on the sequence table for today's dateKey to guarantee uniqueness & no race conditions
            const [seqRows] = await conn.query(
                "SELECT last_number FROM daily_booking_sequences WHERE date_key = ? FOR UPDATE",
                [dateKey]
            );

            if (seqRows.length > 0) {
                bookingNumber = Number(seqRows[0].last_number) + 1;
                await conn.query(
                    "UPDATE daily_booking_sequences SET last_number = ? WHERE date_key = ?",
                    [bookingNumber, dateKey]
                );
            } else {
                // First booking of the day (starts from #1 at 12:00 AM IST)
                const [existing] = await conn.query(
                    "SELECT MAX(booking_number) as max_num FROM bookings WHERE booking_date_ist = ?",
                    [dateKey]
                );
                const currentMax = Number(existing[0]?.max_num) || 0;
                bookingNumber = Math.max(currentMax, 0) + 1;
                await conn.query(
                    "INSERT INTO daily_booking_sequences (date_key, last_number) VALUES (?, ?)",
                    [dateKey, bookingNumber]
                );
            }

            const [result] = await conn.query(
                `INSERT INTO bookings 
                (form_type, name, phone, email, service_or_course, branch_location, booking_date, booking_time, guests, city, message, ip_address, status, booking_number, booking_date_ist)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
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
                    bookingNumber,
                    dateKey,
                ]
            );

            insertId = result.insertId;
            await conn.commit();
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }

        return {
            id: insertId,
            formType,
            name,
            phone,
            email,
            status: "pending",
            bookingNumber,
            requestNumber: bookingNumber,
        };
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
            } else if (
                formType === "skin_aesthetics" ||
                formType === "skin-aesthetics" ||
                formType === "skin_consultation" ||
                formType === "skin"
            ) {
                query += " AND form_type IN ('skin_consultation', 'skin-aesthetics', 'skin_aesthetics', 'skin', 'aesthetic', 'laser-treatment', 'microblading')";
            } else if (formType === "website") {
                query += " AND form_type NOT IN ('bridal_landing_page', 'bridal_landing_modal', 'makeup_landing_page', 'landing_page', 'landing_page_bridal', 'salon_landing_page', 'salon_landing_modal', 'salon-landing-page', 'makeup-artist-lucknow', 'salon-services-lucknow', 'skin_consultation', 'skin-aesthetics', 'skin_aesthetics', 'skin', 'aesthetic', 'laser-treatment', 'microblading')";
            } else if (formType === "contact_us" || formType === "contact") {
                query += " AND (form_type = 'contact_us' OR form_type = 'contact')";
            } else if (formType === "makeup" || formType === "makeup_page_booking") {
                query += " AND (form_type = 'makeup' OR form_type = 'makeup_page_booking')";
            } else if (formType === "academy" || formType === "enroll_for_course" || formType === "enroll-for-course") {
                query += " AND (form_type = 'academy' OR form_type = 'enroll_for_course' OR form_type = 'enroll-for-course')";
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
        const [spamRows] = await db.query("SELECT COUNT(*) as spam FROM bookings WHERE status = 'spam'");
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
        
        // 4. Skin Aesthetics Leads:
        const [skinRows] = await db.query("SELECT COUNT(*) as count FROM bookings WHERE form_type IN ('skin_consultation', 'skin-aesthetics', 'skin_aesthetics', 'skin', 'aesthetic', 'laser-treatment', 'microblading')");

        // 5. Academy Leads:
        const [academyRows] = await db.query("SELECT COUNT(*) as count FROM bookings WHERE form_type IN ('academy', 'enroll_for_course', 'enroll-for-course')");

        // 6. General / Other Website:
        const [websiteRows] = await db.query("SELECT COUNT(*) as count FROM bookings WHERE form_type NOT IN ('bridal_landing_page', 'bridal_landing_modal', 'makeup_landing_page', 'landing_page', 'landing_page_bridal', 'salon_landing_page', 'salon_landing_modal', 'salon-landing-page', 'makeup-artist-lucknow', 'salon-services-lucknow', 'skin_consultation', 'skin-aesthetics', 'skin_aesthetics', 'skin', 'aesthetic', 'laser-treatment', 'microblading')");

        return {
            total: totalRows[0]?.total || 0,
            pending: pendingRows[0]?.pending || 0,
            assigned: assignedRows[0]?.assigned || 0,
            follow_up: followUpRows[0]?.follow_up || 0,
            confirmed: confirmedRows[0]?.confirmed || 0,
            completed: completedRows[0]?.completed || 0,
            cancelled: cancelledRows[0]?.cancelled || 0,
            spam: spamRows[0]?.spam || 0,
            today: todayRows[0]?.today || 0,
            homePage: homePageRows[0]?.count || 0,
            popup: popupRows[0]?.count || 0,
            landingPages: landingPageRows[0]?.count || 0,
            bridalLanding: bridalRows[0]?.count || 0,
            salonLanding: salonRows[0]?.count || 0,
            skinAesthetics: skinRows[0]?.count || 0,
            academy: academyRows[0]?.count || 0,
            website: websiteRows[0]?.count || 0,
        };
    },
};

export default BookingModel;
