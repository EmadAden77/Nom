'use client';

import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  className?: string;
}

export function Tooltip({ content, className = '' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsVisible((v) => !v);
      }}
    >
      <span
        role="button"
        tabIndex={0}
        aria-label="معلومات إضافية"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
            e.preventDefault();
            setIsVisible((v) => !v);
          }
        }}
        className="text-zinc-500 hover:text-amber-400 p-0.5 rounded transition-colors focus:outline-none cursor-pointer inline-flex items-center"
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </span>

      {isVisible && (
        <span
          role="tooltip"
          className="absolute bottom-full mb-1.5 start-1/2 -translate-x-1/2 w-52 sm:w-60 p-2 text-[11px] leading-relaxed text-zinc-200 bg-zinc-900 border border-zinc-700/80 rounded-lg shadow-xl z-50 pointer-events-none text-start backdrop-blur-md font-sans"
        >
          {content}
          <span className="absolute top-full start-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
        </span>
      )}
    </span>
  );
}
