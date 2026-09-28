import React from 'react';
import Link from 'next/link';

export default function Breadcrumbs({ items = [] }) {
    // items format: [{ label: 'Home', href: '/' }, { label: 'Category', href: '/...' }, { label: 'Service' }]
    const schemaBreadcrumbList = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            ...(item.href ? { item: `https://www.knksalon.in${item.href}` } : {})
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbList) }}
            />
            <nav aria-label="Breadcrumb" className="py-4">
                <ol className="flex flex-wrap items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] text-[#8b7d6e]">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        return (
                            <li key={item.label} className="flex items-center gap-2">
                                {index > 0 && <span className="text-gold/60">/</span>}
                                {isLast || !item.href ? (
                                    <span className="font-semibold text-ink" aria-current="page">
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="transition-colors hover:text-gold-deep"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
