/**
 * Gen-Young Benefits Marketplace & 4-State Wallet View
 * Path: src/views/BenefitsView.tsx
 *
 * Implements Features #8 to #13 from PROJECT.md and ORIGINAL_REQUEST.md (§ R2):
 * - Search bar with regex-safe substring matching, whitespace trimming, and clear icon.
 * - "Show Only Eligible for Me" toggle switch tied dynamically to active persona.
 * - Horizontal category filter pills across all 6 core categories.
 * - 4-State Wallet toggle (Available, Claimed, Active, Expiring) with live counters.
 * - 5-Question Benefit Cards with Future Renewal Price Disclosures & TTS read-aloud.
 * - Integrated WhySeeingModal (DPDP Act 2023 compliance) and VoucherModal (SVG QR code).
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
  Search,
  X,
  Wallet,
  LayoutGrid,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { usePersona } from '../context/PersonaContext';
import { useBenefits } from '../context/BenefitsContext';
import { useToast } from '../context/ToastContext';
import { BenefitItem, WalletTab } from '../types/benefits';
import { categoryMeta } from '../data/mockBenefits';
import { BenefitCard } from '../components/benefits/BenefitCard';
import { WhySeeingModal } from '../components/benefits/WhySeeingModal';
import { VoucherModal } from '../components/benefits/VoucherModal';
import { BenefitsWallet } from '../components/benefits/BenefitsWallet';
import { playClickSound, playUpiSuccessChime } from '../utils/soundEffects';
import { triggerCelebrationConfetti } from '../utils/confetti';

type CategoryFilter = 'all' | 'govt' | 'ai' | 'education' | 'career' | 'health' | 'lifestyle';
type ViewMode = 'marketplace' | 'wallet';

const categoryIcons: Record<CategoryFilter, LucideIcon> = {
  all: Sparkles,
  govt: Shield,
  ai: Cpu,
  education: GraduationCap,
  career: Briefcase,
  health: Heart,
  lifestyle: ShoppingBag,
};

export const BenefitsView: React.FC = () => {
  const { activePersona } = usePersona();
  const {
    allBenefits,
    eligibleBenefits,
    recommendedBenefits,
    walletCounts,
    claimBenefit,
    isBenefitClaimed,
    isBenefitActive,
    activeWalletTab,
    setActiveWalletTab,
  } = useBenefits();
  const { showToast } = useToast();

  const [viewMode, setViewMode] = useState<ViewMode>('marketplace');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [showOnlyEligible, setShowOnlyEligible] = useState(true);

  // Modals state
  const [whyModalBenefit, setWhyModalBenefit] = useState<BenefitItem | null>(null);
  const [voucherModalBenefit, setVoucherModalBenefit] = useState<BenefitItem | null>(null);

  // Filtered benefits pipeline (regex-safe, trimmed, boundary-hardened)
  const visibleBenefits = useMemo<BenefitItem[]>(() => {
    // 1. Base pool: either strictly eligible or entire catalog
    let list = showOnlyEligible ? eligibleBenefits : allBenefits;

    // 2. Category filter
    if (activeCategory !== 'all') {
      list = list.filter((b) => b.category === activeCategory);
    }

    // 3. Search query filter (trimmed, case-insensitive, regex-safe substring matching)
    const trimmed = searchQuery.trim().toLowerCase();
    if (trimmed.length > 0) {
      list = list.filter((b) => {
        const inTitle = b.title.toLowerCase().includes(trimmed);
        const inDesc = b.shortDescription.toLowerCase().includes(trimmed);
        const inProvider = b.provider.toLowerCase().includes(trimmed);
        const inWhy = b.whySeeingThis.toLowerCase().includes(trimmed);
        const inDetails = (b.costDetails || '').toLowerCase().includes(trimmed);
        return inTitle || inDesc || inProvider || inWhy || inDetails;
      });
    }

    return list;
  }, [showOnlyEligible, eligibleBenefits, allBenefits, activeCategory, searchQuery]);

  const handleClaim = (benefitId: string) => {
    playClickSound();
    const res = claimBenefit(benefitId);
    if (res.success && res.voucherCode) {
      playUpiSuccessChime();
      triggerCelebrationConfetti();
      showToast(`Pass unlocked! Voucher: ${res.voucherCode}`, 'success');
      const benefit = allBenefits.find((b) => b.id === benefitId || b.slug === benefitId);
      if (benefit) {
        setVoucherModalBenefit(benefit);
      }
    } else {
      showToast(res.error || 'Unable to claim benefit.', 'error');
    }
  };

  const handleViewVoucher = (benefitId: string) => {
    playClickSound();
    const benefit = allBenefits.find((b) => b.id === benefitId || b.slug === benefitId);
    if (benefit) {
      setVoucherModalBenefit(benefit);
    }
  };

  const totalWalletItems =
    walletCounts.claimed + walletCounts.active + walletCounts.expiring;

  return (
    <main className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-4">
      {/* Header with Title & Persona Context */}
      <header className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-emerald-400" size={20} />
            <h1 className="text-lg font-bold text-white tracking-tight">Benefits & Schemes</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Personalised for <strong className="text-slate-200">{activePersona.name}</strong> ({activePersona.roleLabel}, Age {activePersona.age})
          </p>
        </div>

        {/* View Mode Toggle: Marketplace vs Wallet */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 shadow-sm">
          <button
            onClick={() => {
              setViewMode('marketplace');
              setActiveWalletTab(null);
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'marketplace'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-pressed={viewMode === 'marketplace'}
          >
            <LayoutGrid size={13} />
            <span>Discover</span>
          </button>
          <button
            onClick={() => {
              setViewMode('wallet');
              if (!activeWalletTab) setActiveWalletTab('available');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'wallet'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            aria-pressed={viewMode === 'wallet'}
          >
            <Wallet size={13} />
            <span>Wallet</span>
            {totalWalletItems > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {totalWalletItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main View Mode Rendering */}
      {viewMode === 'wallet' ? (
        <section aria-label="4-State Benefits Wallet View">
          <BenefitsWallet
            onSelectBenefit={(b) => setWhyModalBenefit(b)}
          />
        </section>
      ) : (
        <div className="space-y-4">
          {/* Quick Wallet Summary Pill Bar (routes to wallet tab on click) */}
          <section
            className="bg-slate-850 border border-slate-700/60 rounded-2xl p-2.5 shadow-md"
            aria-label="Quick Wallet Bar"
          >
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Wallet size={12} className="text-emerald-400" />
                <span>My Youth Wallet</span>
              </span>
              <button
                onClick={() => {
                  setViewMode('wallet');
                  setActiveWalletTab('claimed');
                }}
                className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300"
              >
                Open Full Wallet →
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['available', 'claimed', 'active', 'expiring'] as WalletTab[]).map((tab) => {
                const count = walletCounts[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveWalletTab(tab);
                      setViewMode('wallet');
                    }}
                    className="p-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 flex flex-col items-center transition-colors"
                  >
                    <span className="text-xs font-mono font-bold text-white">{count}</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                      {tab}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Search Bar */}
          <section className="relative w-full" aria-label="Search schemes">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search schemes, AI tools, scholarships..."
              maxLength={250}
              className="w-full bg-slate-900 border border-slate-700/70 focus:border-emerald-500 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none transition-colors shadow-inner"
              aria-label="Search benefits and schemes"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 transition-colors"
                aria-label="Clear search query"
              >
                <X size={14} />
              </button>
            )}
          </section>

          {/* Eligibility Toggle Switch */}
          <section
            className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2.5"
            aria-label="Eligibility filter toggle"
          >
            <div>
              <span className="text-xs font-bold text-white block">
                Show Only Eligible for Me
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Filtered for {activePersona.name.split(' ')[0]} ({activePersona.roleLabel})
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showOnlyEligible}
              onClick={() => setShowOnlyEligible(!showOnlyEligible)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                showOnlyEligible ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
              aria-label="Toggle eligible only offers"
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  showOnlyEligible ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </section>

          {/* Category Filter Pills */}
          <section aria-label="Filter by category">
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 snap-x no-scrollbar">
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
                        ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-md shadow-emerald-500/20'
                        : `${meta.bg} ${meta.accent} hover:brightness-125`
                    }`}
                    aria-pressed={isActive}
                  >
                    <Icon size={12} />
                    <span>{meta.short}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Recommended Strip (only if no active search and All category) */}
          {!searchQuery.trim() && activeCategory === 'all' && recommendedBenefits.length > 0 && (
            <section aria-label="Recommended for you" className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-emerald-400" />
                  <span>Personalised For You</span>
                </h2>
                <span className="text-[10px] text-slate-500 font-mono">
                  {recommendedBenefits.length} matches
                </span>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 snap-x no-scrollbar">
                {recommendedBenefits.map((b) => {
                  const meta = categoryMeta[b.category] ?? categoryMeta.all;
                  const claimed = isBenefitClaimed(b.id);
                  const active = isBenefitActive(b.id);
                  return (
                    <div
                      key={b.id}
                      onClick={() => handleViewVoucher(b.id)}
                      className="shrink-0 w-60 p-3.5 bg-gradient-to-br from-slate-850 to-slate-900 border border-slate-700/80 rounded-2xl hover:border-emerald-500/40 transition-all snap-start shadow-md cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded border ${meta.bg} ${meta.accent}`}
                        >
                          {meta.short}
                        </span>
                        {claimed ? (
                          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 size={11} /> {active ? 'Enrolled' : 'Claimed'}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-300">
                            {b.cost}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                        {b.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {b.shortDescription}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800">
                        <span>{b.provider.split('·')[0].trim()}</span>
                        <span className="text-emerald-400 font-bold">Details →</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Benefit Cards Feed */}
          <section aria-label="Available benefits list" className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Filter size={13} className="text-emerald-400" />
                <span>
                  {activeCategory === 'all'
                    ? 'All Verified Schemes'
                    : categoryMeta[activeCategory].label}
                </span>
              </h2>
              <span className="text-[10px] text-slate-500 font-mono">
                {visibleBenefits.length} available
              </span>
            </div>

            {visibleBenefits.length === 0 ? (
              <div className="p-8 bg-slate-850/60 border border-dashed border-slate-700 rounded-2xl text-center space-y-2">
                <p className="text-xs text-slate-300 font-bold">No schemes match your criteria</p>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  {searchQuery
                    ? `No schemes found matching "${searchQuery}". Try a different keyword.`
                    : 'No offers currently available for this category and cohort.'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    Clear Search Query
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3.5">
                {visibleBenefits.map((benefit) => {
                  const claimed = isBenefitClaimed(benefit.id);
                  const active = isBenefitActive(benefit.id);
                  const inAge =
                    activePersona.age >= benefit.eligibilityAge.min &&
                    activePersona.age <= benefit.eligibilityAge.max;
                  const roleMatches = benefit.eligibleRoles.includes(activePersona.role);
                  const eligible = inAge && roleMatches;

                  return (
                    <BenefitCard
                      key={benefit.id}
                      benefit={benefit}
                      isClaimed={claimed}
                      isActive={active}
                      isEligible={eligible}
                      onClaim={handleClaim}
                      onOpenWhyModal={(b) => setWhyModalBenefit(b)}
                      onViewVoucher={handleViewVoucher}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Attribution Modal (DPDP Act 2023 Compliance) */}
      <WhySeeingModal
        benefit={whyModalBenefit}
        isOpen={!!whyModalBenefit}
        onClose={() => setWhyModalBenefit(null)}
      />

      {/* Voucher Modal (Procedural QR Visual & Redemption Actions) */}
      <VoucherModal
        benefit={voucherModalBenefit}
        onClose={() => setVoucherModalBenefit(null)}
      />
    </main>
  );
};

export default BenefitsView;
