import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";
import {
    DEFAULT_NAILS_SECTIONS,
    NAILS_SECTION_METADATA,
} from "@/data/nailsDefaults";

const NailsModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM nails_sections LIMIT 1");
        } catch {
            await initDatabase();
        }
    },

    async getAllSections() {
        await this.ensureTable();

        const [rows] = await db.query(
            "SELECT section_key, section_name, content FROM nails_sections"
        );

        const sections = { ...DEFAULT_NAILS_SECTIONS };

        for (const row of rows) {
            let parsed = row.content;
            if (typeof parsed === "string") {
                try {
                    parsed = JSON.parse(parsed);
                } catch {
                    parsed = {};
                }
            }

            const targetKey = row.section_key;
            const defaultVal = DEFAULT_NAILS_SECTIONS[targetKey] || {};

            if (Array.isArray(defaultVal) && Array.isArray(parsed)) {
                sections[targetKey] = parsed;
            } else if (
                typeof defaultVal === "object" &&
                defaultVal !== null &&
                typeof parsed === "object" &&
                parsed !== null &&
                !Array.isArray(defaultVal)
            ) {
                sections[targetKey] = {
                    ...defaultVal,
                    ...parsed,
                };
            } else {
                sections[targetKey] = parsed ?? defaultVal;
            }
        }

        return sections;
    },

    async getSection(sectionKey) {
        await this.ensureTable();

        const [rows] = await db.query(
            "SELECT section_key, section_name, content FROM nails_sections WHERE section_key = ?",
            [sectionKey]
        );

        const defaultVal = DEFAULT_NAILS_SECTIONS[sectionKey] || {};

        if (rows.length === 0) {
            return {
                sectionKey,
                sectionName:
                    NAILS_SECTION_METADATA.find((s) => s.key === sectionKey)?.label || sectionKey,
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

    async updateSection(sectionKey, newContent, sectionName = null) {
        await this.ensureTable();

        const name =
            sectionName ||
            NAILS_SECTION_METADATA.find((s) => s.key === sectionKey)?.label ||
            sectionKey;

        const contentJson = JSON.stringify(newContent || {});

        const [existing] = await db.query(
            "SELECT id FROM nails_sections WHERE section_key = ?",
            [sectionKey]
        );

        if (existing.length > 0) {
            await db.query(
                "UPDATE nails_sections SET content = ?, section_name = ?, updated_at = CURRENT_TIMESTAMP WHERE section_key = ?",
                [contentJson, name, sectionKey]
            );
        } else {
            await db.query(
                "INSERT INTO nails_sections (section_key, section_name, content) VALUES (?, ?, ?)",
                [sectionKey, name, contentJson]
            );
        }

        return this.getSection(sectionKey);
    },
};

export default NailsModel;
