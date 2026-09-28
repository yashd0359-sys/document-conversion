import React, { useState } from 'react';
import {
  FileText,
  FileCheck2,
  DownloadCloud,
  Layers,
  ArrowRightLeft,
  ShieldCheck,
  Check,
  Copy,
  Terminal,
  Code2,
} from 'lucide-react';

export function ArchitectureDocsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyArchitecture = () => {
    const text = `
=== Complete Document Conversion Architecture ===
1. Frontend (Next.js App Router + Tailwind + React 19)
   - Multi-file Drag & Drop Zone with binary size & MIME validation.
   - Dynamic 3-stage progress feedback (Uploading -> Converting -> Download).
   - Reactive format matrix mapper (Supported target pairs per extension).

2. Backend Conversion Engines (Node.js & Native Processing):
   - PDF -> DOCX: Native binary parsing + Structured Docx Paragraph/Table engine (docx).
   - DOCX -> PDF: OOXML extraction + standard font rendering via pdf-lib.
   - PPTX -> DOCX: OpenXML slide parser + structured headings/bullet list generator.
   - DOCX -> PPTX: Structural XML slides packager with DrawingML definitions.
   - XLSX -> PDF: Openpyxl/SheetJS cell coordinate renderer + Landscape grid via pdf-lib.
   - PDF -> XLSX: Stream extraction + tabular row/cell assembler.
   - Image -> PDF: Sharp high-res bitmap normalizing + pdf-lib JPEG stream injector.
   - PPTX -> PDF: Slide-by-slide 16:9 widescreen canvas rendering.

3. Heavy Scale Options (Affordable Cloud APIs & Microservices):
   - CloudConvert API: Asynchronous webhook-driven conversions for massive 500MB+ CAD/Office files.
   - ConvertAPI: Sub-second high-density batch conversion tokens.
   - Self-hosted LibreOffice headless / Gotenberg container microservice for exact print-engine fidelity.

4. Database Persistence (PostgreSQL + Drizzle ORM):
   - Real-time logging of conversion jobs, formats, durations, and download keys.
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Code2 size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Full-Stack Architecture & API Integration</h3>
              <p className="text-xs text-slate-400">Technical specifications, libraries, and cloud API scaling guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2.5 py-1 text-sm rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
          {/* Section 1 */}
          <section className="space-y-2">
            <h4 className="font-semibold text-white flex items-center gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-mono">1</span>
              Folder & Architecture Structure
            </h4>
            <div className="p-3.5 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 border border-slate-800 leading-relaxed overflow-x-auto">
              ├── src/<br />
              │   ├── app/                      # Next.js App Router (Full-Stack)<br />
              │   │   ├── api/convert/route.ts  # Multipart upload & conversion dispatcher<br />
              │   │   ├── api/download/[key]/   # Streamed file download delivery<br />
              │   │   ├── api/jobs/route.ts     # PostgreSQL persisted job history<br />
              │   │   ├── page.tsx              # Dark-themed dashboard & main workspace<br />
              │   │   └── globals.css           # Modern Tailwind styling<br />
              │   ├── components/               # Modular UI Components<br />
              │   │   ├── DropZone.tsx          # Multi-file drag-and-drop zone<br />
              │   │   ├── FileListCard.tsx      # File card with inline format selector<br />
              │   │   ├── ConversionProgressBar.tsx # 3-stage visual progress pipeline<br />
              │   │   ├── FormatSelector.tsx    # Format matrix selector<br />
              │   │   └── FileBadge.tsx         # Visual anchors for file types<br />
              │   ├── db/                       # PostgreSQL client + Drizzle schema<br />
              │   │   └── schema.ts             # conversionJobs table schema<br />
              │   └── lib/<br />
              │       ├── converter.ts          # Core Conversion Engines (docx, pdf-lib, xlsx, sharp)<br />
              │       └── types.ts              # Format matrix & size validation limits
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h4 className="font-semibold text-white flex items-center gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-mono">2</span>
              Recommended Libraries & Cloud APIs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <div className="font-semibold text-blue-300 mb-1">In-Process / Self-Hosted Engines</div>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li><strong>pdf-lib:</strong> Zero-dependency PDF manipulation & vector drawing.</li>
                  <li><strong>docx:</strong> Full OpenXML DOCX document generation.</li>
                  <li><strong>xlsx (SheetJS):</strong> High-speed spreadsheet parsing and styling.</li>
                  <li><strong>sharp:</strong> Libvips accelerated image processing.</li>
                  <li><strong>Gotenberg:</strong> Dockerized headless Chromium + LibreOffice cluster for pixel-perfect printing.</li>
                </ul>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <div className="font-semibold text-emerald-300 mb-1">Affordable Cloud APIs (Heavy workloads)</div>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li><strong>CloudConvert:</strong> $8.00 / 1,000 conversion credits with webhook streaming.</li>
                  <li><strong>ConvertAPI:</strong> High-throughput REST API with 200+ format pairs.</li>
                  <li><strong>AWS Lambda + Docker:</strong> Serverless LibreOffice wrapper triggered on S3 PutObject.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h4 className="font-semibold text-white flex items-center gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-mono">3</span>
              Security & Error Handling Safeguards
            </h4>
            <div className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-1.5 text-xs text-slate-300">
              <p>• <strong>Strict Payload Limits:</strong> Max file size cap (50MB) enforced before memory buffering.</p>
              <p>• <strong>MIME & Magic-byte validation:</strong> Validates extension against supported matrix before dispatch.</p>
              <p>• <strong>Automatic In-Memory File Eviction:</strong> Downloaded keys expire automatically after 2 hours to conserve server RAM.</p>
              <p>• <strong>Postgres Audit Logs:</strong> Tracks conversion performance, timing (ms), and failure reasons for proactive debugging.</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <span className="text-xs text-slate-500">Document Conversion Engine Specification v2.4</span>
          <button
            onClick={handleCopyArchitecture}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied to Clipboard' : 'Copy Spec'}
          </button>
        </div>
      </div>
    </div>
  );
}
