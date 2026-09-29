'use client';

import React from 'react';
import { getAvailableContexts, getZoneById } from '@/lib/prompt-engine/context-rules';
import { SceneState } from '@/lib/prompt-engine/types';
import { BEDROOM_CONTEXTS_AR } from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import { Check, Car, Footprints, Sparkles } from 'lucide-react';

interface ContextSelectorProps {
  state: SceneState;
  onContextChange: (contextId: string) => void;
}

export function ContextSelector({
  state,
  onContextChange,
}: ContextSelectorProps) {
  const availableContexts = getAvailableContexts(state.zoneId);
  const currentZone = getZoneById(state.zoneId);

  return (
    <div className="space-y-3">
      {/* Informative Header / Vehicle indicator */}
      {currentZone.supportsVehicle && (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-amber-400 shrink-0" />
            <span className="font-medium">
              المركبة المدعومة في هذا الموقع: رينج روفر سبورت 2017 أوتوبيوغرافي ديناميك (L494 ما قبل الفيس ليفت)
            </span>
          </div>
          <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-mono text-amber-300 shrink-0">
            سعودية المواصفات
          </span>
        </div>
      )}

      {/* Context Options Grid */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {availableContexts.map((ctx) => {
          const isSelected = state.contextId === ctx.id;
          const ctxInfo = BEDROOM_CONTEXTS_AR[ctx.id];
          const label = ctxInfo?.labelAr || ctx.name;
          const tooltip = ctxInfo?.tooltipAr || ctx.description;

          return (
            <button
              key={ctx.id}
              type="button"
              onClick={() => onContextChange(ctx.id)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-start transition-all border ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {ctx.isVehicleContext ? (
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-md shrink-0 ${
                      isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Car className="h-3.5 w-3.5" />
                  </div>
                ) : (
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-md shrink-0 ${
                      isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Footprints className="h-3.5 w-3.5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                      {label}
                    </span>
                    <Tooltip content={tooltip} />
                  </div>
                  {ctx.isVehicleContext && (
                    <span className="text-[10px] text-amber-400/80 font-medium block truncate">
                      تفاعل مع رينج روفر 2017
                    </span>
                  )}
                </div>
              </div>

              {isSelected && (
                <Check className="h-4 w-4 text-amber-400 ms-2 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
