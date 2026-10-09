import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getComponentBySlug, getAllComponents } from '@/registry';
import { PlaygroundTabs } from '@/components/playground/playground-tabs';
import { ArrowLeft, Tag, Layers, Share2 } from 'lucide-react';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const components = getAllComponents();
  return components.map((c) => ({
    category: c.category,
    slug: c.slug,
  }));
}

export default async function ComponentPage({ params }: PageProps) {
  const resolvedParams = await params;
  const item = getComponentBySlug(resolvedParams.slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button and breadcrumbs */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>
        <span className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-400">
          <Layers className="h-3.5 w-3.5 text-violet-400" />
          {item.category.toUpperCase()}
        </span>
      </div>

      {/* Component Title and Description */}
      <div className="mb-8 flex flex-col gap-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {item.title}
        </h1>
        <p className="max-w-3xl text-base text-neutral-400">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs text-neutral-400"
            >
              <Tag className="h-3 w-3 text-neutral-500" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Tabs & Playground */}
      <React.Suspense
        fallback={
          <div className="flex h-96 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950 text-xs text-neutral-400">
            Loading Playground...
          </div>
        }
      >
        <PlaygroundTabs item={item} />
      </React.Suspense>
    </div>
  );
}
