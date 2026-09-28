import React from 'react';
import Layout from '@/layout/Layout';
import ServiceHero from './ServiceHero';
import ServiceInclusions from './ServiceInclusions';
import ServiceBenefits from './ServiceBenefits';
import ServiceStylesOrProcess from './ServiceStylesOrProcess';
import WhyChooseKnk from './WhyChooseKnk';
import RelatedServices from './RelatedServices';
import ServiceFaq from './ServiceFaq';
import ServiceBookingCta from './ServiceBookingCta';

export default function ServiceDetailTemplate({ service }) {
    if (!service) return null;

    const categoryName = service.categoryName || service.category_name || "Salon";
    const categorySlug = service.category_slug || (service.parentUrl ? service.parentUrl.replace('/services/', '') : 'hair');
    const parentUrl = service.parentUrl || `/services/${categorySlug}`;
    const name = service.name || service.title;
    const h1 = service.h1 || service.title || name;
    const shortDesc = service.shortDesc || service.short_desc || "";
    const longDesc = service.longDesc || service.description || shortDesc;
    const image = service.image || "/assets/images/new/service/NAILS.webp";
    const url = service.url || `/services/${categorySlug}/${service.slug}`;

    const highlights = service.highlights || service.tagsList || [];

    const defaultInclusions = highlights.length > 0
        ? highlights.map((h) => ({ title: h, desc: `Executed with precision and sterile single-use luxury protocol.` }))
        : [
            { title: "Personal Artist Consultation", desc: "Detailed analysis of your personal style, skin/hair tone, and desired aesthetic." },
            { title: "Medical-Grade Hygiene Protocol", desc: "Autoclaved instruments and sterile preparation for complete peace of mind." },
            { title: "Bespoke Treatment Execution", desc: "Handcrafted using world-class European and international prestige formulations." },
            { title: "Finishing Touch & Aftercare", desc: "Long-lasting sealant, nourishment therapy, and home maintenance guide." },
        ];

    const defaultBenefits = [
        `Long-lasting results and immaculate finish crafted by senior certified artists`,
        `Hospital-grade sterile hygiene and single-use luxury disposables`,
        `Prestige global formulations with zero harsh chemicals`,
        `Personalized consultation tailored specifically to your lifestyle and comfort`,
    ];

    const defaultWhyChoose = [
        "Over 15 years of beauty artistry and bridal mastery in Awadh",
        "Internationally trained senior artists and certified technicians",
        "State-of-the-art salons across Mahanagar, Hazratganj, and Gomti Nagar",
        "Exclusively authentic, dermatologist-tested global product lines",
    ];

    const defaultFaqs = [
        {
            q: `How long does a ${name} appointment take at KNK Salon?`,
            a: `Most ${name} rituals take between 45 to 90 minutes. Our artists never rush your treatment, ensuring meticulous care and flawless attention to detail.`
        },
        {
            q: `Can I customize my ${name} ritual?`,
            a: `Absolutely! Our senior stylists and artists personalize every technique, shade, and formulation to match your personal aesthetic, wedding outfit, or skin type.`
        },
        {
            q: `Do I need to book in advance?`,
            a: `We highly recommend booking through our website or WhatsApp concierge at least 24 hours in advance to guarantee your preferred slot and specialist.`
        }
    ];

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: categoryName, href: parentUrl },
        { label: name, href: url }
    ];

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: h1,
        description: shortDesc || longDesc,
        provider: {
            '@type': 'BeautySalon',
            name: 'KNK Salon Awadh',
            url: 'https://www.knksalon.in',
            telephone: '+919559321711',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lucknow',
                addressRegion: 'Uttar Pradesh',
                addressCountry: 'IN'
            }
        },
        areaServed: {
            '@type': 'City',
            name: 'Lucknow'
        },
        image: image ? `https://www.knksalon.in${image}` : undefined,
        url: `https://www.knksalon.in${url}`
    };

    return (
        <Layout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <main className="min-h-screen bg-cream">
                {/* 1. Hero */}
                <ServiceHero
                    breadcrumbs={breadcrumbs}
                    eyebrow={`${categoryName} Artistry`}
                    h1={h1}
                    shortDesc={longDesc || shortDesc}
                    image={image}
                    badge={categoryName}
                    secondaryLabel={`Explore ${name}`}
                    secondaryUrl="#service-inclusions"
                />

                {/* 2. Service Inclusions & Suitability */}
                <div id="service-inclusions">
                    <ServiceInclusions
                        title={`What the ${name} Ritual Includes`}
                        subtitle="Meticulously crafted steps executed by senior certified artists using global formulations."
                        items={service.whatIncluded && service.whatIncluded.length > 0 ? service.whatIncluded : defaultInclusions}
                        suitableFor={service.suitableFor || "Ideal for all guests seeking elevated self-care and immaculate refinement."}
                    />
                </div>

                {/* 3. Benefits & Key Features */}
                <ServiceBenefits
                    title={`Benefits of ${name}`}
                    subtitle="Designed to deliver noticeable, touchable transformation with long-lasting results."
                    benefits={service.benefits && service.benefits.length > 0 ? service.benefits : defaultBenefits}
                />

                {/* 4. Styles or Process Breakdown */}
                {service.stylesOrProcess && service.stylesOrProcess.length > 0 && (
                    <ServiceStylesOrProcess
                        title={`Styles & Techniques in ${name}`}
                        subtitle="Customized variations tailored to your occasion, personal aesthetic, and comfort."
                        items={service.stylesOrProcess}
                    />
                )}

                {/* 5. Why Choose KNK */}
                <WhyChooseKnk
                    title={`Why Choose KNK for ${name}`}
                    points={service.whyChooseKnk && service.whyChooseKnk.length > 0 ? service.whyChooseKnk : defaultWhyChoose}
                />

                {/* 6. Related Services / Strong Internal Linking */}
                {service.relatedServices && service.relatedServices.length > 0 && (
                    <RelatedServices
                        title={`More from ${categoryName}`}
                        subtitle="Discover other treatments designed to complement your visit."
                        services={service.relatedServices}
                    />
                )}

                {/* 7. FAQs */}
                <ServiceFaq
                    title={`Questions About ${name}`}
                    subtitle="Everything you need to know before booking your appointment."
                    faqs={service.faqs && service.faqs.length > 0 ? service.faqs : defaultFaqs}
                />

                {/* 8. Booking CTA & Form */}
                <ServiceBookingCta
                    title={`Book Your ${name} at KNK Salon`}
                    subtitle={`Reserve your priority appointment at our luxury Lucknow salons. Our concierge is ready to assist you.`}
                    serviceName={name}
                />
            </main>
        </Layout>
    );
}
