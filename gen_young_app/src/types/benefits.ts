/**
 * Gen-Young Benefits Types & Interfaces
 * Path: src/types/benefits.ts
 */

export type BenefitCategory = 'govt' | 'ai' | 'education' | 'career' | 'health' | 'lifestyle';
export type BenefitCost = 'Free' | 'Subsidized' | 'Paid';
export type WalletTab = 'available' | 'claimed' | 'active' | 'expiring';

export interface BenefitItem {
  id: string;
  title: string;
  category: BenefitCategory;
  provider: string;
  cost: BenefitCost;
  costDetails?: string;
  futureCostWarning?: string;
  shortDescription: string;
  fullDescription: string;
  whySeeingThis: string;
  verifiedDate: string;
  actionLabel: string;
  eligibilityAge: { min: number; max: number };
  eligibleRoles: ('student' | 'aspirant' | 'professional')[];
  claimedStatus: 'unclaimed' | 'claimed' | 'active';
  voucherCode?: string;
  expiryDate?: string;
}
