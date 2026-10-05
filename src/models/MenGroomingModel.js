import { db } from "@/lib/db";
import { initDatabase } from "@/lib/initDb";
import {
    DEFAULT_MEN_GROOMING_SECTIONS,
    MEN_GROOMING_SECTION_METADATA,
} from "@/data/menGroomingDefaults";

const MenGroomingModel = {
    async ensureTable() {
        try {
            await db.query("SELECT 1 FROM men_grooming_sections LIMIT 1");
        } catch {
            await initDatabase();
        }
    },

    async getAllSections() {
        await this.ensureTable();

        const [rows] = await db.query(
            "SELECT section_key, section_name, content FROM men_grooming_sections"
        );

        const sections = { ...DEFAULT_MEN_GROOMING_SECTIONS };

        for (const row of rows) {
            let parsed = row.content;
            if (typeof parsed === "string") {
                try {
                    parsed = JSON.parse(parsed);
                } catch {
                    parsed = {};
                }
            }

            let targetKey = row.section_key;
            if (targetKey === "services") targetKey = "disciplines";
            if (targetKey === "testimonials") targetKey = "reviews";

            const defaultVal = DEFAULT_MEN_GROOMING_SECTIONS[targetKey] || {};
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

        let normalizedKey = sectionKey;
        if (normalizedKey === "services") normalizedKey = "disciplines";
        if (normalizedKey === "testimonials") normalizedKey = "reviews";

        const [rows] = await db.query(
            "SELECT section_key, section_name, content FROM men_grooming_sections WHERE section_key = ? OR section_key = ?",
            [normalizedKey, sectionKey]
        );

        const defaultVal = DEFAULT_MEN_GROOMING_SECTIONS[normalizedKey] || {};

        if (rows.length === 0) {
            return {
                sectionKey: normalizedKey,
                sectionName:
                    MEN_GROOMING_SECTION_METADATA.find((s) => s.key === normalizedKey)?.label || normalizedKey,
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
            sectionKey: normalizedKey,
            sectionName: rows[0].section_name,
            content: merged,
        };
    },

    async updateSection(sectionKey, content, sectionName = null) {
        await this.ensureTable();

        let normalizedKey = sectionKey;
        if (normalizedKey === "services") normalizedKey = "disciplines";
        if (normalizedKey === "testimonials") normalizedKey = "reviews";

        const label =
            sectionName ||
            MEN_GROOMING_SECTION_METADATA.find((s) => s.key === normalizedKey)?.label ||
            normalizedKey.replace(/_/g, " ").toUpperCase();

        const jsonString = JSON.stringify(content);

        await db.query(
            `INSERT INTO men_grooming_sections (section_key, section_name, content)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE
             section_name = VALUES(section_name),
             content = VALUES(content),
             updated_at = CURRENT_TIMESTAMP`,
            [normalizedKey, label, jsonString]
        );

        return await this.getSection(normalizedKey);
    },

    async updateAllSections(sectionsData) {
        await this.ensureTable();

        for (const [key, content] of Object.entries(sectionsData)) {
            let normalizedKey = key;
            if (normalizedKey === "services") normalizedKey = "disciplines";
            if (normalizedKey === "testimonials") normalizedKey = "reviews";

            const label =
                MEN_GROOMING_SECTION_METADATA.find((s) => s.key === normalizedKey)?.label ||
                normalizedKey.replace(/_/g, " ").toUpperCase();

            await db.query(
                `INSERT INTO men_grooming_sections (section_key, section_name, content)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                 section_name = VALUES(section_name),
                 content = VALUES(content),
                 updated_at = CURRENT_TIMESTAMP`,
                [normalizedKey, label, JSON.stringify(content)]
            );
        }

        return await this.getAllSections();
    },
};

export default MenGroomingModel;
