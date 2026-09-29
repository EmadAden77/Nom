'use client';

import React from 'react';
import { getAvailableCameras } from '@/lib/prompt-engine/context-rules';
import { SceneState } from '@/lib/prompt-engine/types';
import { BEDROOM_CAMERAS_AR } from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import { Eye, Check, Smartphone, ShieldCheck } from 'lucide-react';

interface CameraSelectorProps {
  state: SceneState;
  onCameraChange: (cameraId: string) => void;
}

export function CameraSelector({ state, onCameraChange }: CameraSelectorProps) {
  const availableCameras = getAvailableCameras(state.contextId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-amber-400" />
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
            أوضاع كاميرا السيلفي الحصرية
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>كاميرا جوال حقيقية · تم استبعاد عدسات DSLR تماماً</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {availableCameras.map((cam) => {
          const isSelected = state.cameraId === cam.id;
          const camInfo = BEDROOM_CAMERAS_AR[cam.id];
          const label = camInfo?.labelAr || cam.name;
          const tooltip = `${camInfo?.tooltipAr || cam.perspective} (${cam.armReach})`;

          return (
            <button
              key={cam.id}
              type="button"
              onClick={() => onCameraChange(cam.id)}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-start transition-all border ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Smartphone className={`h-4 w-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-zinc-500'}`} />
                <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
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
  );
}
