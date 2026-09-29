'use client';

import React from 'react';
import {
  BEDROOM_CLOTHING,
  BEDROOM_HAIRSTYLES,
  BEDROOM_EXPRESSIONS,
  BEDROOM_EYEWEAR,
} from '@/lib/prompt-engine/data';
import { SceneState } from '@/lib/prompt-engine/types';
import {
  BEDROOM_CLOTHING_AR,
  BEDROOM_HAIRSTYLES_AR,
  BEDROOM_EXPRESSIONS_AR,
  BEDROOM_EYEWEAR_AR,
} from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import { User, Scissors, Smile, Glasses, Check, Sparkles } from 'lucide-react';

interface AppearanceSelectorProps {
  state: SceneState;
  onClothingChange: (clothingId: string) => void;
  onHairstyleChange: (hairstyleId: string) => void;
  onExpressionChange: (expressionId: string) => void;
  onEyewearChange?: (eyewearId: string) => void;
}

export function AppearanceSelector({
  state,
  onClothingChange,
  onHairstyleChange,
  onExpressionChange,
  onEyewearChange,
}: AppearanceSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Informative Note: Global Independence */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          <span>المظهر الشخصي مستقل تماماً وثابت عبر جميع الأماكن والمركبات</span>
        </div>
        <span className="text-[10px] text-amber-400/90 font-medium">مظهر شخصي شامل</span>
      </div>

      {/* 1. Clothing & Attire */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
              الملابس والأزياء اليومية
            </h3>
          </div>
          <span className="text-[10px] text-zinc-400">أزياء سعودية وكاجوال</span>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {BEDROOM_CLOTHING.map((item) => {
            const isSelected = state.clothingId === item.id;
            const itemInfo = BEDROOM_CLOTHING_AR[item.id];
            const label = itemInfo?.labelAr || item.name;
            const tooltip = itemInfo?.tooltipAr || item.description;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onClothingChange(item.id)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-start transition-all border ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                    : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-xs font-semibold text-zinc-100 truncate">
                    {label}
                  </span>
                  <Tooltip content={tooltip} />
                </div>
                {isSelected && (
                  <Check className="h-4 w-4 text-amber-400 ms-2 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Hairstyle & Grooming */}
      <div className="space-y-3 pt-3 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
              تسريحة الشعر واللحية
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {BEDROOM_HAIRSTYLES.map((hair) => {
            const isSelected = state.hairstyleId === hair.id;
            const hairInfo = BEDROOM_HAIRSTYLES_AR[hair.id];
            const label = hairInfo?.labelAr || hair.name;
            const tooltip = hairInfo?.tooltipAr || hair.description;

            return (
              <button
                key={hair.id}
                type="button"
                onClick={() => onHairstyleChange(hair.id)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-start transition-all border ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                    : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-xs font-semibold text-zinc-100 truncate">
                    {label}
                  </span>
                  <Tooltip content={tooltip} />
                </div>
                {isSelected && (
                  <Check className="h-4 w-4 text-amber-400 ms-2 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Facial Expression */}
      <div className="space-y-3 pt-3 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smile className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
              تعبيرات الوجه والمزاج العفوي
            </h3>
          </div>
          <span className="text-[10px] text-zinc-400">بدون تصنع</span>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {BEDROOM_EXPRESSIONS.map((exp) => {
            const isSelected = state.expressionId === exp.id;
            const expInfo = BEDROOM_EXPRESSIONS_AR[exp.id];
            const label = expInfo?.labelAr || exp.name;
            const tooltip = expInfo?.tooltipAr || exp.description;

            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => onExpressionChange(exp.id)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-start transition-all border ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                    : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-xs font-semibold text-zinc-100 truncate">
                    {label}
                  </span>
                  <Tooltip content={tooltip} />
                </div>
                {isSelected && (
                  <Check className="h-4 w-4 text-amber-400 ms-2 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Eyewear (Optional) */}
      <div className="space-y-3 pt-3 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Glasses className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
              النظارات (اختياري)
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {BEDROOM_EYEWEAR.map((eye) => {
            const isSelected = (state.eyewearId || 'eyewear_none') === eye.id;
            const eyeInfo = BEDROOM_EYEWEAR_AR[eye.id];
            const label = eyeInfo?.labelAr || eye.name;
            const tooltip = eyeInfo?.tooltipAr || eye.description;

            return (
              <button
                key={eye.id}
                type="button"
                onClick={() => onEyewearChange?.(eye.id)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-start transition-all border ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                    : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-xs font-semibold text-zinc-100 truncate">
                    {label}
                  </span>
                  <Tooltip content={tooltip} />
                </div>
                {isSelected && (
                  <Check className="h-4 w-4 text-amber-400 ms-1 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
