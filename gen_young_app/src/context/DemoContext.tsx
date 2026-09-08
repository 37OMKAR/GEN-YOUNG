/**
 * Gen-Young Demo Progress Context
 * Path: src/context/DemoContext.tsx
 *
 * Lightweight per-persona store that tracks Milestone-4/5 demo state:
 *   - quiz results & earned XP
 *   - green passport action log & unlocked badges
 *   - community joins
 *   - insurance activations
 *
 * All state persists to localStorage under one key per persona.
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
import { usePersona } from './PersonaContext';

// ── Types ─────────────────────────────────────────────────
export interface QuizAttempt {
  quizId: string;
  score: number; // 0..1
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  attemptedAt: string;
}

export interface GreenActionRecord {
  id: string;
  actionKey: string;
  label: string;
  points: number;
  loggedAt: string;
}

export interface CommunityJoin {
  communityId: string;
  joinedAt: string;
}

export interface InsuranceActivation {
  planId: string;
  activatedAt: string;
  premiumInr: number;
}

interface PersistedDemoState {
  quizAttempts: QuizAttempt[];
  totalXp: number;
  greenActions: GreenActionRecord[];
  greenPoints: number;
  communityJoins: CommunityJoin[];
  insuranceActivations: InsuranceActivation[];
}

const emptyState: PersistedDemoState = {
  quizAttempts: [],
  totalXp: 0,
  greenActions: [],
  greenPoints: 0,
  communityJoins: [],
  insuranceActivations: [],
};

// ── Green actions catalogue ───────────────────────────────
export const greenActionCatalogue = [
  {
    key: 'public_transport',
    label: 'Use Public Transport',
    detail: 'Log your bus, metro, or shared ride',
    points: 10,
    icon: 'Bus',
    accent: 'text-emerald-300',
  },
  {
    key: 'recycle_ewaste',
    label: 'Recycle E-Waste',
    detail: 'Find your nearest e-waste drop-off',
    points: 25,
    icon: 'Recycle',
    accent: 'text-cyan-300',
  },
  {
    key: 'go_paperless',
    label: 'Go Paperless',
    detail: 'Switch to e-statements & digital receipts',
    points: 15,
    icon: 'FileText',
    accent: 'text-teal-300',
  },
  {
    key: 'save_energy',
    label: 'Save Energy',
    detail: 'Log a monthly reduction in electricity',
    points: 20,
    icon: 'Zap',
    accent: 'text-amber-300',
  },
  {
    key: 'plant_tree',
    label: 'Plant a Tree',
    detail: 'Join local plantation drives',
    points: 50,
    icon: 'Trees',
    accent: 'text-lime-300',
  },
];

export const greenLevels = [
  { level: 1, title: 'Eco Rookie', minPoints: 0 },
  { level: 2, title: 'Green Contributor', minPoints: 100 },
  { level: 3, title: 'Green Champion', minPoints: 300 },
  { level: 4, title: 'Climate Advocate', minPoints: 600 },
  { level: 5, title: 'Sustainability Master', minPoints: 1000 },
];

// ── Communities catalogue ─────────────────────────────────
export const mockCommunities = [
  {
    id: 'tech_ai_for_good',
    name: 'Tech & AI for Good',
    memberCount: 12400,
    description: 'Youth building AI for climate, health, and social good.',
    tag: 'AI',
  },
  {
    id: 'green_champions',
    name: 'Green Champions',
    memberCount: 8100,
    description: 'Track eco-actions together and unlock green Drops.',
    tag: 'Green',
  },
  {
    id: 'study_abroad',
    name: 'Study Abroad',
    memberCount: 15600,
    description: 'Applications, scholarships, and student-visa help.',
    tag: 'Education',
  },
];

export const mockCommunityEvents = [
  {
    id: 'evt_1',
    title: 'Career Talk: Future Skills for India',
    dateLabel: 'SEP 15',
    time: '5:00 PM – 6:00 PM',
    format: 'Online',
  },
  {
    id: 'evt_2',
    title: 'Sustainability Workshop',
    dateLabel: 'SEP 18',
    time: '4:00 PM – 5:30 PM',
    format: 'Online',
  },
  {
    id: 'evt_3',
    title: 'Student Finance 101',
    dateLabel: 'SEP 22',
    time: '6:00 PM – 7:00 PM',
    format: 'Online',
  },
];

// ── Insurance plans catalogue ─────────────────────────────
export const mockInsurancePlans = [
  {
    id: 'ins_health_protect',
    name: 'Health Protect',
    tag: 'Popular',
    tagline: 'Cashless care for a healthier you',
    monthlyInr: 299,
    coverInr: 500000,
    category: 'health',
    hospitalsCount: 7000,
  },
  {
    id: 'ins_life_secure',
    name: 'Life Secure',
    tag: 'Recommended',
    tagline: 'Support for your family\'s tomorrow',
    monthlyInr: 399,
    coverInr: 2500000,
    category: 'life',
    hospitalsCount: 0,
  },
  {
    id: 'ins_travel_safe',
    name: 'Travel Safe',
    tag: 'Trending',
    tagline: 'Because the world is calling',
    monthlyInr: 199,
    coverInr: 300000,
    category: 'travel',
    hospitalsCount: 0,
  },
  {
    id: 'ins_device_care',
    name: 'Device Care',
    tag: 'New',
    tagline: 'Stay connected, always',
    monthlyInr: 149,
    coverInr: 60000,
    category: 'device',
    hospitalsCount: 0,
  },
];

// ── Context type ──────────────────────────────────────────
interface DemoContextType {
  // Quizzes
  totalXp: number;
  quizAttempts: QuizAttempt[];
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'attemptedAt'>) => void;
  isQuizCompleted: (quizId: string) => boolean;

  // Green
  greenPoints: number;
  greenActions: GreenActionRecord[];
  greenLevel: { level: number; title: string; minPoints: number; nextTarget: number };
  logGreenAction: (actionKey: string) => { success: boolean; points?: number };

  // Community
  communityJoins: CommunityJoin[];
  joinCommunity: (communityId: string) => { success: boolean; error?: string };
  leaveCommunity: (communityId: string) => void;
  isCommunityJoined: (communityId: string) => boolean;

  // Insurance
  insuranceActivations: InsuranceActivation[];
  activateInsurance: (planId: string) => { success: boolean; error?: string };
  isPlanActive: (planId: string) => boolean;

  // Reset
  resetDemoProgress: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export interface DemoProviderProps {
  children: ReactNode;
}

export const DemoProvider: React.FC<DemoProviderProps> = ({ children }) => {
  const { activePersonaId } = usePersona();
  const storageKey = `gen_young_demo_${activePersonaId}`;

  const loadState = useCallback((): PersistedDemoState => {
    if (typeof window === 'undefined') return { ...emptyState };
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as PersistedDemoState;
        return {
          quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
          totalXp: typeof parsed.totalXp === 'number' ? parsed.totalXp : 0,
          greenActions: Array.isArray(parsed.greenActions) ? parsed.greenActions : [],
          greenPoints: typeof parsed.greenPoints === 'number' ? parsed.greenPoints : 0,
          communityJoins: Array.isArray(parsed.communityJoins) ? parsed.communityJoins : [],
          insuranceActivations: Array.isArray(parsed.insuranceActivations)
            ? parsed.insuranceActivations
            : [],
        };
      }
    } catch (err) {
      console.warn(`Error loading demo state for ${activePersonaId}:`, err);
    }
    return { ...emptyState };
  }, [storageKey, activePersonaId]);

  const [state, setState] = useState<PersistedDemoState>(loadState);

  useEffect(() => {
    setState(loadState());
  }, [activePersonaId, loadState]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, storageKey]);

  // Derived: green level
  const greenLevel = useMemo(() => {
    const points = state.greenPoints;
    let currentLevel = greenLevels[0];
    for (const level of greenLevels) {
      if (points >= level.minPoints) currentLevel = level;
    }
    const nextLevel = greenLevels.find((l) => l.minPoints > points);
    return {
      ...currentLevel,
      nextTarget: nextLevel?.minPoints ?? currentLevel.minPoints,
    };
  }, [state.greenPoints]);

  // Actions
  const submitQuizAttempt = useCallback(
    (attempt: Omit<QuizAttempt, 'attemptedAt'>) => {
      setState((prev) => ({
        ...prev,
        quizAttempts: [
          { ...attempt, attemptedAt: new Date().toISOString() },
          ...prev.quizAttempts.filter((a) => a.quizId !== attempt.quizId),
        ],
        totalXp: prev.totalXp + attempt.xpEarned,
      }));
    },
    []
  );

  const isQuizCompleted = useCallback(
    (quizId: string) => state.quizAttempts.some((a) => a.quizId === quizId),
    [state.quizAttempts]
  );

  const logGreenAction = useCallback(
    (actionKey: string): { success: boolean; points?: number } => {
      const meta = greenActionCatalogue.find((a) => a.key === actionKey);
      if (!meta) return { success: false };
      const record: GreenActionRecord = {
        id: `ga_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        actionKey,
        label: meta.label,
        points: meta.points,
        loggedAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        greenActions: [record, ...prev.greenActions],
        greenPoints: prev.greenPoints + meta.points,
      }));
      return { success: true, points: meta.points };
    },
    []
  );

  const joinCommunity = useCallback(
    (communityId: string): { success: boolean; error?: string } => {
      if (state.communityJoins.some((j) => j.communityId === communityId)) {
        return { success: false, error: 'Already a member' };
      }
      setState((prev) => ({
        ...prev,
        communityJoins: [
          ...prev.communityJoins,
          { communityId, joinedAt: new Date().toISOString() },
        ],
      }));
      return { success: true };
    },
    [state.communityJoins]
  );

  const leaveCommunity = useCallback((communityId: string) => {
    setState((prev) => ({
      ...prev,
      communityJoins: prev.communityJoins.filter((j) => j.communityId !== communityId),
    }));
  }, []);

  const isCommunityJoined = useCallback(
    (id: string) => state.communityJoins.some((j) => j.communityId === id),
    [state.communityJoins]
  );

  const activateInsurance = useCallback(
    (planId: string): { success: boolean; error?: string } => {
      if (state.insuranceActivations.some((a) => a.planId === planId)) {
        return { success: false, error: 'Plan already active' };
      }
      const plan = mockInsurancePlans.find((p) => p.id === planId);
      if (!plan) return { success: false, error: 'Plan not found' };
      setState((prev) => ({
        ...prev,
        insuranceActivations: [
          ...prev.insuranceActivations,
          {
            planId,
            activatedAt: new Date().toISOString(),
            premiumInr: plan.monthlyInr,
          },
        ],
      }));
      return { success: true };
    },
    [state.insuranceActivations]
  );

  const isPlanActive = useCallback(
    (id: string) => state.insuranceActivations.some((a) => a.planId === id),
    [state.insuranceActivations]
  );

  const resetDemoProgress = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
    setState({ ...emptyState });
  }, [storageKey]);

  const value: DemoContextType = {
    totalXp: state.totalXp,
    quizAttempts: state.quizAttempts,
    submitQuizAttempt,
    isQuizCompleted,

    greenPoints: state.greenPoints,
    greenActions: state.greenActions,
    greenLevel,
    logGreenAction,

    communityJoins: state.communityJoins,
    joinCommunity,
    leaveCommunity,
    isCommunityJoined,

    insuranceActivations: state.insuranceActivations,
    activateInsurance,
    isPlanActive,

    resetDemoProgress,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

export const useDemo = (): DemoContextType => {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within a DemoProvider');
  return ctx;
};
