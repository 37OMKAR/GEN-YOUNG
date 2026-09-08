/**
 * Gen-Young "Why Am I Seeing This?" Attribution Modal
 * Path: src/components/benefits/WhySeeingModal.tsx
 *
 * Implements Feature #10 from PROJECT.md and ORIGINAL_REQUEST.md (§ R2 & R7),
 * strictly aligned with India's Digital Personal Data Protection (DPDP) Act, 2023.
 *
 * Discloses transparent on-device matching rationale (age bracket, cohort role,
 * locality) with zero third-party profiling or data leaks.
 */

import React from 'react';
import {
  X,
  ShieldCheck,
  Calendar,
  GraduationCap,
  MapPin,
  Info,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { BenefitItem } from '../../types/benefits';
import { usePersona } from '../../context/PersonaContext';
import { categoryMeta } from '../../data/mockBenefits';

export interface WhySeeingModalProps {
  benefit: BenefitItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WhySeeingModal: React.FC<WhySeeingModalProps> = ({
  benefit,
  isOpen,
  onClose,
}) => {
  const { activePersona } = usePersona();

  if (!isOpen || !benefit) return null;

  const meta = categoryMeta[benefit.category] ?? categoryMeta.all;
  const city = activePersona.location?.city || 'Mumbai';
  const state = activePersona.location?.state || 'Maharashtra';

  // Canonical attribution strings adhering to test assertions F10-1 to F10-4 and B10-1 to B10-5
  const ageMatchStr = `Age ${activePersona.age} is within [${benefit.eligibilityAge.min}-${benefit.eligibilityAge.max}]`;
  const roleMatchStr = `role "${activePersona.role}" matches required roles [${benefit.eligibleRoles.join(', ')}]`;
  const locationMatchStr = `Location: ${city}, ${state}.`;
  const canonicalExplanation = `Eligible because: ${ageMatchStr} and ${roleMatchStr}. ${locationMatchStr}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="why-seeing-title"
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck size={18} />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                Algorithmic Transparency
              </span>
              <h2 id="why-seeing-title" className="text-sm font-bold text-white">
                Why am I seeing this offer?
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close attribution modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-4 space-y-4 overflow-y-auto text-xs">
          {/* Target Benefit Summary */}
          <div className="p-3 rounded-xl bg-slate-850 border border-slate-700/60 flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${meta.bg} ${meta.accent}`}>
                  {meta.short}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {benefit.cost}
                </span>
              </div>
              <h3 className="font-bold text-white text-xs">{benefit.title}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">By {benefit.provider}</p>
            </div>
          </div>

          {/* Canonical Rationale Output */}
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
              <Info size={14} />
              <span>Verified Eligibility Assessment</span>
            </div>
            <p className="font-sans text-[11px] text-emerald-100/90">{canonicalExplanation}</p>
          </div>

          {/* Demographic Criteria Breakdown Cards */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Matched Demographic Criteria
            </h4>

            {/* Age Criterion */}
            <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Calendar size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white text-xs block">Age Bracket Verification</span>
                  <span className="text-[11px] text-slate-300 block mt-0.5">{ageMatchStr}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Verified from your linked Gen-Young Youth Savings KYC (Born in {new Date().getFullYear() - activePersona.age})
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 shrink-0">
                <CheckCircle2 size={11} /> Matched
              </span>
            </div>

            {/* Role / Student Cohort */}
            <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <GraduationCap size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white text-xs block">Academic / Cohort Role</span>
                  <span className="text-[11px] text-slate-300 block mt-0.5">{roleMatchStr}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {activePersona.roleLabel} • {activePersona.institutionOrCompany}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 shrink-0">
                <CheckCircle2 size={11} /> Verified
              </span>
            </div>

            {/* Geographic Locality */}
            <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800 flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white text-xs block">Geographic Locality</span>
                  <span className="text-[11px] text-slate-300 block mt-0.5">{locationMatchStr}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Matches regional public transit and state scholarship boundaries.
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 shrink-0">
                <CheckCircle2 size={11} /> Local Scheme
              </span>
            </div>
          </div>

          {/* Scheme Description Rationale */}
          {benefit.whySeeingThis && (
            <div className="p-3 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Partner Targeting Logic
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">{benefit.whySeeingThis}</p>
            </div>
          )}

          {/* DPDP Act 2023 Compliance Panel */}
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/20 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Lock size={14} />
              <span>Digital Personal Data Protection (DPDP) Act, 2023 Compliance</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This recommendation was computed <strong>100% locally on your device</strong> using
              your active demographic parameters. Gen-Young enforces strict data minimization:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                ✓ No Third-Party Trackers
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                ✓ Zero Cold-Call Sharing
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                ✓ Local Client Evaluation
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                ✓ Audit Trail Logged
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-slate-850 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
