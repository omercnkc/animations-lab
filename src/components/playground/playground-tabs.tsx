'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ComponentItem } from '@/registry/schema';
import { ExpoMobile } from './expo-mobile';
import {
  Globe,
  Smartphone,
  Loader2,
  Copy,
  Check,
  Terminal,
} from 'lucide-react';

const SandpackWeb = dynamic(
  () => import('./sandpack-web').then((mod) => mod.SandpackWeb),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[480px] flex-col items-center justify-center gap-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-preview)] text-[#6B7280]">
        <Loader2 className="h-6 w-6 animate-spin text-[#2196F3]" />
        <span className="text-xs">Initializing Interactive Sandbox...</span>
      </div>
    ),
  }
);

import { useLanguage } from '@/i18n/language-context';

export function PlaygroundTabs({ item }: { item: ComponentItem }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'web' | 'mobile'>('web');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const webInstallCmd = `npm i ${Object.keys(item.webCode.dependencies || {}).join(' ') || 'framer-motion lucide-react'}`;

  const handleCopyCode = async () => {
    const code = activeTab === 'web' ? item.webCode.code : item.mobileCode.code;
    await navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyInstall = async () => {
    const cmd =
      activeTab === 'web'
        ? webInstallCmd
        : `npx expo install ${Object.keys(item.mobileCode.dependencies || {}).join(' ') || 'react-native-reanimated'}`;
    await navigator.clipboard.writeText(cmd);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Switcher Controls & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-4">
        {/* Platform Switcher */}
        <div className="inline-flex rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-1 shadow-xs backdrop-blur-md">
          <button
            onClick={() => setActiveTab('web')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'web'
                ? 'bg-[#2196F3] text-white shadow-md'
                : 'text-[#4B5563] dark:text-neutral-400 hover:text-[#282A35] dark:hover:text-white'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>{t('playground.webTab')}</span>
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'mobile'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-[#4B5563] dark:text-neutral-400 hover:text-[#282A35] dark:hover:text-white'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>{t('playground.mobileTab')}</span>
          </button>
        </div>

        {/* Copy Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyInstall}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border-medium)] bg-white dark:bg-[#21232d] px-3.5 py-1.5 text-xs font-medium text-[#282A35] dark:text-neutral-300 shadow-xs transition-colors hover:border-[#BBDEFB] hover:text-[#2196F3]"
          >
            <Terminal className="h-3.5 w-3.5 text-[#2196F3]" />
            <span>{copiedInstall ? t('playground.copiedInstall') : t('playground.copyInstall')}</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 rounded-lg bg-[#2196F3] hover:bg-[#1976D2] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all"
          >
            {copiedCode ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span>{t('playground.copiedCode')}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-white" />
                <span>{t('playground.copyCode')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Playground Body */}
      <Suspense
        fallback={
          <div className="flex h-[480px] items-center justify-center rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-preview)] text-[#6B7280]">
            <Loader2 className="h-6 w-6 animate-spin text-[#2196F3]" />
          </div>
        }
      >
        {activeTab === 'web' ? (
          <SandpackWeb
            filename={item.webCode.filename}
            code={item.webCode.code}
            dependencies={item.webCode.dependencies}
          />
        ) : (
          <ExpoMobile
            filename={item.mobileCode.filename}
            code={item.mobileCode.code}
            snackId={item.mobileCode.snackId}
            dependencies={item.mobileCode.dependencies}
          />
        )}
      </Suspense>
    </div>
  );
}
