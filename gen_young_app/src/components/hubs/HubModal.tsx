/**
 * Gen-Young Hub Modal — shared shell for Community, Green Impact, Insurance
 * Path: src/components/hubs/HubModal.tsx
 */

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface HubModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  headerAccent?: string;
  children: React.ReactNode;
}

export const HubModal: React.FC<HubModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  headerAccent = 'from-emerald-500 to-teal-500',
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`sticky top-0 z-10 bg-gradient-to-r ${headerAccent} px-4 pt-4 pb-3 rounded-t-3xl flex items-start justify-between gap-3`}
        >
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-white leading-tight">{title}</h2>
            {subtitle && <p className="text-xs text-white/85 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 flex items-center justify-center text-white transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
};
