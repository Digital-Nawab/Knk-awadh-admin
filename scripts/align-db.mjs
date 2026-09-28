import { db } from "../src/lib/db.js";

async function run() {
    try {
        // 1. Update Nails slug
        await db.query("UPDATE service_categories SET slug = 'nails', name = 'Nails', display_order = 1, is_active = 1 WHERE slug = 'nail-art' OR name = 'Nails'");
        await db.query("UPDATE service_categories SET display_order = 2, is_active = 1 WHERE slug = 'hair' OR name = 'Hair'");
        await db.query("UPDATE service_categories SET display_order = 3, is_active = 1 WHERE slug = 'beauty' OR name = 'Beauty'");
        await db.query("UPDATE service_categories SET display_order = 4, is_active = 1 WHERE slug = 'facial' OR name = 'Facial'");
        await db.query("UPDATE service_categories SET display_order = 5, is_active = 1 WHERE slug = 'body' OR name = 'Body'");

        // Deactivate others
        await db.query("UPDATE service_categories SET is_active = 0 WHERE slug IN ('aesthetic', 'men-grooming', 'makeup') OR name IN ('Aesthetics', 'Makeup', 'Makeup Studio', \"Men's Grooming\")");

        // Fetch categories to get IDs
        const [cats] = await db.query("SELECT id, name, slug FROM service_categories WHERE is_active = 1");
        console.log("Active categories:", cats);

        const catMap = {};
        cats.forEach((c) => {
            catMap[c.slug] = c.id;
            catMap[c.name.toLowerCase()] = c.id;
        });

        // Update services category_id and category_slug
        if (catMap["nails"]) {
            await db.query("UPDATE services SET category_id = ?, category_slug = 'nails' WHERE category_name = 'Nails' OR category_slug IN ('nails', 'nail-art')", [catMap["nails"]]);
        }
        if (catMap["hair"]) {
            await db.query("UPDATE services SET category_id = ?, category_slug = 'hair' WHERE category_name = 'Hair' OR category_slug = 'hair'", [catMap["hair"]]);
        }
        if (catMap["beauty"]) {
            await db.query("UPDATE services SET category_id = ?, category_slug = 'beauty' WHERE category_name = 'Beauty' OR category_slug = 'beauty'", [catMap["beauty"]]);
        }
        if (catMap["facial"]) {
            await db.query("UPDATE services SET category_id = ?, category_slug = 'facial' WHERE category_name = 'Facial' OR category_slug = 'facial'", [catMap["facial"]]);
        }
        if (catMap["body"]) {
            await db.query("UPDATE services SET category_id = ?, category_slug = 'body' WHERE category_name = 'Body' OR category_slug = 'body'", [catMap["body"]]);
        }

        // Seed / Ensure the 8 nail services
        const nailServices = [
            { name: "Nail Cut", slug: "nail-cut", order: 1, desc: "Professional nail cutting and hygiene treatment with precision trimming." },
            { name: "Nail Filing", slug: "nail-filing", order: 2, desc: "Refined edge shaping and bevelled finishing for smooth, elegant contouring." },
            { name: "Nail Paint Application", slug: "nail-paint-application", order: 3, desc: "Flawless base and top coat polish application with streak-free high shine." },
            { name: "Gel Paint Removal", slug: "gel-paint-removal", order: 4, desc: "Gentle, nourishing soak-off and cuticle restoration without damaging the natural nail plate." },
            { name: "Gel Paint Application", slug: "gel-paint-application", order: 5, desc: "UV-cured chip-free gel colour formulated to last up to 3-4 weeks with mirror gloss." },
            { name: "Temporary Nail Extensions", slug: "temporary-nail-extensions", order: 6, desc: "Lightweight, event-ready instant nail enhancements tailored to your desired length." },
            { name: "Gel Nail Extensions", slug: "gel-nail-extensions", order: 7, desc: "Sculpted hard gel extensions delivering flexibility, crystal transparency, and durable strength." },
            { name: "Acrylic Nail Extensions", slug: "acrylic-nail-extensions", order: 8, desc: "High-durability sculpted acrylic extensions crafted for intense apex architecture and longevity." },
        ];

        for (const ns of nailServices) {
            const [exist] = await db.query("SELECT id FROM services WHERE slug = ? LIMIT 1", [ns.slug]);
            if (!exist || exist.length === 0) {
                await db.query(
                    `INSERT INTO services 
                    (category_id, category_name, category_slug, name, title, slug, short_desc, description, image, display_order, is_active)
                    VALUES (?, 'Nails', 'nails', ?, ?, ?, ?, ?, '/assets/images/new/service/NAILS.webp', ?, 1)`,
                    [catMap["nails"], ns.name, ns.name, ns.slug, ns.desc, ns.desc, ns.order]
                );
                console.log("Inserted service:", ns.name);
            } else {
                await db.query(
                    "UPDATE services SET category_id = ?, category_name = 'Nails', category_slug = 'nails', display_order = ?, is_active = 1 WHERE id = ?",
                    [catMap["nails"], ns.order, exist[0].id]
                );
                console.log("Updated service:", ns.name);
            }
        }

        console.log("Categories and services alignment complete!");
        process.exit(0);
    } catch (e) {
        console.error("Error aligning database:", e);
        process.exit(1);
    }
}

run();
