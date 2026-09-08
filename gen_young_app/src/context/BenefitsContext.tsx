/**
 * Gen-Young Benefits & Drops Context
 * Path: src/context/BenefitsContext.tsx
 *
 * Owns per-persona benefit claim state, the 4-state Benefits Wallet
 * (Available / Claimed / Active / Expiring), Friday-Drop inventory,
 * double-claim prevention, and waitlist enrolment.
 *
 * All state is persisted to localStorage per persona, so switching
 * personas gives a clean isolated demo.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { BenefitItem, WalletTab } from '../types/benefits';
import { FridayDrop } from '../types/drops';
import { mockBenefits } from '../data/mockBenefits';
import { mockDrops } from '../data/mockDrops';
import { usePersona } from './PersonaContext';

interface ClaimRecord {
  benefitId: string;
  claimedAt: string;
  voucherCode: string;
  expiryDate: string;
  isActive: boolean;
}

interface DropClaimRecord {
  dropId: string;
  claimedAt: string;
  voucherCode: string;
}

interface WaitlistRecord {
  dropId: string;
  joinedAt: string;
  position: number;
}

interface PersistedState {
  benefitClaims: ClaimRecord[];
  dropRemainingStock: Record<string, number>;
  dropClaims: DropClaimRecord[];
  dropWaitlist: WaitlistRecord[];
}

const emptyState: PersistedState = {
  benefitClaims: [],
  dropRemainingStock: {},
  dropClaims: [],
  dropWaitlist: [],
};

interface BenefitsContextType {
  // Benefits
  allBenefits: BenefitItem[];
  eligibleBenefits: BenefitItem[];
  recommendedBenefits: BenefitItem[];
  claimBenefit: (benefitId: string) => { success: boolean; voucherCode?: string; error?: string };
  isBenefitClaimed: (benefitId: string) => boolean;
  getClaimForBenefit: (benefitId: string) => ClaimRecord | undefined;
  walletCounts: Record<WalletTab, number>;
  walletBenefits: (tab: WalletTab) => BenefitItem[];

  // Drops
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

const BenefitsContext = createContext<BenefitsContextType | undefined>(undefined);

function generateVoucherCode(prefix: string): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return `${prefix}-${code}`;
}

function daysFromNowISO(days: number): string {
  const d = new Date(Date.now() + days * 86400000);
  return d.toISOString().slice(0, 10);
}

export interface BenefitsProviderProps {
  children: ReactNode;
}

export const BenefitsProvider: React.FC<BenefitsProviderProps> = ({ children }) => {
  const { activePersona, activePersonaId } = usePersona();
  const storageKey = `gen_young_benefits_${activePersonaId}`;

  const loadState = useCallback((): PersistedState => {
    if (typeof window === 'undefined') return { ...emptyState };
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as PersistedState;
        return {
          benefitClaims: Array.isArray(parsed.benefitClaims) ? parsed.benefitClaims : [],
          dropRemainingStock: parsed.dropRemainingStock || {},
          dropClaims: Array.isArray(parsed.dropClaims) ? parsed.dropClaims : [],
          dropWaitlist: Array.isArray(parsed.dropWaitlist) ? parsed.dropWaitlist : [],
        };
      }
    } catch (err) {
      console.warn(`Error loading benefits state for ${activePersonaId}:`, err);
    }
    return { ...emptyState };
  }, [storageKey, activePersonaId]);

  const [state, setState] = useState<PersistedState>(loadState);

  // Re-load on persona switch
  useEffect(() => {
    setState(loadState());
  }, [activePersonaId, loadState]);

  // Persist on every change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (err) {
      console.warn(`Error saving benefits state for ${activePersonaId}:`, err);
    }
  }, [state, storageKey, activePersonaId]);

  // ── Derived collections ──────────────────────────────────
  const eligibleBenefits = useMemo(() => {
    return mockBenefits.filter((b) => {
      const inAgeRange =
        activePersona.age >= b.eligibilityAge.min &&
        activePersona.age <= b.eligibilityAge.max;
      const roleMatches = b.eligibleRoles.includes(activePersona.role);
      return inAgeRange && roleMatches;
    });
  }, [activePersona.age, activePersona.role]);

  const recommendedBenefits = useMemo(() => {
    const recIds = new Set(activePersona.recommendedBenefitIds);
    return mockBenefits.filter((b) => recIds.has(b.id));
  }, [activePersona.recommendedBenefitIds]);

  // ── Drops with hydrated live stock ───────────────────────
  const drops = useMemo<FridayDrop[]>(() => {
    return mockDrops.map((d) => {
      const persisted = state.dropRemainingStock[d.id];
      const remaining =
        typeof persisted === 'number' ? persisted : d.remainingStock;
      const claimRecord = state.dropClaims.find((c) => c.dropId === d.id);
      const waitlistRecord = state.dropWaitlist.find((w) => w.dropId === d.id);
      return {
        ...d,
        remainingStock: Math.max(0, remaining),
        isClaimed: !!claimRecord,
        claimedVoucher: claimRecord?.voucherCode,
        isWaitlisted: !!waitlistRecord,
        waitlistPosition: waitlistRecord?.position,
      };
    });
  }, [state.dropRemainingStock, state.dropClaims, state.dropWaitlist]);

  // ── Wallet helpers ───────────────────────────────────────
  const walletBenefits = useCallback(
    (tab: WalletTab): BenefitItem[] => {
      switch (tab) {
        case 'available':
          return eligibleBenefits.filter(
            (b) => !state.benefitClaims.some((c) => c.benefitId === b.id)
          );
        case 'claimed':
          return state.benefitClaims
            .filter((c) => !c.isActive)
            .map((c) => mockBenefits.find((b) => b.id === c.benefitId))
            .filter((b): b is BenefitItem => !!b);
        case 'active':
          return state.benefitClaims
            .filter((c) => c.isActive)
            .map((c) => mockBenefits.find((b) => b.id === c.benefitId))
            .filter((b): b is BenefitItem => !!b);
        case 'expiring': {
          const twoWeeksFromNow = Date.now() + 14 * 86400000;
          return state.benefitClaims
            .filter((c) => {
              const exp = new Date(c.expiryDate).getTime();
              return exp <= twoWeeksFromNow && exp >= Date.now();
            })
            .map((c) => mockBenefits.find((b) => b.id === c.benefitId))
            .filter((b): b is BenefitItem => !!b);
        }
      }
    },
    [eligibleBenefits, state.benefitClaims]
  );

  const walletCounts: Record<WalletTab, number> = useMemo(
    () => ({
      available: walletBenefits('available').length,
      claimed: walletBenefits('claimed').length,
      active: walletBenefits('active').length,
      expiring: walletBenefits('expiring').length,
    }),
    [walletBenefits]
  );

  const isBenefitClaimed = useCallback(
    (id: string) => state.benefitClaims.some((c) => c.benefitId === id),
    [state.benefitClaims]
  );

  const getClaimForBenefit = useCallback(
    (id: string) => state.benefitClaims.find((c) => c.benefitId === id),
    [state.benefitClaims]
  );

  // ── Benefit claim ────────────────────────────────────────
  const claimBenefit = useCallback(
    (benefitId: string): { success: boolean; voucherCode?: string; error?: string } => {
      const benefit = mockBenefits.find((b) => b.id === benefitId);
      if (!benefit) return { success: false, error: 'Benefit not found.' };

      // Double-claim prevention
      if (state.benefitClaims.some((c) => c.benefitId === benefitId)) {
        return { success: false, error: 'You have already claimed this benefit.' };
      }

      // Eligibility check
      const inAge =
        activePersona.age >= benefit.eligibilityAge.min &&
        activePersona.age <= benefit.eligibilityAge.max;
      if (!inAge || !benefit.eligibleRoles.includes(activePersona.role)) {
        return {
          success: false,
          error: 'Your profile does not currently meet the eligibility criteria.',
        };
      }

      const voucherCode = generateVoucherCode('GY');
      const claim: ClaimRecord = {
        benefitId,
        claimedAt: new Date().toISOString(),
        voucherCode,
        // Government schemes get 6 months, everything else 30 days
        expiryDate: daysFromNowISO(benefit.category === 'govt' ? 180 : 30),
        // Government + insurance become "active" on claim, others stay "claimed"
        isActive: benefit.category === 'govt',
      };

      setState((prev) => ({
        ...prev,
        benefitClaims: [claim, ...prev.benefitClaims],
      }));

      return { success: true, voucherCode };
    },
    [activePersona, state.benefitClaims]
  );

  // ── Drop actions ─────────────────────────────────────────
  const getDropRemainingStock = useCallback(
    (dropId: string) => {
      const persisted = state.dropRemainingStock[dropId];
      if (typeof persisted === 'number') return Math.max(0, persisted);
      const original = mockDrops.find((d) => d.id === dropId);
      return original?.remainingStock || 0;
    },
    [state.dropRemainingStock]
  );

  const isDropClaimed = useCallback(
    (dropId: string) => state.dropClaims.some((c) => c.dropId === dropId),
    [state.dropClaims]
  );

  const isOnDropWaitlist = useCallback(
    (dropId: string) => state.dropWaitlist.some((w) => w.dropId === dropId),
    [state.dropWaitlist]
  );

  const getWaitlistPosition = useCallback(
    (dropId: string) => state.dropWaitlist.find((w) => w.dropId === dropId)?.position,
    [state.dropWaitlist]
  );

  const claimDrop = useCallback(
    (dropId: string): { success: boolean; voucherCode?: string; error?: string } => {
      const drop = mockDrops.find((d) => d.id === dropId);
      if (!drop) return { success: false, error: 'Drop not found.' };
      if (!drop.isLive) return { success: false, error: 'This drop is not live yet.' };

      // Double-claim prevention
      if (state.dropClaims.some((c) => c.dropId === dropId)) {
        return { success: false, error: 'You have already claimed this drop.' };
      }

      const remaining = getDropRemainingStock(dropId);
      if (remaining <= 0) {
        return {
          success: false,
          error: 'Sold out. Join the waitlist for later inventory.',
        };
      }

      const voucherCode = generateVoucherCode('DROP');
      const claim: DropClaimRecord = {
        dropId,
        claimedAt: new Date().toISOString(),
        voucherCode,
      };

      setState((prev) => ({
        ...prev,
        dropRemainingStock: {
          ...prev.dropRemainingStock,
          [dropId]: remaining - 1,
        },
        dropClaims: [claim, ...prev.dropClaims],
        // Auto-remove from waitlist if they were on it
        dropWaitlist: prev.dropWaitlist.filter((w) => w.dropId !== dropId),
      }));

      return { success: true, voucherCode };
    },
    [state.dropClaims, getDropRemainingStock]
  );

  const joinDropWaitlist = useCallback(
    (dropId: string): { success: boolean; position?: number; error?: string } => {
      const drop = mockDrops.find((d) => d.id === dropId);
      if (!drop) return { success: false, error: 'Drop not found.' };

      if (state.dropWaitlist.some((w) => w.dropId === dropId)) {
        return {
          success: false,
          error: 'You are already on the waitlist for this drop.',
        };
      }

      // Simulated waitlist position — deterministic-ish
      const position = Math.floor(1200 + Math.random() * 3800);
      const record: WaitlistRecord = {
        dropId,
        joinedAt: new Date().toISOString(),
        position,
      };

      setState((prev) => ({
        ...prev,
        dropWaitlist: [record, ...prev.dropWaitlist],
      }));

      return { success: true, position };
    },
    [state.dropWaitlist]
  );

  const resetDemoState = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
    setState({ ...emptyState });
  }, [storageKey]);

  const value: BenefitsContextType = {
    allBenefits: mockBenefits,
    eligibleBenefits,
    recommendedBenefits,
    claimBenefit,
    isBenefitClaimed,
    getClaimForBenefit,
    walletCounts,
    walletBenefits,

    drops,
    claimDrop,
    joinDropWaitlist,
    isDropClaimed,
    isOnDropWaitlist,
    getDropRemainingStock,
    getWaitlistPosition,

    resetDemoState,
  };

  return (
    <BenefitsContext.Provider value={value}>{children}</BenefitsContext.Provider>
  );
};

export const useBenefits = (): BenefitsContextType => {
  const ctx = useContext(BenefitsContext);
  if (!ctx) {
    throw new Error('useBenefits must be used within a BenefitsProvider');
  }
  return ctx;
};
