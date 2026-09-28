import React, { useState, useEffect } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  Trash2,
  RefreshCw,
  FolderOpen,
  SlidersHorizontal,
} from 'lucide-react';
import { FileBadge } from './FileBadge';

interface JobRecord {
  id: string;
  originalName: string;
  fileSize: number;
  sourceFormat: string;
  targetFormat: string;
  status: string;
  convertedSize?: number;
  downloadKey?: string;
  createdAt: string;
}

export function ConversionHistory() {
  const [jobs, setJobs] = useState<JobRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/jobs');
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatBytes = (bytes?: number) => {
    if (!bytes) return '-';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-100">Conversion Audit Log (Database)</h3>
          <span className="text-xs text-slate-500 font-mono">PostgreSQL</span>
        </div>
        <button
          onClick={fetchJobs}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-800/80 rounded-xl">
          No conversion jobs logged yet. Drop a file above to test the conversion pipeline!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2.5 font-medium">Document</th>
                <th className="pb-2.5 font-medium">Conversion</th>
                <th className="pb-2.5 font-medium">File Size</th>
                <th className="pb-2.5 font-medium">Status</th>
                <th className="pb-2.5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 pr-3 font-medium text-slate-200 max-w-[200px] truncate" title={job.originalName}>
                    {job.originalName}
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-1.5">
                      <FileBadge format={job.sourceFormat} size="sm" />
                      <ArrowRight size={10} className="text-slate-500" />
                      <FileBadge format={job.targetFormat} size="sm" />
                    </div>
                  </td>
                  <td className="py-3 pr-3 text-slate-400 font-mono">
                    {formatBytes(job.fileSize)}
                    {job.convertedSize ? ` ➔ ${formatBytes(job.convertedSize)}` : ''}
                  </td>
                  <td className="py-3 pr-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        job.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : job.status === 'error'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3">
                    {job.downloadKey ? (
                      <a
                        href={`/api/download/${job.downloadKey}`}
                        download
                        className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-medium hover:underline"
                      >
                        <Download size={12} />
                        Get File
                      </a>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
