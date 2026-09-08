/**
 * Gen-Young Friday Drops Types
 * Path: src/types/drops.ts
 */

export interface FridayDrop {
  id: string;
  title: string;
  brand: string;
  category: 'cinema' | 'dining' | 'tech' | 'course';
  totalStock: number;
  remainingStock: number;
  dropTime: string; // ISO 8601 Friday 10:00 AM
  isLive: boolean;
  isClaimed: boolean;
  isWaitlisted: boolean;
  waitlistPosition?: number;
  claimedVoucher?: string;
}
