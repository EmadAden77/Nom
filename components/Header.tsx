'use client';

import React from 'react';
import { Camera, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';
import { TargetPlatform } from '@/lib/prompt-engine/types';
import { BEDROOM_UI_STRINGS } from '@/lib/prompt-engine/ar-locale';

interface HeaderProps {
  target: TargetPlatform;
  onTargetChange: (target: TargetPlatform) => void;
}

export function Header({ target, onTargetChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & App Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-inner shrink-0">
            <Camera className="h-5 w-5" />
          </div>
          <div className="text-start">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold tracking-tight text-zinc-100 sm:text-lg">
                {BEDROOM_UI_STRINGS.appName}
              </h1>
              <span className="text-[11px] font-medium text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                {BEDROOM_UI_STRINGS.bedroomBadge}
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              {BEDROOM_UI_STRINGS.appSubtitle}
            </p>
          </div>
        </div>

        {/* Target Platform Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-zinc-900 p-1 border border-zinc-800">
            <button
              type="button"
              onClick={() => onTargetChange('chatgpt')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                target === 'chatgpt'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>ChatGPT</span>
            </button>
            <button
              type="button"
              onClick={() => onTargetChange('gemini')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                target === 'gemini'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Gemini</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
