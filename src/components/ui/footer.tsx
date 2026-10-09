'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/language-context';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] py-8 text-center text-xs text-[var(--color-text-muted)] backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
          <span className="font-semibold text-[var(--color-text-main)]">{t('footer.title')}</span>
          <span>— {t('footer.tagline')}</span>
        </div>
        <div className="flex items-center gap-1 text-[var(--color-text-muted)]">
          {t('footer.craftedWith')} <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
        </div>
        <div>
          <a
            href="https://github.com/omercnkc/animations-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
          >
            {t('footer.githubLink')}
          </a>
        </div>
      </div>
    </footer>
  );
}
