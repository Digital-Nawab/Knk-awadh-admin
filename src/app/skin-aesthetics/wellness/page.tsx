"use client";

import { useMemo, useState } from "react";
import CatalogueHero from "@/components/knk/CatalogueHero";
import CatalogueNav from "@/components/knk/CatalogueNav";
import CategoryShowcase, { type CategoryShowcaseItem } from "@/components/knk/CategoryShowcase";
import { Reveal } from "@/components/knk/Reveal";
import Consultation from "@/components/knk/Consultation";
import Footer from "@/components/knk/Footer";
import { IMG } from "@/components/knk/images";
import { usePageMeta } from "@/hooks/use-page-meta";
import { CATEGORY_IMAGE } from "@/content/categoryImages";
import { TREATMENT_BY_KEY } from "@/content/treatments";
import { WELLNESS_GROUPS, type WellnessEntry } from "@/content/wellness";

const resolveEntry = (entry: WellnessEntry): CategoryShowcaseItem => {
  if (entry.type === "key") {
    const item = TREATMENT_BY_KEY[entry.key];
    return { key: entry.key, name: entry.displayName ?? item.name, description: item.description };
  }
  if (entry.type === "placeholder") {
    return { key: `placeholder-${entry.name}`, name: entry.name, description: entry.note };
  }
  return { key: `link-${entry.name}`, name: entry.name, description: entry.note, to: entry.to };
};

const Wellness = () => {
  usePageMeta(
    "Wellness | KNK SKKIN",
    "IV wellness, recovery & regeneration, body contouring and more at KNK SKKIN — advanced wellness in Hazratganj, Lucknow.",
  );

  const [query, setQuery] = useState("");

  const resolvedGroups = useMemo(
    () => WELLNESS_GROUPS.map((group) => ({ ...group, items: group.entries.map(resolveEntry) })),
    [],
  );

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resolvedGroups;
    return resolvedGroups.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q),
      ),
    }));
  }, [resolvedGroups, query]);

  const noResults =
    query.trim() !== "" && filteredGroups.every((g) => g.pending || g.items.length === 0);

  return (
    <>
      <main>
        <CatalogueHero
          eyebrow="Wellness"
          heading={
            <>
              Wellness for a <span className="text-gold">better you.</span>
            </>
          }
          subtext="Wellness that helps you slow down, reset and feel better from within. Thoughtful therapies designed around your body, your needs and your everyday well-being."
          image={IMG.wellnessBanner}
          imageAlt="Calm wellness treatment space at KNK SKKIN"
          ctaLabel="Explore Wellness"
          ctaHref={`#${WELLNESS_GROUPS[0].slug}`}
        />

        <div className="relative">
          <CatalogueNav
            categories={WELLNESS_GROUPS.map((g) => ({ slug: g.slug, title: g.title }))}
            query={query}
            onQueryChange={setQuery}
          />

          {noResults && (
            <p className="label-xs px-6 py-16 text-center text-muted-foreground md:px-10">
              No treatments match &ldquo;{query}&rdquo;.
            </p>
          )}

          {filteredGroups.map((group) =>
            group.pending ? (
              <section
                key={group.slug}
                id={group.slug}
                className="scroll-mt-28 border-t border-border"
              >
                <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden md:h-[58vh]">
                  <img
                    src={CATEGORY_IMAGE[group.slug]}
                    alt={`${group.title} at KNK SKKIN`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="mx-auto max-w-[1600px] px-6 pb-8 md:px-10 md:pb-10">
                      <Reveal>
                        <h2 className="display text-3xl uppercase text-background md:text-5xl">
                          {group.title}
                        </h2>
                      </Reveal>
                    </div>
                  </div>
                </div>
                <div className="mx-auto max-w-[1600px] px-6 py-12 md:px-10 md:py-16">
                  <Reveal delay={0.05}>
                    <p className="max-w-2xl text-sm leading-loose text-muted-foreground">
                      {group.description}
                    </p>
                  </Reveal>
                </div>
              </section>
            ) : (
              <CategoryShowcase
                key={group.slug}
                slug={group.slug}
                title={group.title}
                items={group.items}
                image={CATEGORY_IMAGE[group.slug]}
              />
            ),
          )}
        </div>

        <Consultation />
      </main>
      <Footer />
    </>
  );
};

export default Wellness;
