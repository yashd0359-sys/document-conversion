export interface FormatOption {
  ext: string;
  label: string;
  mime: string;
  color: string;
  category: 'document' | 'spreadsheet' | 'presentation' | 'image';
}

export const SUPPORTED_TARGETS: Record<string, string[]> = {
  pdf: ['docx', 'xlsx', 'pptx', 'png', 'jpg'],
  docx: ['pdf', 'pptx'],
  doc: ['pdf', 'pptx'],
  pptx: ['pdf', 'docx'],
  ppt: ['pdf', 'docx'],
  xlsx: ['pdf'],
  xls: ['pdf'],
  png: ['pdf'],
  jpg: ['pdf'],
  jpeg: ['pdf'],
  webp: ['pdf'],
};

export const FORMAT_INFO: Record<string, FormatOption> = {
  pdf: {
    ext: 'pdf',
    label: 'PDF Document',
    mime: 'application/pdf',
    color: 'from-rose-500 to-red-600',
    category: 'document',
  },
  docx: {
    ext: 'docx',
    label: 'Word Document',
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    color: 'from-blue-500 to-indigo-600',
    category: 'document',
  },
  doc: {
    ext: 'doc',
    label: 'Word Legacy',
    mime: 'application/msword',
    color: 'from-blue-500 to-indigo-600',
    category: 'document',
  },
  pptx: {
    ext: 'pptx',
    label: 'PowerPoint',
    mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    color: 'from-amber-500 to-orange-600',
    category: 'presentation',
  },
  ppt: {
    ext: 'ppt',
    label: 'PowerPoint Legacy',
    mime: 'application/vnd.ms-powerpoint',
    color: 'from-amber-500 to-orange-600',
    category: 'presentation',
  },
  xlsx: {
    ext: 'xlsx',
    label: 'Excel Spreadsheet',
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    color: 'from-emerald-500 to-teal-600',
    category: 'spreadsheet',
  },
  xls: {
    ext: 'xls',
    label: 'Excel Legacy',
    mime: 'application/vnd.ms-excel',
    color: 'from-emerald-500 to-teal-600',
    category: 'spreadsheet',
  },
  png: {
    ext: 'png',
    label: 'PNG Image',
    mime: 'image/png',
    color: 'from-purple-500 to-violet-600',
    category: 'image',
  },
  jpg: {
    ext: 'jpg',
    label: 'JPEG Image',
    mime: 'image/jpeg',
    color: 'from-purple-500 to-violet-600',
    category: 'image',
  },
  jpeg: {
    ext: 'jpeg',
    label: 'JPEG Image',
    mime: 'image/jpeg',
    color: 'from-purple-500 to-violet-600',
    category: 'image',
  },
};

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB
