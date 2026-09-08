/**
 * Gen-Young 5-Question Benefit Card Component
 * Path: src/components/benefits/BenefitCard.tsx
 *
 * Implements Features #9, #10, #11 from PROJECT.md:
 * - Collapsible 5-question accordion answering What, Who, What do you get, What are conditions, How to claim.
 * - Prominent Future Renewal Price Warning Banner when futureCostWarning is present (omitted when free).
 * - Web Speech API Text-to-Speech (TTS) read-aloud "Listen" button.
 * - "Why am I seeing this?" modal trigger with DPDP attribution linkage.
 * - Responsive mobile-first card with category and cost badges.
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Sparkles,
  Check,
  AlertTriangle,
  QrCode,
  Lock,
} from 'lucide-react';
import { BenefitItem } from '../../types/benefits';
import { categoryMeta } from '../../data/mockBenefits';

export interface BenefitCardProps {
  benefit: BenefitItem;
  isClaimed: boolean;
  isActive?: boolean;
  isEligible: boolean;
  onClaim: (benefitId: string) => void;
  onOpenWhyModal: (benefit: BenefitItem) => void;
  onViewVoucher?: (benefitId: string) => void;
  className?: string;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
  benefit,
  isClaimed,
  isActive = false,
  isEligible,
  onClaim,
  onOpenWhyModal,
  onViewVoucher,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const meta = categoryMeta[benefit.category] ?? categoryMeta.all;

  // Cancel TTS speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Web Speech API read-aloud handler
  const handleToggleTts = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${benefit.title}. Provided by ${benefit.provider}. ${benefit.shortDescription}. Cost: ${benefit.cost}. ${
      benefit.futureCostWarning ? `Renewal notice: ${benefit.futureCostWarning}` : ''
    }`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.0;
    utterance.lang = 'en-IN';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const fiveQuestions = benefit.fiveQuestions || {
    q1WhatIsIt: benefit.fullDescription,
    q2WhoIsItFor: `Target ages ${benefit.eligibilityAge.min}–${benefit.eligibilityAge.max} • Open to: ${benefit.eligibleRoles.map((r) => r.toUpperCase()).join(', ')}.`,
    q3WhatDoYouGet: `${benefit.cost}: ${benefit.costDetails || benefit.shortDescription}`,
    q4WhatAreConditions: 'Requires valid identity verification. Zero stealth charges policy applies.',
    q5HowToClaim: `Tap '${benefit.actionLabel}' below to generate your personal voucher code or access partner portal.`,
  };

  return (
    <div
      className={`rounded-2xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-all shadow-md overflow-hidden ${className}`}
    >
      <div className="p-4 space-y-3">
        {/* Header Badges & TTS */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${meta.bg} ${meta.accent}`}
            >
              {meta.short}
            </span>
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                benefit.cost === 'Free'
                  ? 'bg-emerald-500/15 text-emerald-300'
                  : benefit.cost === 'Subsidized'
                    ? 'bg-teal-500/15 text-teal-300'
                    : 'bg-amber-500/15 text-amber-300'
              }`}
            >
              {benefit.cost}
            </span>
            {benefit.costTag && (
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {benefit.costTag}
              </span>
            )}
            {isClaimed && (
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}
              >
                {isActive ? 'Active' : 'Claimed'}
              </span>
            )}
          </div>

          {/* Web Speech API Read-Aloud Button */}
          <button
            onClick={handleToggleTts}
            className={`p-1.5 rounded-lg border transition-colors ${
              isSpeaking
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700'
            }`}
            title={isSpeaking ? 'Stop read aloud' : 'Listen to benefit overview'}
            aria-label={isSpeaking ? 'Stop read aloud' : 'Listen to benefit overview'}
          >
            {isSpeaking ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>

        {/* Title & Provider */}
        <div>
          <h3 className="text-sm font-bold text-white leading-snug">{benefit.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 font-medium text-slate-300">
              <ShieldCheck size={12} className="text-emerald-400" />
              {benefit.provider}
            </span>
            <span>•</span>
            <span className="text-slate-500">Verified {benefit.verifiedDate}</span>
          </div>
          <p className="text-xs text-slate-300/90 mt-1.5 leading-relaxed">
            {benefit.shortDescription}
          </p>
        </div>

        {/* Future Renewal Price Warning Banner (Transparent Disclosure) */}
        {benefit.futureCostWarning && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 text-xs block">
                  Transparent Renewal Disclosure
                </span>
                <p className="text-[11px] text-amber-200/90 leading-snug mt-0.5">
                  {benefit.futureCostWarning}
                </p>
                <span className="text-[10px] text-amber-400/80 font-mono block mt-1">
                  ✓ No surprise charges • Cancel anytime prior to renewal
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 5-Question Collapsible Accordion Toggle */}
        <div className="pt-1 border-t border-slate-800">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            aria-expanded={isExpanded}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-emerald-400" />
              <span>5 Standard Questions (Full Details)</span>
            </span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {/* Accordion Content */}
          {isExpanded && (
            <div className="mt-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs animate-fade-in">
              {/* Q1 */}
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                  1 · What is it?
                </span>
                <p className="text-slate-200 text-xs mt-0.5 leading-relaxed">
                  {fiveQuestions.q1WhatIsIt}
                </p>
              </div>

              {/* Q2 */}
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                  2 · Who is it for?
                </span>
                <p className="text-slate-200 text-xs mt-0.5 leading-relaxed">
                  {fiveQuestions.q2WhoIsItFor}
                </p>
              </div>

              {/* Q3 */}
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                  3 · What do you get?
                </span>
                <p className="text-slate-200 text-xs mt-0.5 leading-relaxed">
                  {fiveQuestions.q3WhatDoYouGet}
                </p>
              </div>

              {/* Q4 */}
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                  4 · What are the conditions?
                </span>
                <p className="text-slate-200 text-xs mt-0.5 leading-relaxed">
                  {fiveQuestions.q4WhatAreConditions}
                </p>
              </div>

              {/* Q5 */}
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                  5 · How to claim?
                </span>
                <p className="text-slate-200 text-xs mt-0.5 leading-relaxed">
                  {fiveQuestions.q5HowToClaim}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
          {/* Why am I seeing this? */}
          <button
            onClick={() => onOpenWhyModal(benefit)}
            className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors"
          >
            <Info size={13} />
            <span>Why seeing this?</span>
          </button>

          {/* Primary Action CTA */}
          <div>
            {isClaimed ? (
              <button
                onClick={() => onViewVoucher?.(benefit.id)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <QrCode size={13} />
                <span>View Voucher</span>
              </button>
            ) : isEligible ? (
              <button
                onClick={() => onClaim(benefit.id)}
                className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Sparkles size={13} />
                <span>{benefit.actionLabel || 'Claim Benefit'}</span>
              </button>
            ) : (
              <button
                disabled
                className="px-3 py-2 bg-slate-800/80 text-slate-500 font-medium text-xs rounded-xl border border-slate-700 cursor-not-allowed flex items-center gap-1"
              >
                <Lock size={12} />
                <span>Not Eligible</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
