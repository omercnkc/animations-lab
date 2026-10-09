'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Layers, Search, Terminal } from 'lucide-react';
import { GithubIcon } from './icons';
import { ThemeToggleButton } from '@/components/theme/theme-toggle-button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/70 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              Animation<span className="text-violet-600 dark:text-violet-400">Lab</span>
            </span>
            <span className="text-[10px] font-medium tracking-wide text-slate-500 dark:text-neutral-400">
              Web & Mobile Playground
            </span>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#catalog"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-neutral-300 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <Layers className="h-4 w-4 text-slate-400 dark:text-neutral-400" />
            Catalog
          </Link>
          <Link
            href="/components/buttons/magnetic-button"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-neutral-300 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            <Terminal className="h-4 w-4 text-slate-400 dark:text-neutral-400" />
            Interactive Playground
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Switcher */}
          <ThemeToggleButton />

          <a
            href="https://github.com/omercnkc/animations-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center gap-2 rounded-full border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900/90 px-3.5 text-xs font-medium text-slate-700 dark:text-neutral-200 transition-colors hover:border-slate-300 dark:hover:border-neutral-700 hover:text-slate-900 dark:hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
