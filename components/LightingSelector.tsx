'use client';

import React from 'react';
import { getAvailableLighting } from '@/lib/prompt-engine/context-rules';
import { SceneState } from '@/lib/prompt-engine/types';
import { BEDROOM_LIGHTING_AR } from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import { Lamp, Moon, Sun, Sunset, Lightbulb, Check, Sparkles, Fuel, Car } from 'lucide-react';

interface LightingSelectorProps {
  state: SceneState;
  onLightingChange: (lightingId: string) => void;
  onImperfectionChange: (level: 'candid_raw' | 'balanced_everyday') => void;
}

export function LightingSelector({
  state,
  onLightingChange,
  onImperfectionChange,
}: LightingSelectorProps) {
  const availableLighting = getAvailableLighting(state.contextId, state.zoneId);

  const getLightingIcon = (id: string) => {
    switch (id) {
      case 'saudi_afternoon_warm':
        return <Sunset className="h-4 w-4" />;
      case 'saudi_midday_harsh':
      case 'bright_morning_daylight':
      case 'natural_window_daylight':
        return <Sun className="h-4 w-4" />;
      case 'saudi_night_streetlights':
        return <Lightbulb className="h-4 w-4" />;
      case 'gas_station_canopy_light':
        return <Fuel className="h-4 w-4" />;
      case 'car_interior_ambient':
        return <Car className="h-4 w-4" />;
      case 'cafe_string_lights':
      case 'warm_nightstand_lamp':
      case 'overhead_room_light':
        return <Lamp className="h-4 w-4" />;
      case 'pitch_dark_screen_glow':
        return <Moon className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lamp className="h-4 w-4 text-amber-400" />
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
            مصادر الإضاءة الطبيعية والعملية المتوافقة مع المحيط
          </h3>
        </div>
        <span className="text-[11px] text-zinc-400">إضاءة حقيقية غير مصطنعة</span>
      </div>

      {/* Lighting Cards Grid */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {availableLighting.map((light) => {
          const isSelected = state.lightingId === light.id;
          const lightInfo = BEDROOM_LIGHTING_AR[light.id];
          const label = lightInfo?.labelAr || light.name;
          const tooltip = lightInfo?.tooltipAr || light.atmosphere;

          return (
            <button
              key={light.id}
              type="button"
              onClick={() => onLightingChange(light.id)}
              className={`flex items-start justify-between rounded-xl p-3.5 text-start transition-all border ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 mt-0.5 ${
                    isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {getLightingIcon(light.id)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                      {label}
                    </span>
                    <Tooltip content={tooltip} />
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1 line-clamp-1">
                    {light.timeOfDay} · {light.atmosphere}
                  </div>
                </div>
              </div>

              {isSelected && (
                <Check className="h-4 w-4 text-amber-400 ms-2 shrink-0 mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Imperfection & Sensor Realism Control */}
      <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-semibold text-zinc-200">
              مستوى الواقعية وطابع تصوير الجوال
            </span>
          </div>
          <span className="text-[10px] text-zinc-400">طابع الكاميرا غير المعدلة</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onImperfectionChange('candid_raw')}
            className={`p-2.5 rounded-lg text-start transition-all border text-xs ${
              state.imperfectionLevel === 'candid_raw'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 ring-1 ring-amber-500/20'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="font-semibold text-zinc-100">لقطة عفوية نقية (Raw Candid)</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">مسام طبيعية، بدون فلاتر، تشويش حساس معتدل</div>
          </button>
          <button
            type="button"
            onClick={() => onImperfectionChange('balanced_everyday')}
            className={`p-2.5 rounded-lg text-start transition-all border text-xs ${
              state.imperfectionLevel === 'balanced_everyday'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 ring-1 ring-amber-500/20'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="font-semibold text-zinc-100">سيلفي يومي متزن (Balanced Daily)</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">معالجة جوال ذكية HDR متوازنة ونظيفة</div>
          </button>
        </div>
      </div>
    </div>
  );
}
