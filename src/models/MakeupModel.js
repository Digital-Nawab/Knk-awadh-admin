import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";
import { DEFAULT_MAKEUP_SECTIONS, MAKEUP_SECTION_METADATA } from "@/data/makeupDefaults";

const MakeupModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM makeup_sections LIMIT 1");
        } catch {
            await initDatabase();
        }
    },

    async getAllSections() {
        await this.ensureTable();

        const [rows] = await db.query(
            "SELECT section_key, section_name, content FROM makeup_sections"
        );

        const sections = { ...DEFAULT_MAKEUP_SECTIONS };

        for (const row of rows) {
            let parsed = row.content;
            if (typeof parsed === "string") {
                try {
                    parsed = JSON.parse(parsed);
                } catch {
                    parsed = {};
                }
            }

            const defaultVal = DEFAULT_MAKEUP_SECTIONS[row.section_key] || {};
            // Deep merge objects or replace arrays cleanly
            if (Array.isArray(defaultVal) && Array.isArray(parsed)) {
                sections[row.section_key] = parsed;
            } else if (
                typeof defaultVal === "object" &&
                defaultVal !== null &&
                typeof parsed === "object" &&
                parsed !== null &&
                !Array.isArray(defaultVal)
            ) {
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
            "SELECT section_key, section_name, content FROM makeup_sections WHERE section_key = ?",
            [sectionKey]
        );

        const defaultVal = DEFAULT_MAKEUP_SECTIONS[sectionKey] || {};

        if (rows.length === 0) {
            return {
                sectionKey,
                sectionName:
                    MAKEUP_SECTION_METADATA.find((s) => s.key === sectionKey)?.label || sectionKey,
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

        const merged =
            typeof defaultVal === "object" && !Array.isArray(defaultVal) && defaultVal !== null
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
            MAKEUP_SECTION_METADATA.find((s) => s.key === sectionKey)?.label ||
            sectionKey.replace(/_/g, " ").toUpperCase();

        const jsonString = JSON.stringify(content);

        await db.query(
            `INSERT INTO makeup_sections (section_key, section_name, content)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE
             section_name = VALUES(section_name),
             content = VALUES(content),
             updated_at = CURRENT_TIMESTAMP`,
            [sectionKey, label, jsonString]
        );

        return await this.getSection(sectionKey);
    },

    async updateAllSections(sectionsData) {
        await this.ensureTable();

        for (const [key, content] of Object.entries(sectionsData)) {
            const label =
                MAKEUP_SECTION_METADATA.find((s) => s.key === key)?.label ||
                key.replace(/_/g, " ").toUpperCase();

            await db.query(
                `INSERT INTO makeup_sections (section_key, section_name, content)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                 section_name = VALUES(section_name),
                 content = VALUES(content),
                 updated_at = CURRENT_TIMESTAMP`,
                [key, label, JSON.stringify(content)]
            );
        }

        return await this.getAllSections();
    },
};

export default MakeupModel;
