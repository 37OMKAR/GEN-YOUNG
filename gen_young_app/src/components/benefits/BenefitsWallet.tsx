/**
 * Gen-Young 4-State Benefits Wallet Component
 * Path: src/components/benefits/BenefitsWallet.tsx
 *
 * Implements Feature #12 from PROJECT.md:
 * - 4-pill segmented tab bar (Available, Claimed, Active, Expiring)
 * - Real-time state badge counters
 * - Context-aware card rendering (voucher preview, expiry countdown, QR button)
 * - Direct redemption via integrated VoucherModal
 */

import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Sparkles,
  Bookmark,
  CheckCircle2,
  Clock,
  QrCode,
  ShieldAlert,
  Flame,
  AlertTriangle,
} from 'lucide-react';
import { BenefitItem, WalletTab } from '../../types/benefits';
import { useBenefits } from '../../context/BenefitsContext';
import { VoucherModal } from './VoucherModal';
import { categoryMeta } from '../../data/mockBenefits';

interface TabMeta {
  label: string;
  icon: LucideIcon;
  color: string;
  activeBg: string;
  badgeBg: string;
}

const walletTabConfig: Record<WalletTab, TabMeta> = {
  available: {
    label: 'Available',
    icon: Sparkles,
    color: 'text-emerald-400',
    activeBg: 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300',
    badgeBg: 'bg-emerald-500/20 text-emerald-300',
  },
  claimed: {
    label: 'Claimed',
    icon: Bookmark,
    color: 'text-cyan-400',
    activeBg: 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300',
    badgeBg: 'bg-cyan-500/20 text-cyan-300',
  },
  active: {
    label: 'Active',
    icon: CheckCircle2,
    color: 'text-teal-400',
    activeBg: 'bg-teal-500/15 border-teal-500/50 text-teal-300',
    badgeBg: 'bg-teal-500/20 text-teal-300',
  },
  expiring: {
    label: 'Expiring',
    icon: Clock,
    color: 'text-amber-400',
    activeBg: 'bg-amber-500/15 border-amber-500/50 text-amber-300',
    badgeBg: 'bg-amber-500/20 text-amber-300',
  },
};

export interface BenefitsWalletProps {
  onSelectBenefit?: (benefit: BenefitItem) => void;
}

export const BenefitsWallet: React.FC<BenefitsWalletProps> = ({ onSelectBenefit }) => {
  const {
    activeWalletTab,
    setActiveWalletTab,
    walletCounts,
    walletBenefits,
    getClaimForBenefit,
    claimBenefit,
  } = useBenefits();

  const [selectedVoucherBenefit, setSelectedVoucherBenefit] = useState<BenefitItem | null>(null);

  const currentTab: WalletTab = activeWalletTab || 'available';
  const benefitsList = walletBenefits(currentTab);

  return (
    <div className="space-y-4" aria-label="4-State Benefits Wallet">
      {/* 4-Pill Segmented Tab Bar */}
      <div className="bg-slate-850 border border-slate-700/60 rounded-2xl p-1.5 shadow-lg">
        <div className="grid grid-cols-4 gap-1.5" role="tablist">
          {(Object.keys(walletTabConfig) as WalletTab[]).map((tab) => {
            const config = walletTabConfig[tab];
            const Icon = config.icon;
            const count = walletCounts[tab];
            const isSelected = currentTab === tab;

            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveWalletTab(tab)}
                className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? `${config.activeBg} shadow-inner`
                    : 'bg-slate-900/40 border-transparent hover:bg-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Icon size={13} className={isSelected ? config.color : 'text-slate-400'} />
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {count}
                  </span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">
                  {config.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Banner / Description */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {walletTabConfig[currentTab].label} Benefits
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
            {benefitsList.length}
          </span>
        </div>
        {currentTab === 'expiring' && benefitsList.length > 0 && (
          <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 animate-pulse">
            <Flame size={12} />
            Expiring within 14 days
          </span>
        )}
      </div>

      {/* Benefits Card List */}
      {benefitsList.length === 0 ? (
        <div className="p-8 bg-slate-850/50 border border-dashed border-slate-700/80 rounded-2xl text-center space-y-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
            {currentTab === 'available' && <Sparkles size={20} />}
            {currentTab === 'claimed' && <Bookmark size={20} />}
            {currentTab === 'active' && <CheckCircle2 size={20} />}
            {currentTab === 'expiring' && <Clock size={20} />}
          </div>
          <h3 className="text-sm font-bold text-slate-300">
            No {walletTabConfig[currentTab].label} Benefits
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {currentTab === 'available' && 'You have claimed all available eligible perks for your cohort!'}
            {currentTab === 'claimed' && 'You have no vouchers pending redemption. Claim a benefit to see it here.'}
            {currentTab === 'active' && 'No active subscriptions or policies. Activate your claimed perks to track them here.'}
            {currentTab === 'expiring' && 'Good news! None of your benefits are expiring within the next 14 days.'}
          </p>
          {currentTab !== 'available' && (
            <button
              onClick={() => setActiveWalletTab('available')}
              className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              Browse Available Perks →
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {benefitsList.map((benefit) => {
            const claim = getClaimForBenefit(benefit.id);
            const meta = categoryMeta[benefit.category] ?? categoryMeta.all;

            return (
              <div
                key={benefit.id}
                className="p-4 rounded-2xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-all shadow-md space-y-3"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${meta.bg} ${meta.accent}`}>
                        {meta.short}
                      </span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                        {benefit.cost}
                      </span>
                      {claim && (
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                          claim.isActive
                            ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        }`}>
                          {claim.isActive ? 'Active' : 'Claimed'}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5 leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                      {benefit.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Expiry or Voucher Preview Strip */}
                {claim && (
                  <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <QrCode size={16} className="text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                          Voucher Code
                        </span>
                        <code className="text-xs font-mono font-bold text-white tracking-wider">
                          {claim.voucherCode}
                        </code>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">
                        Expires
                      </span>
                      <span className={`font-mono text-xs font-bold ${
                        claim.daysUntilExpiry <= 3
                          ? 'text-rose-400 animate-pulse'
                          : claim.daysUntilExpiry <= 14
                            ? 'text-amber-400'
                            : 'text-slate-300'
                      }`}>
                        {claim.daysUntilExpiry === 0 ? 'Today' : `${claim.daysUntilExpiry}d left`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Future Renewal Warning if recurring */}
                {benefit.futureCostWarning && claim?.isActive && (
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300 flex items-center gap-1.5">
                    <ShieldAlert size={12} className="shrink-0 text-amber-400" />
                    <span>{benefit.futureCostWarning}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                  {claim ? (
                    <>
                      <button
                        onClick={() => setSelectedVoucherBenefit(benefit)}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <QrCode size={14} />
                        <span>View QR Voucher</span>
                      </button>
                      {onSelectBenefit && (
                        <button
                          onClick={() => onSelectBenefit(benefit)}
                          className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                        >
                          Details
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => claimBenefit(benefit.id)}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/15"
                      >
                        <Sparkles size={14} />
                        <span>{benefit.actionLabel || 'Claim Perk'}</span>
                      </button>
                      {onSelectBenefit && (
                        <button
                          onClick={() => onSelectBenefit(benefit)}
                          className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                        >
                          Details
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Voucher Modal */}
      <VoucherModal
        benefit={selectedVoucherBenefit}
        onClose={() => setSelectedVoucherBenefit(null)}
      />
    </div>
  );
};
