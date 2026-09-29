import {
  LocationId,
  SceneState,
  LocationOption,
  ContextOption,
  PoseOption,
  CameraOption,
  LightingOption,
  PropOption,
  ClothingOption,
  HairstyleOption,
  ExpressionOption,
  EyewearOption,
  SaudiDetailOption,
} from './types';
import {
  BEDROOM_ZONES,
  BEDROOM_CONTEXTS,
  BEDROOM_POSES,
  BEDROOM_CAMERAS,
  BEDROOM_LIGHTING,
  BEDROOM_PROPS,
  BEDROOM_CLOTHING,
  BEDROOM_HAIRSTYLES,
  BEDROOM_EXPRESSIONS,
  BEDROOM_EYEWEAR,
  SAUDI_BEDROOM_DETAILS,
} from './data';

export const INITIAL_SCENE_STATE: SceneState = {
  zoneId: 'shaded_parking',
  contextId: 'rr_beside_driver_door',
  poseId: 'standing_car_door_lean',
  cameraId: 'front_camera_eye_level',
  lightingId: 'saudi_afternoon_warm',
  saudiDetailId: 'detail_parking_fabric_shades',
  propId: 'prop_none',
  clothingId: 'clothing_saudi_thobe_crisp',
  hairstyleId: 'hair_low_taper_fade',
  expressionId: 'exp_relaxed_candid_smile',
  eyewearId: 'eyewear_none',
  includeDuvetTexture: false,
  imperfectionLevel: 'candid_raw',
};

// Safe lookups with fallback
export function getZoneById(id: string): LocationOption {
  return BEDROOM_ZONES.find((z) => z.id === id) || BEDROOM_ZONES[0];
}
export const getLocationById = getZoneById;

export function getContextById(id: string): ContextOption {
  return BEDROOM_CONTEXTS.find((c) => c.id === id) || BEDROOM_CONTEXTS[0];
}

export function getPoseById(id: string): PoseOption {
  return BEDROOM_POSES.find((p) => p.id === id) || BEDROOM_POSES[0];
}

export function getCameraById(id: string): CameraOption {
  return BEDROOM_CAMERAS.find((c) => c.id === id) || BEDROOM_CAMERAS[0];
}

export function getLightingById(id: string): LightingOption {
  return BEDROOM_LIGHTING.find((l) => l.id === id) || BEDROOM_LIGHTING[0];
}

export function getPropById(id: string): PropOption {
  return BEDROOM_PROPS.find((p) => p.id === id) || BEDROOM_PROPS[0];
}

export function getClothingById(id: string): ClothingOption {
  return BEDROOM_CLOTHING.find((c) => c.id === id) || BEDROOM_CLOTHING[0];
}

export function getHairstyleById(id: string): HairstyleOption {
  return BEDROOM_HAIRSTYLES.find((h) => h.id === id) || BEDROOM_HAIRSTYLES[0];
}

export function getExpressionById(id: string): ExpressionOption {
  return BEDROOM_EXPRESSIONS.find((e) => e.id === id) || BEDROOM_EXPRESSIONS[0];
}

export function getEyewearById(id: string | undefined): EyewearOption {
  if (!id) return BEDROOM_EYEWEAR[0];
  return BEDROOM_EYEWEAR.find((e) => e.id === id) || BEDROOM_EYEWEAR[0];
}

export function getSaudiDetailById(id: string): SaudiDetailOption {
  return SAUDI_BEDROOM_DETAILS.find((d) => d.id === id) || SAUDI_BEDROOM_DETAILS[0];
}

// Lighting helpers
export function isDarkOrNightLighting(lightingId: string): boolean {
  return (
    lightingId === 'pitch_dark_screen_glow' ||
    lightingId === 'saudi_night_streetlights' ||
    lightingId === 'gas_station_canopy_light' ||
    lightingId === 'car_interior_ambient' ||
    lightingId === 'warm_nightstand_lamp'
  );
}

export function isPitchDarkScreenGlow(lightingId: string): boolean {
  return lightingId === 'pitch_dark_screen_glow';
}

export function isStandingPose(poseId: string): boolean {
  const pose = getPoseById(poseId);
  return pose.postureType === 'standing' || pose.postureType === 'walking';
}

/**
 * Sanitizes expressions based on active lighting to avoid morning/night contradictions
 * and strips any hardcoded spatial assumptions.
 */
export function sanitizeExpression(
  expId: string,
  lightingId: string
): { name: string; description: string; microExpression: string } {
  const exp = getExpressionById(expId);
  let name = exp.name;
  let description = exp.description;
  let micro = exp.microExpression;

  const dark = isDarkOrNightLighting(lightingId);

  // If night/dark, neutralize daytime/morning wording
  if (dark) {
    name = name.replace(/\bmorning\b/gi, 'candid').replace(/\bdaylight\b/gi, 'ambient');
    description = description
      .replace(/\bmorning contentment\b/gi, 'calm contentment')
      .replace(/\bmorning\b/gi, 'natural')
      .replace(/\bdaylight\b/gi, 'ambient lighting');
  }

  // Strip any accidental spatial assumptions
  description = description
    .replace(/\bin bed\b/gi, '')
    .replace(/\bon the mattress\b/gi, '')
    .replace(/\bwhile sitting\b/gi, '')
    .replace(/\bwhile lying down\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  return { name, description, microExpression: micro };
}

// Contextual filtering logic
export function getAvailableContexts(zoneId: LocationId): ContextOption[] {
  const zone = getZoneById(zoneId);
  return BEDROOM_CONTEXTS.filter(
    (c) => zone.supportedContextIds.includes(c.id) || c.allowedZoneIds.includes(zoneId)
  );
}

export function getAvailablePoses(contextId: string): PoseOption[] {
  const context = getContextById(contextId);
  return BEDROOM_POSES.filter((p) => context.allowedPoseIds.includes(p.id));
}

export function getAvailableCameras(contextId: string): CameraOption[] {
  const context = getContextById(contextId);
  return BEDROOM_CAMERAS.filter((c) => context.allowedCameraIds.includes(c.id));
}

export function getAvailableLighting(contextId: string, zoneId?: LocationId): LightingOption[] {
  const context = getContextById(contextId);
  if (context.allowedLightingIds && context.allowedLightingIds.length > 0) {
    return BEDROOM_LIGHTING.filter((l) => context.allowedLightingIds!.includes(l.id));
  }
  // Otherwise filter indoor vs outdoor lighting
  const isIndoor = zoneId && (zoneId.startsWith('bedroom') || zoneId === 'on_the_bed' || zoneId === 'elevator_mirror');
  if (isIndoor) {
    return BEDROOM_LIGHTING.filter((l) =>
      ['warm_nightstand_lamp', 'overhead_room_light', 'natural_window_daylight', 'bright_morning_daylight', 'pitch_dark_screen_glow'].includes(l.id)
    );
  }
  return BEDROOM_LIGHTING.filter((l) => l.id !== 'warm_nightstand_lamp' && l.id !== 'pitch_dark_screen_glow');
}

export function getAvailableProps(contextId?: string): PropOption[] {
  if (!contextId) return BEDROOM_PROPS;
  const context = getContextById(contextId);
  if (context.allowedPropIds && context.allowedPropIds.length > 0) {
    return BEDROOM_PROPS.filter((p) => context.allowedPropIds.includes(p.id));
  }
  return BEDROOM_PROPS;
}

export function getAvailableSaudiDetails(zoneId?: LocationId): SaudiDetailOption[] {
  if (!zoneId) return SAUDI_BEDROOM_DETAILS;
  const isIndoor = zoneId.startsWith('bedroom') || zoneId === 'on_the_bed' || zoneId === 'elevator_mirror';
  if (isIndoor) {
    return SAUDI_BEDROOM_DETAILS.filter((d) => d.category === 'indoor');
  }
  if (zoneId === 'shaded_parking' || zoneId === 'open_parking') {
    return SAUDI_BEDROOM_DETAILS.filter((d) => d.category === 'parking' || d.category === 'street');
  }
  if (zoneId === 'gas_station') {
    return SAUDI_BEDROOM_DETAILS.filter((d) => d.category === 'service' || d.category === 'street');
  }
  if (zoneId === 'outdoor_cafe' || zoneId === 'commercial_walkway') {
    return SAUDI_BEDROOM_DETAILS.filter((d) => d.category === 'lifestyle' || d.category === 'street');
  }
  return SAUDI_BEDROOM_DETAILS.filter((d) => d.category !== 'indoor');
}

/**
 * Enforces strict physical consistency when switching Location.
 * Resets context, pose, camera, and Saudi details appropriately.
 */
export function sanitizeSceneStateOnZoneChange(
  state: SceneState,
  newZoneId: LocationId
): SceneState {
  const zone = getZoneById(newZoneId);
  const availableContexts = getAvailableContexts(newZoneId);
  
  let newContextId = state.contextId;
  const isCurrentContextAllowed = availableContexts.some((c) => c.id === state.contextId);
  if (!isCurrentContextAllowed) {
    newContextId = zone.defaultContextId || availableContexts[0]?.id || 'outdoor_standing_shade';
  }

  const context = getContextById(newContextId);

  // Validate Pose
  let newPoseId = state.poseId;
  if (!context.allowedPoseIds.includes(newPoseId)) {
    newPoseId = context.defaultPoseId || context.allowedPoseIds[0] || 'mid_stride_casual_walk';
  }

  // Validate Camera
  let newCameraId = state.cameraId;
  if (!context.allowedCameraIds.includes(newCameraId)) {
    newCameraId = context.defaultCameraId || context.allowedCameraIds[0] || 'front_camera_eye_level';
  }

  // Validate Lighting
  let newLightingId = state.lightingId;
  const availableLight = getAvailableLighting(newContextId, newZoneId);
  if (!availableLight.some((l) => l.id === newLightingId)) {
    newLightingId = zone.defaultLightingId || availableLight[0]?.id || 'saudi_afternoon_warm';
  }

  // Validate Saudi Detail
  let newSaudiDetailId = state.saudiDetailId;
  const availableDetails = getAvailableSaudiDetails(newZoneId);
  if (!availableDetails.some((d) => d.id === newSaudiDetailId)) {
    newSaudiDetailId = availableDetails[0]?.id || 'detail_parking_fabric_shades';
  }

  return {
    ...state,
    zoneId: newZoneId,
    contextId: newContextId,
    poseId: newPoseId,
    cameraId: newCameraId,
    lightingId: newLightingId,
    saudiDetailId: newSaudiDetailId,
  };
}

/**
 * Enforces consistency when Context changes within a Location.
 */
export function sanitizeSceneStateOnContextChange(
  state: SceneState,
  newContextId: string
): SceneState {
  const context = getContextById(newContextId);

  // Validate Pose
  let newPoseId = state.poseId;
  if (!context.allowedPoseIds.includes(newPoseId)) {
    newPoseId = context.defaultPoseId || context.allowedPoseIds[0];
  }

  // Validate Camera
  let newCameraId = state.cameraId;
  if (!context.allowedCameraIds.includes(newCameraId)) {
    newCameraId = context.defaultCameraId || context.allowedCameraIds[0];
  }

  // Validate Lighting
  let newLightingId = state.lightingId;
  const availableLight = getAvailableLighting(newContextId, state.zoneId);
  if (!availableLight.some((l) => l.id === newLightingId)) {
    newLightingId = availableLight[0]?.id || 'saudi_afternoon_warm';
  }

  return {
    ...state,
    contextId: newContextId,
    poseId: newPoseId,
    cameraId: newCameraId,
    lightingId: newLightingId,
  };
}

/**
 * Enforces consistency when Pose changes.
 */
export function sanitizeSceneStateOnPoseChange(
  state: SceneState,
  newPoseId: string
): SceneState {
  const pose = getPoseById(newPoseId);

  let newCameraId = state.cameraId;
  // If pose requires mirror, enforce mirror camera
  if (pose.requiresMirror) {
    newCameraId = 'mirror_selfie_handheld';
  } else if (newCameraId === 'mirror_selfie_handheld') {
    newCameraId = 'front_camera_eye_level';
  }

  return {
    ...state,
    poseId: newPoseId,
    cameraId: newCameraId,
  };
}
