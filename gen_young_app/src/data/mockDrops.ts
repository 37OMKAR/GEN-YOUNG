/**
 * Gen-Young Friday Drops — Dummy Live Inventory for Demo
 * Path: src/data/mockDrops.ts
 *
 * Populates the Drop economy shown in docs/assets/06-friday-drops.png with
 * realistic partner offers, live-inventory counters and countdown targets.
 */

import { FridayDrop } from '../types/drops';

/**
 * Compute the ISO timestamp of the next Friday at 10:00 AM local time.
 * If today is Friday before 10 AM, returns today at 10 AM.
 * Otherwise returns the next upcoming Friday at 10 AM.
 */
export function nextFridayAt10AM(fromDate: Date = new Date()): string {
  const target = new Date(fromDate);
  target.setHours(10, 0, 0, 0);
  const currentDay = target.getDay(); // 0 = Sunday, 5 = Friday
  let daysUntilFriday = (5 - currentDay + 7) % 7;
  // If it's already Friday and past 10 AM, jump to next Friday
  if (daysUntilFriday === 0 && fromDate.getTime() >= target.getTime()) {
    daysUntilFriday = 7;
  }
  target.setDate(target.getDate() + daysUntilFriday);
  return target.toISOString();
}

export const mockDrops: FridayDrop[] = [
  {
    id: 'drop_pvr_cinema_pass',
    title: 'PVR Cinema Youth Pass — Any Show, Any Screen',
    brand: 'PVR INOX',
    category: 'cinema',
    totalStock: 100000,
    remainingStock: 27438,
    dropTime: nextFridayAt10AM(),
    isLive: true, // demo-live so users can claim right now
    isClaimed: false,
    isWaitlisted: false,
  },
  {
    id: 'drop_zomato_dining',
    title: 'Zomato ₹250 Campus Dining Voucher',
    brand: 'Zomato',
    category: 'dining',
    totalStock: 50000,
    remainingStock: 50000,
    dropTime: nextFridayAt10AM(),
    isLive: false,
    isClaimed: false,
    isWaitlisted: false,
  },
  {
    id: 'drop_boat_headphones',
    title: 'boAt Rockerz 450 Headphones — 40% Youth Discount',
    brand: 'boAt Lifestyle',
    category: 'tech',
    totalStock: 5000,
    remainingStock: 5000,
    dropTime: nextFridayAt10AM(new Date(Date.now() + 7 * 86400000)),
    isLive: false,
    isClaimed: false,
    isWaitlisted: false,
  },
  {
    id: 'drop_cultfit_elite_pass',
    title: 'Cult.fit 1-Week Free Elite Trial',
    brand: 'Cure.Fit',
    category: 'tech',
    totalStock: 20000,
    remainingStock: 20000,
    dropTime: nextFridayAt10AM(new Date(Date.now() + 7 * 86400000)),
    isLive: false,
    isClaimed: false,
    isWaitlisted: false,
  },
  {
    id: 'drop_dominos_student_feast',
    title: 'Domino\'s Student Feast Bundle — ₹199 Combo',
    brand: 'Domino\'s Pizza India',
    category: 'dining',
    totalStock: 75000,
    remainingStock: 75000,
    dropTime: nextFridayAt10AM(new Date(Date.now() + 14 * 86400000)),
    isLive: false,
    isClaimed: false,
    isWaitlisted: false,
  },
];

export const dropById = (id: string): FridayDrop | undefined =>
  mockDrops.find((d) => d.id === id);
