/**
 * Gen-Young Persona Types & Interfaces
 * Authoritative specification for Milestone 1 (R1 Dynamic Persona Switcher)
 * Path: src/types/persona.ts
 */

import { BankAccount } from './banking';

export type PersonaId = 'priya' | 'aarav' | 'ananya';

export type PersonaRole = 'student' | 'aspirant' | 'professional';

export interface PersonaCoordinates {
  lat: number;
  lng: number;
  accuracy: number; // in meters (e.g. 5)
}

export interface PersonaLocation {
  city: string;
  state: string;
  locality: string;
  pincode: string;
  coordinates: PersonaCoordinates;
}

export interface GuardianInfo {
  name: string;
  relation: string; // e.g. "Father / Legal Guardian"
  phone: string;
  email: string;
  linkedSince: string;
  coSignLimit: number; // e.g. 1000 INR
  guardianOversightActive: boolean;
}

export interface TrustedContact {
  id: string;
  name: string;
  relation: string; // e.g. "Mother", "Father", "Best Friend", "Hostel Warden"
  phone: string;
  isPrimary: boolean;
}

export interface GreenProfile {
  paperlessOpted: boolean;
  paperlessMonths: number;
  carbonOffsetKg: number;
  unSdgCoursesCompleted: number;
  unlockedBadges: string[]; // ['climate_learner', 'circular_economy', 'digital_first']
}

export interface LearningProfile {
  level: 1 | 2 | 3;
  levelTitle: string; // "Financial Novice" | "Money Explorer" | "Youth Master"
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  completedModuleIds: string[];
  completedQuizIds: string[];
}

export interface UserPersona {
  id: PersonaId;
  name: string;
  age: number;
  gender: 'female' | 'male' | 'non-binary';
  role: PersonaRole;
  roleLabel: string; // e.g. "College Senior (B.Tech CS)"
  tagline: string;
  bio: string;
  institutionOrCompany: string;
  avatarUrl: string;
  avatarInitials: string;
  isMinor: boolean;
  guardianName?: string;
  location: PersonaLocation;
  guardian?: GuardianInfo;
  trustedContacts: TrustedContact[];
  initialBankAccount: BankAccount;
  greenProfile: GreenProfile;
  learningProfile: LearningProfile;
  recommendedBenefitIds: string[];
  eligibleBenefitCategories: string[];
  // Compatibility field
  bankAccount?: BankAccount;
}

export interface PersonaContextType {
  activePersona: UserPersona;
  availablePersonas: UserPersona[];
  activePersonaId: PersonaId;
  switchPersona: (personaId: string) => void;
  isMinor: boolean;
}
