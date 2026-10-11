'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Tv,
  Laptop,
  Speaker,
  Camera,
  Monitor,
  Headphones,
  Mail,
  Sparkles,
  CheckCircle2,
  Loader2,
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
        {item.id === 'orbiting-bubble-loader' && <MiniOrbitingLoader />}
        {item.id === 'animated-auth-panel' && <MiniAuthPanel />}

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
  const [lines, setLines] = useState<Array<{ id: number; x1: number; x2: number; color: string; lineLength: number; isRight: boolean }>>([]);

  const miniTabs = [
    { id: 'h', icon: Home, color: '#4648d4' },
    { id: 'p', icon: Package, color: '#006c49' },
    { id: 'b', icon: Bell, color: '#ba1a1a' },
    { id: 'u', icon: User, color: '#d97706' },
  ];

  const barWidth = 220;
  const tabWidth = barWidth / 4;

  const handleTabClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index === active) return;
    const x1 = active * tabWidth + tabWidth / 2;
    const x2 = index * tabWidth + tabWidth / 2;
    const lineLength = Math.abs(x2 - x1);
    const isRight = x2 > x1;
    const id = Date.now() + Math.random();

    setLines((prev) => [...prev.slice(-2), { id, x1, x2, color: miniTabs[index].color, lineLength, isRight }]);
    setActive(index);

    setTimeout(() => {
      setLines((prev) => prev.filter((l) => l.id !== id));
    }, 550);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 select-none" style={{ width: barWidth, height: '72px' }}>
      {/* Background Pill */}
      <div
        className="absolute bottom-1 w-full h-11 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] shadow-md"
      />

      {/* Shooting Line SVG Overlay */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
        {lines.map((l) => (
          <MiniShootingLine
            key={l.id}
            x1={l.x1}
            x2={l.x2}
            color={l.color}
            lineLength={l.lineLength}
            isRight={l.isRight}
          />
        ))}
      </svg>

      {/* Tab Buttons */}
      <div className="absolute bottom-1 w-full h-11 flex items-center" style={{ zIndex: 20 }}>
        {miniTabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = active === idx;
          return (
            <button
              key={tab.id}
              onClick={(e) => handleTabClick(e, idx)}
              className="flex-1 h-full flex flex-col items-center justify-center relative cursor-pointer outline-none bg-transparent border-none p-0 select-none"
            >
              {/* Glow Bead */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '16px',
                  backgroundColor: tab.color,
                  top: '-12px',
                  transform: isActive ? 'scale(1.25)' : 'scale(0)',
                  opacity: isActive ? 0.22 : 0,
                  transition: isActive
                    ? 'transform 0.45s cubic-bezier(0.34, 1.3, 0.64, 1) 0.24s, opacity 0.35s 0.24s'
                    : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s, opacity 0.15s 0s',
                }}
              />

              {/* Solid Bead */}
              <div
                className="absolute pointer-events-none shadow-md"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '14px',
                  backgroundColor: tab.color,
                  top: '-10px',
                  transform: isActive ? 'scale(1)' : 'scale(0)',
                  opacity: isActive ? 1 : 0,
                  transition: isActive
                    ? 'transform 0.38s cubic-bezier(0.34, 1.35, 0.64, 1) 0.24s, opacity 0.2s 0.24s'
                    : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s, opacity 0.15s 0s',
                }}
              />

              {/* Icon Container with Spring Lift */}
              <div
                className="relative flex items-center justify-center pointer-events-none"
                style={{
                  transform: isActive ? 'translateY(-15px) scale(1.05)' : 'translateY(0) scale(1)',
                  transition: isActive
                    ? 'transform 0.45s cubic-bezier(0.34, 1.35, 0.64, 1) 0.24s'
                    : 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0s',
                  zIndex: 25,
                }}
              >
                <Icon
                  size={16}
                  color={isActive ? '#ffffff' : '#64748b'}
                  strokeWidth={2.4}
                  style={{
                    transition: isActive ? 'color 0.2s ease 0.24s' : 'color 0.2s ease 0s',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MiniShootingLine({
  x1,
  x2,
  color,
  lineLength,
  isRight,
}: {
  x1: number;
  x2: number;
  color: string;
  lineLength: number;
  isRight: boolean;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const circ = 87.96; // 2 * PI * 14

  const pathData = isRight
    ? `M ${x1} 42 L ${x2} 42 A 14 14 0 1 0 ${x2 - 0.01} 42`
    : `M ${x1} 42 L ${x2} 42 A 14 14 0 1 1 ${x2 + 0.01} 42`;

  useEffect(() => {
    if (!pathRef.current) return;
    const anim = pathRef.current.animate(
      [
        { strokeDashoffset: `${circ}px`, opacity: 1 },
        { strokeDashoffset: `-${lineLength}px`, opacity: 1, offset: 0.72 },
        { strokeDashoffset: `-${lineLength}px`, opacity: 0, offset: 1 },
      ],
      {
        duration: 420,
        easing: 'cubic-bezier(0.35, 0.1, 0.25, 1)',
        fill: 'forwards',
      }
    );
    return () => anim.cancel();
  }, [circ, lineLength]);

  return (
    <path
      ref={pathRef}
      d={pathData}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{
        strokeDasharray: `${circ} 9999`,
        strokeDashoffset: circ,
      }}
    />
  );
}

function MiniOrbitingLoader() {
  const [centerIdx, setCenterIdx] = useState(0);

  const miniIcons = [
    { id: 'mobile', icon: Smartphone },
    { id: 'tv', icon: Tv },
    { id: 'laptop', icon: Laptop },
    { id: 'speaker', icon: Speaker },
    { id: 'camera', icon: Camera },
    { id: 'pc', icon: Monitor },
    { id: 'headphones', icon: Headphones },
  ];

  const numItems = miniIcons.length;
  const orbitRadius = 64;

  useEffect(() => {
    const timer = setInterval(() => {
      setCenterIdx((prev) => (prev + 1) % numItems);
    }, 1800);
    return () => clearInterval(timer);
  }, [numItems]);

  const orbitingItems = miniIcons.filter((_, idx) => idx !== centerIdx);
  const numOrbiting = orbitingItems.length;

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: '180px', height: '180px' }}
    >
      {/* Rotating Orbit Container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: '100%',
          height: '100%',
          animation: 'orbit-spin 22s linear infinite',
          willChange: 'transform',
        }}
      >
        {miniIcons.map((item, idx) => {
          const Icon = item.icon;
          const isCenter = idx === centerIdx;

          let x = 0;
          let y = 0;

          if (!isCenter) {
            const orbitPos = orbitingItems.findIndex((it) => it.id === item.id);
            const angle = (orbitPos / numOrbiting) * (2 * Math.PI);
            x = Math.cos(angle) * orbitRadius;
            y = Math.sin(angle) * orbitRadius;
          }

          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setCenterIdx(idx);
              }}
              className="absolute cursor-pointer"
              style={{
                top: '50%',
                left: '50%',
                width: '36px',
                height: '36px',
                marginTop: '-18px',
                marginLeft: '-18px',
                transform: `translate(${x}px, ${y}px)`,
                transition: 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: isCenter ? 25 : 5,
                willChange: 'transform',
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center shadow-xs"
                style={{
                  animation: 'orbit-counter-spin 22s linear infinite',
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  backgroundColor: isCenter ? 'var(--color-primary)' : 'var(--color-bg-page)',
                  color: isCenter ? '#ffffff' : 'var(--color-text-secondary)',
                  border: isCenter
                    ? '2px solid var(--color-primary)'
                    : '1.5px solid var(--color-border-subtle)',
                  transform: isCenter ? 'scale(1.4)' : 'scale(1)',
                  boxShadow: isCenter
                    ? '0 0 20px rgba(56, 189, 248, 0.55), 0 6px 14px rgba(0, 0, 0, 0.15)'
                    : '0 3px 8px rgba(0, 0, 0, 0.06)',
                  willChange: 'transform',
                }}
              >
                <Icon size={isCenter ? 18 : 14} strokeWidth={2.3} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniAuthPanel() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading || success) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2200);
    }, 900);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative flex w-[304px] h-[154px] overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] shadow-xl transition-all duration-300 hover:shadow-2xl select-none"
    >
      {/* Sol Panel: Parlayan ve Yüzen Orblar & Marka */}
      <div className="relative w-[124px] h-full flex flex-col justify-between p-3.5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white overflow-hidden shrink-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full">
            <defs>
              <pattern id="mini-auth-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mini-auth-grid)" />
          </svg>
        </div>

        {/* Canlı Yüzen Glow Orblar */}
        <div
          className="absolute -top-8 -left-8 w-28 h-28 rounded-full bg-indigo-300/40 blur-xl pointer-events-none"
          style={{
            animation: 'floatOrb1 5s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-violet-300/35 blur-xl pointer-events-none"
          style={{
            animation: 'floatOrb2 7s ease-in-out infinite',
            willChange: 'transform',
          }}
        />

        {/* Dönen Konsantrik Halka */}
        <div
          className="absolute -bottom-5 -right-5 opacity-30 pointer-events-none"
          style={{
            animation: 'spinRings 20s linear infinite',
            willChange: 'transform',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="35" stroke="white" strokeWidth="0.75" strokeDasharray="4 4" />
            <circle cx="40" cy="40" r="24" stroke="white" strokeWidth="0.75" />
            <circle cx="40" cy="40" r="14" stroke="white" strokeWidth="0.75" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white shadow-xs">
            <Sparkles className="h-3 w-3 text-indigo-600" />
          </div>
          <span className="text-xs font-bold tracking-tight text-white">Meet.ai</span>
        </div>

        {/* Copy */}
        <div className="relative z-10">
          <div className="text-[11px] font-extrabold leading-tight">
            {isRegister ? 'Geleceğe Katıl' : 'Yapay Zeka ile Tanış'}
          </div>
          <div className="text-[8.5px] text-indigo-200/90 leading-tight mt-0.5">
            Akıllı Asistanlar
          </div>
        </div>
      </div>

      {/* Sağ Form Alanı */}
      <div className="flex-1 h-full p-3 flex flex-col justify-between bg-[var(--color-bg-page)]">
        {/* Mod Değiştirici (Sliding Pill) */}
        <div className="relative flex rounded-lg bg-[var(--color-bg-panel)] p-0.5 border border-[var(--color-border-subtle)]">
          <div
            className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-md bg-[var(--color-bg-page)] shadow-xs transition-transform duration-300"
            style={{
              transform: isRegister ? 'translateX(calc(100% + 2px))' : 'translateX(0)',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
            }}
          />
          <button
            type="button"
            onClick={() => { setIsRegister(false); setSuccess(false); }}
            className={`relative z-10 flex-1 py-1 text-[9.5px] font-bold text-center transition-colors cursor-pointer ${
              !isRegister ? 'text-indigo-600 dark:text-indigo-400' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            Giriş
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setSuccess(false); }}
            className={`relative z-10 flex-1 py-1 text-[9.5px] font-bold text-center transition-colors cursor-pointer ${
              isRegister ? 'text-indigo-600 dark:text-indigo-400' : 'text-[var(--color-text-secondary)]'
            }`}
          >
            Kayıt
          </button>
        </div>

        {/* Input alanları */}
        <div className="space-y-1.5 my-auto overflow-hidden">
          {isRegister && (
            <div className="flex items-center gap-1.5 h-6 px-2 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] text-[9px] text-[var(--color-text-secondary)]">
              <User className="h-2.5 w-2.5 text-slate-400 shrink-0" />
              <span className="truncate opacity-75">Ahmet Yılmaz</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 h-6 px-2 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] text-[9px] text-[var(--color-text-secondary)]">
            <Mail className="h-2.5 w-2.5 text-slate-400 shrink-0" />
            <span className="truncate opacity-75">ornek@meet.ai</span>
          </div>
          <div className="flex items-center gap-1.5 h-6 px-2 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] text-[9px] text-[var(--color-text-secondary)]">
            <Lock className="h-2.5 w-2.5 text-slate-400 shrink-0" />
            <span className="tracking-widest opacity-75">••••••••</span>
          </div>
        </div>

        {/* Submit action button */}
        <button
          type="button"
          onClick={handleAction}
          className={`flex items-center justify-center gap-1.5 h-6.5 w-full rounded-md text-white text-[9.5px] font-semibold transition-all shadow-xs cursor-pointer ${
            success ? 'bg-emerald-600 shadow-emerald-600/30' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-600/25'
          }`}
        >
          {loading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : success ? (
            <>
              <CheckCircle2 className="h-3 w-3 text-emerald-200" />
              <span>Giriş Yapıldı</span>
            </>
          ) : (
            <>
              <span>{isRegister ? 'Hesap Aç' : 'Giriş Yap'}</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}


