/**
 * Gen-Young Learning Types
 * Path: src/types/learning.ts
 */

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 1 | 2 | 3;
  durationMinutes: number;
  xpReward: number;
  questions: Question[];
}

export interface QuestStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  steps: QuestStep[];
  perkReward: string;
  isUnlocked: boolean;
}
