import React from 'react';
import { SUPPORTED_TARGETS, FORMAT_INFO } from '@/lib/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FormatSelectorProps {
  sourceExt: string;
  selectedTarget: string;
  onSelectTarget: (target: string) => void;
  disabled?: boolean;
}

export function FormatSelector({
  sourceExt,
  selectedTarget,
  onSelectTarget,
  disabled = false,
}: FormatSelectorProps) {
  const allowed = SUPPORTED_TARGETS[sourceExt.toLowerCase()] || ['pdf'];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-medium flex items-center gap-1.5">
          Convert to target format:
        </span>
        <span className="text-[11px] text-slate-500">
          {allowed.length} option{allowed.length > 1 ? 's' : ''} available
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {allowed.map((target) => {
          const isSelected = selectedTarget === target;
          const info = FORMAT_INFO[target] || {
            ext: target,
            label: target.toUpperCase(),
            color: 'from-blue-500 to-indigo-500',
          };

          return (
            <button
              key={target}
              type="button"
              disabled={disabled}
              onClick={() => onSelectTarget(target)}
              className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isSelected ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-slate-600'
                }`}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider leading-none">
                  {target}
                </span>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">
                  {info.label.split(' ')[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
