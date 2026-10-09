'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ComponentItem } from '@/registry/schema';
import { ArrowRight, Code, Smartphone, Globe, Sparkles, Moon, Sun } from 'lucide-react';

export function ComponentCard({ item }: { item: ComponentItem }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10">
      {/* Interactive Card Canvas Preview */}
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden border-b border-neutral-800/80 bg-neutral-950/60 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

        {/* Dynamic preview based on id */}
        {item.id === 'magnetic-button' && <MiniMagneticButton />}
        {item.id === 'theme-toggle' && <MiniThemeToggle />}

        {/* Platform tags */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-md border border-neutral-800 bg-neutral-900/90 px-2 py-0.5 text-[10px] font-medium text-neutral-400">
            <Globe className="h-3 w-3 text-sky-400" /> Web (React)
          </span>
          <span className="flex items-center gap-1 rounded-md border border-neutral-800 bg-neutral-900/90 px-2 py-0.5 text-[10px] font-medium text-neutral-400">
            <Smartphone className="h-3 w-3 text-emerald-400" /> Mobile (Reanimated)
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
            {item.category}
          </span>
          {item.featured && (
            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-300">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-white group-hover:text-violet-200">
          {item.title}
        </h3>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-neutral-400">
          {item.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-neutral-800/60 px-1.5 py-0.5 text-[10px] text-neutral-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-5 border-t border-neutral-800/80 pt-4">
          <Link
            href={`/components/${item.category}/${item.slug}`}
            className="flex items-center justify-between text-xs font-semibold text-neutral-300 transition-colors group-hover:text-violet-400"
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
      className="relative z-10 flex items-center gap-2 rounded-full border border-violet-500/40 bg-neutral-900/90 px-5 py-2.5 text-xs font-medium text-white shadow-lg backdrop-blur"
    >
      <Sparkles className="h-3.5 w-3.5 text-violet-400" />
      <span>Hover / Pull Me</span>
    </motion.button>
  );
}

function MiniThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative z-10 flex h-11 w-20 items-center rounded-full border border-neutral-700 bg-neutral-900 p-1 shadow-lg transition-colors hover:border-neutral-500"
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
