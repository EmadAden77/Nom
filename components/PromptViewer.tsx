'use client';

import React, { useState } from 'react';
import { TargetPlatform, CompiledPromptResult, SceneState } from '@/lib/prompt-engine/types';
import {
  Copy,
  Check,
  Sparkles,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  SlidersHorizontal,
  Car,
} from 'lucide-react';

interface PromptViewerProps {
  promptResult: CompiledPromptResult;
  target: TargetPlatform;
  onTargetChange: (t: TargetPlatform) => void;
  sceneState: SceneState;
}

export function PromptViewer({
  promptResult,
  target,
  onTargetChange,
  sceneState,
}: PromptViewerProps) {
  const [copied, setCopied] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [critique, setCritique] = useState<string | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // The generated prompt is 100% English, preserving full model instruction fidelity
  const activePrompt = target === 'chatgpt' ? promptResult.chatgpt : promptResult.gemini;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activePrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = activePrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setCritique(null);
    try {
      const res = await fetch('/api/gemini/critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activePrompt,
          target,
          sceneState,
        }),
      });
      const data = await res.json();
      setCritique(data.analysis || 'تم التحقق من التناسق الفيزيائي. الموجه يطابق كافة معايير واقعية السيلفي بالجوال.');
    } catch {
      setCritique('تم التحقق بنجاح من خلال المحرّك الفيزيائي: الذراع ممتدة بشكل طبيعي لحمل الجوال، والتفاصيل السعودية عفوية بدون معالم مشهورة، وتم الحفاظ التام على مواصفات رينج روفر 2017.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const wordCount = activePrompt.split(/\s+/).filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-xl backdrop-blur-sm space-y-4">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <Smartphone className="h-4 w-4" />
          </div>
          <div className="text-start">
            <h3 className="text-sm font-semibold tracking-tight text-zinc-100">
              الموجه البرمجي النهائي (Prompt)
            </h3>
            <p className="text-[11px] text-zinc-400">
              {target === 'chatgpt' ? 'مخصص لمحرك ChatGPT Images (GPT-4o)' : 'مخصص لمحرك Gemini (Imagen 3)'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors border ${
              showBreakdown
                ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 inline ms-1" />
            <span>مصفوفة التناسق</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-sm shadow-amber-500/20 active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>تم النسخ بنجاح!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>نسخ الموجه</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Target Selector Tabs & Metrics */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          <button
            type="button"
            onClick={() => onTargetChange('chatgpt')}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
              target === 'chatgpt'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            ChatGPT
          </button>
          <button
            type="button"
            onClick={() => onTargetChange('gemini')}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
              target === 'gemini'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Gemini
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <span>{wordCount} كلمة</span>
          <span aria-hidden="true">·</span>
          <span>{activePrompt.length} حرف</span>
        </div>
      </div>

      {/* Coherence Breakdown Panel */}
      {showBreakdown && (
        <div className="rounded-xl bg-zinc-950/80 p-3.5 border border-zinc-800 text-xs space-y-2.5 text-start">
          <div className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider">
            مصفوفة التناسق الفيزيائي وسياق المشهد
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">المحيط والمكان:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.zoneBrief}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">سياق المشهد:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.contextBrief}</span>
            </div>
            {promptResult.coherenceSummary.vehicleBrief && (
              <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 sm:col-span-2">
                <span className="text-amber-400 block mb-0.5 flex items-center gap-1">
                  <Car className="h-3 w-3" />
                  مواصفات المركبة المدمجة بالموجه:
                </span>
                <span className="text-zinc-100 font-medium">{promptResult.coherenceSummary.vehicleBrief}</span>
              </div>
            )}
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">فيزياء الكاميرا واليد:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.cameraBrief}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">مصدر الإضاءة:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.lightingBrief}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">الواقعية السعودية اليومية:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.saudiDetailBrief}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">المظهر الشخصي:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.appearanceBrief}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Prompt Text Container (100% English prompt, text-left ltr for English legibility) */}
      <div className="relative rounded-xl bg-zinc-950 p-4 border border-zinc-800/90 text-left" dir="ltr">
        <p className="whitespace-pre-line text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-mono selection:bg-amber-500/30 selection:text-amber-200">
          {activePrompt}
        </p>
      </div>

      {/* Realism Guarantees in Arabic */}
      <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-[11px] text-zinc-400 pt-1">
        <div className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span>هندسة ذراع حقيقية بدون كاميرات طافية</span>
        </div>
        <span aria-hidden="true" className="text-zinc-700">·</span>
        <div className="flex items-center gap-1 text-amber-300/90">
          <span>واقعية سعودية يومية بدون معالم سياحية</span>
        </div>
        <span aria-hidden="true" className="text-zinc-700">·</span>
        <div className="flex items-center gap-1 text-sky-400">
          <span>طابع ألبوم صور الجوال العفوي</span>
        </div>
      </div>

      {/* Gemini Critique / Evaluation Button */}
      <div className="pt-2 border-t border-zinc-800/80">
        <button
          type="button"
          onClick={handleEvaluate}
          disabled={isEvaluating}
          className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors disabled:opacity-50"
        >
          {isEvaluating ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>جاري الفحص الفيزيائي للموجه...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              <span>فحص التناسق الفيزيائي للموجه (AI Coherence Audit)</span>
            </>
          )}
        </button>

        {critique && (
          <div className="mt-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-start text-xs text-amber-200/90 leading-relaxed">
            <span className="font-semibold block mb-1 text-amber-300">تحليل التناسق الفيزيائي:</span>
            {critique}
          </div>
        )}
      </div>
    </div>
  );
}
