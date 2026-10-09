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
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 shadow-lg transition-colors">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-neutral-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-semibold text-slate-900 dark:text-white">React Native (Reanimated v3)</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            60-120 FPS Native
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-neutral-300 transition-colors hover:border-slate-300 dark:hover:border-neutral-700 hover:text-slate-900 dark:hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400 dark:text-neutral-400" /> Copy Native Code
              </>
            )}
          </button>

          <a
            href="https://snack.expo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-900 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-neutral-300 transition-colors hover:border-slate-300 dark:hover:border-neutral-700 hover:text-slate-900 dark:hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 dark:text-neutral-400" /> Open in Snack
          </a>
        </div>
      </div>

      {/* Code Display or Snack Embed */}
      {snackId ? (
        <div className="h-[480px] w-full overflow-hidden rounded-lg border border-slate-200 dark:border-neutral-800">
          <iframe
            src={`https://snack.expo.dev/embedded/${snackId}?preview=true&platform=web&theme=dark`}
            style={{ width: '100%', height: '100%', border: '0px' }}
            title={filename}
          />
        </div>
      ) : (
        <div className="relative">
          <div className="max-h-[460px] overflow-auto rounded-lg border border-slate-200 dark:border-neutral-800/80 bg-slate-950 p-4 font-mono text-xs text-slate-200">
            <pre>
              <code>{code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Required packages info */}
      {dependencies && (
        <div className="rounded-lg border border-slate-200 dark:border-neutral-800/80 bg-slate-50 dark:bg-neutral-900/30 p-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
            Required Expo / React Native packages:
          </span>
          <code className="mt-1 block text-xs font-medium text-violet-700 dark:text-violet-300">
            npx expo install {Object.keys(dependencies).join(' ')}
          </code>
        </div>
      )}
    </div>
  );
}
