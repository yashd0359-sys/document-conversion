import React from 'react';
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface QuickPairProps {
  onSelectPair: (source: string, target: string) => void;
}

export function ConversionPairGuide({ onSelectPair }: QuickPairProps) {
  const pairs = [
    {
      source: 'PDF',
      target: 'Word (.docx)',
      sExt: 'pdf',
      tExt: 'docx',
      icon: FileText,
      badge: 'Two-way',
      desc: 'Preserves fonts & headings structure',
      color: 'from-rose-500/10 to-blue-500/10 border-blue-500/20 text-blue-400',
    },
    {
      source: 'PowerPoint (.pptx)',
      target: 'Word (.docx)',
      sExt: 'pptx',
      tExt: 'docx',
      icon: Presentation,
      badge: 'Two-way',
      desc: 'Converts slide titles & outlines',
      color: 'from-amber-500/10 to-blue-500/10 border-amber-500/20 text-amber-400',
    },
    {
      source: 'Excel (.xlsx)',
      target: 'PDF Document',
      sExt: 'xlsx',
      tExt: 'pdf',
      icon: FileSpreadsheet,
      badge: 'Two-way',
      desc: 'Table grid alignment with headers',
      color: 'from-emerald-500/10 to-rose-500/10 border-emerald-500/20 text-emerald-400',
    },
    {
      source: 'Image (PNG/JPG)',
      target: 'PDF Document',
      sExt: 'png',
      tExt: 'pdf',
      icon: ImageIcon,
      badge: 'Two-way',
      desc: 'Lossless vector embedding',
      color: 'from-purple-500/10 to-rose-500/10 border-purple-500/20 text-purple-400',
    },
    {
      source: 'PowerPoint (.pptx)',
      target: 'PDF Document',
      sExt: 'pptx',
      tExt: 'pdf',
      icon: Presentation,
      badge: 'Two-way',
      desc: '16:9 widescreen presentation sheets',
      color: 'from-orange-500/10 to-rose-500/10 border-orange-500/20 text-orange-400',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Sparkles size={16} className="text-blue-400" />
          Supported High-Fidelity Conversion Matrix
        </h3>
        <span className="text-xs text-slate-500 font-mono">100% Private & In-Memory</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {pairs.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border bg-gradient-to-b ${p.color} bg-slate-900/40 hover:bg-slate-800/40 transition-all duration-200 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {p.badge}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5 flex-wrap">
                  <span>{p.source}</span>
                  <ArrowRight size={11} className="text-slate-500" />
                  <span className="text-blue-300">{p.target}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
