/**
 * Gen-Young Voucher Redemption Modal
 * Path: src/components/benefits/VoucherModal.tsx
 *
 * Implements Features #12 & #13 from PROJECT.md:
 * Authentic coupon pass with perforated styling, procedural SVG QR Code visual,
 * monospace copyable code, urgency indicators, redemption instructions,
 * and "Mark as Redeemed / Activated" transition.
 */

import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Clock,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { BenefitItem } from '../../types/benefits';
import { useBenefits } from '../../context/BenefitsContext';
import { useToast } from '../../context/ToastContext';
import { QRCodeVisual } from './QRCodeVisual';
import { playClickSound, playUpiSuccessChime } from '../../utils/soundEffects';
import { triggerCelebrationConfetti } from '../../utils/confetti';

export interface VoucherModalProps {
  benefit: BenefitItem | null;
  onClose: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ benefit, onClose }) => {
  const { getClaimForBenefit, activateBenefit } = useBenefits();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!benefit) return null;

  const claim = getClaimForBenefit(benefit.id);
  if (!claim) return null;

  const daysLeft = claim.daysUntilExpiry;
  const isExpiring = daysLeft <= 14;
  const isUrgent = daysLeft <= 3;

  const handleCopyCode = async () => {
    playClickSound();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(claim.voucherCode);
      }
      setCopied(true);
      showToast('Voucher code copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast(`Voucher code: ${claim.voucherCode}`, 'info');
    }
  };

  const handleActivate = () => {
    const res = activateBenefit(benefit.id);
    if (res.success) {
      playUpiSuccessChime();
      triggerCelebrationConfetti();
      showToast('Benefit activated! Moved to Active Wallet.', 'success');
    } else {
      showToast(res.error || 'Failed to activate benefit.', 'error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="voucher-modal-title"
    >
      <div
        className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pass Top Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-white/15 rounded-lg">
              <Sparkles size={16} className="text-white" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100 block">
                Gen-Young Verified Pass
              </span>
              <h2 id="voucher-modal-title" className="text-sm font-bold truncate max-w-[210px]">
                {benefit.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors"
            aria-label="Close voucher"
          >
            <X size={16} />
          </button>
        </div>

        {/* QR Code & Pass Core */}
        <div className="p-5 flex flex-col items-center bg-slate-900 text-center">
          <QRCodeVisual
            payload={`geny://voucher/${claim.voucherCode}?benefit=${benefit.id}`}
            size={180}
            className="my-1"
          />

          {/* Voucher Code Box */}
          <div className="w-full mt-4 p-3 bg-slate-950/90 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                Redemption Code
              </span>
              <code className="text-base font-mono font-black tracking-widest text-emerald-400">
                {claim.voucherCode}
              </code>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-bold text-xs transition-colors"
              aria-label="Copy voucher code"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Expiration Status Badge */}
          <div className="w-full mt-3">
            {isUrgent ? (
              <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 animate-pulse">
                <Flame size={14} className="text-rose-400" />
                <span>Urgent: Expires in {daysLeft} days ({claim.expiryDate})</span>
              </div>
            ) : isExpiring ? (
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5">
                <AlertTriangle size={14} className="text-amber-400" />
                <span>Expiring soon: {daysLeft} days remaining ({claim.expiryDate})</span>
              </div>
            ) : (
              <div className="p-2 rounded-xl bg-slate-850 border border-slate-800 text-slate-400 text-xs flex items-center justify-center gap-1.5 font-mono">
                <Clock size={13} className="text-slate-500" />
                <span>Valid until {claim.expiryDate} ({daysLeft} days left)</span>
              </div>
            )}
          </div>

          {/* Perforated Divider */}
          <div className="w-full relative my-4 flex items-center">
            <div className="w-4 h-4 rounded-full bg-black -ml-7 shrink-0" />
            <div className="flex-1 border-b-2 border-dashed border-slate-800 mx-2" />
            <div className="w-4 h-4 rounded-full bg-black -mr-7 shrink-0" />
          </div>

          {/* Redemption Instructions */}
          <div className="w-full text-left space-y-2 text-[11px] text-slate-400">
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold shrink-0 text-[10px]">
                1
              </span>
              <span>Open partner app/portal or present QR code at checkout counter.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold shrink-0 text-[10px]">
                2
              </span>
              <span>Apply code <strong className="text-white font-mono">{claim.voucherCode}</strong> for 100% concession discount.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold shrink-0 text-[10px]">
                3
              </span>
              <span>Mark as activated below to track policy and renewal reminders.</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="w-full mt-5 space-y-2">
            {!claim.isActive ? (
              <button
                onClick={handleActivate}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Check size={16} />
                <span>Mark as Redeemed / Activated</span>
              </button>
            ) : (
              <div className="w-full py-2.5 px-4 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 font-bold text-xs flex items-center justify-center gap-1.5">
                <ShieldCheck size={16} />
                <span>Active Subscription (Enrolled)</span>
              </div>
            )}

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink size={14} />
              <span>Open on {benefit.provider.split('·')[0].trim()}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
