/**
 * Gen-Young Benefits & Drops Context
 * Path: src/context/BenefitsContext.tsx
 *
 * Owns per-persona benefit claim state, the 4-state Benefits Wallet
 * (Available / Claimed / Active / Expiring), voucher generation matching
 * /^GENY-[A-Z0-9]{6}$/, Friday-Drop inventory, and career quest hook.
 *
 * All state is persisted to localStorage per persona (gen_young_benefits_${personaId}),
 * ensuring total boundary isolation between Priya, Aarav, and Ananya.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react';
import {
  BenefitItem,
  BenefitsContextType,
  ClaimRecord,
  WalletCounts,
  WalletTab,
} from '../types/benefits';
import { FridayDrop } from '../types/drops';
import { mockBenefits, benefitById } from '../data/mockBenefits';
import { mockDrops } from '../data/mockDrops';
import { usePersona } from './PersonaContext';

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

const BenefitsContext = createContext<BenefitsContextType | undefined>(undefined);

/**
 * Generates an uppercase alphanumeric voucher code strictly matching /^GENY-[A-Z0-9]{6}$/.
 * Uses Crockford-inspired legible character subset to eliminate visual ambiguity.
 */
export function generateVoucherCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let suffix = '';
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const values = new Uint32Array(6);
    window.crypto.getRandomValues(values);
    for (let i = 0; i < 6; i++) {
      suffix += chars[values[i] % chars.length];
    }
  } else {
    for (let i = 0; i < 6; i++) {
      suffix += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return `GENY-${suffix}`;
}

/**
 * Calculates calendar days until end-of-day of expiry date.
 */
export function calculateDaysUntilExpiry(expiryDateStr: string): number {
  try {
    const expiryMs = new Date(expiryDateStr + 'T23:59:59').getTime();
    const nowMs = Date.now();
    const diff = Math.ceil((expiryMs - nowMs) / 86400000);
    return Math.max(0, diff);
  } catch {
    return 0;
  }
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
  const activePersonaIdRef = useRef(activePersonaId);
  const storageKey = `gen_young_benefits_${activePersonaId}`;

  const [activeWalletTab, setActiveWalletTab] = useState<WalletTab | null>(null);

  useEffect(() => {
    activePersonaIdRef.current = activePersonaId;
  }, [activePersonaId]);

  const loadState = useCallback((): PersistedState => {
    if (typeof window === 'undefined') return { ...emptyState };
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as PersistedState;
        return {
          benefitClaims: Array.isArray(parsed.benefitClaims)
            ? parsed.benefitClaims.map((c) => ({
                ...c,
                daysUntilExpiry: calculateDaysUntilExpiry(c.expiryDate),
              }))
            : [],
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

  // Re-load cleanly on persona switch with tab reset
  useEffect(() => {
    setState(loadState());
    setActiveWalletTab(null);
  }, [activePersonaId, loadState]);

  // Persist on state change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (err) {
      console.warn(`Error saving benefits state for ${activePersonaId}:`, err);
    }
  }, [state, storageKey, activePersonaId]);

  // ── 1. Derived Collections ──────────────────────────────────
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
    const recIds = new Set(activePersona.recommendedBenefitIds || []);
    return mockBenefits.filter(
      (b) =>
        recIds.has(b.id) ||
        (b.slug && recIds.has(b.slug)) ||
        (b.id === 'b-09' && recIds.has('benefit_nmms_scholarship')) ||
        (b.id === 'b-17' && recIds.has('benefit_sustainability_intern'))
    );
  }, [activePersona.recommendedBenefitIds]);

  // ── 2. Drops with Live Inventory ────────────────────────────
  const drops = useMemo<FridayDrop[]>(() => {
    return mockDrops.map((d) => {
      const persisted = state.dropRemainingStock[d.id];
      const remaining = typeof persisted === 'number' ? persisted : d.remainingStock;
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

  // ── 3. 4-State Wallet Filtering ─────────────────────────────
  const walletBenefits = useCallback(
    (tab: WalletTab): BenefitItem[] => {
      const isClaimedByAnyId = (b: BenefitItem) =>
        state.benefitClaims.some(
          (c) => c.benefitId === b.id || (b.slug && c.benefitId === b.slug)
        );

      switch (tab) {
        case 'available':
          return eligibleBenefits.filter((b) => !isClaimedByAnyId(b));

        case 'claimed':
          return state.benefitClaims
            .filter((c) => !c.isActive)
            .map((c) => benefitById(c.benefitId))
            .filter((b): b is BenefitItem => !!b);

        case 'active':
          return state.benefitClaims
            .filter((c) => c.isActive)
            .map((c) => benefitById(c.benefitId))
            .filter((b): b is BenefitItem => !!b);

        case 'expiring':
          return state.benefitClaims
            .filter((c) => {
              const daysLeft = calculateDaysUntilExpiry(c.expiryDate);
              // Exactly 14 days included (B12-1), 15 days excluded (B12-2), 0 days included (B12-3)
              return daysLeft >= 0 && daysLeft <= 14;
            })
            .map((c) => benefitById(c.benefitId))
            .filter((b): b is BenefitItem => !!b);

        default:
          return [];
      }
    },
    [eligibleBenefits, state.benefitClaims]
  );

  const walletCounts: WalletCounts = useMemo(
    () => ({
      available: walletBenefits('available').length,
      claimed: walletBenefits('claimed').length,
      active: walletBenefits('active').length,
      expiring: walletBenefits('expiring').length,
    }),
    [walletBenefits]
  );

  const isBenefitClaimed = useCallback(
    (id: string) => {
      const b = benefitById(id);
      const targetId = b?.id || id;
      const targetSlug = b?.slug;
      return state.benefitClaims.some(
        (c) => c.benefitId === targetId || (targetSlug && c.benefitId === targetSlug)
      );
    },
    [state.benefitClaims]
  );

  const isBenefitActive = useCallback(
    (id: string) => {
      const b = benefitById(id);
      const targetId = b?.id || id;
      const targetSlug = b?.slug;
      return state.benefitClaims.some(
        (c) => (c.benefitId === targetId || (targetSlug && c.benefitId === targetSlug)) && c.isActive
      );
    },
    [state.benefitClaims]
  );

  const getClaimForBenefit = useCallback(
    (id: string): ClaimRecord | undefined => {
      const b = benefitById(id);
      const targetId = b?.id || id;
      const targetSlug = b?.slug;
      const found = state.benefitClaims.find(
        (c) => c.benefitId === targetId || (targetSlug && c.benefitId === targetSlug)
      );
      if (!found) return undefined;
      return {
        ...found,
        daysUntilExpiry: calculateDaysUntilExpiry(found.expiryDate),
      };
    },
    [state.benefitClaims]
  );

  // ── 4. Benefit Claim State Machine Transition ────────────────
  const claimBenefit = useCallback(
    (benefitId: string): { success: boolean; voucherCode?: string; error?: string } => {
      const benefit = benefitById(benefitId);
      if (!benefit) {
        return { success: false, error: 'Benefit not found.' };
      }

      // Double-claim prevention
      const existing = state.benefitClaims.find(
        (c) => c.benefitId === benefit.id || (benefit.slug && c.benefitId === benefit.slug)
      );
      if (existing) {
        const statusStr = existing.isActive ? 'active' : 'claimed';
        return {
          success: false,
          error: `Benefit is already claimed (status: ${statusStr})`,
        };
      }

      // Demographic eligibility verification
      const inAge =
        activePersona.age >= benefit.eligibilityAge.min &&
        activePersona.age <= benefit.eligibilityAge.max;
      if (!inAge || !benefit.eligibleRoles.includes(activePersona.role)) {
        return {
          success: false,
          error: 'Your profile does not currently meet the eligibility criteria.',
        };
      }

      // Voucher generation: format /^GENY-[A-Z0-9]{6}$/
      const voucherCode = generateVoucherCode();
      const expiryDate = daysFromNowISO(30); // 30-day default validity
      const claim: ClaimRecord = {
        benefitId: benefit.id,
        claimedAt: new Date().toISOString(),
        voucherCode,
        expiryDate,
        daysUntilExpiry: 30,
        // Government schemes auto-activate into enrolled status; others stay in claimed
        isActive: benefit.category === 'govt',
        qrPayload: `geny://voucher/${voucherCode}?benefit=${benefit.id}`,
      };

      // Advance Career Quest step if claiming AI tool (Milestone 4 hook)
      if (benefit.category === 'ai' && typeof window !== 'undefined') {
        try {
          const questKey = `gen_young_quests_${activePersonaIdRef.current}`;
          const currentQuests = JSON.parse(localStorage.getItem(questKey) || '{}');
          if (currentQuests['quest-career']) {
            currentQuests['quest-career'].claim_ai_perk = true;
          } else {
            currentQuests['quest-career'] = { claim_ai_perk: true };
          }
          localStorage.setItem(questKey, JSON.stringify(currentQuests));
        } catch {
          // Ignore non-critical quest hook errors
        }
      }

      setState((prev) => ({
        ...prev,
        benefitClaims: [claim, ...prev.benefitClaims],
      }));

      return { success: true, voucherCode };
    },
    [activePersona, state.benefitClaims]
  );

  // ── 5. Activate Benefit Transition ──────────────────────────
  const activateBenefit = useCallback(
    (benefitId: string): { success: boolean; error?: string } => {
      const benefit = benefitById(benefitId);
      const targetId = benefit?.id || benefitId;

      const claimIndex = state.benefitClaims.findIndex(
        (c) => c.benefitId === targetId || (benefit?.slug && c.benefitId === benefit.slug)
      );
      if (claimIndex === -1) {
        return { success: false, error: 'Benefit claim record not found.' };
      }

      setState((prev) => {
        const updated = [...prev.benefitClaims];
        updated[claimIndex] = {
          ...updated[claimIndex],
          isActive: true,
          activatedAt: new Date().toISOString(),
        };
        return {
          ...prev,
          benefitClaims: updated,
        };
      });

      return { success: true };
    },
    [state.benefitClaims]
  );

  // ── 6. DPDP Explain Eligibility ──────────────────────────────
  const explainEligibility = useCallback(
    (benefitId: string): string => {
      if (!benefitId) {
        throw new Error('Benefit not found');
      }
      const benefit = benefitById(benefitId);
      if (!benefit) {
        throw new Error('Benefit not found');
      }

      const p = activePersona;
      const city = p.location?.city || 'Mumbai';
      const stateName = p.location?.state || 'Maharashtra';

      return (
        'Eligible because: Age ' +
        p.age +
        ' is within [' +
        benefit.eligibilityAge.min +
        '-' +
        benefit.eligibilityAge.max +
        '] and role "' +
        p.role +
        '" matches required roles [' +
        benefit.eligibleRoles.join(', ') +
        ']. Location: ' +
        city +
        ', ' +
        stateName +
        '.'
      );
    },
    [activePersona]
  );

  // ── 7. Friday Drops Actions ──────────────────────────────────
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

      const voucherCode = generateVoucherCode();
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
    activeWalletTab,
    setActiveWalletTab,
    walletCounts,
    walletBenefits,

    claimBenefit,
    activateBenefit,
    isBenefitClaimed,
    isBenefitActive,
    getClaimForBenefit,
    explainEligibility,

    drops,
    claimDrop,
    joinDropWaitlist,
    isDropClaimed,
    isOnDropWaitlist,
    getDropRemainingStock,
    getWaitlistPosition,

    resetDemoState,
  };

  return <BenefitsContext.Provider value={value}>{children}</BenefitsContext.Provider>;
};

export const useBenefits = (): BenefitsContextType => {
  const ctx = useContext(BenefitsContext);
  if (!ctx) {
    throw new Error('useBenefits must be used within a BenefitsProvider');
  }
  return ctx;
};
