import mysql from "mysql2/promise";
import { DEFAULT_NAILS_SECTIONS, NAILS_SECTION_METADATA } from "../src/data/nailsDefaults.js";

async function main() {
    const conn = await mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "knk-awadh",
    });

    await conn.query(`
        CREATE TABLE IF NOT EXISTS nails_sections (
            id INT AUTO_INCREMENT PRIMARY KEY,
            section_key VARCHAR(50) NOT NULL UNIQUE,
            section_name VARCHAR(100) NOT NULL,
            content JSON NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_section_key (section_key)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    const [existing] = await conn.query("SELECT id FROM nails_sections LIMIT 1");
    if (existing.length === 0) {
        const values = NAILS_SECTION_METADATA.map((m) => [
            m.key,
            m.label,
            JSON.stringify(DEFAULT_NAILS_SECTIONS[m.key] || {}),
        ]);
        await conn.query(
            "INSERT INTO nails_sections (section_key, section_name, content) VALUES ?",
            [values]
        );
        console.log("nails_sections seeded successfully with default sections!");
    } else {
        console.log("nails_sections table already exists and contains data.");
    }

    const [rows] = await conn.query("SELECT id, section_key, section_name FROM nails_sections");
    console.log("Current nails_sections rows:", rows);

    await conn.end();
}

main().catch((err) => {
    console.error("Migration error:", err);
    process.exit(1);
});
