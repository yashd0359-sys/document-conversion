import React from 'react';
import {
  FileText,
  Download,
  Trash2,
  RefreshCw,
  ExternalLink,
  Check,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { FileBadge, StatusIndicator } from './FileBadge';
import { ConversionProgressBar } from './ConversionProgressBar';
import { FormatSelector } from './FormatSelector';

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  sourceFormat: string;
  targetFormat: string;
  status: 'idle' | 'uploading' | 'converting' | 'completed' | 'error';
  progress: number;
  downloadUrl?: string;
  convertedSize?: number;
  errorMessage?: string;
  durationMs?: number;
}

interface FileListCardProps {
  item: FileItem;
  onTargetChange: (id: string, target: string) => void;
  onConvert: (id: string) => void;
  onRemove: (id: string) => void;
}

export function FileListCard({ item, onTargetChange, onConvert, onRemove }: FileListCardProps) {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isBusy = item.status === 'uploading' || item.status === 'converting';

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:border-slate-700 space-y-4">
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <FileBadge format={item.sourceFormat} size="md" />
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-slate-100 truncate" title={item.name}>
              {item.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>{formatBytes(item.size)}</span>
              <span>•</span>
              <StatusIndicator status={item.status} />
              {item.durationMs && (
                <>
                  <span>•</span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {(item.durationMs / 1000).toFixed(2)}s
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 shrink-0">
          {item.status === 'completed' && item.downloadUrl ? (
            <a
              href={item.downloadUrl}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={14} />
              <span>Download</span>
              {item.convertedSize && (
                <span className="text-[10px] text-emerald-100 opacity-90 hidden sm:inline">
                  ({formatBytes(item.convertedSize)})
                </span>
              )}
            </a>
          ) : item.status === 'error' ? (
            <button
              onClick={() => onConvert(item.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-medium transition-all"
            >
              <RefreshCw size={13} />
              Retry
            </button>
          ) : item.status === 'idle' ? (
            <button
              onClick={() => onConvert(item.id)}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Convert Now
            </button>
          ) : null}

          {!isBusy && (
            <button
              onClick={() => onRemove(item.id)}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Remove file"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Target Format Selector (enabled when idle) */}
      {item.status === 'idle' && (
        <div className="pt-2 border-t border-slate-800/80">
          <FormatSelector
            sourceExt={item.sourceFormat}
            selectedTarget={item.targetFormat}
            onSelectTarget={(target) => onTargetChange(item.id, target)}
          />
        </div>
      )}

      {/* Progress system */}
      {item.status !== 'idle' && (
        <div className="pt-2 border-t border-slate-800/80">
          <ConversionProgressBar status={item.status} progress={item.progress} />
        </div>
      )}

      {/* Error Banner */}
      {item.status === 'error' && item.errorMessage && (
        <div className="flex items-start gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="font-semibold block">Conversion Failed</span>
            <span className="text-rose-300/90">{item.errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
