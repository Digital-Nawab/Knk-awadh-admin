import mysql from 'mysql2/promise';

async function run() {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'knk_awadh',
    });

    console.log("Connected to MySQL database.");

    // 1. Ensure columns are large enough
    await conn.query('ALTER TABLE service_categories MODIFY COLUMN items LONGTEXT NULL');
    await conn.query('ALTER TABLE service_categories MODIFY COLUMN content LONGTEXT NULL');
    await conn.query('ALTER TABLE service_categories MODIFY COLUMN short_desc TEXT NULL');
    await conn.query('ALTER TABLE service_categories MODIFY COLUMN title VARCHAR(255) NULL');

    // 2. Data for all 5 services
    const services = [
        {
            name: 'Nails',
            slug: 'nail-art',
            title: 'Nails, done right.',
            short_desc: 'Gel, acrylic, extensions or a simple mani-pedi — every nail service handled by an artist trained for precision and finish.',
            content: 'Our bespoke nail studio combines sterile clinical hygiene with runway-inspired artistry. Whether you desire subtle French tips, durable gel extensions, or intricate custom nail art, our technicians craft each set to perfection.',
            image: '/assets/images/new/service/NAILS.webp',
            is_active: 1,
            items: JSON.stringify([
                {
                    category: 'Nail Extensions',
                    items: [
                        'Nail Cut',
                        'Nail Filing',
                        'Nail Paint Application',
                        'Gel Paint Removal',
                        'Gel Paint Application',
                        'Temporary Nail Extensions',
                        'Gel Nail Extensions',
                        'Acrylic Nail Extensions'
                    ]
                },
                {
                    category: 'Mani / Pedi',
                    items: [
                        'Basic',
                        'O3',
                        'Alga',
                        'Bombini',
                        'Biscotti'
                    ]
                }
            ])
        },
        {
            name: 'Hair',
            slug: 'hair',
            title: 'Precision cuts, bespoke colour, deep repair.',
            short_desc: 'Every strand has a story. Our master stylists assess your hair texture and face frame before crafting your bespoke transformation.',
            content: 'From restorative Nanoplastia and Keratin rituals to bespoke balayage and precision beard sculpting for gentlemen, our hair studio delivers transformative results.',
            image: '/assets/images/new/service/hairservice.webp',
            is_active: 1,
            items: JSON.stringify([
                {
                    category: 'Hair Repair',
                    items: [
                        'Redken hair treatment',
                        'Olaplex Mix',
                        'Vitamino Acidic Sealer',
                        'Nourishing Ritual',
                        'Fusio Dose',
                        'Absolute Intense Repair',
                        'PH Plex hair spa',
                        'Anti dandruff',
                        'Anti breakage',
                        'Anti hairfall',
                        'Express ritual hair spa'
                    ]
                },
                {
                    category: 'Hair (Men)',
                    items: [
                        'Moustache color',
                        'Clean shave',
                        'Streaks',
                        'Beard',
                        'Beard styling/shape up',
                        'Basic hair cut',
                        'Beard color',
                        'Advance hair cut',
                        'Hair color with ammonia',
                        'Hair color without ammonia',
                        'Highlights'
                    ]
                }
            ])
        },
        {
            name: 'Beauty',
            slug: 'beauty',
            title: 'Everyday grooming, elevated to an art.',
            short_desc: 'From gentle organic wax formulations to precision facial threading, experience painless, impeccably hygienic beauty care.',
            content: 'Pamper yourself with premium skin-safe waxing, natural bleaching therapies, and meticulous threading tailored for flawless skin.',
            image: '/assets/images/new/service/beautyservice.webp',
            is_active: 1,
            items: JSON.stringify([
                {
                    category: 'Wax Bar',
                    items: [
                        'Eyebrow (Thread/Wax)',
                        'Upper lip (Thread/Wax)',
                        'Lower lip (Thread/Wax)',
                        'Forehead (Thread/Wax)',
                        'Side locks (Thread/Wax)',
                        'Full face (Thread/Wax)'
                    ]
                },
                {
                    category: 'Body Wax',
                    items: [
                        'Underarms (Rica/Thalgo)',
                        'Half arms (Rica/Thalgo)',
                        'Full arms (Rica/Thalgo)',
                        'Abdomen (Rica/Thalgo)',
                        'Half leg (Rica/Thalgo)',
                        'Half back (Rica/Thalgo)',
                        'Full leg (Rica/Thalgo)',
                        'Full front (Rica/Thalgo)',
                        'Full back (Rica/Thalgo)',
                        'B-Line (Rica/Thalgo)',
                        'B-wax (Rica/Thalgo)',
                        'Full body wax (Rica/Thalgo)'
                    ]
                },
                {
                    category: 'Bleach',
                    items: [
                        'Face & Neck (Raga/Kanpeki)',
                        'Full Arms (Raga/Kanpeki)',
                        'Full Back (Raga/Kanpeki)',
                        'Full Front (Raga/Kanpeki)',
                        'Full Legs (Raga/Kanpeki)',
                        'Full Body (Raga/Kanpeki)'
                    ]
                }
            ])
        },
        {
            name: 'Facial',
            slug: 'facial',
            title: 'Skin that breathes, glows, and turns heads.',
            short_desc: 'Advanced medical-grade aesthetic facials, multi-step HydraFacials and Casmara skin firming therapies.',
            content: 'Our targeted facials detoxify, deeply hydrate, and infuse active botanicals to restore radiant youthful glow and glass skin texture.',
            image: '/assets/images/new/service/facialservice.webp',
            is_active: 1,
            items: JSON.stringify([
                {
                    category: 'Masks',
                    items: [
                        'Goji mask',
                        'Algae mask',
                        'Thalgo sheet mask'
                    ]
                },
                {
                    category: 'Clean Ups',
                    items: [
                        'O3',
                        'Kanpeki',
                        'Thalgo'
                    ]
                },
                {
                    category: 'Facial',
                    items: [
                        'O3',
                        'Kanpeki',
                        'Casmara',
                        'Thalgo'
                    ]
                }
            ])
        },
        {
            name: 'Body',
            slug: 'body',
            title: 'Therapeutic touch, total restoration.',
            short_desc: 'Indulgent full body polishes, Swedish massages, and detoxifying steam rituals designed to revive your senses.',
            content: 'Escape into deep relaxation with therapeutic massages, exfoliating body polishes, and revitalizing steam baths.',
            image: '/assets/images/new/service/bodyservice.webp',
            is_active: 1,
            items: JSON.stringify([
                {
                    category: 'Foot & Head Massage',
                    items: [
                        'Foot Massage — Duration 30 Minutes',
                        'Foot Massage — Duration 45 Minutes',
                        'Head Massage — Duration 30 Minutes',
                        'Head Massage — With wash and blow dry'
                    ]
                },
                {
                    category: 'Body',
                    items: [
                        'Steam bath — 25 minutes',
                        'Full body scrub'
                    ]
                },
                {
                    category: 'Body Polish',
                    items: [
                        'Regular',
                        'Alga',
                        'Gluta'
                    ]
                },
                {
                    category: 'Body Massage',
                    items: [
                        'Swedish massage (60/90)',
                        'Potli massage (60/90)',
                        'Epsom Salt therapy (60/90)',
                        'Deep tissue (60/90)'
                    ]
                }
            ])
        }
    ];

    // Delete test junk row id: 2 if it's 'dfgdfgd'
    await conn.query("DELETE FROM service_categories WHERE slug = 'dfgdfgd'");

    for (const s of services) {
        const [existing] = await conn.query(
            "SELECT id FROM service_categories WHERE slug = ? OR (slug = 'nails' AND ? = 'nail-art')",
            [s.slug, s.slug]
        );
        if (existing.length > 0) {
            await conn.query(
                "UPDATE service_categories SET name = ?, slug = ?, title = ?, short_desc = ?, content = ?, items = ?, image = ?, is_active = ?, deleted_at = NULL WHERE id = ?",
                [s.name, s.slug, s.title, s.short_desc, s.content, s.items, s.image, s.is_active, existing[0].id]
            );
            console.log("Updated service:", s.name, "-> slug:", s.slug);
        } else {
            await conn.query(
                "INSERT INTO service_categories (name, slug, title, short_desc, content, items, image, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [s.name, s.slug, s.title, s.short_desc, s.content, s.items, s.image, s.is_active]
            );
            console.log("Inserted service:", s.name, "-> slug:", s.slug);
        }
    }

    const [all] = await conn.query('SELECT id, name, slug, title FROM service_categories WHERE deleted_at IS NULL');
    console.log("Final categories in DB:", all);

    await conn.end();
}

run().catch(console.error);
