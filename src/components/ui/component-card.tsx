'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ComponentItem } from '@/registry/schema';
import {
  ArrowRight,
  Code,
  Smartphone,
  Globe,
  Lock,
  Unlock,
  Home,
  Package,
  Bell,
  User,
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
        {item.id === 'bottom-navigation-fluid' && <MiniFluidBottomNav />}

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

  const lockColor = unlocked ? '#006c49' : '#2196F3';

  return (
    <div
      onClick={toggleLock}
      className={`group/lock cursor-pointer flex flex-col items-center justify-center p-3 rounded-2xl transition-all select-none hover:scale-105 active:scale-95 ${
        shaking ? 'animate-shake' : ''
      }`}
    >
      <div className="relative flex flex-col items-center mb-1.5">
        <svg
          width="54"
          height="60"
          viewBox="0 0 80 88"
          fill="none"
          style={{ overflow: 'visible', filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.12))' }}
        >
          {/* Shackle with Pivot Rotation */}
          <g
            style={{
              transformOrigin: '24px 40px',
              transform: unlocked ? 'translateY(-10px) rotate(-28deg)' : 'translateY(0) rotate(0)',
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <path
              d="M 24 50 L 24 24 A 16 16 0 0 1 56 24 L 56 40"
              stroke={lockColor}
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'stroke 0.3s ease' }}
            />
          </g>

          {/* Lock Body */}
          <rect
            x="10"
            y="36"
            width="60"
            height="46"
            rx="12"
            fill={lockColor}
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Keyhole */}
          <circle cx="40" cy="54" r="4.5" fill="#ffffff" />
          <rect x="38.5" y="54" width="3" height="11" rx="1.5" fill="#ffffff" />
        </svg>
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

function MiniFluidBottomNav() {
  const [active, setActive] = useState(0);
  const [line, setLine] = useState<{ id: number; x1: number; x2: number; color: string } | null>(null);

  const miniTabs = [
    { id: 'h', icon: Home, color: '#4648d4' },
    { id: 'p', icon: Package, color: '#006c49' },
    { id: 'b', icon: Bell, color: '#ba1a1a' },
    { id: 'u', icon: User, color: '#d97706' },
  ];

  const barWidth = 208;
  const tabWidth = barWidth / 4;

  const handleTabClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index === active) return;
    const x1 = active * tabWidth + tabWidth / 2;
    const x2 = index * tabWidth + tabWidth / 2;
    const id = Date.now();
    setLine({ id, x1, x2, color: miniTabs[index].color });
    setTimeout(() => setLine(null), 600);
    setActive(index);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 select-none" style={{ width: barWidth, height: '76px' }}>
      {/* Background Pill */}
      <div
        className="absolute bottom-1 w-full h-11 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-md"
      />

      {/* Shooting Line SVG Overlay */}
      {line && (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
          <MiniShootingLine x1={line.x1} x2={line.x2} color={line.color} />
        </svg>
      )}

      {/* Tab Buttons */}
      <div className="absolute bottom-1 w-full h-11 flex items-center" style={{ zIndex: 20 }}>
        {miniTabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = active === idx;
          return (
            <button
              key={tab.id}
              onClick={(e) => handleTabClick(e, idx)}
              className="flex-1 h-full flex flex-col items-center justify-center relative cursor-pointer outline-none bg-transparent border-none p-0"
            >
              {/* Active Bead */}
              <div
                className="absolute transition-all duration-300 pointer-events-none"
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '13px',
                  backgroundColor: tab.color,
                  top: '-7px',
                  transform: isActive ? 'scale(1)' : 'scale(0)',
                  opacity: isActive ? 1 : 0,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.3, 0.64, 1) 0.15s, opacity 0.2s',
                }}
              />

              <div
                className="relative flex items-center justify-center transition-all duration-300"
                style={{
                  transform: isActive ? 'translateY(-14px)' : 'translateY(0)',
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.3, 0.64, 1)',
                  zIndex: 25,
                }}
              >
                <Icon
                  size={15}
                  color={isActive ? '#ffffff' : '#64748b'}
                  strokeWidth={2.5}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MiniShootingLine({ x1, x2, color }: { x1: number; x2: number; color: string }) {
  const isRight = x2 > x1;
  const lineLength = Math.abs(x2 - x1);
  const circ = 81.68; // 2 * PI * 13
  const [offset, setOffset] = useState(circ);
  const [opacity, setOpacity] = useState(1);

  const pathData = isRight
    ? `M ${x1} 36.5 L ${x2} 36.5 A 13 13 0 1 0 ${x2 - 0.01} 36.5`
    : `M ${x1} 36.5 L ${x2} 36.5 A 13 13 0 1 1 ${x2 + 0.01} 36.5`;

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOffset(-lineLength);
      });
    });
    const timer = setTimeout(() => setOpacity(0), 350);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [lineLength]);

  return (
    <path
      d={pathData}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{
        strokeDasharray: `${circ} 9999`,
        strokeDashoffset: offset,
        opacity,
        transition: 'stroke-dashoffset 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s 0.35s linear',
      }}
    />
  );
}


