'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/language-context';
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

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border-subtle)] py-20 lg:py-28 transition-colors">
      {/* Background glow effects with Primary Blue */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--color-primary)]/10 dark:bg-[var(--color-primary)]/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-[var(--color-primary-hover)]/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary-border)] bg-[var(--color-primary-light)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-primary-dark)] backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[var(--color-primary)]" />
          <span>{t('hero.badge')}</span>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--color-text-main)] sm:text-6xl lg:text-7xl">
          {t('hero.titleLine1')} <br />
          <span className="text-gradient-primary">{t('hero.titleHighlight')}</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-[var(--color-text-secondary)] sm:text-lg">
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#catalog"
            className="flex items-center gap-2 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/25 transition-all"
          >
            <Layers className="h-4 w-4" />
            <span>{t('hero.ctaCatalog')}</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <Link
            href="/components/buttons/magnetic-button"
            className="flex items-center gap-2 rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-bg-panel)] px-6 py-3.5 text-sm font-semibold text-[var(--color-text-main)] shadow-xs transition-all hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            <Terminal className="h-4 w-4 text-[var(--color-primary)]" />
            <span>{t('hero.ctaPlayground')}</span>
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
            <h4 className="mt-2 text-sm font-semibold text-[var(--color-text-main)]">{t('hero.dualPlatformTitle')}</h4>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              {t('hero.dualPlatformDesc')}
            </p>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-5 shadow-xs transition-colors">
            <Zap className="h-6 w-6 text-amber-500" />
            <h4 className="mt-2 text-sm font-semibold text-[var(--color-text-main)]">{t('hero.liveSandboxTitle')}</h4>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              {t('hero.liveSandboxDesc')}
            </p>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-5 shadow-xs transition-colors">
            <Smartphone className="h-6 w-6 text-emerald-500" />
            <h4 className="mt-2 text-sm font-semibold text-[var(--color-text-main)]">{t('hero.mobileReadyTitle')}</h4>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              {t('hero.mobileReadyDesc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
