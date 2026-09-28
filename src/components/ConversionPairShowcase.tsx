import React from 'react';
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRightLeft,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export function ConversionPairShowcase() {
  const categories = [
    {
      title: 'Word & PDF Documents',
      badge: 'High Precision',
      desc: 'Seamless two-way translation preserving hierarchy, fonts, and inline styles.',
      pairs: [
        { from: 'PDF', to: 'Word (.docx)', note: 'Extracts paragraph flow & headers into docx' },
        { from: 'Word (.docx)', to: 'PDF', note: 'Generates print-ready standard PDF with Helvetica typography' },
      ],
      icon: FileText,
      color: 'border-blue-500/20 bg-blue-500/5',
      accent: 'text-blue-400',
    },
    {
      title: 'Presentations & Slides',
      badge: 'Vector Layouts',
      desc: 'Structural parsing of slide decks, titles, bullet lists, and widescreen canvases.',
      pairs: [
        { from: 'PPT / PPTX', to: 'Word (.docx)', note: 'Transforms slides to structured executive document' },
        { from: 'Word (.docx)', to: 'PPT / PPTX', note: 'Synthesizes presentation decks from document paragraphs' },
        { from: 'PPT / PPTX', to: 'PDF', note: 'Exports 16:9 widescreen presentation sheets' },
        { from: 'PDF', to: 'PPT / PPTX', note: 'Splits pages into editable presentation slides' },
      ],
      icon: Presentation,
      color: 'border-amber-500/20 bg-amber-500/5',
      accent: 'text-amber-400',
    },
    {
      title: 'Spreadsheets & Tables',
      badge: 'Coordinate Grids',
      desc: 'Cell-level data parsing and responsive landscape PDF grid rendering.',
      pairs: [
        { from: 'Excel (.xlsx)', to: 'PDF', note: 'Landscape table rendering with auto-column wrapping' },
        { from: 'PDF', to: 'Excel (.xlsx)', note: 'Extracts tabular records into native worksheet columns' },
      ],
      icon: FileSpreadsheet,
      color: 'border-emerald-500/20 bg-emerald-500/5',
      accent: 'text-emerald-400',
    },
    {
      title: 'Graphics & Images',
      badge: 'Lossless Sharp Engine',
      desc: 'Rapid rasterizing, bitmap embedding, and document snapshot rendering.',
      pairs: [
        { from: 'Image (PNG/JPG)', to: 'PDF', note: 'Lossless JPEG/PNG embed with original aspect ratio' },
        { from: 'PDF', to: 'Image (PNG)', note: 'Generates clean raster preview snapshots' },
      ],
      icon: ImageIcon,
      color: 'border-purple-500/20 bg-purple-500/5',
      accent: 'text-purple-400',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <Cpu size={16} className="text-blue-400" />
            Conversion Feature Capabilities & Specification
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Preserving formatting, fonts, layouts, and tabular data across all required pairs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl border p-5 bg-slate-900/60 transition-all duration-200 hover:border-slate-700 flex flex-col justify-between ${cat.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-slate-800 ${cat.accent}`}>
                      <Icon size={16} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">{cat.title}</h4>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                    {cat.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">{cat.desc}</p>

                <div className="space-y-2">
                  {cat.pairs.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                    >
                      <div className="flex items-center gap-2 font-medium text-slate-200">
                        <span className="text-white font-mono">{p.from}</span>
                        <ArrowRightLeft size={11} className="text-slate-500" />
                        <span className={cat.accent + ' font-mono'}>{p.to}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-sans">{p.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
