import React from 'react';
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  FileCode,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface FileBadgeProps {
  format: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FileBadge({ format, size = 'md', className = '' }: FileBadgeProps) {
  const f = format.toLowerCase().replace('.', '');

  let bg = 'bg-slate-800 text-slate-300 border-slate-700';
  let Icon = FileText;

  if (f === 'pdf') {
    bg = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    Icon = FileText;
  } else if (f === 'docx' || f === 'doc') {
    bg = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    Icon = FileText;
  } else if (f === 'pptx' || f === 'ppt') {
    bg = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    Icon = Presentation;
  } else if (f === 'xlsx' || f === 'xls') {
    bg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    Icon = FileSpreadsheet;
  } else if (['png', 'jpg', 'jpeg', 'webp'].includes(f)) {
    bg = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    Icon = ImageIcon;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border uppercase tracking-wider ${bg} ${sizeClasses[size]} ${className}`}
    >
      <Icon size={iconSizes[size]} />
      {f}
    </span>
  );
}

export function StatusIndicator({ status }: { status: 'idle' | 'uploading' | 'converting' | 'completed' | 'error' }) {
  switch (status) {
    case 'uploading':
      return (
        <span className="flex items-center gap-1.5 text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
          <Loader2 size={12} className="animate-spin" />
          Uploading
        </span>
      );
    case 'converting':
      return (
        <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
          <Loader2 size={12} className="animate-spin" />
          Converting
        </span>
      );
    case 'completed':
      return (
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <CheckCircle2 size={12} />
          Ready
        </span>
      );
    case 'error':
      return (
        <span className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
          <AlertTriangle size={12} />
          Failed
        </span>
      );
    default:
      return (
        <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
          <Clock size={12} />
          Queued
        </span>
      );
  }
}
