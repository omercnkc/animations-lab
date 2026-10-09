'use client';

import React, { useState } from 'react';
import { ComponentItem, CategoryMeta } from '@/registry/schema';
import { ComponentCard } from './component-card';
import { Search, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/language-context';

interface CatalogExplorerProps {
  initialComponents: ComponentItem[];
  categories: CategoryMeta[];
}

export function CatalogExplorer({ initialComponents, categories }: CatalogExplorerProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredComponents = initialComponents.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Catalog Title & Subtitle */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
          {t('catalog.badge')}
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--color-text-main)] sm:text-4xl">
          {t('catalog.title')}
        </h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {t('catalog.subtitle')}
        </p>
      </div>

      {/* Filters and Search Bar Container */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-4 shadow-xs backdrop-blur-md transition-colors md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/30'
                : 'border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary)]'
            }`}
          >
            {t('catalog.allComponents')} ({initialComponents.length})
          </button>

          {categories.map((cat) => {
            const count = initialComponents.filter((c) => c.category === cat.id).length;
            const categoryName = t(`categories.${cat.id}.name`) || cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/30'
                    : 'border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary)]'
                }`}
              >
                <span>{categoryName}</span>
                {count > 0 && (
                  <span className="rounded-full bg-[var(--color-primary-light)] px-1.5 py-0.2 text-[10px] text-[var(--color-primary-dark)] font-semibold">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('catalog.searchPlaceholder')}
            className="w-full rounded-full border border-[var(--color-border-medium)] bg-[var(--color-bg-page)] pl-9 pr-4 py-1.5 text-xs text-[var(--color-text-main)] placeholder-[var(--color-text-muted)] transition-colors focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of items */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filteredComponents.map((item) => (
            <ComponentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-border-medium)] bg-[var(--color-bg-panel)]/50 p-12 text-center">
          <Sparkles className="h-8 w-8 text-[var(--color-text-muted)]" />
          <h4 className="mt-3 text-sm font-semibold text-[var(--color-text-main)]">{t('catalog.noResults')}</h4>
          <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
            {t('catalog.noResultsDesc')}
          </p>
        </div>
      )}
    </div>
  );
}
