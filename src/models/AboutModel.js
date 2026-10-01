import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";
import { DEFAULT_ABOUT_SECTIONS, SECTION_METADATA } from "@/data/aboutDefaults";

const AboutModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM about_sections LIMIT 1");
        } catch {
            await initDatabase();
        }
    },

    async getAllSections() {
        await this.ensureTable();

        const [rows] = await db.query(
            "SELECT section_key, section_name, content FROM about_sections"
        );

        const sections = { ...DEFAULT_ABOUT_SECTIONS };

        for (const row of rows) {
            let parsed = row.content;
            if (typeof parsed === "string") {
                try {
                    parsed = JSON.parse(parsed);
                } catch {
                    parsed = {};
                }
            }

            const defaultVal = DEFAULT_ABOUT_SECTIONS[row.section_key] || {};
            // Deep merge object or replace arrays cleanly
            if (Array.isArray(defaultVal) && Array.isArray(parsed)) {
                sections[row.section_key] = parsed;
            } else if (typeof defaultVal === "object" && typeof parsed === "object" && parsed !== null) {
                sections[row.section_key] = {
                    ...defaultVal,
                    ...parsed,
                };
            } else {
                sections[row.section_key] = parsed ?? defaultVal;
            }
        }

        return sections;
    },

    async getSection(sectionKey) {
        await this.ensureTable();

        const [rows] = await db.query(
            "SELECT section_key, section_name, content FROM about_sections WHERE section_key = ?",
            [sectionKey]
        );

        const defaultVal = DEFAULT_ABOUT_SECTIONS[sectionKey] || {};

        if (rows.length === 0) {
            return {
                sectionKey,
                sectionName: SECTION_METADATA.find((s) => s.key === sectionKey)?.label || sectionKey,
                content: defaultVal,
            };
        }

        let parsed = rows[0].content;
        if (typeof parsed === "string") {
            try {
                parsed = JSON.parse(parsed);
            } catch {
                parsed = {};
            }
        }

        const merged = typeof defaultVal === "object" && !Array.isArray(defaultVal)
            ? { ...defaultVal, ...parsed }
            : (parsed ?? defaultVal);

        return {
            sectionKey,
            sectionName: rows[0].section_name,
            content: merged,
        };
    },

    async updateSection(sectionKey, content, sectionName = null) {
        await this.ensureTable();

        const label =
            sectionName ||
            SECTION_METADATA.find((s) => s.key === sectionKey)?.label ||
            sectionKey.replace(/_/g, " ").toUpperCase();

        const jsonString = JSON.stringify(content);

        await db.query(
            `INSERT INTO about_sections (section_key, section_name, content)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE 
                section_name = COALESCE(VALUES(section_name), section_name),
                content = VALUES(content),
                updated_at = CURRENT_TIMESTAMP`,
            [sectionKey, label, jsonString]
        );

        return this.getSection(sectionKey);
    },

    async updateAllSections(sectionsMap) {
        await this.ensureTable();

        for (const [key, content] of Object.entries(sectionsMap)) {
            await this.updateSection(key, content);
        }

        return this.getAllSections();
    },
};

export default AboutModel;
