'use client';

import React, { useState, useCallback } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BookOpen,
  Layers,
  CheckCircle2,
  Cpu,
  Download,
  Trash2,
  RefreshCw,
  FolderSync,
  Play,
  Sliders,
} from 'lucide-react';
import { DropZone } from '@/components/DropZone';
import { FileListCard, FileItem } from '@/components/FileListCard';
import { ConversionPairGuide } from '@/components/ConversionPairGuide';
import { ConversionPairShowcase } from '@/components/ConversionPairShowcase';
import { ArchitectureDocsModal } from '@/components/ArchitectureDocsModal';
import { ConversionHistory } from '@/components/ConversionHistory';
import { SUPPORTED_TARGETS } from '@/lib/types';

export default function DocumentConverterDashboard() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'workspace' | 'capabilities' | 'history'>('workspace');
  const [isConvertingAll, setIsConvertingAll] = useState(false);

  // Handle files added via Drag & Drop or File Input
  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    const newItems: FileItem[] = selectedFiles.map((file) => {
      const parts = file.name.split('.');
      const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : 'pdf';
      const availableTargets = SUPPORTED_TARGETS[ext] || ['pdf'];

      return {
        id: Math.random().toString(36).substring(2, 11),
        file,
        name: file.name,
        size: file.size,
        sourceFormat: ext,
        targetFormat: availableTargets[0] || 'pdf',
        status: 'idle',
        progress: 0,
      };
    });

    setFiles((prev) => [...prev, ...newItems]);
  }, []);

  const handleTargetChange = (id: string, target: string) => {
    setFiles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, targetFormat: target } : item))
    );
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  // Convert a single file item
  const convertSingleFile = async (id: string) => {
    const item = files.find((f) => f.id === id);
    if (!item) return;

    // Step 1: Uploading state
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'uploading', progress: 35, errorMessage: undefined } : f))
    );

    const formData = new FormData();
    formData.append('file', item.file);
    formData.append('targetFormat', item.targetFormat);

    try {
      // Step 2: Converting state simulation while waiting for server response
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) => (f.id === id && f.status === 'uploading' ? { ...f, status: 'converting', progress: 75 } : f))
        );
      }, 400);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Conversion failed on server.');
      }

      // Step 3: Ready to Download state
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                status: 'completed',
                progress: 100,
                downloadUrl: data.downloadUrl,
                convertedSize: data.convertedSize,
                durationMs: data.durationMs,
              }
            : f
        )
      );
    } catch (err: any) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                status: 'error',
                progress: 0,
                errorMessage: err.message || 'An error occurred during conversion.',
              }
            : f
        )
      );
    }
  };

  // Batch convert all pending files
  const handleConvertAll = async () => {
    const pending = files.filter((f) => f.status === 'idle' || f.status === 'error');
    if (pending.length === 0) return;

    setIsConvertingAll(true);
    for (const item of pending) {
      await convertSingleFile(item.id);
    }
    setIsConvertingAll(false);
  };

  // Quick sample test loader
  const handleLoadSample = async (type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'png') => {
    let dummyBlob: Blob;
    let fileName = '';

    if (type === 'pdf') {
      fileName = 'Annual_Financial_Report.pdf';
      dummyBlob = new Blob(
        [
          '%PDF-1.4\n1 0 obj\n<< /Title (Financial Report 2026) /Author (Executive Officer) >>\nendobj\nAnnual Financial Summary\nRevenue: $4,200,000\nOperating Costs: $1,800,000\nNet Growth: +32%\nQuarterly Dividend: Approved by Board\n%%EOF',
        ],
        { type: 'application/pdf' }
      );
    } else if (type === 'docx') {
      fileName = 'Executive_Briefing.docx';
      // Basic text file representing document
      dummyBlob = new Blob(
        ['Executive Briefing 2026\n\nStrategic goals and operations milestone targets.'],
        { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
      );
    } else if (type === 'xlsx') {
      fileName = 'Quarterly_Metrics.xlsx';
      dummyBlob = new Blob(['Metric,Target,Achieved\nUser Growth,100k,125k\nRetention,85%,88%'], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
    } else if (type === 'pptx') {
      fileName = 'Product_Keynote_2026.pptx';
      dummyBlob = new Blob(['Keynote Presentation 2026\nSlide 1: Vision\nSlide 2: Roadmap'], {
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      });
    } else {
      // 1x1 transparent PNG image
      const pngBytes = new Uint8Array([
        137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 10, 73, 68, 65, 84, 120, 156, 99, 0, 1, 0, 0, 5, 0, 1, 13, 10, 45, 180, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130
      ]);
      dummyBlob = new Blob([pngBytes], { type: 'image/png' });
      fileName = 'Marketing_Diagram.png';
    }

    const testFile = new File([dummyBlob], fileName, { type: dummyBlob.type });
    handleFilesSelected([testFile]);
  };

  const idleCount = files.filter((f) => f.status === 'idle').length;
  const completedCount = files.filter((f) => f.status === 'completed').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white">DocMorph Pro</h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Full-Stack Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                High-fidelity layout-preserving document conversion suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Architecture Modal Button */}
            <button
              onClick={() => setIsDocsOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
            >
              <BookOpen size={14} className="text-blue-400" />
              <span className="hidden sm:inline">Architecture & API Docs</span>
              <span className="sm:hidden">Docs</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800/60">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>In-Memory RAM Engine</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'workspace'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              Conversion Workspace
              {files.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-black/30 text-[10px]">
                  {files.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('capabilities')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'capabilities'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              Format Capabilities Matrix
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              Audit Log (PostgreSQL)
            </button>
          </div>

          {/* Quick Demo Pre-load buttons */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-slate-400">
            <span className="text-[11px] text-slate-500 mr-1">Load Demo:</span>
            <button
              onClick={() => handleLoadSample('pdf')}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-mono"
            >
              + PDF
            </button>
            <button
              onClick={() => handleLoadSample('docx')}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-mono"
            >
              + DOCX
            </button>
            <button
              onClick={() => handleLoadSample('xlsx')}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-mono"
            >
              + XLSX
            </button>
            <button
              onClick={() => handleLoadSample('pptx')}
              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-[11px] font-mono"
            >
              + PPTX
            </button>
          </div>
        </div>

        {/* Tab 1: Workspace */}
        {activeTab === 'workspace' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Conversion Pair Matrix Quick Guide */}
            <ConversionPairGuide onSelectPair={(s, t) => {}} />

            {/* Drop Zone Workspace */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Main Conversion Workspace</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Upload documents to trigger the 3-stage conversion pipeline.
                  </p>
                </div>

                {files.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearAll}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                    >
                      Clear All
                    </button>

                    {idleCount > 0 && (
                      <button
                        onClick={handleConvertAll}
                        disabled={isConvertingAll}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                      >
                        <Play size={13} className="fill-white" />
                        <span>Convert All ({idleCount})</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <DropZone
                onFilesSelected={handleFilesSelected}
                isProcessing={isConvertingAll}
              />
            </div>

            {/* Selected Files List */}
            {files.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>
                    Queue ({files.length} document{files.length > 1 ? 's' : ''})
                  </span>
                  <span>
                    {completedCount} of {files.length} Ready
                  </span>
                </div>

                <div className="space-y-3">
                  {files.map((item) => (
                    <FileListCard
                      key={item.id}
                      item={item}
                      onTargetChange={handleTargetChange}
                      onConvert={convertSingleFile}
                      onRemove={handleRemoveFile}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Capabilities & Matrix */}
        {activeTab === 'capabilities' && (
          <div className="animate-fadeIn">
            <ConversionPairShowcase />
          </div>
        )}

        {/* Tab 3: History & Database Audit Log */}
        {activeTab === 'history' && (
          <div className="animate-fadeIn">
            <ConversionHistory />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            DocMorph Pro • High-Performance In-Memory Document Converter Suite
          </span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Next.js 16 (App Router)</span>
            <span>•</span>
            <span>pdf-lib & docx & SheetJS & Sharp</span>
            <span>•</span>
            <span>PostgreSQL</span>
          </div>
        </div>
      </footer>

      {/* Architecture Documentation Modal */}
      <ArchitectureDocsModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />
    </div>
  );
}
