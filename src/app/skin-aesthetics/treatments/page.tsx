"use client";

import { useMemo, useState } from "react";
import CatalogueHero from "@/components/knk/CatalogueHero";
import CatalogueNav from "@/components/knk/CatalogueNav";
import CategoryShowcase from "@/components/knk/CategoryShowcase";
import Consultation from "@/components/knk/Consultation";
import Footer from "@/components/knk/Footer";
import { IMG } from "@/components/knk/images";
import { CATEGORY_IMAGE } from "@/content/categoryImages";
import { TREATMENT_CATEGORIES } from "@/content/treatments";
import { usePageMeta } from "@/hooks/use-page-meta";

const Treatments = () => {
  usePageMeta(
    "Treatments | KNK SKKIN",
    "The full KNK SKKIN treatment menu — skin, peels, anti-ageing, hair, laser, body contouring, bridal and more, in Hazratganj, Lucknow.",
  );

  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TREATMENT_CATEGORIES;
    return TREATMENT_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q),
      ),
    }));
  }, [query]);

  const noResults = query.trim() !== "" && filteredCategories.every((c) => c.items.length === 0);

  return (
    <>
      <main>
        <CatalogueHero
          eyebrow="Treatments"
          heading={
            <>
              A Personal Approach to <span className="text-gold">Better Results.</span>
            </>
          }
          subtext="Skin, hair, injectables, body and wellness — every treatment personalised to you by our specialist doctors."
          image={IMG.treatmentsBanner}
          imageAlt="Clinical dermatology treatment room at KNK SKKIN"
          ctaLabel="Browse Treatments"
          ctaHref={`#${TREATMENT_CATEGORIES[0].slug}`}
        />

        <div className="relative">
          <CatalogueNav
            categories={TREATMENT_CATEGORIES.map((c) => ({ slug: c.slug, title: c.title }))}
            query={query}
            onQueryChange={setQuery}
          />

          {noResults && (
            <p className="label-xs px-6 py-16 text-center text-muted-foreground md:px-10">
              No treatments match &ldquo;{query}&rdquo;.
            </p>
          )}

          {filteredCategories.map((cat) => (
            <CategoryShowcase
              key={cat.slug}
              slug={cat.slug}
              title={cat.title}
              note={cat.note}
              items={cat.items}
              image={CATEGORY_IMAGE[cat.slug]}
            />
          ))}
        </div>

        <Consultation />
      </main>
      <Footer />
    </>
  );
};

export default Treatments;
