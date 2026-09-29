'use client';

import React, { useState } from 'react';
import { BEDROOM_ZONES } from '@/lib/prompt-engine/data';
import { LocationId, LocationCategory } from '@/lib/prompt-engine/types';
import { BEDROOM_ZONES_AR } from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import {
  Car,
  Fuel,
  Compass,
  Footprints,
  Coffee,
  Trees,
  Building2,
  DoorClosed,
  Bed,
  Eye,
  Sun,
  Armchair,
  Maximize2,
  Check,
  Shield,
  Layers,
} from 'lucide-react';

interface LocationSelectorProps {
  selectedLocationId: string;
  onSelectLocation: (zoneId: LocationId) => void;
}

export function LocationSelector({
  selectedLocationId,
  onSelectLocation,
}: LocationSelectorProps) {
  const [filterCategory, setFilterCategory] = useState<LocationCategory | 'all'>('all');

  const getZoneIcon = (id: LocationId) => {
    switch (id) {
      case 'shaded_parking':
      case 'open_parking':
        return <Car className="h-4 w-4" />;
      case 'gas_station':
        return <Fuel className="h-4 w-4" />;
      case 'desert_road_stop':
        return <Compass className="h-4 w-4" />;
      case 'residential_street':
      case 'commercial_walkway':
        return <Footprints className="h-4 w-4" />;
      case 'outdoor_cafe':
        return <Coffee className="h-4 w-4" />;
      case 'neighborhood_park':
        return <Trees className="h-4 w-4" />;
      case 'building_entrance':
      case 'building_rooftop':
        return <Building2 className="h-4 w-4" />;
      case 'elevator_mirror':
      case 'bedroom_mirror':
        return <Eye className="h-4 w-4" />;
      case 'on_the_bed':
        return <Bed className="h-4 w-4" />;
      case 'bedroom_window':
        return <Sun className="h-4 w-4" />;
      case 'bedroom_middle':
        return <Footprints className="h-4 w-4" />;
      case 'bedroom_wardrobe':
        return <Maximize2 className="h-4 w-4" />;
      case 'bedroom_door':
        return <DoorClosed className="h-4 w-4" />;
      case 'bedroom_chair':
        return <Armchair className="h-4 w-4" />;
      default:
        return <Car className="h-4 w-4" />;
    }
  };

  const filteredZones = BEDROOM_ZONES.filter((zone) => {
    if (filterCategory === 'all') return true;
    return zone.category === filterCategory;
  });

  return (
    <div className="space-y-3.5">
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          type="button"
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
            filterCategory === 'all'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          كافة الأماكن ({BEDROOM_ZONES.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterCategory('vehicle_parking')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 flex items-center gap-1.5 ${
            filterCategory === 'vehicle_parking'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <Car className="h-3.5 w-3.5" />
          مواقف وسيارات
        </button>
        <button
          type="button"
          onClick={() => setFilterCategory('streets_public')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 flex items-center gap-1.5 ${
            filterCategory === 'streets_public'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <Footprints className="h-3.5 w-3.5" />
          شوارع وممشى عام
        </button>
        <button
          type="button"
          onClick={() => setFilterCategory('indoor_living')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 flex items-center gap-1.5 ${
            filterCategory === 'indoor_living'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
          }`}
        >
          <Bed className="h-3.5 w-3.5" />
          أماكن داخلية ومرايا
        </button>
      </div>

      {/* Spatial Locations Grid */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {filteredZones.map((zone) => {
          const isSelected = selectedLocationId === zone.id;
          const zoneInfo = BEDROOM_ZONES_AR[zone.id];
          const label = zoneInfo?.labelAr || zone.name;
          const tooltip = zoneInfo?.tooltipAr || zone.description;
          const tag = zoneInfo?.tagAr || 'الموقع المحيط';

          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSelectLocation(zone.id)}
              className={`group relative flex items-center justify-between rounded-xl px-4 py-3.5 text-start transition-all duration-200 border ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm shadow-amber-500/5 ring-1 ring-amber-500/30'
                  : 'bg-zinc-900/60 border-zinc-800/90 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-zinc-800/80 text-zinc-400 group-hover:text-zinc-200'
                  }`}
                >
                  {getZoneIcon(zone.id)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                      {label}
                    </span>
                    <Tooltip content={tooltip} />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-zinc-500 truncate">
                      {tag}
                    </span>
                    {zone.supportsVehicle && (
                      <span className="text-[9px] font-medium text-amber-400/90 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20 shrink-0">
                        رينج روفر 2017
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="ms-2 shrink-0">
                  <Check className="h-4 w-4 text-amber-400" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
