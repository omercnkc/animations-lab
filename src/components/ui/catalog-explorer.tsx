'use client';

import React, { useState } from 'react';
import { ComponentItem, CategoryMeta } from '@/registry/schema';
import { ComponentCard } from './component-card';
import { Search, Sparkles } from 'lucide-react';

interface CatalogExplorerProps {
  initialComponents: ComponentItem[];
  categories: CategoryMeta[];
}

export function CatalogExplorer({ initialComponents, categories }: CatalogExplorerProps) {
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
      {/* Filters and Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/40 p-4 shadow-sm backdrop-blur-md transition-colors md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900/60 text-slate-600 dark:text-neutral-400 hover:border-slate-300 dark:hover:border-neutral-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Components ({initialComponents.length})
          </button>

          {categories.map((cat) => {
            const count = initialComponents.filter((c) => c.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900/60 text-slate-600 dark:text-neutral-400 hover:border-slate-300 dark:hover:border-neutral-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                {count > 0 && (
                  <span className="rounded-full bg-slate-200 dark:bg-neutral-800 px-1.5 py-0.2 text-[10px] text-slate-700 dark:text-neutral-300 font-semibold">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or tag..."
            className="w-full rounded-full border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950/80 pl-9 pr-4 py-1.5 text-xs text-slate-900 dark:text-neutral-200 placeholder-slate-400 dark:placeholder-neutral-500 transition-colors focus:border-violet-500 focus:outline-none"
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
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-neutral-800 p-12 text-center bg-white/40 dark:bg-neutral-900/20">
          <Sparkles className="h-8 w-8 text-slate-400 dark:text-neutral-600" />
          <h4 className="mt-3 text-sm font-semibold text-slate-800 dark:text-neutral-300">No animations found</h4>
          <p className="mt-1 text-xs text-slate-500 dark:text-neutral-500">
            Try a different search query or select another category filter.
          </p>
        </div>
      )}
    </div>
  );
}
