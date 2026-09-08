/**
 * Gen-Young Friday Drops View — Demo-Ready
 * Path: src/views/DropsView.tsx
 *
 * Live 100ms countdown, inventory bar tied to atomic claim decrements,
 * double-claim prevention, waitlist enrolment with visible position,
 * and voucher-code reveal on successful claim.
 *
 * Reflects docs/assets/06-friday-drops.png.
 */

import React, { useEffect, useState } from 'react';
import {
  Flame,
  Clock,
  Ticket,
  Copy,
  Check,
  BellRing,
  Users,
  Sparkles,
} from 'lucide-react';
import { useBenefits } from '../context/BenefitsContext';
import { useToast } from '../context/ToastContext';
import { FridayDrop } from '../types/drops';

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

function computeCountdown(target: string): CountdownParts {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, isLive: false };
}

const CountdownCell: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="text-center px-2 py-1.5 rounded-lg bg-slate-950/60 border border-amber-500/30 min-w-[52px]">
    <span className="block text-lg font-extrabold text-white font-mono tabular-nums">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="block text-[9px] uppercase tracking-wider text-amber-300">{label}</span>
  </div>
);

interface DropCardProps {
  drop: FridayDrop;
  onClaim: () => void;
  onWaitlist: () => void;
  onCopy: (code: string) => void;
  copiedCodeId: string | null;
}

const DropCard: React.FC<DropCardProps> = ({
  drop,
  onClaim,
  onWaitlist,
  onCopy,
  copiedCodeId,
}) => {
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    computeCountdown(drop.dropTime)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(computeCountdown(drop.dropTime));
    }, 1000);
    return () => clearInterval(id);
  }, [drop.dropTime]);

  const stockPct = Math.max(
    0,
    Math.min(100, Math.round((drop.remainingStock / drop.totalStock) * 100))
  );
  const stockColor =
    stockPct > 40
      ? 'from-emerald-500 to-teal-500'
      : stockPct > 10
        ? 'from-amber-500 to-rose-500'
        : 'from-rose-500 to-red-600';

  const isEffectivelyLive = drop.isLive || countdown.isLive;
  const soldOut = drop.remainingStock <= 0;

  return (
    <article className="bg-gradient-to-br from-amber-950/30 via-slate-850 to-slate-900 border border-amber-500/30 rounded-2xl p-4 shadow-xl space-y-3">
      {/* Status row */}
      <header className="flex items-center justify-between">
        <span
          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
            isEffectivelyLive
              ? 'bg-emerald-500 text-slate-950 animate-pulse'
              : 'bg-amber-500 text-slate-950'
          }`}
        >
          {isEffectivelyLive ? '● LIVE NOW' : 'Upcoming Drop'}
        </span>
        <div className="flex items-center gap-1 text-xs text-amber-400 font-mono font-bold">
          <Clock size={13} />
          <span>Fri 10:00 AM IST</span>
        </div>
      </header>

      {/* Title */}
      <div>
        <h2 className="text-sm font-bold text-white leading-tight">{drop.title}</h2>
        <p className="text-[11px] text-slate-400 mt-0.5">By {drop.brand}</p>
      </div>

      {/* Countdown OR Live-badge */}
      {isEffectivelyLive ? (
        <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          <Sparkles size={14} className="text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-emerald-300 tracking-wide">
            Drop is live — claim now
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-1">
          <CountdownCell value={countdown.days} label="Days" />
          <CountdownCell value={countdown.hours} label="Hours" />
          <CountdownCell value={countdown.minutes} label="Mins" />
          <CountdownCell value={countdown.seconds} label="Secs" />
        </div>
      )}

      {/* Inventory bar */}
      <div className="pt-2 border-t border-slate-700/50">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400 flex items-center gap-1">
            <Users size={11} />
            Claims remaining
          </span>
          <span className="font-mono font-bold text-white">
            {drop.remainingStock.toLocaleString('en-IN')}{' '}
            <span className="text-slate-500 font-normal">
              / {drop.totalStock.toLocaleString('en-IN')}
            </span>
          </span>
        </div>
        <div
          className="w-full bg-slate-800 rounded-full h-2 overflow-hidden"
          role="progressbar"
          aria-valuenow={stockPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${stockPct}% inventory remaining`}
        >
          <div
            className={`bg-gradient-to-r ${stockColor} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${stockPct}%` }}
          />
        </div>
      </div>

      {/* Action row */}
      <div className="pt-1">
        {drop.isClaimed && drop.claimedVoucher ? (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <Check size={14} className="text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">Claimed successfully</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm font-mono font-bold text-white bg-slate-950/70 border border-emerald-500/30 rounded-lg px-2.5 py-1.5 tracking-widest">
                {drop.claimedVoucher}
              </code>
              <button
                onClick={() => drop.claimedVoucher && onCopy(drop.claimedVoucher)}
                className="w-9 h-9 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 border border-emerald-500/30 text-emerald-300 hover:text-slate-950 flex items-center justify-center transition-colors"
                aria-label="Copy voucher code"
              >
                {copiedCodeId === drop.claimedVoucher ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        ) : drop.isWaitlisted ? (
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <Users size={13} />
              You&apos;re on the waitlist
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              Position <span className="font-mono font-bold text-white">#{drop.waitlistPosition}</span> —
              you&apos;ll be notified if fresh inventory is released.
            </p>
          </div>
        ) : isEffectivelyLive && !soldOut ? (
          <button
            onClick={onClaim}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/25 active:scale-[0.98]"
          >
            <Flame size={14} />
            Claim now
          </button>
        ) : soldOut ? (
          <button
            onClick={onWaitlist}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-bold text-slate-200 transition-colors"
          >
            <Users size={14} />
            Sold out — Join waitlist
          </button>
        ) : (
          <button
            onClick={() => {}}
            disabled
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-sm font-bold text-slate-500 cursor-not-allowed"
          >
            <BellRing size={14} />
            Remind me
          </button>
        )}
      </div>
    </article>
  );
};

export const DropsView: React.FC = () => {
  const { drops, claimDrop, joinDropWaitlist } = useBenefits();
  const { showToast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleClaim = (dropId: string) => {
    const result = claimDrop(dropId);
    if (result.success && result.voucherCode) {
      showToast(`Drop claimed! Voucher: ${result.voucherCode}`, 'success');
    } else {
      showToast(result.error || 'Could not claim.', 'error');
    }
  };

  const handleWaitlist = (dropId: string) => {
    const result = joinDropWaitlist(dropId);
    if (result.success && result.position) {
      showToast(`Joined waitlist — position #${result.position}`, 'success');
    } else {
      showToast(result.error || 'Could not join waitlist.', 'error');
    }
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      showToast('Voucher code copied to clipboard', 'success');
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      showToast('Could not copy voucher code', 'error');
    }
  };

  const liveDrops = drops.filter((d) => d.isLive);
  const upcomingDrops = drops.filter((d) => !d.isLive);

  return (
    <main className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-5">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2">
          <Flame className="text-amber-400" size={20} />
          <h1 className="text-lg font-bold text-white tracking-tight">Friday Drops</h1>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Limited-inventory youth perks · real scarcity, visible rules, fair access
        </p>
      </header>

      {/* Live drops */}
      {liveDrops.length > 0 && (
        <section aria-label="Live drops">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Live Now
            </h2>
          </div>
          <div className="space-y-3">
            {liveDrops.map((drop) => (
              <DropCard
                key={drop.id}
                drop={drop}
                onClaim={() => handleClaim(drop.id)}
                onWaitlist={() => handleWaitlist(drop.id)}
                onCopy={handleCopy}
                copiedCodeId={copiedCode}
              />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming pipeline */}
      {upcomingDrops.length > 0 && (
        <section aria-label="Upcoming drops">
          <div className="flex items-center gap-2 mb-2">
            <Ticket size={14} className="text-slate-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sneak Peek — Coming Up
            </h2>
          </div>
          <div className="space-y-3">
            {upcomingDrops.map((drop) => (
              <DropCard
                key={drop.id}
                drop={drop}
                onClaim={() => handleClaim(drop.id)}
                onWaitlist={() => handleWaitlist(drop.id)}
                onCopy={handleCopy}
                copiedCodeId={copiedCode}
              />
            ))}
          </div>
        </section>
      )}

      {/* Drop-economy explainer footer */}
      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
        <span className="font-bold text-slate-200 block mb-1">How Drops work</span>
        Every Friday at 10 AM, a limited batch of partner-funded offers goes live. Claims decrement
        instantly and are double-claim protected. If a drop is exhausted, you can join the waitlist
        for later-released inventory. No fake urgency — the counter is real.
      </div>
    </main>
  );
};
