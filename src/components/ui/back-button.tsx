'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/i18n/language-context';

export function BackButton() {
  const { t } = useLanguage();

  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#2196F3]"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{t('playground.backToCatalog')}</span>
    </Link>
  );
}
