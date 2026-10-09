import React from 'react';
import Link from 'next/link';
import { getAllComponents, getAllCategories } from '@/registry';
import { CatalogExplorer } from '@/components/ui/catalog-explorer';
import {
  Sparkles,
  ArrowRight,
  Terminal,
  Zap,
  Smartphone,
  Globe,
  Layers,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/icons';

export default function HomePage() {
  const components = getAllComponents();
  const categories = getAllCategories();

  return (
    <div className="flex flex-col bg-[var(--color-bg-page)] text-[var(--color-text-main)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--color-border-subtle)] py-20 lg:py-28 transition-colors">
        {/* Background glow effects with Primary Blue */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-10 top-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-[var(--color-primary-hover)]/10 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary-border)] bg-[var(--color-primary-light)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-primary-dark)] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-primary)]" />
            <span>Interactive Animation Lab & Playground</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--color-text-main)] sm:text-6xl lg:text-7xl">
            Next-Gen Animations for <br />
            <span className="text-gradient-primary">Web & Mobile</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-[var(--color-text-secondary)] sm:text-lg">
            Explore, test, and copy-paste buttery-smooth micro-interactions.
            Edit code directly in your browser with live previews for both{' '}
            <strong className="text-[var(--color-text-main)]">React (Framer Motion)</strong> and{' '}
            <strong className="text-[var(--color-text-main)]">React Native (Reanimated)</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#catalog"
              className="flex items-center gap-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/25 transition-all"
            >
              <Layers className="h-4 w-4" />
              <span>Browse Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <Link
              href="/components/buttons/magnetic-button"
              className="flex items-center gap-2 rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-bg-panel)] px-6 py-3.5 text-sm font-semibold text-[var(--color-text-main)] shadow-xs transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              <Terminal className="h-4 w-4 text-[var(--color-primary)]" />
              <span>Open Playground</span>
            </Link>

            <a
              href="https://github.com/omercnkc/animations-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-5 py-3.5 text-sm font-medium text-[var(--color-text-main)] shadow-xs transition-colors hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary)]"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Feature Highlights Grid */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-5 shadow-xs transition-colors">
              <Globe className="h-6 w-6 text-[var(--color-primary)]" />
              <h4 className="mt-2 text-sm font-semibold text-[var(--color-text-main)]">Dual Platform</h4>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                React Web + React Native Mobile codebases in one place.
              </p>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-5 shadow-xs transition-colors">
              <Zap className="h-6 w-6 text-amber-500" />
              <h4 className="mt-2 text-sm font-semibold text-[var(--color-text-main)]">Live In-Browser Sandbox</h4>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                W3Schools style Sandpack engine with zero server delay.
              </p>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-5 shadow-xs transition-colors">
              <Smartphone className="h-6 w-6 text-emerald-500" />
              <h4 className="mt-2 text-sm font-semibold text-[var(--color-text-main)]">Mobile Ready</h4>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                Reanimated v3 spring gestures with Expo Snack bridge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Showcase Section */}
      <section id="catalog" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Interactive Components
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--color-text-main)] sm:text-4xl">
              Animation Catalog
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Click any component to tweak properties, or use the filters and search below.
            </p>
          </div>

          <CatalogExplorer
            initialComponents={components}
            categories={categories}
          />
        </div>
      </section>
    </div>
  );
}
