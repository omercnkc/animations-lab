'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/language-context';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { locale, setLocale, toggleLocale } = useLanguage();

  return (
    <div className="relative inline-flex items-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-0.5 shadow-xs transition-colors hover:border-[var(--color-primary-border)]">
      <button
        onClick={() => setLocale('tr')}
        className={`relative z-10 flex h-7 items-center gap-1 rounded-full px-2.5 text-[11px] font-bold transition-colors ${
          locale === 'tr'
            ? 'text-white'
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]'
        }`}
        title="Türkçe"
        aria-label="Türkçe"
      >
        <span>TR</span>
      </button>

      <button
        onClick={() => setLocale('en')}
        className={`relative z-10 flex h-7 items-center gap-1 rounded-full px-2.5 text-[11px] font-bold transition-colors ${
          locale === 'en'
            ? 'text-white'
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]'
        }`}
        title="English"
        aria-label="English"
      >
        <span>EN</span>
      </button>

      {/* Sliding background pill with spring physics */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className="absolute bottom-0.5 top-0.5 rounded-full bg-[var(--color-primary)] shadow-sm"
        style={{
          width: 'calc(50% - 2px)',
          left: locale === 'tr' ? '2px' : 'calc(50%)',
        }}
      />
    </div>
  );
}
