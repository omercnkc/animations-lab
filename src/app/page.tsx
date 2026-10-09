import React from 'react';
import { getAllComponents, getAllCategories } from '@/registry';
import { CatalogExplorer } from '@/components/ui/catalog-explorer';
import { HeroSection } from '@/components/ui/hero-section';

export default function HomePage() {
  const components = getAllComponents();
  const categories = getAllCategories();

  return (
    <div className="flex flex-col bg-[var(--color-bg-page)] text-[var(--color-text-main)]">
      {/* Localized Hero Section */}
      <HeroSection />

      {/* Catalog Showcase Section */}
      <section id="catalog" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CatalogExplorer
            initialComponents={components}
            categories={categories}
          />
        </div>
      </section>
    </div>
  );
}
