'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ComponentItem } from '@/registry/schema';
import {
  ArrowRight,
  Code,
  Smartphone,
  Globe,
  Sparkles,
  Moon,
  Sun,
  Zap,
  ShieldCheck,
  ChevronUp,
} from 'lucide-react';

export function ComponentCard({ item }: { item: ComponentItem }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-white dark:bg-[#21232d]/40 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-[#2196F3] hover:shadow-xl hover:shadow-[#2196F3]/10">
      {/* Interactive Card Canvas Preview (Preview Grid Tint: #FAFAFA) */}
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-preview)] p-6 transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(#D5D9DC_1px,transparent_1px)] dark:bg-[radial-gradient(#3d4253_1px,transparent_1px)] [background-size:16px_16px] opacity-40 dark:opacity-30" />

        {/* Dynamic preview based on id */}
        {item.id === 'magnetic-button' && <MiniMagneticButton />}
        {item.id === 'shimmer-button' && <MiniShimmerButton />}
        {item.id === 'theme-toggle' && <MiniThemeToggle />}
        {item.id === 'tilt-card' && <MiniTiltCard />}
        {item.id === 'bottom-sheet' && <MiniBottomSheet />}

        {/* Platform tags */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-md border border-[var(--color-border-subtle)] bg-white/95 dark:bg-[#111218]/90 px-2 py-0.5 text-[10px] font-medium text-[#4B5563] dark:text-neutral-400 shadow-xs">
            <Globe className="h-3 w-3 text-[#2196F3]" /> Web (React)
          </span>
          <span className="flex items-center gap-1 rounded-md border border-[var(--color-border-subtle)] bg-white/95 dark:bg-[#111218]/90 px-2 py-0.5 text-[10px] font-medium text-[#4B5563] dark:text-neutral-400 shadow-xs">
            <Smartphone className="h-3 w-3 text-emerald-500" /> Mobile (Reanimated)
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2196F3]">
            {item.category}
          </span>
          {item.featured && (
            <span className="rounded-full bg-[#E3F2FD] dark:bg-[#2196F3]/15 px-2 py-0.5 text-[10px] font-semibold text-[#0D47A1] dark:text-[#64b5f6]">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-[#282A35] dark:text-white group-hover:text-[#2196F3] transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-[#4B5563] dark:text-[#d1d5db]">
          {item.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-[var(--color-bg-panel)] px-1.5 py-0.5 text-[10px] text-[#6B7280] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-5 border-t border-[var(--color-border-subtle)] pt-4">
          <Link
            href={`/components/${item.category}/${item.slug}`}
            className="flex items-center justify-between text-xs font-semibold text-[#282A35] dark:text-neutral-300 transition-colors group-hover:text-[#2196F3]"
          >
            <span className="flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5" />
              Try in Playground
            </span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MiniMagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative z-10 flex items-center gap-2 rounded-full border border-[#BBDEFB] dark:border-[#2196F3]/40 bg-[#E3F2FD] dark:bg-[#21232d] px-5 py-2.5 text-xs font-semibold text-[#0D47A1] dark:text-[#64b5f6] shadow-md backdrop-blur"
    >
      <Sparkles className="h-3.5 w-3.5 text-[#2196F3]" />
      <span>Hover / Pull Me</span>
    </motion.button>
  );
}

function MiniShimmerButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full p-[2px]"
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#2196F3_0%,#0D47A1_50%,#BBDEFB_100%)]" />
      <span className="inline-flex items-center gap-2 rounded-full bg-[#282A35] dark:bg-[#111218] px-5 py-2 text-xs font-semibold text-white">
        <Zap className="h-3.5 w-3.5 text-[#2196F3]" />
        <span>Shimmer Blue</span>
      </span>
    </motion.button>
  );
}

function MiniThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative z-10 flex h-11 w-20 items-center rounded-full border border-[var(--color-border-medium)] bg-white dark:bg-[#21232d] p-1 shadow-md transition-colors hover:border-[#2196F3]"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2196F3] text-white shadow"
        style={{ marginLeft: isDark ? 'auto' : '0' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Moon className="h-4 w-4 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Sun className="h-4 w-4 text-amber-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}

function MiniTiltCard() {
  return (
    <motion.div
      whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="flex h-28 w-44 flex-col justify-between rounded-xl border border-[#BBDEFB] dark:border-[#2196F3]/40 bg-white dark:bg-[#21232d] p-3 shadow-md"
    >
      <div className="flex items-center justify-between">
        <ShieldCheck className="h-4 w-4 text-[#2196F3]" />
        <span className="text-[9px] font-mono text-[#6B7280]">3D TILT</span>
      </div>
      <div>
        <span className="text-[10px] font-bold text-[#282A35] dark:text-white">Interactive Card</span>
        <span className="block text-[8px] text-[#6B7280]">Hover to rotate</span>
      </div>
    </motion.div>
  );
}

function MiniBottomSheet() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setClicked(!clicked)}
        className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border-medium)] bg-white dark:bg-[#21232d] px-3.5 py-1.5 text-xs font-medium text-[#282A35] dark:text-white shadow-xs"
      >
        <ChevronUp className="h-3.5 w-3.5 text-[#2196F3]" />
        <span>{clicked ? 'Hide Sheet' : 'Slide Sheet'}</span>
      </motion.button>
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-2 rounded-lg border border-[#BBDEFB] dark:border-[#2196F3]/40 bg-[#E3F2FD] dark:bg-[#21232d] px-3 py-1.5 text-[10px] text-[#0D47A1] dark:text-[#64b5f6] font-semibold shadow-xl"
          >
            ✨ Smooth Spring Reveal!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
