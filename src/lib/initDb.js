import { db } from "./db.js";
import bcrypt from "bcryptjs";

export async function initDatabase() {
    try {
        // 1. Users table
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'admin',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Check if admin user exists, if not create default admin
        const [existingUsers] = await db.query("SELECT id FROM users LIMIT 1");
        if (existingUsers.length === 0) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            await db.query(
                "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                ["KNK Admin", "admin@knksalon.in", hashedPassword, "admin"]
            );
            console.log("Default admin user created: admin@knksalon.in / admin123");
        }

        // 2. Heroes table
        await db.query(`
            CREATE TABLE IF NOT EXISTS heroes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                media_url VARCHAR(255) NOT NULL,
                media_type VARCHAR(20) DEFAULT 'image',
                alt_text VARCHAR(255) NOT NULL,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 3. Service Categories table
        await db.query(`
            CREATE TABLE IF NOT EXISTS service_categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                title VARCHAR(255) NULL,
                short_desc TEXT NULL,
                slug VARCHAR(150) NOT NULL UNIQUE,
                image VARCHAR(255) NULL,
                is_active TINYINT(1) DEFAULT 1,
                deleted_at DATETIME NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 3b. Services table
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


        // 4. Bookings / Leads table (Fully structured for all 4 forms)
        await db.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                form_type VARCHAR(50) NOT NULL,
                name VARCHAR(150) NOT NULL,
                phone VARCHAR(30) NOT NULL,
                email VARCHAR(150) NULL,
                service_or_course VARCHAR(150) NULL,
                branch_location VARCHAR(100) NULL,
                booking_date VARCHAR(50) NULL,
                booking_time VARCHAR(50) NULL,
                guests INT DEFAULT 1,
                city VARCHAR(100) NULL,
                message TEXT NULL,
                status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
                ip_address VARCHAR(45) NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 5. Blogs table
        await db.query(`
            CREATE TABLE IF NOT EXISTS blogs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                excerpt TEXT NOT NULL,
                content LONGTEXT NOT NULL,
                cover_image VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                author VARCHAR(100) DEFAULT 'KNK Editorial Team',
                read_time VARCHAR(50) DEFAULT '4 min read',
                tags VARCHAR(255) NULL,
                is_published TINYINT(1) DEFAULT 1,
                views_count INT DEFAULT 0,
                published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Seed sample blogs if empty
        const [existingBlogs] = await db.query("SELECT id FROM blogs LIMIT 1");
        if (existingBlogs.length === 0) {
            await db.query(`
                INSERT INTO blogs (title, slug, excerpt, content, cover_image, category, author, read_time, tags, is_published)
                VALUES 
                (
                    'The Royal Bridal Glow: Timeless Makeup Secrets from Awadh',
                    'royal-bridal-glow-awadh-makeup-secrets',
                    'Discover how regal Awadhi aesthetics, traditional skin preps, and contemporary HD artistry merge to craft the quintessential bridal radiance.',
                    '<p>Bridal makeup in Awadh has always celebrated refined elegance — where soft luminosity meets regal poise. At KNK Salon Awadh, every bridal journey begins weeks before the auspicious day with intensive hydration rituals, custom facials, and personalized pigment matching.</p><h3>The Heritage of Grace</h3><p>Unlike heavy, masked finishes, our signature bridal look emphasizes skin that breathes. We marry traditional rosewater toning and saffron-infused skin prep with ultra-refined HD foundations and featherlight airbrush sculpting.</p><blockquote>"A bride should never look like a stranger on her wedding day; she should look like the most radiant, majestic version of herself."</blockquote><h3>Pre-Bridal Skincare Timeline</h3><p>We advise our brides to begin their salon sessions at least 4 to 6 weeks ahead of the wedding. This allows deep nourishment through HydraFacials, tailored scalp spa treatments, and precise nail enhancements that complement their bridal lehenga.</p>',
                    '/assets/images/new/home/celebrity/7.webp',
                    'Bridal Artistry',
                    'KNK Editorial Team',
                    '5 min read',
                    'Bridal, Makeup, Glow, Awadh',
                    1
                ),
                (
                    'Nanoplastia vs Keratin: Which Treatment Restores Your Crown?',
                    'nanoplastia-vs-keratin-hair-treatment-guide',
                    'An expert breakdown on hair restructuring, organic amino acids, and choosing the perfect salon therapy for glossy, humidity-proof hair.',
                    '<p>Struggling with frizzy, unmanageable strands in Lucknow’s changing weather? Two treatments dominate modern salon inquiries: Keratin and Nanoplastia. While both deliver sleek, touchable hair, their inner chemistry differs completely.</p><h3>What Is Nanoplastia?</h3><p>Nanoplastia is an advanced organic treatment that infuses collagen, essential amino acids, and botanical oils deep into the hair cortex without harmful formaldehydes. It repairs internal damage while straightening up to 80-90% of curls.</p><h3>The Power of Keratin</h3><p>Keratin seals the hair cuticle with protective protein barriers, dramatically cutting down blow-dry time and providing a smooth mirror shine. It is ideal for chemically processed or bleached hair seeking frizz elimination without losing natural body.</p><p>Book a personal hair consultation at KNK Mahanagar or Gomti Nagar to let our senior stylists diagnose your strand porosity.</p>',
                    '/assets/images/new/home/celebrity/5.webp',
                    'Hair Care',
                    'Senior Hair Specialist',
                    '4 min read',
                    'Hair, Keratin, Nanoplastia, Salon',
                    1
                ),
                (
                    'The Art of Modern Gel Nail Extensions & French Accents',
                    'modern-gel-nail-extensions-french-accents',
                    'Why precision manicure care and custom-shaped gel extensions have become the ultimate subtle luxury accessory for modern women.',
                    '<p>Hands speak volumes before a word is uttered. In modern styling, nails are no longer an afterthought — they are the finishing stroke of high-fashion refinement.</p><h3>Why Choose Gel Extensions?</h3><p>Gel extensions provide a natural feel, superior flexibility, and crystal clarity that lasts for weeks without chipping. Paired with Parisian French tips or metallic gold accents, they offer effortless sophistication suitable for boardrooms and grand evening soirees alike.</p>',
                    '/assets/images/new/home/celebrity/4.webp',
                    'Nails & Aesthetics',
                    'Nail Art Director',
                    '3 min read',
                    'Nails, Gel Extensions, Luxury, Style',
                    1
                )
            `);
            console.log("Sample luxury blogs seeded successfully");
        }

        // 6. Master SEO Metadata table
        await db.query(`
            CREATE TABLE IF NOT EXISTS seo_metadata (
                id INT AUTO_INCREMENT PRIMARY KEY,
                page_path VARCHAR(255) NOT NULL UNIQUE,
                page_name VARCHAR(150) NOT NULL,
                meta_title VARCHAR(255) NOT NULL,
                meta_description TEXT NOT NULL,
                meta_keywords TEXT NULL,
                og_image VARCHAR(255) NULL,
                canonical_url VARCHAR(255) NULL,
                robots VARCHAR(100) DEFAULT 'index, follow',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Seed default SEO routes if empty
        const [existingSeo] = await db.query("SELECT id FROM seo_metadata LIMIT 1");
        if (existingSeo.length === 0) {
            await db.query(`
                INSERT INTO seo_metadata (page_path, page_name, meta_title, meta_description, meta_keywords, og_image, robots)
                VALUES
                (
                    '/',
                    'Homepage',
                    'KNK Salon Awadh | Luxury Hair, Skin & Bridal Studio Lucknow',
                    'Experience regal luxury at KNK Salon Awadh, Lucknow. Premium hair colour, keratin, advanced HydraFacials, celebrity bridal makeup, and professional beauty academy.',
                    'luxury salon lucknow, bridal makeup awadh, best hair salon lucknow, keratin treatment, aesthetics clinic',
                    '/assets/images/new/logo.png',
                    'index, follow'
                ),
                (
                    '/about',
                    'About Us',
                    'About KNK Salon Awadh | 15+ Years of Beauty Artistry & Luxury Care',
                    'Learn the heritage and craft behind KNK Salon Awadh. Senior stylists, internationally certified techniques, and luxury salons across Mahanagar, Hazratganj, and Gomti Nagar.',
                    'about knk salon, best salon lucknow, luxury beauty studio lucknow, salon history',
                    '/assets/images/new/about.webp',
                    'index, follow'
                ),
                (
                    '/services',
                    'All Services',
                    'Luxury Salon Services | Hair, Skin, Nails & Bridal | KNK Awadh',
                    'Explore our curated menu of hair styling, smoothening, Russian manicures, HydraFacials, and rejuvenating aesthetic therapies in Lucknow.',
                    'salon services lucknow, hair spa, nail art, facials, body massage lucknow',
                    '/assets/images/new/home/services/salon-service.webp',
                    'index, follow'
                ),
                (
                    '/makeup',
                    'Bridal & Celebrity Makeup',
                    'Celebrity Bridal & HD Makeup Studio Lucknow | KNK Salon Awadh',
                    'Flawless bridal makeup, airbrush finishes, engagement glam, and celebrity styling in Lucknow crafted by master makeup artists.',
                    'bridal makeup lucknow, celebrity makeup artist, airbrush bridal makeup, party makeup',
                    '/assets/images/new/home/services/makeup.webp',
                    'index, follow'
                ),
                (
                    '/academy',
                    'Beauty & Hair Academy',
                    'KNK Beauty Academy Lucknow | Professional Cosmetology & Makeup Courses',
                    'Launch your beauty career with certified cosmetology, hair styling, and professional makeup courses at KNK Academy Lucknow. Hands-on masterclasses with senior educators.',
                    'beauty academy lucknow, makeup artist courses, cosmetology diploma lucknow, hair styling academy',
                    '/assets/images/new/home/celebrity/6.webp',
                    'index, follow'
                ),
                (
                    '/gallery',
                    'Artistry Gallery',
                    'Artistry & Bridal Lookbook Gallery | KNK Salon Awadh Lucknow',
                    'View our portfolio of radiant brides, avant-garde hair transformations, couture nail art, and celebrity lookbooks.',
                    'knk salon portfolio, bridal photos lucknow, hair transformations gallery',
                    '/assets/images/new/home/bridal/1.webp',
                    'index, follow'
                ),
                (
                    '/blog',
                    'The Journal / Blog',
                    'The Beauty & Hair Journal | Tips, Trends & Secrets | KNK Salon Awadh',
                    'Expert beauty insights, bridal preparation guides, hair care secrets, and skincare rituals from the master stylists at KNK Salon Awadh.',
                    'beauty blog lucknow, hair care tips, bridal beauty guide, skincare secrets',
                    '/assets/images/new/home/celebrity/7.webp',
                    'index, follow'
                )
            `);
            console.log("Default SEO metadata seeded successfully");
        }

        // 7. Gallery Table (Artistry & Lookbook portfolio)
        await db.query(`
            CREATE TABLE IF NOT EXISTS gallery (
                id INT AUTO_INCREMENT PRIMARY KEY,
                image_url VARCHAR(255) NOT NULL,
                title VARCHAR(255) NULL,
                display_order INT DEFAULT 0,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_is_active (is_active),
                INDEX idx_display_order (display_order)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Seed default 22 bridal gallery lookbook images if empty
        const [existingGallery] = await db.query("SELECT id FROM gallery LIMIT 1");
        if (existingGallery.length === 0) {
            const galleryValues = [];
            for (let i = 1; i <= 22; i++) {
                galleryValues.push([
                    `/assets/images/new/home/bridal/${i}.webp`,
                    `KNK Awadh Bridal Lookbook ${i}`,
                    i,
                    1
                ]);
            }
            await db.query(
                `INSERT INTO gallery (image_url, title, display_order, is_active) VALUES ?`,
                [galleryValues]
            );
            console.log("Default 22 bridal gallery photos seeded successfully");
        }

        // 8. About Page Sections Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS about_sections (
                id INT AUTO_INCREMENT PRIMARY KEY,
                section_key VARCHAR(50) NOT NULL UNIQUE,
                section_name VARCHAR(100) NOT NULL,
                content JSON NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_section_key (section_key)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Seed default About page sections if empty
        const [existingAbout] = await db.query("SELECT id FROM about_sections LIMIT 1");
        if (existingAbout.length === 0) {
            const { DEFAULT_ABOUT_SECTIONS, SECTION_METADATA } = await import("../data/aboutDefaults.js");
            const values = SECTION_METADATA.map((meta) => [
                meta.key,
                meta.label,
                JSON.stringify(DEFAULT_ABOUT_SECTIONS[meta.key] || {}),
            ]);
            await db.query(
                `INSERT INTO about_sections (section_key, section_name, content) VALUES ?`,
                [values]
            );
            console.log("Default About page sections seeded successfully");
        }

        // 9. Interior Gallery Table (KNK Interior branches: Hazratganj and Gomti Nagar)
        await db.query(`
            CREATE TABLE IF NOT EXISTS interior_gallery (
                id INT AUTO_INCREMENT PRIMARY KEY,
                branch VARCHAR(50) NOT NULL,
                image_url VARCHAR(255) NOT NULL,
                title VARCHAR(255) NULL,
                display_order INT DEFAULT 0,
                is_active TINYINT(1) DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_branch (branch),
                INDEX idx_is_active (is_active),
                INDEX idx_display_order (display_order)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Seed default Hazratganj and Gomti Nagar interior images if empty
        const [existingInterior] = await db.query("SELECT id FROM interior_gallery LIMIT 1");
        if (existingInterior.length === 0) {
            const interiorValues = [
                // Hazratganj
                ['hazratganj', '/assets/images/interior/4.webp', 'Grand Reception & Welcome Lounge', 1, 1],
                ['hazratganj', '/assets/images/interior/8.webp', 'Regal Jaali Wall & Chandelier Atrium', 2, 1],
                ['hazratganj', '/assets/images/interior/10.webp', 'Imperial Bridal Vanity Suite', 3, 1],
                ['hazratganj', '/assets/images/interior/5.webp', 'Royal Awadh Crimson Feature Wall', 4, 1],
                ['hazratganj', '/assets/images/interior/9.webp', 'Emerald Velvet Waiting Lounge', 5, 1],
                ['hazratganj', '/assets/images/interior/11.webp', 'Heritage Jharokha & Consultation Nook', 6, 1],
                // Gomti Nagar
                ['gomtinagar', '/assets/images/interior/12.webp', 'Avant-Garde Arched Styling Bays', 1, 1],
                ['gomtinagar', '/assets/images/interior/2.webp', 'Arched Vanity Corridor & Botanical Ceiling', 2, 1],
                ['gomtinagar', '/assets/images/interior/6.webp', 'Living Garden Pedicure Sanctuary', 3, 1],
                ['gomtinagar', '/assets/images/interior/1.webp', 'Private Spa & Foot Reflexology Suite', 4, 1],
                ['gomtinagar', '/assets/images/interior/7.webp', 'Ambient Hair Wash & Scalp Sanctuary', 5, 1],
                ['gomtinagar', '/assets/images/interior/3.webp', 'Gilded Styling Stations & Motif Flooring', 6, 1],
                ['gomtinagar', '/assets/images/interior/13.webp', 'Bespoke Makeup & Hair Artistry Counters', 7, 1]
            ];

            await db.query(
                `INSERT INTO interior_gallery (branch, image_url, title, display_order, is_active) VALUES ?`,
                [interiorValues]
            );
            console.log("Default KNK Interior images (Hazratganj & Gomti Nagar) seeded successfully");
        }

        // 10. Home Page Sections Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS home_sections (
                id INT AUTO_INCREMENT PRIMARY KEY,
                section_key VARCHAR(50) NOT NULL UNIQUE,
                section_name VARCHAR(100) NOT NULL,
                content JSON NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_section_key (section_key)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Seed default Home page sections if empty
        const [existingHome] = await db.query("SELECT id FROM home_sections LIMIT 1");
        if (existingHome.length === 0) {
            const { DEFAULT_HOME_SECTIONS, HOME_SECTION_METADATA } = await import("../data/homeDefaults.js");
            const values = HOME_SECTION_METADATA.map((meta) => [
                meta.key,
                meta.label,
                JSON.stringify(DEFAULT_HOME_SECTIONS[meta.key] || {}),
            ]);
            await db.query(
                `INSERT INTO home_sections (section_key, section_name, content) VALUES ?`,
                [values]
            );
            console.log("Default Home page sections seeded successfully");
        }

        // 11. Makeup Page Sections Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS makeup_sections (
                id INT AUTO_INCREMENT PRIMARY KEY,
                section_key VARCHAR(50) NOT NULL UNIQUE,
                section_name VARCHAR(100) NOT NULL,
                content JSON NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_section_key (section_key)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // Seed default Makeup page sections if empty
        const [existingMakeup] = await db.query("SELECT id FROM makeup_sections LIMIT 1");
        if (existingMakeup.length === 0) {
            const { DEFAULT_MAKEUP_SECTIONS, MAKEUP_SECTION_METADATA } = await import("../data/makeupDefaults.js");
            const values = MAKEUP_SECTION_METADATA.map((meta) => [
                meta.key,
                meta.label,
                JSON.stringify(DEFAULT_MAKEUP_SECTIONS[meta.key] || {}),
            ]);
            await db.query(
                `INSERT INTO makeup_sections (section_key, section_name, content) VALUES ?`,
                [values]
            );
            console.log("Default Makeup page sections seeded successfully");
        }

        return { success: true, message: "Database tables and seed data initialized successfully." };
    } catch (error) {
        console.error("Database initialization error:", error);
        return { success: false, error: error.message };
    }
}

