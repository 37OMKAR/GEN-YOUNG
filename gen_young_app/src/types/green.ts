/**
 * Gen-Young Green Passport Types
 * Path: src/types/green.ts
 */

export interface GreenPassport {
  paperlessStatementsMonths: number;
  quizzesCompleted: number;
  coursesCompleted: number;
  carbonOffsetKg: number;
  badges: { id: string; name: string; earnedDate?: string; isUnlocked: boolean; icon: string }[];
}
