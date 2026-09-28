import SeoModel from "@/models/SeoModel";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://knksalonawadh.com";

const DEFAULT_METADATA = {
    title: "KNK Salon Awadh | Luxury Hair, Skin & Bridal Studio Lucknow",
    description: "Experience royal luxury at KNK Salon Awadh, Lucknow. Hair colour, keratin, HydraFacials, celebrity bridal makeup, and beauty academy.",
    keywords: "luxury salon lucknow, bridal makeup awadh, best hair salon lucknow, keratin treatment, aesthetics clinic",
    ogImage: "/assets/images/new/logo.png",
};

export async function getDynamicMetadata(pathname = "/", fallback = {}) {
    const defaultTitle = fallback.title || DEFAULT_METADATA.title;
    const defaultDesc = fallback.description || DEFAULT_METADATA.description;
    const defaultImage = fallback.ogImage || fallback.image || DEFAULT_METADATA.ogImage;
    const defaultKeywords = fallback.keywords || DEFAULT_METADATA.keywords;

    try {
        const record = await SeoModel.getByPath(pathname);
        if (record) {
            const ogImg = record.og_image || defaultImage;
            return {
                metadataBase: new URL(SITE_URL),
                title: record.meta_title || defaultTitle,
                description: record.meta_description || defaultDesc,
                keywords: record.meta_keywords ? record.meta_keywords.split(",").map((k) => k.trim()) : defaultKeywords,
                robots: record.robots || "index, follow",
                alternates: record.canonical_url ? { canonical: record.canonical_url } : { canonical: pathname },
                openGraph: {
                    title: record.meta_title || defaultTitle,
                    description: record.meta_description || defaultDesc,
                    url: pathname,
                    siteName: "KNK Salon Awadh",
                    images: [
                        {
                            url: ogImg,
                            width: 1200,
                            height: 630,
                            alt: record.meta_title || defaultTitle,
                        },
                    ],
                    locale: "en_IN",
                    type: "website",
                },
                twitter: {
                    card: "summary_large_image",
                    title: record.meta_title || defaultTitle,
                    description: record.meta_description || defaultDesc,
                    images: [ogImg],
                },
            };
        }
    } catch (err) {
        // Fallback gracefully on DB errors
        console.warn(`[getDynamicMetadata] Error loading SEO for path "${pathname}":`, err?.message || err);
    }

    return {
        metadataBase: new URL(SITE_URL),
        title: defaultTitle,
        description: defaultDesc,
        keywords: defaultKeywords,
        robots: fallback.robots || "index, follow",
        alternates: fallback.canonical ? { canonical: fallback.canonical } : { canonical: pathname },
        openGraph: {
            title: defaultTitle,
            description: defaultDesc,
            url: pathname,
            siteName: "KNK Salon Awadh",
            images: [
                {
                    url: defaultImage,
                    width: 1200,
                    height: 630,
                    alt: defaultTitle,
                },
            ],
            locale: "en_IN",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: defaultTitle,
            description: defaultDesc,
            images: [defaultImage],
        },
    };
}

