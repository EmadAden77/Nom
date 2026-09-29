'use client';

import React from 'react';
import { BEDROOM_PRESETS, BedroomPreset } from '@/lib/prompt-engine/presets';
import { Sparkles, Car, Footprints, Coffee, Bed } from 'lucide-react';

interface PresetSelectorProps {
  onSelectPreset: (preset: BedroomPreset) => void;
  activePresetId?: string;
}

export function PresetSelector({ onSelectPreset, activePresetId }: PresetSelectorProps) {
  const getIcon = (cat: BedroomPreset['category']) => {
    switch (cat) {
      case 'vehicle':
        return <Car className="h-3.5 w-3.5 text-amber-400 shrink-0" />;
      case 'street':
        return <Footprints className="h-3.5 w-3.5 text-sky-400 shrink-0" />;
      case 'social':
        return <Coffee className="h-3.5 w-3.5 text-emerald-400 shrink-0" />;
      case 'indoor':
        return <Bed className="h-3.5 w-3.5 text-purple-400 shrink-0" />;
      default:
        return <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>مشاهد وسيناريوهات جاهزة بنقرة واحدة</span>
        </div>
        <span className="text-[11px] text-zinc-500">مجهزة بفيزيائية دقيقة</span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-2 pt-0.5 no-scrollbar scroll-smooth">
        {BEDROOM_PRESETS.map((preset) => {
          const isActive = activePresetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className={`flex-shrink-0 text-start rounded-xl p-3 border transition-all duration-200 min-w-[220px] max-w-[270px] ${
                isActive
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm shadow-amber-500/5 ring-1 ring-amber-500/30'
                  : 'bg-zinc-900/70 border-zinc-800/90 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {getIcon(preset.category)}
                <span className="text-xs font-semibold text-zinc-100 truncate">
                  {preset.title}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                {preset.tagline}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
