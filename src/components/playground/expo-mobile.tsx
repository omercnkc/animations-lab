'use client';

import React, { useState } from 'react';
import { Smartphone, Copy, Check, ExternalLink } from 'lucide-react';

interface ExpoMobileProps {
  filename: string;
  code: string;
  snackId?: string;
  dependencies?: Record<string, string>;
}

export function ExpoMobile({ filename, code, snackId, dependencies }: ExpoMobileProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-panel)] p-4 shadow-lg transition-colors">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-subtle)] pb-3">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-emerald-500" />
          <span className="text-sm font-semibold text-[var(--color-text-main)]">React Native (Reanimated v3)</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
            60-120 FPS Native
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-main)] transition-colors hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary)]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[var(--color-text-muted)]" /> Copy Native Code
              </>
            )}
          </button>

          <a
            href="https://snack.expo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-main)] transition-colors hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary)]"
          >
            <ExternalLink className="h-3.5 w-3.5 text-[var(--color-text-muted)]" /> Open in Snack
          </a>
        </div>
      </div>

      {/* Code Display or Snack Embed */}
      {snackId ? (
        <div className="h-[480px] w-full overflow-hidden rounded-lg border border-[var(--color-border-subtle)]">
          <iframe
            src={`https://snack.expo.dev/embedded/${snackId}?preview=true&platform=web&theme=dark`}
            style={{ width: '100%', height: '100%', border: '0px' }}
            title={filename}
          />
        </div>
      ) : (
        <div className="relative">
          <div className="max-h-[460px] overflow-auto rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-dark-banner)] p-4 font-mono text-xs text-[#E2E8F0]">
            <pre>
              <code>{code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Required packages info */}
      {dependencies && (
        <div className="rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-preview)] p-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
            Required Expo / React Native packages:
          </span>
          <code className="mt-1 block text-xs font-medium text-[var(--color-primary)]">
            npx expo install {Object.keys(dependencies).join(' ')}
          </code>
        </div>
      )}
    </div>
  );
}
