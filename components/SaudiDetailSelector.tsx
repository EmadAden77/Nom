'use client';

import React from 'react';
import { getAvailableSaudiDetails } from '@/lib/prompt-engine/context-rules';
import { SceneState } from '@/lib/prompt-engine/types';
import { SAUDI_BEDROOM_DETAILS_AR } from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import { Wind, Sun, DoorClosed, Check, Home, Car, Fuel, Coffee, Compass } from 'lucide-react';

interface SaudiDetailSelectorProps {
  state: SceneState;
  onSaudiDetailChange: (id: string) => void;
}

export function SaudiDetailSelector({
  state,
  onSaudiDetailChange,
}: SaudiDetailSelectorProps) {
  const details = getAvailableSaudiDetails(state.zoneId);

  const getDetailIcon = (id: string) => {
    switch (id) {
      case 'detail_parking_fabric_shades':
        return <Car className="h-4 w-4" />;
      case 'detail_villa_perimeter_wall':
        return <Home className="h-4 w-4" />;
      case 'detail_gas_station_island':
        return <Fuel className="h-4 w-4" />;
      case 'detail_cafe_paved_walkway':
        return <Coffee className="h-4 w-4" />;
      case 'detail_desert_roadside':
        return <Compass className="h-4 w-4" />;
      case 'detail_split_ac':
        return <Wind className="h-4 w-4" />;
      case 'detail_chiffon_curtains':
        return <Sun className="h-4 w-4" />;
      case 'detail_wardrobe_closet':
        return <DoorClosed className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-amber-400" />
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
            تفاصيل البيئة السعودية اليومية بالخلفية
          </h3>
        </div>
        <span className="text-[10px] text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          واقعية محلية بدون معالم سياحية
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {details.map((item) => {
          const isSelected = state.saudiDetailId === item.id;
          const detailInfo = SAUDI_BEDROOM_DETAILS_AR[item.id];
          const label = detailInfo?.labelAr || item.name;
          const tooltip = detailInfo?.tooltipAr || item.description;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSaudiDetailChange(item.id)}
              className={`flex items-center justify-between rounded-xl p-3 text-start transition-all border ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                    isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {getDetailIcon(item.id)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-zinc-100 truncate">
                      {label}
                    </span>
                    <Tooltip content={tooltip} />
                  </div>
                </div>
              </div>

              {isSelected && (
                <Check className="h-4 w-4 text-amber-400 ms-1 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
