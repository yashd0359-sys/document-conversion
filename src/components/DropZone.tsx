import React, { useRef, useState } from 'react';
import { UploadCloud, FileUp, Sparkles, CheckCircle, ShieldAlert } from 'lucide-react';
import { MAX_FILE_SIZE_BYTES } from '@/lib/types';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

export function DropZone({ onFilesSelected, isProcessing }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateAndPassFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setDragError(null);

    const validFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setDragError(`File "${file.name}" exceeds the 50MB limit.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer && e.dataTransfer.files) {
      validateAndPassFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer overflow-hidden group ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-[1.01]'
            : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 hover:shadow-xl'
        } ${isProcessing ? 'pointer-events-none opacity-80' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          accept=".pdf,.docx,.doc,.pptx,.ppt,.xlsx,.xls,.png,.jpg,.jpeg,.webp"
          onChange={(e) => {
            validateAndPassFiles(e.target.files);
            // Reset input so same file can be re-selected if needed
            e.target.value = '';
          }}
        />

        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center gap-4">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
              isDragging
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40'
                : 'bg-slate-800 text-blue-400 group-hover:bg-slate-700 group-hover:text-blue-300 shadow-md border border-slate-700/60'
            }`}
          >
            <UploadCloud size={32} />
          </div>

          <div className="space-y-1.5 max-w-md">
            <h3 className="text-lg font-semibold text-slate-100 flex items-center justify-center gap-2">
              <span>Drag & drop documents here</span>
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                Multi-file
              </span>
            </h3>
            <p className="text-sm text-slate-400">
              or <span className="text-blue-400 underline underline-offset-4 font-medium group-hover:text-blue-300">browse from your computer</span>
            </p>
          </div>

          {/* Supported format tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-400">
            <span className="text-slate-500">Supports:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 font-mono text-slate-300">PDF</span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 font-mono text-slate-300">DOCX</span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 font-mono text-slate-300">PPTX</span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 font-mono text-slate-300">XLSX</span>
            <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 font-mono text-slate-300">PNG / JPG</span>
            <span className="text-slate-500">• Up to 50MB</span>
          </div>
        </div>
      </div>

      {dragError && (
        <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <ShieldAlert size={16} className="shrink-0" />
          <span>{dragError}</span>
        </div>
      )}
    </div>
  );
}
