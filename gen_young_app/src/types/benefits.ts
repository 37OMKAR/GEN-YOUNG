/**
 * Gen-Young Benefits & Wallet Types & Interfaces
 * Path: src/types/benefits.ts
 *
 * Adheres strictly to PROJECT.md (§ Interface Contracts, lines 83–107),
 * ORIGINAL_REQUEST.md (§ R2), and automated E2E test suites (Tier 1–4).
 */

import { FridayDrop } from './drops';

// ── Category & Cost Types ──────────────────────────────────────
export type BenefitCategory =
  | 'govt'        // Government Schemes & Social Security
  | 'ai'          // AI Tools & High-Performance Compute
  | 'education'   // Education, Certifications & Exam Prep
  | 'career'      // Career, Apprenticeships & Financial Tools
  | 'health'      // Health, Wellness & Telemedicine
  | 'lifestyle';  // Lifestyle, Transit & Culture

export type BenefitCost = 'Free' | 'Subsidized' | 'Paid';

export type CostTag =
  | '100% Free'    // Zero fee, zero renewal (e.g. SATHEE, NMMS)
  | 'Discounted'   // Reduced student/youth pricing (e.g. Cult.fit, Practo)
  | 'Freemium'     // Free introductory/trial period with later renewal (e.g. Google AI Plus)
  | 'Subsidized';  // Government co-pay or institutional concession (e.g. PMJJBY, PMSBY, Metro Pass)

export type WalletTab = 'available' | 'claimed' | 'active' | 'expiring';

// ── Detailed Eligibility Criteria ─────────────────────────────
export interface EligibilityCriteria {
  ageMin: number;
  ageMax: number;
  allowedCohorts: ('student' | 'aspirant' | 'professional')[];
  studentOnly?: boolean;
  minorAllowed?: boolean;
  genderRestriction?: 'all' | 'female' | 'male';
  applicableStates?: string[]; // e.g. ['Maharashtra', 'All-India']
  applicableCities?: string[]; // e.g. ['Mumbai', 'All']
  incomeCeilingInrAnnual?: number;
  institutionTypes?: string[];
  requiredDocuments?: string[]; // e.g. ['Aadhaar', 'College ID', 'Income Certificate']
}

// ── Renewal & Post-Trial Transparency ──────────────────────────
export interface RenewalInfo {
  hasRenewalCost: boolean;
  renewalAmount?: number; // In INR, e.g. 499 or 436
  renewalFrequency?: 'monthly' | 'annual' | 'quarterly';
  trialPeriodDays?: number; // e.g. 365 days
  renewalMonth?: string; // e.g. 'May'
  cancellationWindowDays?: number; // e.g. 30 days
  warningText?: string;
}

// ── Standard 5 Questions Content Structure ─────────────────────
export interface Standard5Questions {
  q1WhatIsIt: string;          // 1 · What is it?
  q2WhoIsItFor: string;        // 2 · Who is it for?
  q3WhatDoYouGet: string;      // 3 · What do you get?
  q4WhatAreConditions: string; // 4 · What are the conditions?
  q5HowToClaim: string;        // 5 · How to claim?
}

// ── Full Canonical Benefit Scheme Interface ────────────────────
export interface BenefitItem {
  id: string;                                    // Canonical ID (e.g. 'b-01')
  slug?: string;                                 // Semantic slug alias (e.g. 'benefit_google_ai_plus')
  title: string;
  category: BenefitCategory;
  provider: string;
  cost: BenefitCost;                            // 'Free' | 'Subsidized' | 'Paid'
  costTag?: CostTag;                             // '100% Free' | 'Discounted' | 'Freemium' | 'Subsidized'
  costDetails?: string;
  futureCostWarning?: string;                    // Warning banner text
  renewalInfo?: RenewalInfo;                     // Structured renewal info
  shortDescription: string;                      // <= 200 chars
  fullDescription: string;
  whySeeingThis: string;                         // Match explanation
  verifiedDate: string;                          // ISO YYYY-MM-DD
  actionLabel: string;                           // <= 30 chars
  eligibilityAge: { min: number; max: number };
  eligibleRoles: ('student' | 'aspirant' | 'professional')[];
  eligibilityCriteria?: EligibilityCriteria;
  fiveQuestions?: Standard5Questions;
  claimedStatus: 'unclaimed' | 'claimed' | 'active';
  voucherCode?: string;
  expiryDate?: string;
  daysUntilExpiry?: number;
}

// ── Claim & Wallet Record ─────────────────────────────────────
export interface ClaimRecord {
  benefitId: string;
  claimedAt: string;        // ISO 8601 string
  voucherCode: string;      // Pattern: /^GENY-[A-Z0-9]{6}$/
  expiryDate: string;       // YYYY-MM-DD
  daysUntilExpiry: number;  // Dynamic integer
  isActive: boolean;        // false = claimed, true = active/redeemed
  activatedAt?: string;     // ISO 8601 string when activated
  qrPayload: string;        // URI for QR rendering
}

export type WalletCounts = Record<WalletTab, number>;

// ── Benefits Context Type Contract ────────────────────────────
export interface BenefitsContextType {
  // Benefits Catalog & State
  allBenefits: BenefitItem[];
  eligibleBenefits: BenefitItem[];
  recommendedBenefits: BenefitItem[];
  activeWalletTab: WalletTab | null;
  setActiveWalletTab: (tab: WalletTab | null) => void;
  walletCounts: WalletCounts;
  walletBenefits: (tab: WalletTab) => BenefitItem[];

  // Lifecycle State Transitions
  claimBenefit: (benefitId: string) => {
    success: boolean;
    voucherCode?: string;
    error?: string;
  };
  activateBenefit: (benefitId: string) => {
    success: boolean;
    error?: string;
  };
  isBenefitClaimed: (benefitId: string) => boolean;
  isBenefitActive: (benefitId: string) => boolean;
  getClaimForBenefit: (benefitId: string) => ClaimRecord | undefined;
  explainEligibility: (benefitId: string) => string;

  // Friday Drops Integration (M3)
  drops: FridayDrop[];
  claimDrop: (dropId: string) => { success: boolean; voucherCode?: string; error?: string };
  joinDropWaitlist: (dropId: string) => { success: boolean; position?: number; error?: string };
  isDropClaimed: (dropId: string) => boolean;
  isOnDropWaitlist: (dropId: string) => boolean;
  getDropRemainingStock: (dropId: string) => number;
  getWaitlistPosition: (dropId: string) => number | undefined;

  // Utility
  resetDemoState: () => void;
}
