'use client';

import React from 'react';
import { SceneState } from '@/lib/prompt-engine/types';
import {
  getZoneById,
  getContextById,
  getPoseById,
  getLightingById,
  getCameraById,
  getSaudiDetailById,
} from '@/lib/prompt-engine/context-rules';
import {
  BEDROOM_ZONES_AR,
  BEDROOM_CONTEXTS_AR,
  BEDROOM_POSES_AR,
  BEDROOM_LIGHTING_AR,
  BEDROOM_CAMERAS_AR,
  SAUDI_BEDROOM_DETAILS_AR,
} from '@/lib/prompt-engine/ar-locale';
import { RotateCcw, ShieldCheck, Car, CheckCircle2 } from 'lucide-react';

interface CoherenceInspectorProps {
  state: SceneState;
  onReset: () => void;
}

export function CoherenceInspector({ state, onReset }: CoherenceInspectorProps) {
  const zone = getZoneById(state.zoneId);
  const context = getContextById(state.contextId);
  const pose = getPoseById(state.poseId);
  const cam = getCameraById(state.cameraId);
  const light = getLightingById(state.lightingId);
  const saudiDetail = getSaudiDetailById(state.saudiDetailId);

  const zoneLabel = BEDROOM_ZONES_AR[zone.id]?.labelAr || zone.name;
  const contextLabel = BEDROOM_CONTEXTS_AR[context.id]?.labelAr || context.name;
  const poseLabel = BEDROOM_POSES_AR[pose.id]?.labelAr || pose.shortLabel;
  const camLabel = BEDROOM_CAMERAS_AR[cam.id]?.labelAr || cam.name;
  const lightLabel = BEDROOM_LIGHTING_AR[light.id]?.labelAr || light.name;
  const saudiDetailLabel = SAUDI_BEDROOM_DETAILS_AR[saudiDetail.id]?.labelAr || saudiDetail.name;

  return (
    <div className="rounded-xl border border-zinc-800/90 bg-zinc-950/60 p-3.5 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>ملخص التماسك الفيزيائي والمحيطي الحي</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          <span>استعادة الافتراضي</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[11px]">
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start">
          <span className="text-zinc-500 block text-[10px]">المحيط / المكان</span>
          <span className="text-zinc-200 font-medium truncate block">{zoneLabel}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start">
          <span className="text-zinc-500 block text-[10px]">سياق المشهد</span>
          <span className="text-amber-300 font-medium truncate block flex items-center gap-1">
            {context.isVehicleContext && <Car className="h-3 w-3 text-amber-400 shrink-0" />}
            <span className="truncate">{contextLabel}</span>
          </span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start">
          <span className="text-zinc-500 block text-[10px]">الوضعية والجسد</span>
          <span className="text-zinc-200 font-medium truncate block">{poseLabel}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start">
          <span className="text-zinc-500 block text-[10px]">الكاميرا والزاوية</span>
          <span className="text-zinc-200 font-medium truncate block">{camLabel}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start">
          <span className="text-zinc-500 block text-[10px]">الإضاءة والجو</span>
          <span className="text-zinc-200 font-medium truncate block">{lightLabel}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start col-span-2 sm:col-span-1">
          <span className="text-zinc-500 block text-[10px]">الواقعية السعودية</span>
          <span className="text-zinc-200 font-medium truncate block">{saudiDetailLabel}</span>
        </div>
      </div>
    </div>
  );
}
