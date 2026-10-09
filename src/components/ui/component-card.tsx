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
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-sm dark:shadow-none backdrop-blur-sm transition-all duration-300 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10">
      {/* Interactive Card Canvas Preview */}
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden border-b border-slate-200 dark:border-neutral-800/80 bg-slate-50 dark:bg-neutral-950/60 p-6 transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-25 dark:opacity-30" />

        {/* Dynamic preview based on id */}
        {item.id === 'magnetic-button' && <MiniMagneticButton />}
        {item.id === 'shimmer-button' && <MiniShimmerButton />}
        {item.id === 'theme-toggle' && <MiniThemeToggle />}
        {item.id === 'tilt-card' && <MiniTiltCard />}
        {item.id === 'bottom-sheet' && <MiniBottomSheet />}

        {/* Platform tags */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-md border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/90 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-neutral-400 shadow-xs">
            <Globe className="h-3 w-3 text-sky-500 dark:text-sky-400" /> Web (React)
          </span>
          <span className="flex items-center gap-1 rounded-md border border-slate-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/90 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-neutral-400 shadow-xs">
            <Smartphone className="h-3 w-3 text-emerald-500 dark:text-emerald-400" /> Mobile (Reanimated)
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            {item.category}
          </span>
          {item.featured && (
            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-700 dark:text-violet-300">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-200 transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-600 dark:text-neutral-400">
          {item.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-slate-100 dark:bg-neutral-800/60 px-1.5 py-0.5 text-[10px] text-slate-600 dark:text-neutral-400 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-5 border-t border-slate-200 dark:border-neutral-800/80 pt-4">
          <Link
            href={`/components/${item.category}/${item.slug}`}
            className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-neutral-300 transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400"
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
      className="relative z-10 flex items-center gap-2 rounded-full border border-violet-500/40 bg-white dark:bg-neutral-900/90 px-5 py-2.5 text-xs font-medium text-slate-800 dark:text-white shadow-md dark:shadow-lg backdrop-blur"
    >
      <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
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
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#c084fc_0%,#6366f1_50%,#e2e8f0_100%)]" />
      <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-neutral-950 px-5 py-2 text-xs font-semibold text-white">
        <Zap className="h-3.5 w-3.5 text-violet-400" />
        <span>Shimmer Neon</span>
      </span>
    </motion.button>
  );
}

function MiniThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative z-10 flex h-11 w-20 items-center rounded-full border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-1 shadow-md transition-colors hover:border-slate-400 dark:hover:border-neutral-500"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white shadow"
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
              <Moon className="h-4 w-4 text-violet-100" />
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
      className="flex h-28 w-44 flex-col justify-between rounded-xl border border-violet-500/30 bg-white dark:bg-gradient-to-tr dark:from-neutral-900 dark:to-violet-950/40 p-3 shadow-md dark:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <ShieldCheck className="h-4 w-4 text-violet-600 dark:text-violet-400" />
        <span className="text-[9px] font-mono text-slate-500 dark:text-neutral-400">3D TILT</span>
      </div>
      <div>
        <span className="text-[10px] font-bold text-slate-800 dark:text-white">Interactive Card</span>
        <span className="block text-[8px] text-slate-500 dark:text-neutral-400">Hover to rotate</span>
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
        className="flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-slate-800 dark:text-neutral-200 shadow-sm"
      >
        <ChevronUp className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
        <span>{clicked ? 'Hide Sheet' : 'Slide Sheet'}</span>
      </motion.button>
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-2 rounded-lg border border-slate-300 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 px-3 py-1.5 text-[10px] text-violet-600 dark:text-violet-300 shadow-xl"
          >
            ✨ Smooth Spring Reveal!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
