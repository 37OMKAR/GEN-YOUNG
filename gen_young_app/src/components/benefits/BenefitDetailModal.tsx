/**
 * Gen-Young Benefit Detail Modal
 * Path: src/components/benefits/BenefitDetailModal.tsx
 *
 * The 5-question benefit card from the concept paper §5, plus the
 * "Why am I seeing this?" attribution surface (§16), the claim button,
 * and the voucher-code reveal after a successful claim.
 */

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Info,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { BenefitItem } from '../../types/benefits';
import { useBenefits } from '../../context/BenefitsContext';
import { useToast } from '../../context/ToastContext';
import { categoryMeta } from '../../data/mockBenefits';

interface BenefitDetailModalProps {
  benefit: BenefitItem | null;
  onClose: () => void;
}

export const BenefitDetailModal: React.FC<BenefitDetailModalProps> = ({
  benefit,
  onClose,
}) => {
  const { claimBenefit, isBenefitClaimed, getClaimForBenefit } = useBenefits();
  const { showToast } = useToast();
  const [showAttribution, setShowAttribution] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!benefit) return null;

  const claim = getClaimForBenefit(benefit.id);
  const alreadyClaimed = isBenefitClaimed(benefit.id);
  const meta = categoryMeta[benefit.category] ?? categoryMeta.all;

  const handleClaim = () => {
    const result = claimBenefit(benefit.id);
    if (result.success && result.voucherCode) {
      showToast(`Claimed! Your voucher: ${result.voucherCode}`, 'success');
    } else {
      showToast(result.error || 'Could not claim this benefit.', 'error');
    }
  };

  const handleCopyCode = async () => {
    if (!claim?.voucherCode) return;
    try {
      await navigator.clipboard.writeText(claim.voucherCode);
      setCopiedCode(true);
      showToast('Voucher code copied to clipboard', 'success');
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      showToast('Could not copy voucher code', 'error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="benefit-modal-title"
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur px-4 pt-4 pb-3 border-b border-slate-800 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span
              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${meta.bg} ${meta.accent}`}
            >
              {meta.label}
            </span>
            <h2 id="benefit-modal-title" className="text-base font-bold text-white mt-1.5 leading-tight">
              {benefit.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
            aria-label="Close benefit details"
          >
            <X size={16} />
          </button>
        </div>

        {/* 5-Question Card Body */}
        <div className="px-4 py-4 space-y-4">
          {/* Q1 · What is it? */}
          <section>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              1 · What is it?
            </span>
            <p className="text-sm text-slate-200 mt-1 leading-relaxed">
              {benefit.fullDescription}
            </p>
          </section>

          {/* Q2 · Why am I seeing this? */}
          <section>
            <button
              onClick={() => setShowAttribution((v) => !v)}
              className="w-full flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-left hover:bg-emerald-500/15 transition-colors"
              aria-expanded={showAttribution}
            >
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <Info size={14} />
                2 · Why am I seeing this?
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                {showAttribution ? 'Hide' : 'Show'}
              </span>
            </button>
            {showAttribution && (
              <p className="text-xs text-slate-300 mt-2 px-3 leading-relaxed">
                {benefit.whySeeingThis}
              </p>
            )}
          </section>

          {/* Q3 · Who provides it? */}
          <section>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              3 · Who provides it?
            </span>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-200">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span className="font-semibold">{benefit.provider}</span>
            </div>
          </section>

          {/* Q4 · What does it cost? */}
          <section>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              4 · What does it cost?
            </span>
            <div className="mt-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                    benefit.cost === 'Free'
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : benefit.cost === 'Subsidized'
                        ? 'bg-teal-500/15 border-teal-500/30 text-teal-300'
                        : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  }`}
                >
                  {benefit.cost}
                </span>
                {benefit.costDetails && (
                  <span className="text-xs text-slate-300">{benefit.costDetails}</span>
                )}
              </div>
              {benefit.futureCostWarning && (
                <div className="mt-2 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg flex gap-2 items-start">
                  <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] text-amber-200 leading-snug">
                    {benefit.futureCostWarning}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Q5 · What do I do next? */}
          <section>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              5 · What do I do next?
            </span>

            {alreadyClaimed && claim ? (
              <div className="mt-2 space-y-3">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300">Successfully Claimed</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                    Your Voucher Code
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <code className="flex-1 text-sm font-mono font-bold text-white bg-slate-950/60 border border-emerald-500/30 rounded-lg px-2.5 py-1.5 tracking-widest">
                      {claim.voucherCode}
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className="w-9 h-9 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 border border-emerald-500/30 text-emerald-300 hover:text-slate-950 flex items-center justify-center transition-colors"
                      aria-label="Copy voucher code"
                    >
                      {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-slate-500 block">Claimed on</span>
                      <span className="font-mono text-slate-300">
                        {new Date(claim.claimedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Valid until</span>
                      <span className="font-mono text-slate-300">
                        {new Date(claim.expiryDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-full inline-flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-bold text-slate-200 transition-colors"
                >
                  <ExternalLink size={14} />
                  Open on {benefit.provider.split('·')[0].trim()}
                </a>
              </div>
            ) : (
              <button
                onClick={handleClaim}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
              >
                <Sparkles size={14} />
                {benefit.actionLabel}
              </button>
            )}
          </section>

          {/* Verified footer */}
          <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
            <span>Verified on {benefit.verifiedDate}</span>
            <span>
              Ages {benefit.eligibilityAge.min}–{benefit.eligibilityAge.max}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
