import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";

const BookingModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM bookings LIMIT 1");
        } catch {
            await initDatabase();
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
            query += " AND status = ?";
            params.push(status);
        }

        if (formType && formType !== "all") {
            query += " AND form_type = ?";
            params.push(formType);
        }

        if (search) {
            query += " AND (name LIKE ? OR phone LIKE ? OR email LIKE ? OR service_or_course LIKE ?)";
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm, searchTerm);
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

    async getStats() {
        await this.ensureTable();
        const [totalRows] = await db.query("SELECT COUNT(*) as total FROM bookings");
        const [pendingRows] = await db.query("SELECT COUNT(*) as pending FROM bookings WHERE status = 'pending'");
        const [confirmedRows] = await db.query("SELECT COUNT(*) as confirmed FROM bookings WHERE status = 'confirmed'");
        const [todayRows] = await db.query("SELECT COUNT(*) as today FROM bookings WHERE DATE(created_at) = CURDATE()");

        return {
            total: totalRows[0]?.total || 0,
            pending: pendingRows[0]?.pending || 0,
            confirmed: confirmedRows[0]?.confirmed || 0,
            today: todayRows[0]?.today || 0,
        };
    },
};

export default BookingModel;
