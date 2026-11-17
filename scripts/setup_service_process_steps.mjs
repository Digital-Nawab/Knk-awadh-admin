import mysql from "mysql2/promise";

const categories = [
    { slug: "nails", name: "Nails" },
    { slug: "hair", name: "Hair" },
    { slug: "beauty", name: "Beauty" },
    { slug: "facial", name: "Facial" },
    { slug: "body", name: "Body" },
];

const defaultSteps = {
    eyebrow: "How It Works",
    title: "Simple, from",
    titleHighlight: "start to finish.",
    steps: [
        { n: "01", title: "Choose Your Service", text: "Browse the list below or tell us the occasion — we'll suggest what fits." },
        { n: "02", title: "Book a Slot", text: "Call, WhatsApp, or fill the form and pick a time that works for you." },
        { n: "03", title: "Meet Your Artist", text: "You're matched with the specialist best suited to what you need." },
        { n: "04", title: "Leave Glowing", text: "Walk out looking — and feeling — exactly the way you wanted to." },
    ],
};

async function run() {
    const conn = await mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "knk-awadh",
    });

    await conn.query(`
        CREATE TABLE IF NOT EXISTS service_process_steps (
            id INT AUTO_INCREMENT PRIMARY KEY,
            category_slug VARCHAR(50) NOT NULL UNIQUE,
            category_name VARCHAR(100) NOT NULL,
            content JSON NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_category_slug (category_slug)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    for (const cat of categories) {
        await conn.query(
            `INSERT INTO service_process_steps (category_slug, category_name, content)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE category_name = VALUES(category_name)`,
            [cat.slug, cat.name, JSON.stringify(defaultSteps)]
        );
    }

    console.log("service_process_steps table and default category seeds created successfully.");
    await conn.end();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
