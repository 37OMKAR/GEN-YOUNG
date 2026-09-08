/**
 * Gen-Young Floating Toast Component
 * Renders animated notifications fixed at the top of the mobile viewport.
 * Path: src/components/common/Toast.tsx
 */

import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast, ToastType } from '../../context/ToastContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />;
      case 'error':
        return <AlertCircle size={16} className="text-rose-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-400 shrink-0" />;
      default:
        return <Info size={16} className="text-cyan-400 shrink-0" />;
    }
  };

  const getBorderColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/40 bg-slate-900/95 text-emerald-100 shadow-emerald-950/50';
      case 'error':
        return 'border-rose-500/40 bg-slate-900/95 text-rose-100 shadow-rose-950/50';
      case 'warning':
        return 'border-amber-500/40 bg-slate-900/95 text-amber-100 shadow-amber-950/50';
      default:
        return 'border-cyan-500/40 bg-slate-900/95 text-cyan-100 shadow-cyan-950/50';
    }
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-4 inset-x-0 z-50 flex flex-col items-center pointer-events-none px-4 space-y-2 max-w-md mx-auto"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border backdrop-blur-md shadow-lg text-xs font-medium w-full transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${getBorderColor(
            toast.type
          )}`}
        >
          <div className="flex items-center gap-2">
            {getIcon(toast.type)}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
            className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
};
