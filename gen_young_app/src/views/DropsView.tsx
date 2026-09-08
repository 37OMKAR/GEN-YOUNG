import React from 'react';
import { Flame, Clock, Ticket } from 'lucide-react';

export const DropsView: React.FC = () => {
  return (
    <main className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Flame className="text-amber-400" size={20} />
          <h1 className="text-lg font-bold text-white tracking-tight">Friday 10 AM Drops</h1>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Limited-inventory youth perks without chance or pay-to-win mechanics
        </p>
      </div>

      {/* Hero Drop Card */}
      <div className="bg-gradient-to-br from-amber-950/40 via-slate-850 to-slate-900 border border-amber-500/30 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] bg-amber-500 text-slate-950 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
            UPCOMING DROP
          </span>
          <div className="flex items-center gap-1 text-xs text-amber-400 font-mono font-bold">
            <Clock size={13} />
            <span>Friday 10:00 AM IST</span>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold text-white">National Cinema Youth Pass</h2>
          <p className="text-xs text-slate-300 mt-1">
            Complimentary movie tickets for students and young professionals across India.
          </p>
        </div>

        {/* Inventory preview */}
        <div className="pt-2 border-t border-slate-700/50">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Total Stock</span>
            <span className="font-mono font-bold text-white">100,000 passes</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-2 rounded-full w-full" />
          </div>
        </div>
      </div>

      {/* Upcoming Drop Teasers */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Next in Pipeline</h3>
        {[
          { title: 'Zomato Campus Dining Voucher (₹250)', date: 'Coming Next Friday', icon: Ticket },
          { title: 'GitHub Student Pack Exclusive Swag', date: 'Sept 25, 2026', icon: Flame },
        ].map((d, i) => {
          const Icon = d.icon;
          return (
            <div
              key={i}
              className="p-3 bg-slate-850 border border-slate-700/60 rounded-xl flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Icon size={16} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">{d.title}</span>
                  <span className="text-[10px] text-slate-400">{d.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone 3 Staging Notice */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-center">
        <span className="text-xs font-bold text-amber-400 block">
          Synchronized Real-Time Countdown & Instant Claim Engine
        </span>
        <span className="text-[11px] text-slate-300 mt-1 block">
          Atomic claim decrements, waitlist queuing, and live capacity meters will be activated in Milestone 3.
        </span>
      </div>
    </main>
  );
};
