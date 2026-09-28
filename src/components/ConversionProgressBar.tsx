import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

interface ConversionProgressBarProps {
  status: 'idle' | 'uploading' | 'converting' | 'completed' | 'error';
  progress: number;
}

export function ConversionProgressBar({ status, progress }: ConversionProgressBarProps) {
  const steps = [
    { id: 'uploading', label: '1. Uploading' },
    { id: 'converting', label: '2. Converting' },
    { id: 'completed', label: '3. Ready to Download' },
  ];

  const getStepState = (stepId: string) => {
    if (status === 'error') return 'error';
    if (stepId === 'uploading') {
      if (status === 'uploading') return 'active';
      if (['converting', 'completed'].includes(status)) return 'done';
    }
    if (stepId === 'converting') {
      if (status === 'converting') return 'active';
      if (status === 'completed') return 'done';
    }
    if (stepId === 'completed') {
      if (status === 'completed') return 'done';
    }
    return 'pending';
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-medium">
        {steps.map((step, index) => {
          const state = getStepState(step.id);
          return (
            <div key={step.id} className="flex items-center gap-1.5">
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                  state === 'done'
                    ? 'bg-emerald-500 text-black shadow-sm shadow-emerald-500/50'
                    : state === 'active'
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400/40 animate-pulse'
                    : state === 'error'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {state === 'done' ? <Check size={11} strokeWidth={3} /> : index + 1}
              </span>
              <span
                className={`transition-colors duration-200 ${
                  state === 'done'
                    ? 'text-emerald-400'
                    : state === 'active'
                    ? 'text-blue-300 font-semibold'
                    : state === 'error'
                    ? 'text-rose-400'
                    : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <ChevronRight size={14} className="text-slate-700 mx-1 hidden sm:inline-block" />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress line */}
      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            status === 'error'
              ? 'bg-rose-500 w-full'
              : status === 'completed'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 w-full shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              : status === 'converting'
              ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-pulse'
              : 'bg-blue-500'
          }`}
          style={{
            width:
              status === 'completed'
                ? '100%'
                : status === 'converting'
                ? '75%'
                : status === 'uploading'
                ? `${Math.max(progress, 30)}%`
                : '0%',
          }}
        />
      </div>
    </div>
  );
}
