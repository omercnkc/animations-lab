'use client';

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ComponentItem } from '@/registry/schema';
import { ExpoMobile } from './expo-mobile';
import { Globe, Smartphone, Sparkles, Loader2 } from 'lucide-react';

const SandpackWeb = dynamic(
  () => import('./sandpack-web').then((mod) => mod.SandpackWeb),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[480px] flex-col items-center justify-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-400">
        <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
        <span className="text-xs">Initializing Interactive Sandbox...</span>
      </div>
    ),
  }
);

export function PlaygroundTabs({ item }: { item: ComponentItem }) {
  const [activeTab, setActiveTab] = useState<'web' | 'mobile'>('web');

  return (
    <div className="flex flex-col gap-6">
      {/* Switcher Controls */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="inline-flex rounded-xl border border-neutral-800 bg-neutral-900/80 p-1 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('web')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'web'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Globe className="h-4 w-4" />
            <span>Web (React & Framer Motion)</span>
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === 'mobile'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Mobile (React Native Reanimated)</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
          <Sparkles className="h-4 w-4 text-violet-400" />
          <span>Interactive Code Sandbox</span>
        </div>
      </div>

      {/* Playground Body */}
      <Suspense
        fallback={
          <div className="flex h-[480px] items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-400">
            <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
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
