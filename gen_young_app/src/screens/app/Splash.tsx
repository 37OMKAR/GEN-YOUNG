import React from 'react';
import { PhoneFrame } from '../shell/PhoneFrame';

export const SplashScreen: React.FC = () => (
  <PhoneFrame bg="bg-gradient-to-b from-navy-700 to-navy-900" statusColor="white" notchColor="bg-black">
    <div className="flex h-full flex-col items-center justify-center px-10 text-center text-white">
      <div className="relative mb-7 flex h-30 w-30 items-center justify-center rounded-[34px] bg-gradient-to-br from-leaf-500 to-leaf-600 shadow-glow-emerald" style={{ height: 120, width: 120 }}>
        <svg width="70" height="70" viewBox="0 0 24 24"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#fff"/><path d="M4 20L12 12" stroke="#0B2A5B" strokeWidth="1.5" strokeLinecap="round"/></svg>
        <div className="pointer-events-none absolute -inset-2 rounded-[42px] border-2 border-leaf-500/30" />
        <div className="pointer-events-none absolute -inset-[18px] rounded-[52px] border-2 border-leaf-500/15" />
      </div>
      <h1 className="font-display text-[44px] font-bold leading-none">Gen-<span className="text-leaf-500">Young</span></h1>
      <div className="mt-2 font-script text-[22px] text-amber-200">More opportunities. A brighter you.</div>
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <div className="inline-flex gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-500" />
          <span className="h-2 w-2 rounded-full bg-leaf-500/40" />
          <span className="h-2 w-2 rounded-full bg-leaf-500/20" />
        </div>
        <div className="mt-3 text-[11px] font-semibold uppercase tracking-widest opacity-60">Inclusive · Digital · Sustainable</div>
      </div>
    </div>
  </PhoneFrame>
);
