import { SceneState, CompiledPromptResult } from './types';
import {
  getZoneById,
  getContextById,
  getPoseById,
  getCameraById,
  getLightingById,
  getPropById,
  getClothingById,
  getHairstyleById,
  getEyewearById,
  getSaudiDetailById,
  sanitizeExpression,
  isDarkOrNightLighting,
  isPitchDarkScreenGlow,
  isStandingPose,
} from './context-rules';
import { RANGE_ROVER_MY2017_SPEC } from './data';

/**
 * Builds the cohesive English prompt for ChatGPT Images.
 */
export function compileChatGPTImagesPrompt(state: SceneState): string {
  const zone = getZoneById(state.zoneId);
  const context = getContextById(state.contextId);
  const pose = getPoseById(state.poseId);
  const camera = getCameraById(state.cameraId);
  const lighting = getLightingById(state.lightingId);
  const prop = getPropById(state.propId);
  const clothing = getClothingById(state.clothingId);
  const hairstyle = getHairstyleById(state.hairstyleId);
  const eyewear = getEyewearById(state.eyewearId);
  const saudiDetail = getSaudiDetailById(state.saudiDetailId);

  const isPitchDark = isPitchDarkScreenGlow(state.lightingId);
  const isNight = isDarkOrNightLighting(state.lightingId);
  const sanitizedExp = sanitizeExpression(state.expressionId, state.lightingId);
  const isMirror = camera.isMirrorMode || pose.requiresMirror;
  const isStanding = isStandingPose(state.poseId);

  const parts: string[] = [];

  // 1. Photographic Style Opening
  if (isMirror) {
    parts.push(
      'An authentic, unedited everyday smartphone mirror selfie snapshot from a camera roll.'
    );
  } else {
    parts.push(
      'An authentic, unedited candid smartphone front-camera selfie snapshot from a personal camera roll.'
    );
  }

  // 2. Subject, Attire & Appearance
  const eyewearPhrase = eyewear.id !== 'eyewear_none' ? `, wearing ${eyewear.description}` : '';
  parts.push(
    `The subject is a handsome young Saudi man in his mid-20s featuring ${hairstyle.description}${eyewearPhrase}, dressed in ${clothing.description}.`
  );

  // 3. Facial Expression & Mood
  parts.push(
    `His facial expression shows ${sanitizedExp.description}, with ${sanitizedExp.microExpression}.`
  );

  // 4. Pose & Biomechanical Geometry
  if (isMirror) {
    parts.push(
      `Biomechanical mirror pose: ${pose.biomechanics} The smartphone is held clearly in his hand at chest level, aiming into the reflective surface with the device frame and rear camera module visible in the reflection.`
    );
  } else {
    parts.push(
      `Handheld selfie geometry: ${pose.biomechanics} Exactly one arm is extended forward holding the smartphone, capturing the natural perspective and subtle foreshortening of the holding arm in the corner of the frame. ${
        prop.id !== 'prop_none' ? `His free hand holds a ${prop.name} (${prop.description}).` : 'His free hand rests naturally and relaxed.'
      }`
    );
  }

  // 5. Vehicle Integration (2017 Range Rover Sport Autobiography Dynamic MY2017 Pre-facelift)
  if (context.isVehicleContext) {
    if (context.vehicleRole === 'inside_driver') {
      parts.push(
        `Vehicle Interior Context: Seated in the driver seat of an authentic Saudi-spec left-hand drive (LHD) ${RANGE_ROVER_MY2017_SPEC.model}. Behind him is the ${RANGE_ROVER_MY2017_SPEC.upholstery}. The cabin preserves the exact pre-facelift architecture: ${RANGE_ROVER_MY2017_SPEC.interiorArchitecture}, finished with ${RANGE_ROVER_MY2017_SPEC.trimVeneer}. Overhead, the ${RANGE_ROVER_MY2017_SPEC.roof}. On the visor clip, a ${RANGE_ROVER_MY2017_SPEC.saudiTouches}.`
      );
    } else if (context.vehicleRole === 'inside_passenger') {
      parts.push(
        `Vehicle Interior Context: Seated in the front passenger seat of an authentic Saudi-spec LHD ${RANGE_ROVER_MY2017_SPEC.model}, surrounded by ${RANGE_ROVER_MY2017_SPEC.upholstery}, Grand Black lacquer door accents, and soft natural daylight through the open panoramic glass roof.`
      );
    } else if (context.vehicleRole === 'beside_driver_door' || context.vehicleRole === 'door_open_standing') {
      parts.push(
        `Vehicle Exterior Interaction: Standing beside his ${RANGE_ROVER_MY2017_SPEC.model}, showing its ${RANGE_ROVER_MY2017_SPEC.exterior}. The pre-facelift body lines, glossy white panels, and black roof contrast sharply with the clean asphalt ground.`
      );
    } else if (context.vehicleRole === 'front_hood_lean') {
      parts.push(
        `Vehicle Exterior Interaction: Positioned near the front clamshell hood and distinctive pre-facelift round LED daytime running light rings of the Fuji White ${RANGE_ROVER_MY2017_SPEC.model}.`
      );
    } else {
      parts.push(
        `Vehicle in Background: A pristine Fuji White ${RANGE_ROVER_MY2017_SPEC.model} is parked naturally in the background among surrounding vehicles.`
      );
    }
  }

  // 6. Environment & Saudi Everyday Details (Local Authenticity Without Geographic Identifiability)
  if (isPitchDark) {
    parts.push(
      'Environment: Pitch dark indoor room with all ambient fixtures and windows switched off. The surrounding space falls into deep, honest shadows and total ambient blackness.'
    );
  } else {
    parts.push(
      `Setting & Saudi Everyday Life: Located in an authentic everyday Saudi environment (${zone.name}) with zero tourist landmarks. Background features: ${saudiDetail.description}. Nearby surroundings include ${zone.environmentDetails.join(', ')}.`
    );
  }

  // 7. Lighting Atmosphere
  if (isPitchDark) {
    parts.push(
      'Lighting: The exclusive light source is the cool blue-white screen luminescence (6000K) emitted directly from the smartphone held in front of his face, creating authentic high-contrast falloff, soft facial highlights, and natural digital sensor luminance noise in dark background shadows.'
    );
  } else {
    parts.push(
      `Lighting & Atmosphere: ${lighting.name} (${lighting.timeOfDay}). ${lighting.lightSource} ${lighting.shadowDescription} ${lighting.atmosphere}`
    );
  }

  // 8. Smartphone Camera Optics & Raw Image Characteristics
  parts.push(
    `Camera & Optics: Handheld mobile smartphone camera (24mm equivalent wide-angle lens, f/1.9 aperture), captured from ${camera.name}. Perspective: ${camera.perspective}. Realistic smartphone imaging characteristics: natural skin pores, un-retouched facial texture, realistic dynamic range, natural edge sharpness without artificial HDR halos, and zero studio artificiality.`
  );

  return parts.join(' ');
}

/**
 * Builds the structured prompt for Gemini.
 */
export function compileGeminiPrompt(state: SceneState): string {
  const zone = getZoneById(state.zoneId);
  const context = getContextById(state.contextId);
  const pose = getPoseById(state.poseId);
  const camera = getCameraById(state.cameraId);
  const lighting = getLightingById(state.lightingId);
  const prop = getPropById(state.propId);
  const clothing = getClothingById(state.clothingId);
  const hairstyle = getHairstyleById(state.hairstyleId);
  const eyewear = getEyewearById(state.eyewearId);
  const saudiDetail = getSaudiDetailById(state.saudiDetailId);

  const isPitchDark = isPitchDarkScreenGlow(state.lightingId);
  const sanitizedExp = sanitizeExpression(state.expressionId, state.lightingId);
  const isMirror = camera.isMirrorMode || pose.requiresMirror;

  const vehicleSection = context.isVehicleContext
    ? `\n- Vehicle Specification: 2017 Range Rover Sport Autobiography Dynamic (L494 pre-facelift, Saudi-spec LHD).
  * Exterior: Fuji White, Santorini Black floating roof, 21-inch diamond-turned split-spoke alloys, red Brembo brake calipers.
  * Interior Architecture: Single 10.2-inch InControl Touch Pro center display (pre-facelift single screen, NOT dual screens), physical rotary climate control dials with integrated digital centers, Grand Black piano lacquer veneer, Ivory perforated leather sports seats with Autobiography embossing, panoramic glass roof with open sunblind.
  * Role: ${context.name}.`
    : '';

  const environmentSection = isPitchDark
    ? `- Environment: Pitch dark indoor room in total blackness, complete absence of exterior ambient lamps or window illumination.`
    : `- Environment & Everyday Saudi Context: ${zone.name} (Saudi Arabia everyday setting, strictly non-iconic and unidentifiable).
  * Specific Everyday Cues: ${saudiDetail.description}.
  * Surrounding Details: ${zone.environmentDetails.slice(0, 3).join('; ')}.`;

  const lightingSection = isPitchDark
    ? `- Lighting: Pitch black room illuminated exclusively by the cool blue-white screen glow from the handheld smartphone (6000K), casting soft directional light onto the face with deep drop-off into shadows.`
    : `- Lighting: ${lighting.name} (${lighting.timeOfDay}). ${lighting.lightSource} ${lighting.atmosphere}`;

  const cameraSection = isMirror
    ? `- Camera Perspective: Mirror reflection capture. Smartphone clearly visible in hand reflecting in the mirror surface, true physical reflection geometry.`
    : `- Camera Perspective: Handheld smartphone front camera (24mm wide-angle equivalent, f/1.9 aperture). Natural arm-length perspective with one extended arm foreshortened in the corner. Exactly one hand holds the phone; no floating camera angles.`;

  return `[Realistic Smartphone Selfie Prompt - Authentic Saudi Everyday Life]

- Shot Type: Candid handheld smartphone selfie from personal mobile photo gallery.
- Subject: Mid-20s handsome Saudi man.
  * Hairstyle & Grooming: ${hairstyle.description}.
  * Attire: ${clothing.description}${eyewear.id !== 'eyewear_none' ? `, wearing ${eyewear.description}` : ''}.
  * Expression: ${sanitizedExp.description}. ${sanitizedExp.microExpression}.
- Biomechanics & Posture: ${pose.biomechanics}
  * Spatial Relationship: ${pose.spatialLocation}.
  * Hand Interactions: ${
    isMirror
      ? 'Dominant hand gripping phone aimed into mirror; opposite hand relaxed.'
      : `Single hand holding smartphone forward; free hand ${prop.id !== 'prop_none' ? `holding ${prop.name}` : 'resting naturally'}.`
  }${vehicleSection}
${environmentSection}
${lightingSection}
${cameraSection}
- Photographic Realism: Authentic smartphone sensor rendition, unedited 24mm perspective, genuine skin texture with visible pores and natural micro-imperfections, zero beautification filters, realistic low-light noise characteristics, believable everyday Saudi snapshot.`;
}

/**
 * Compiles both prompts and produces the live coherence summary.
 */
export function compilePrompt(state: SceneState): CompiledPromptResult {
  const zone = getZoneById(state.zoneId);
  const context = getContextById(state.contextId);
  const camera = getCameraById(state.cameraId);
  const lighting = getLightingById(state.lightingId);
  const saudiDetail = getSaudiDetailById(state.saudiDetailId);
  const clothing = getClothingById(state.clothingId);

  return {
    chatgpt: compileChatGPTImagesPrompt(state),
    gemini: compileGeminiPrompt(state),
    coherenceSummary: {
      zoneBrief: zone.name,
      contextBrief: context.name,
      cameraBrief: camera.name,
      lightingBrief: lighting.name,
      saudiDetailBrief: saudiDetail.name,
      appearanceBrief: clothing.name,
      vehicleBrief: context.isVehicleContext
        ? '2017 Range Rover Sport Autobiography Dynamic (L494 pre-facelift Saudi-spec)'
        : undefined,
    },
  };
}
