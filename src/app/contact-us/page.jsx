import React from "react";
import Layout from "@/layout/Layout";
import Contact from "@/components/contactComponents/Contact";
import { getDynamicMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata() {
    return await getDynamicMetadata("/contact-us", {
        title: "Contact Us | KNK Salon Awadh Lucknow – Mahanagar, Gomti Nagar & Hazratganj",
        description:
            "Connect with KNK Salon Awadh in Lucknow. Visit our luxury studios in Mahanagar (+91-9559321711), Gomti Nagar (+91-8881000551) & Hazratganj (+91-8881000529). Book your royal hair, skin, and bridal appointments.",
        image: "/assets/images/new/about.webp",
        keywords:
            "KNK Salon contact, KNK Salon Mahanagar phone number, KNK Salon Gomti Nagar address, KNK Awadh Hazratganj, luxury beauty salon Lucknow, book bridal makeup Lucknow",
    });
}

export default function ContactPage() {
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        name: "KNK Salon Awadh",
        url: "https://www.knksalon.in/contact-us",
        telephone: "+91-9559321711",
        email: "info@knksalon.in",
        priceRange: "₹₹₹",
        image: "https://www.knksalon.in/assets/images/new/logo.png",
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                opens: "10:00",
                closes: "20:30",
            },
        ],
        department: [
            {
                "@type": "BeautySalon",
                name: "KNK Salon Mahanagar",
                telephone: "+91-9559321711",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Mahanagar Crossing (Chowraha), Mahanagar Colony",
                    addressLocality: "Lucknow",
                    addressRegion: "Uttar Pradesh",
                    postalCode: "226006",
                    addressCountry: "IN",
                },
            },
            {
                "@type": "BeautySalon",
                name: "KNK Salon Gomti Nagar",
                telephone: "+91-8881000551",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "02/01 Vipul Khand, Gomti Nagar",
                    addressLocality: "Lucknow",
                    addressRegion: "Uttar Pradesh",
                    postalCode: "226010",
                    addressCountry: "IN",
                },
            },
            {
                "@type": "BeautySalon",
                name: "KNK Awadh Salon & Academy – Hazratganj",
                telephone: "+91-8881000529",
                address: {
                    "@type": "PostalAddress",
                    streetAddress:
                        "Ground Floor 11B, Tilak Marg, Opp. Ganna Sansthaan, Hazratganj Colony",
                    addressLocality: "Lucknow",
                    addressRegion: "Uttar Pradesh",
                    postalCode: "226001",
                    addressCountry: "IN",
                },
            },
        ],
    };

    return (
        <Layout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            <main>
                <Contact />
            </main>
        </Layout>
    );
}
