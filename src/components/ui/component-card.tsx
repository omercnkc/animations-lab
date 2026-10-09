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
  Lock,
  Unlock,
} from 'lucide-react';
import { useLanguage } from '@/i18n/language-context';

export function ComponentCard({ item }: { item: ComponentItem }) {
  const { t } = useLanguage();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-xl hover:shadow-[var(--color-primary)]/10">
      {/* Interactive Card Canvas Preview (Preview Grid Tint: #FAFAFA in light / #11141E in dark) */}
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-preview)] p-6 transition-colors">
        <div className="absolute inset-0 bg-[radial-gradient(#D5D9DC_1px,transparent_1px)] dark:bg-[radial-gradient(#30374C_1px,transparent_1px)] [background-size:16px_16px] opacity-40 dark:opacity-30" />

        {/* Dynamic preview based on id */}
        {item.id === 'smart-lock-input' && <MiniSmartLock />}
        {item.id === 'magnetic-button' && <MiniMagneticButton />}
        {item.id === 'shimmer-button' && <MiniShimmerButton />}
        {item.id === 'theme-toggle' && <MiniThemeToggle />}
        {item.id === 'tilt-card' && <MiniTiltCard />}
        {item.id === 'bottom-sheet' && <MiniBottomSheet />}

        {/* Platform tags */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="flex items-center gap-1 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-secondary)] shadow-xs">
            <Globe className="h-3 w-3 text-[var(--color-primary)]" /> {t('catalog.webTag')}
          </span>
          <span className="flex items-center gap-1 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-secondary)] shadow-xs">
            <Smartphone className="h-3 w-3 text-emerald-500" /> {t('catalog.mobileTag')}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
            {t(`categories.${item.category}.name`) || item.category}
          </span>
          {item.featured && (
            <span className="rounded-full bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-primary-dark)]">
              {t('catalog.featured')}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 flex-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
          {item.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-muted)] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-5 border-t border-[var(--color-border-subtle)] pt-4">
          <Link
            href={`/components/${item.category}/${item.slug}`}
            className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-main)] transition-colors group-hover:text-[var(--color-primary)]"
          >
            <span className="flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5" />
              {t('catalog.tryInPlayground')}
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
      className="relative z-10 flex items-center gap-2 rounded-full border border-[var(--color-primary-border)] bg-[var(--color-primary-light)] px-5 py-2.5 text-xs font-semibold text-[var(--color-primary-dark)] shadow-md backdrop-blur"
    >
      <Sparkles className="h-3.5 w-3.5 text-[var(--color-primary)]" />
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
      <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-dark-banner)] px-5 py-2 text-xs font-semibold text-white">
        <Zap className="h-3.5 w-3.5 text-[var(--color-primary)]" />
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
      className="relative z-10 flex h-11 w-20 items-center rounded-full border border-[var(--color-border-medium)] bg-[var(--color-bg-page)] p-1 shadow-md transition-colors hover:border-[var(--color-primary)]"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow"
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
      className="flex h-28 w-44 flex-col justify-between rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-bg-page)] p-3 shadow-md"
    >
      <div className="flex items-center justify-between">
        <ShieldCheck className="h-4 w-4 text-[var(--color-primary)]" />
        <span className="text-[9px] font-mono text-[var(--color-text-muted)]">3D TILT</span>
      </div>
      <div>
        <span className="text-[10px] font-bold text-[var(--color-text-main)]">Interactive Card</span>
        <span className="block text-[8px] text-[var(--color-text-muted)]">Hover to rotate</span>
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
        className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border-medium)] bg-[var(--color-bg-page)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-main)] shadow-xs hover:border-[var(--color-primary)]"
      >
        <ChevronUp className="h-3.5 w-3.5 text-[var(--color-primary)]" />
        <span>{clicked ? 'Hide Sheet' : 'Slide Sheet'}</span>
      </motion.button>
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-2 rounded-lg border border-[var(--color-primary-border)] bg-[var(--color-primary-light)] px-3 py-1.5 text-[10px] text-[var(--color-primary-dark)] font-semibold shadow-xl"
          >
            ✨ Smooth Spring Reveal!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MiniSmartLock() {
  const [unlocked, setUnlocked] = useState(false);
  const [shaking, setShaking] = useState(false);

  const toggleLock = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!unlocked) {
      setUnlocked(true);
    } else {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setUnlocked(false);
      }, 400);
    }
  };

  return (
    <div
      onClick={toggleLock}
      className={`group/lock cursor-pointer flex flex-col items-center justify-center p-3 rounded-2xl transition-all select-none hover:scale-105 active:scale-95 ${
        shaking ? 'animate-shake' : ''
      }`}
    >
      <div className="relative flex flex-col items-center mb-1.5">
        {/* Shackle with Pivot Rotation */}
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative z-10"
          style={{
            width: '26px',
            height: '32px',
            marginBottom: '-10px',
            transformOrigin: '18% 100%',
            transform: unlocked ? 'translateY(-12px) rotate(-24deg)' : 'translateY(0)',
          }}
        >
          <div
            className="w-full h-[28px] border-[4.5px] border-b-0 rounded-t-xl transition-colors duration-300 relative"
            style={{ borderColor: unlocked ? '#006c49' : '#2196F3' }}
          >
            <div className="absolute -right-[4.5px] -bottom-[3px] w-[4.5px] h-[6px] bg-[var(--color-bg-preview)]" />
          </div>
          <div
            className="absolute left-0 bottom-[-6px] w-[4.5px] h-[10px] rounded-b-xs transition-colors duration-300"
            style={{ backgroundColor: unlocked ? '#006c49' : '#2196F3' }}
          />
        </div>

        {/* Lock Body */}
        <div
          className="w-14 h-9 rounded-lg flex flex-col items-center justify-center relative z-20 shadow-sm transition-colors duration-300"
          style={{ backgroundColor: unlocked ? '#006c49' : '#2196F3' }}
        >
          <div className="w-2 h-2 rounded-full bg-white relative z-30" />
          <div className="w-1 h-2.5 bg-white -mt-0.5 rounded-b-xs relative z-30" />
        </div>
      </div>

      <div className="flex items-center gap-1 mt-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold border transition-all duration-300 border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] group-hover/lock:border-[var(--color-primary)]">
        {unlocked ? (
          <>
            <Unlock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400">Unlocked!</span>
          </>
        ) : (
          <>
            <Lock className="h-3 w-3 text-[var(--color-primary)]" />
            <span>Tap to Unlock</span>
          </>
        )}
      </div>
    </div>
  );
}

