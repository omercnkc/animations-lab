'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Layers, Terminal } from 'lucide-react';
import { GithubIcon } from './icons';
import { ThemeToggleButton } from '@/components/theme/theme-toggle-button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-page)]/90 backdrop-blur-xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-md transition-transform duration-300 group-hover:scale-105">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/animationsLab-icon.jpg"
              alt="AnimationLab Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[var(--color-text-main)]">
              Animation<span className="text-[var(--color-primary)]">Lab</span>
            </span>
            <span className="text-[10px] font-medium tracking-wide text-[var(--color-text-muted)]">
              Web & Mobile Playground
            </span>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#catalog"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
          >
            <Layers className="h-4 w-4 text-[var(--color-text-muted)]" />
            Catalog
          </Link>
          <Link
            href="/components/buttons/magnetic-button"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
          >
            <Terminal className="h-4 w-4 text-[var(--color-text-muted)]" />
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
            className="flex h-9 items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] px-3.5 text-xs font-medium text-[var(--color-text-main)] transition-colors hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary)]"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
