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
      <div className="flex h-[480px] flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-slate-500 dark:text-neutral-400">
        <Loader2 className="h-6 w-6 animate-spin text-violet-600 dark:text-violet-400" />
        <span className="text-xs">Initializing Interactive Sandbox...</span>
      </div>
    ),
  }
);

export function PlaygroundTabs({ item }: { item: ComponentItem }) {
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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-4">
        {/* Platform Switcher */}
        <div className="inline-flex rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900/80 p-1 shadow-xs backdrop-blur-md">
          <button
            onClick={() => setActiveTab('web')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'web'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>Web (React & Framer Motion)</span>
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'mobile'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Mobile (React Native Reanimated)</span>
          </button>
        </div>

        {/* Copy Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyInstall}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/90 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-neutral-300 shadow-xs transition-colors hover:border-slate-300 dark:hover:border-neutral-700 hover:text-slate-900 dark:hover:text-white"
          >
            <Terminal className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
            <span>{copiedInstall ? 'Copied CLI Command!' : 'Copy Install Command'}</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-slate-900 dark:bg-neutral-800 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 dark:hover:bg-neutral-700"
          >
            {copiedCode ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Copied Code!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-300" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Playground Body */}
      <Suspense
        fallback={
          <div className="flex h-[480px] items-center justify-center rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-slate-500 dark:text-neutral-400">
            <Loader2 className="h-6 w-6 animate-spin text-violet-600 dark:text-violet-400" />
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
