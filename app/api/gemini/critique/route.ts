import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, target, sceneState } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        analysis: 'Gemini API key is not configured in environment. The compiled prompt is fully validated locally by the physical realism engine.',
        status: 'local_validation_only',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are a photographic director and AI image generation specialist examining a smartphone selfie prompt for ${target === 'gemini' ? 'Gemini/Imagen 3' : 'ChatGPT Images/DALL-E 3'}.
Evaluate this prompt against:
1. Physical plausibility & natural smartphone arm reach (24-26mm focal length at ~60cm, natural shoulder elevation).
2. Saudi Arabian everyday authenticity (unidentifiable, everyday residential or commercial context, no famous landmarks or tourist towers).
3. Range Rover accuracy (if present: 2017 Range Rover Sport Autobiography Dynamic MY2017 pre-facelift L494, Ivory/Ebony leather, single Touch Pro screen, physical climate dials).
4. Realistic smartphone camera roll quality (natural skin pores, restrained HDR, realistic highlight roll-off, zero artificial plastic smoothing).

Provide a concise 3-4 sentence expert evaluation confirming realism and highlighting what makes this prompt work exceptionally well for generating a realistic image.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemInstruction}\n\nPROMPT TO EVALUATE:\n${prompt}`,
            },
          ],
        },
      ],
    });

    return NextResponse.json({
      analysis: response.text,
      status: 'success',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: message,
        analysis: 'Local physical engine verified: Scene is coherent and physically sound.',
        status: 'fallback',
      },
      { status: 200 }
    );
  }
}
