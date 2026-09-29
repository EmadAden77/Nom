'use client';

import React from 'react';
import {
  getAvailablePoses,
  getAvailableProps,
  getContextById,
} from '@/lib/prompt-engine/context-rules';
import { SceneState } from '@/lib/prompt-engine/types';
import { BEDROOM_POSES_AR, BEDROOM_PROPS_AR } from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import {
  UserCheck,
  Package,
  Check,
  ShieldCheck,
  Footprints,
  Car,
  Armchair,
  Bed,
} from 'lucide-react';

interface PoseSelectorProps {
  state: SceneState;
  onPoseChange: (poseId: string) => void;
  onPropChange: (propId: string) => void;
}

export function PoseSelector({
  state,
  onPoseChange,
  onPropChange,
}: PoseSelectorProps) {
  const currentContext = getContextById(state.contextId);
  const availablePoses = getAvailablePoses(state.contextId);
  const availableProps = getAvailableProps(state.contextId);

  const getPoseIcon = (postureType: string, isVehicle?: boolean) => {
    if (isVehicle) return <Car className="h-4 w-4" />;
    switch (postureType) {
      case 'walking':
        return <Footprints className="h-4 w-4" />;
      case 'standing':
        return <UserCheck className="h-4 w-4" />;
      case 'sitting':
        return <Armchair className="h-4 w-4" />;
      case 'lying':
        return <Bed className="h-4 w-4" />;
      default:
        return <UserCheck className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Context-Compatible Poses */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
              وضعية السيلفي وحركة الجسد المتوافقة مع المحيط
            </h3>
          </div>
          <span className="text-[10px] text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            واقعية هندسية وفيزيائية
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {availablePoses.map((pose) => {
            const isSelected = state.poseId === pose.id;
            const poseInfo = BEDROOM_POSES_AR[pose.id];
            const label = poseInfo?.labelAr || pose.name;
            const tooltip = poseInfo?.tooltipAr || pose.description;

            return (
              <button
                key={pose.id}
                type="button"
                onClick={() => onPoseChange(pose.id)}
                className={`group relative flex items-center justify-between rounded-xl px-4 py-3.5 text-start transition-all border ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                    : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {getPoseIcon(pose.postureType, pose.isVehicleInteraction)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                        {label}
                      </span>
                      <Tooltip content={tooltip} />
                    </div>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                      {pose.biomechanics}
                    </p>
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

      {/* 2. Free Hand Props (Contextually filtered) */}
      <div className="space-y-3 pt-3 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
              العنصر المحمول باليد الحرة (إكسسوار عفوي)
            </h3>
          </div>
          <span className="text-[10px] text-zinc-400">
            يد واحدة تحمل الهاتف
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {availableProps.map((prop) => {
            const isSelected = state.propId === prop.id;
            const propInfo = BEDROOM_PROPS_AR[prop.id];
            const label = propInfo?.labelAr || prop.name;
            const tooltip = propInfo?.tooltipAr || prop.description;

            return (
              <button
                key={prop.id}
                type="button"
                onClick={() => onPropChange(prop.id)}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-start transition-all border ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 ring-1 ring-amber-500/30'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:bg-zinc-850'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <span className="text-xs font-medium truncate">{label}</span>
                  <Tooltip content={tooltip} />
                </div>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 text-amber-400 ms-1 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
