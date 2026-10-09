'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Layers, Terminal } from 'lucide-react';
import { GithubIcon } from './icons';
import { ThemeToggleButton } from '@/components/theme/theme-toggle-button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border-subtle)] bg-white/95 dark:bg-[#17181f]/95 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2196F3] shadow-md shadow-[#2196F3]/30 transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[#282A35] dark:text-white">
              Animation<span className="text-[#2196F3]">Lab</span>
            </span>
            <span className="text-[10px] font-medium tracking-wide text-[#6B7280] dark:text-neutral-400">
              Web & Mobile Playground
            </span>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#catalog"
            className="flex items-center gap-1.5 text-sm font-medium text-[#4B5563] dark:text-neutral-300 transition-colors hover:text-[#2196F3] dark:hover:text-[#2196F3]"
          >
            <Layers className="h-4 w-4 text-[#6B7280]" />
            Catalog
          </Link>
          <Link
            href="/components/buttons/magnetic-button"
            className="flex items-center gap-1.5 text-sm font-medium text-[#4B5563] dark:text-neutral-300 transition-colors hover:text-[#2196F3] dark:hover:text-[#2196F3]"
          >
            <Terminal className="h-4 w-4 text-[#6B7280]" />
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
            className="flex h-9 items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-3.5 text-xs font-medium text-[#282A35] dark:text-neutral-200 transition-colors hover:border-[#BBDEFB] hover:text-[#2196F3] dark:hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
