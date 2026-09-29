export type TargetPlatform = 'chatgpt' | 'gemini';

export type LocationId =
  // Vehicle & Parking environments
  | 'shaded_parking'
  | 'open_parking'
  | 'gas_station'
  | 'desert_road_stop'
  // Street & Public Walkways
  | 'residential_street'
  | 'commercial_walkway'
  | 'outdoor_cafe'
  | 'neighborhood_park'
  | 'building_entrance'
  // Indoor & Architectural
  | 'elevator_mirror'
  | 'building_rooftop'
  | 'on_the_bed'
  | 'bedroom_mirror'
  | 'bedroom_window'
  | 'bedroom_middle'
  | 'bedroom_wardrobe'
  | 'bedroom_door'
  | 'bedroom_chair';

// Alias for backwards compatibility
export type BedroomZoneId = LocationId;

export type LocationCategory = 'vehicle_parking' | 'streets_public' | 'indoor_living';

export interface LocationOption {
  id: LocationId;
  name: string; // Engine value (English)
  category: LocationCategory;
  description: string;
  supportsVehicle: boolean;
  environmentDetails: string[];
  supportedContextIds: string[];
  defaultContextId: string;
  defaultLightingId: string;
  defaultPoseId: string;
  defaultCameraId: string;
  isStandingZone?: boolean;
}

// Alias for backwards compatibility
export type BedroomZoneOption = LocationOption;

export type VehicleRole = 
  | 'none'
  | 'inside_driver'
  | 'inside_passenger'
  | 'beside_driver_door'
  | 'front_hood_lean'
  | 'door_open_standing'
  | 'vehicle_in_background';

export interface ContextOption {
  id: string;
  name: string; // Engine value (English)
  description: string;
  isVehicleContext: boolean;
  vehicleRole?: VehicleRole;
  isMirrorContext: boolean;
  isStandingContext: boolean;
  allowedZoneIds: LocationId[];
  defaultPoseId: string;
  defaultCameraId: string;
  allowedPoseIds: string[];
  allowedCameraIds: string[];
  allowedLightingIds?: string[];
  allowedPropIds: string[];
}

// Alias for backwards compatibility
export type BedroomContextOption = ContextOption;

export interface PoseOption {
  id: string;
  name: string; // Engine value (English)
  shortLabel: string;
  description: string;
  biomechanics: string;
  postureType: 'standing' | 'sitting' | 'lying' | 'walking';
  requiresMirror: boolean;
  isVehicleInteraction?: boolean;
  spatialLocation: string;
}

// Alias for backwards compatibility
export type BedroomPoseOption = PoseOption;

export interface CameraOption {
  id: string;
  name: string; // Engine value (English)
  perspective: string;
  armReach: string;
  phoneGrip: string;
  opticalNote: string;
  isMirrorMode: boolean;
  isVehicleInterior?: boolean;
}

// Alias for backwards compatibility
export type BedroomCameraOption = CameraOption;

export interface LightingOption {
  id: string;
  name: string; // Engine value (English)
  timeOfDay: string;
  lightSource: string;
  shadowDescription: string;
  atmosphere: string;
  isDarkOrNight?: boolean;
}

// Alias for backwards compatibility
export type BedroomLightingOption = LightingOption;

export interface PropOption {
  id: string;
  name: string; // Engine value (English)
  description: string;
}

// Alias for backwards compatibility
export type BedroomPropOption = PropOption;

// Global Personal Options (independent from location)
export interface ClothingOption {
  id: string;
  name: string; // Engine value (English)
  category: 'saudi_traditional' | 'casual_modern' | 'streetwear' | 'home_loungewear';
  description: string;
}

export type BedroomClothingOption = ClothingOption;

export interface HairstyleOption {
  id: string;
  name: string; // Engine value (English)
  description: string;
}

export type BedroomHairstyleOption = HairstyleOption;

export interface ExpressionOption {
  id: string;
  name: string; // Engine value (English)
  description: string;
  microExpression: string;
}

export type BedroomExpressionOption = ExpressionOption;

export interface EyewearOption {
  id: string;
  name: string; // Engine value (English)
  description: string;
}

export type BedroomEyewearOption = EyewearOption;

export interface SaudiDetailOption {
  id: string;
  name: string; // Engine value (English)
  category: 'parking' | 'street' | 'service' | 'indoor' | 'lifestyle';
  description: string;
}

export type SaudiBedroomDetailOption = SaudiDetailOption;

export interface SceneState {
  zoneId: LocationId; // Keep zoneId property name for complete compatibility
  contextId: string;
  poseId: string;
  cameraId: string;
  lightingId: string;
  saudiDetailId: string;
  propId: string;
  // Global personal options
  clothingId: string;
  hairstyleId: string;
  expressionId: string;
  eyewearId?: string;
  // Micro-details
  includeDuvetTexture?: boolean;
  imperfectionLevel: 'candid_raw' | 'balanced_everyday';
}

export interface CompiledPromptResult {
  chatgpt: string;
  gemini: string;
  coherenceSummary: {
    zoneBrief: string;
    contextBrief: string;
    cameraBrief: string;
    lightingBrief: string;
    saudiDetailBrief: string;
    appearanceBrief: string;
    vehicleBrief?: string;
  };
}
