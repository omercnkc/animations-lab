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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--color-border-subtle)] py-20 lg:py-28 transition-colors">
        {/* Background glow effects with Primary Blue */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#2196F3]/10 dark:bg-[#2196F3]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-10 top-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-[#1976D2]/10 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          {/* Badge (Blue Light Zemin Tonu + Blue Border) */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BBDEFB] dark:border-[#2196F3]/40 bg-[#E3F2FD] dark:bg-[#2196F3]/15 px-3.5 py-1.5 text-xs font-semibold text-[#0D47A1] dark:text-[#64b5f6] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#2196F3]" />
            <span>Interactive Animation Lab & Playground</span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#282A35] dark:text-white sm:text-6xl lg:text-7xl">
            Next-Gen Animations for <br />
            <span className="text-gradient-primary">Web & Mobile</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-[#4B5563] dark:text-neutral-400 sm:text-lg">
            Explore, test, and copy-paste buttery-smooth micro-interactions.
            Edit code directly in your browser with live previews for both{' '}
            <strong className="text-[#282A35] dark:text-neutral-200">React (Framer Motion)</strong> and{' '}
            <strong className="text-[#282A35] dark:text-neutral-200">React Native (Reanimated)</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#catalog"
              className="flex items-center gap-2 rounded-xl bg-[#2196F3] hover:bg-[#1976D2] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2196F3]/25 transition-all"
            >
              <Layers className="h-4 w-4" />
              <span>Browse Catalog</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <Link
              href="/components/buttons/magnetic-button"
              className="flex items-center gap-2 rounded-xl border border-[var(--color-border-medium)] bg-white dark:bg-[#21232d] px-6 py-3.5 text-sm font-semibold text-[#282A35] dark:text-white shadow-xs transition-all hover:border-[#2196F3] hover:text-[#2196F3]"
            >
              <Terminal className="h-4 w-4 text-[#2196F3]" />
              <span>Open Playground</span>
            </Link>

            <a
              href="https://github.com/omercnkc/animations-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-5 py-3.5 text-sm font-medium text-[#282A35] dark:text-neutral-300 shadow-xs transition-colors hover:border-[#BBDEFB] hover:text-[#2196F3] dark:hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Feature Highlights Grid */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl border border-[var(--color-border-subtle)] bg-white dark:bg-[#21232d]/80 p-5 shadow-xs transition-colors">
              <Globe className="h-6 w-6 text-[#2196F3]" />
              <h4 className="mt-2 text-sm font-semibold text-[#282A35] dark:text-white">Dual Platform</h4>
              <p className="mt-1 text-xs text-[#4B5563] dark:text-neutral-400">
                React Web + React Native Mobile codebases in one place.
              </p>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-[var(--color-border-subtle)] bg-white dark:bg-[#21232d]/80 p-5 shadow-xs transition-colors">
              <Zap className="h-6 w-6 text-amber-500" />
              <h4 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Live In-Browser Sandbox</h4>
              <p className="mt-1 text-xs text-[#4B5563] dark:text-neutral-400">
                W3Schools style Sandpack engine with zero server delay.
              </p>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-[var(--color-border-subtle)] bg-white dark:bg-[#21232d]/80 p-5 shadow-xs transition-colors">
              <Smartphone className="h-6 w-6 text-emerald-500" />
              <h4 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Mobile Ready</h4>
              <p className="mt-1 text-xs text-[#4B5563] dark:text-neutral-400">
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
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2196F3]">
              Interactive Components
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#282A35] dark:text-white sm:text-4xl">
              Animation Catalog
            </h2>
            <p className="mt-1 text-sm text-[#4B5563] dark:text-neutral-400">
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
