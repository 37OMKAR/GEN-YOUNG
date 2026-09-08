/**
 * Gen-Young Benefits Marketplace View
 * Path: src/views/BenefitsView.tsx
 *
 * Reflects docs/assets/03-smart-matching.png · 04-privacy-benefits.png ·
 * 05-benefits-marketplace.png. Category chips, 4-state wallet, benefit
 * list, and 5-question detail modal with real claim flow.
 */

import React, { useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Sparkles,
  Shield,
  GraduationCap,
  Briefcase,
  Heart,
  ShoppingBag,
  Cpu,
  Check,
  Clock,
  Bookmark,
  ArrowRight,
} from 'lucide-react';
import { usePersona } from '../context/PersonaContext';
import { useBenefits } from '../context/BenefitsContext';
import { BenefitItem, WalletTab } from '../types/benefits';
import { categoryMeta } from '../data/mockBenefits';
import { BenefitDetailModal } from '../components/benefits/BenefitDetailModal';

type CategoryFilter = 'all' | 'govt' | 'ai' | 'education' | 'career' | 'health' | 'lifestyle';

const categoryIcons: Record<CategoryFilter, LucideIcon> = {
  all: Sparkles,
  govt: Shield,
  ai: Cpu,
  education: GraduationCap,
  career: Briefcase,
  health: Heart,
  lifestyle: ShoppingBag,
};

const walletTabMeta: Record<WalletTab, { label: string; icon: LucideIcon; color: string }> = {
  available: { label: 'Available', icon: Sparkles, color: 'text-emerald-300' },
  claimed: { label: 'Claimed', icon: Bookmark, color: 'text-cyan-300' },
  active: { label: 'Active', icon: Check, color: 'text-teal-300' },
  expiring: { label: 'Expiring', icon: Clock, color: 'text-amber-300' },
};

export const BenefitsView: React.FC = () => {
  const { activePersona } = usePersona();
  const {
    eligibleBenefits,
    recommendedBenefits,
    walletCounts,
    walletBenefits,
    isBenefitClaimed,
  } = useBenefits();

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeWalletTab, setActiveWalletTab] = useState<WalletTab | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitItem | null>(null);

  const visibleBenefits = useMemo<BenefitItem[]>(() => {
    if (activeWalletTab) return walletBenefits(activeWalletTab);
    if (activeCategory === 'all') return eligibleBenefits;
    return eligibleBenefits.filter((b) => b.category === activeCategory);
  }, [activeCategory, activeWalletTab, eligibleBenefits, walletBenefits]);

  return (
    <main className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-5">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2">
          <Sparkles className="text-emerald-400" size={20} />
          <h1 className="text-lg font-bold text-white tracking-tight">Benefits Marketplace</h1>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          {eligibleBenefits.length} opportunities matched for {activePersona.name} ·{' '}
          {activePersona.roleLabel}
        </p>
      </header>

      {/* 4-State Benefits Wallet */}
      <section
        className="bg-slate-850 border border-slate-700/60 rounded-2xl p-3 shadow-lg"
        aria-label="Benefits Wallet"
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Your Wallet
          </span>
          {activeWalletTab && (
            <button
              onClick={() => setActiveWalletTab(null)}
              className="text-[10px] text-emerald-400 font-bold hover:text-emerald-300"
            >
              ← Back to marketplace
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(walletTabMeta) as WalletTab[]).map((tab) => {
            const meta = walletTabMeta[tab];
            const Icon = meta.icon;
            const count = walletCounts[tab];
            const isActive = activeWalletTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveWalletTab(isActive ? null : tab)}
                className={`p-2 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 border-emerald-500/50 shadow-inner'
                    : 'bg-slate-900/60 border-slate-700/50 hover:border-slate-600'
                }`}
                aria-pressed={isActive}
              >
                <Icon size={14} className={`mx-auto ${meta.color}`} />
                <span className="block text-sm font-mono font-bold text-white mt-1">{count}</span>
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
                  {meta.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recommended Strip (only shown on marketplace view) */}
      {!activeWalletTab && recommendedBenefits.length > 0 && (
        <section aria-label="Recommended for you">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recommended for You
            </h2>
            <span className="text-[10px] text-slate-500">
              {recommendedBenefits.length} personalised
            </span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
            {recommendedBenefits.map((b) => {
              const meta = categoryMeta[b.category] ?? categoryMeta.all;
              const claimed = isBenefitClaimed(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBenefit(b)}
                  className="shrink-0 w-52 p-3 bg-gradient-to-br from-slate-850 to-slate-900 border border-slate-700 rounded-xl text-left hover:border-emerald-500/40 transition-colors snap-start"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${meta.bg} ${meta.accent}`}
                    >
                      {meta.short}
                    </span>
                    {claimed && (
                      <span className="text-[9px] text-emerald-300 font-bold flex items-center gap-0.5">
                        <Check size={10} /> Claimed
                      </span>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {b.shortDescription}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold ${
                        b.cost === 'Free' ? 'text-emerald-300' : 'text-amber-300'
                      }`}
                    >
                      {b.cost}
                    </span>
                    <ArrowRight size={12} className="text-slate-500" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Category chips (only shown on marketplace view) */}
      {!activeWalletTab && (
        <section aria-label="Filter by category">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 snap-x">
            {(Object.keys(categoryIcons) as CategoryFilter[]).map((cat) => {
              const Icon = categoryIcons[cat];
              const meta = categoryMeta[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all snap-start ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                      : `${meta.bg} ${meta.accent} hover:brightness-125`
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon size={12} />
                  {meta.short}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Benefit list */}
      <section
        aria-label={
          activeWalletTab
            ? `${walletTabMeta[activeWalletTab].label} benefits`
            : 'Available benefits'
        }
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {activeWalletTab
              ? walletTabMeta[activeWalletTab].label
              : activeCategory === 'all'
                ? 'All Eligible Benefits'
                : categoryMeta[activeCategory].label}
          </h2>
          <span className="text-[10px] text-slate-500">{visibleBenefits.length} shown</span>
        </div>

        {visibleBenefits.length === 0 ? (
          <div className="p-6 bg-slate-850/60 border border-dashed border-slate-700 rounded-xl text-center">
            <p className="text-xs text-slate-400">
              {activeWalletTab
                ? `Nothing here yet — claim a benefit to fill your ${walletTabMeta[activeWalletTab].label} tab.`
                : 'No matching benefits in this category for your profile.'}
            </p>
          </div>
        ) : (
          <ul className="space-y-2.5">
            {visibleBenefits.map((b) => {
              const meta = categoryMeta[b.category] ?? categoryMeta.all;
              const claimed = isBenefitClaimed(b.id);
              return (
                <li key={b.id}>
                  <button
                    onClick={() => setSelectedBenefit(b)}
                    className="w-full text-left p-3.5 rounded-xl bg-slate-850 border border-slate-700/60 hover:border-emerald-500/40 shadow-sm transition-all active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${meta.bg} ${meta.accent}`}
                          >
                            {meta.short}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              b.cost === 'Free'
                                ? 'bg-emerald-500/15 text-emerald-300'
                                : b.cost === 'Subsidized'
                                  ? 'bg-teal-500/15 text-teal-300'
                                  : 'bg-amber-500/15 text-amber-300'
                            }`}
                          >
                            {b.cost}
                          </span>
                          {claimed && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 flex items-center gap-0.5">
                              <Check size={9} /> In Wallet
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs font-bold text-white mt-1.5 leading-snug">
                          {b.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                          {b.shortDescription}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-500">
                          <span>By {b.provider.split('·')[0].trim()}</span>
                          <span>·</span>
                          <span>Verified {b.verifiedDate}</span>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-500 shrink-0 mt-1" />
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Detail modal */}
      <BenefitDetailModal
        benefit={selectedBenefit}
        onClose={() => setSelectedBenefit(null)}
      />
    </main>
  );
};
