import { db } from "../src/lib/db.js";
import { nailsShowcaseServices, hairShowcaseServices, beautyShowcaseServices } from "../src/data/categoryShowcaseData.js";
import { SERVICE_CATEGORIES } from "../src/data/servicesCatalog.js";

async function run() {
    try {
        console.log("Starting services table migration and seeding...");

        // 1. Create services table
        await db.query(`
            CREATE TABLE IF NOT EXISTS services (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category_id INT NULL,
                category_name VARCHAR(100) NOT NULL,
                category_slug VARCHAR(100) NOT NULL,
                name VARCHAR(150) NOT NULL,
                title VARCHAR(255) NULL,
                slug VARCHAR(150) NOT NULL UNIQUE,
                short_desc TEXT NULL,
                description LONGTEXT NULL,
                image VARCHAR(255) NOT NULL,
                display_order INT DEFAULT 1,
                tags TEXT NULL,
                filter_category VARCHAR(100) NULL,
                price VARCHAR(100) DEFAULT 'On request',
                is_active TINYINT(1) DEFAULT 1,
                deleted_at DATETIME NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_category_slug (category_slug),
                INDEX idx_slug (slug),
                INDEX idx_is_active (is_active)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log("Services table verified / created.");

        // 2. Ensure categories exist in service_categories
        const categoriesToEnsure = [
            { name: "Nails", slug: "nail-art", title: "Nails, done right.", shortDesc: "Gel, acrylic, extensions or a simple mani-pedi — every nail service handled by an artist trained for precision and finish.", image: "/assets/images/new/service/NAILS.webp" },
            { name: "Hair", slug: "hair", title: "Hair artistry & precision care.", shortDesc: "From bespoke precision haircuts and radiant global balayage to transformative Nanoplastia and Keratin rituals.", image: "/assets/images/new/service/hairservice.webp" },
            { name: "Makeup", slug: "makeup", title: "Celebrity bridal & HD makeup studio.", shortDesc: "Flawless bridal makeup, HD finishes, editorial glamour, and bespoke occasion looks crafted by senior artists.", image: "/assets/images/new/makeup-bride.webp" },
            { name: "Beauty", slug: "beauty", title: "Clean skin rituals & wellness.", shortDesc: "Multi-step HydraFacials, oxygenating cleanups, gentle fruit waxing, threading, and body polishing rituals.", image: "/assets/images/new/service/facialservice.webp" },
            { name: "Men's Grooming", slug: "men-grooming", title: "Distinguished gentleman's atelier.", shortDesc: "Precision cuts, hot towel shaves, beard architecture, and revitalising scalp therapies.", image: "/assets/images/new/service/mensgrooming.webp" },
            { name: "Aesthetics", slug: "aesthetic", title: "Advanced clinical aesthetics & cosmetology.", shortDesc: "Microblading, semi-permanent makeup, skin rejuvenation, and laser therapies.", image: "/assets/images/new/service/aesthetic.webp" },
            { name: "Facial", slug: "facial", title: "Signature cellular skin nutrition.", shortDesc: "Targeted hydration,Casamara rituals, and Japanese brightening facials.", image: "/assets/images/new/service/facialservice.webp" },
            { name: "Body", slug: "body", title: "Restorative body care & rituals.", shortDesc: "Exfoliating botanical scrubs, detan therapy, and therapeutic massages.", image: "/assets/images/new/service/bodyservice.webp" },
        ];

        for (const cat of categoriesToEnsure) {
            const [existing] = await db.query(
                "SELECT id FROM service_categories WHERE slug = ? OR name = ? LIMIT 1",
                [cat.slug, cat.name]
            );
            if (!existing || existing.length === 0) {
                await db.query(
                    "INSERT INTO service_categories (name, slug, title, short_desc, image, is_active) VALUES (?, ?, ?, ?, ?, 1)",
                    [cat.name, cat.slug, cat.title, cat.shortDesc, cat.image]
                );
                console.log(`Inserted category: ${cat.name} (${cat.slug})`);
            }
        }

        // 3. Seed services if empty
        const [existingServices] = await db.query("SELECT COUNT(*) as count FROM services");
        if (existingServices[0].count === 0) {
            console.log("Seeding initial services from showcase and catalog...");

            // Helper to insert service safely
            const insertService = async (item, catName, catSlug, order, filterCat = null) => {
                const tags = item.highlights ? JSON.stringify(item.highlights) : "[]";
                const slug = item.id || item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                const shortDesc = item.shortDesc || item.desc || "";
                const description = item.moreDesc || item.longDesc || item.shortDesc || "";
                const image = item.image || item.img || "/assets/images/new/service/NAILS.webp";
                const title = item.title || item.name;

                await db.query(
                    `INSERT INTO services 
                    (category_name, category_slug, name, title, slug, short_desc, description, image, display_order, tags, filter_category, is_active)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
                    ON DUPLICATE KEY UPDATE name=VALUES(name)`,
                    [catName, catSlug, title, title, slug, shortDesc, description, image, order, tags, filterCat || item.filterCategory || null]
                );
            };

            // Seed Nails
            let order = 1;
            for (const item of nailsShowcaseServices) {
                await insertService(item, "Nails", "nails", order++, item.filterCategory);
            }

            // Seed Hair
            order = 1;
            for (const item of hairShowcaseServices) {
                await insertService(item, "Hair", "hair", order++);
            }

            // Seed Beauty
            order = 1;
            for (const item of beautyShowcaseServices) {
                await insertService(item, "Beauty", "beauty", order++, item.filterCategory);
            }

            // Also seed any missing services from SERVICE_CATEGORIES (Makeup, Men's Grooming, Aesthetics, etc.)
            for (const cat of SERVICE_CATEGORIES) {
                if (cat.services && Array.isArray(cat.services)) {
                    let catOrder = 1;
                    for (const s of cat.services) {
                        const slug = s.slug || s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        const [found] = await db.query("SELECT id FROM services WHERE slug = ? LIMIT 1", [slug]);
                        if (!found || found.length === 0) {
                            const tags = s.highlights ? JSON.stringify(s.highlights) : JSON.stringify(cat.highlights || []);
                            const image = s.image || cat.image || "/assets/images/new/service/hairservice.webp";
                            await db.query(
                                `INSERT INTO services 
                                (category_name, category_slug, name, title, slug, short_desc, description, image, display_order, tags, filter_category, is_active)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
                                [cat.name, cat.slug, s.name, s.h1 || s.name, slug, s.shortDesc || "", s.longDesc || s.shortDesc || "", image, catOrder++, tags, null]
                            );
                        }
                    }
                }
            }

            const [newCount] = await db.query("SELECT COUNT(*) as count FROM services");
            console.log(`Seeded ${newCount[0].count} services successfully!`);
        } else {
            console.log(`Services table already has ${existingServices[0].count} records.`);
        }

        console.log("Migration complete!");
    } catch (err) {
        console.error("Migration error:", err);
    } finally {
        await db.end();
        process.exit(0);
    }
}

run();
