import React from 'react';
import { PhoneFrame } from '../shell/PhoneFrame';

export const SplashScreen: React.FC = () => (
  <PhoneFrame bg="mesh-berry" statusColor="white" notchColor="bg-black">
    {/* Floating orbs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-10 top-20 h-24 w-24 animate-float-slow rounded-full bg-leaf-500/40 blur-2xl" />
      <div className="absolute right-8 top-40 h-32 w-32 animate-float-slower rounded-full bg-amber-400/40 blur-2xl" />
      <div className="absolute bottom-40 left-16 h-28 w-28 animate-float-slow rounded-full bg-pink-500/40 blur-2xl" />
    </div>

    <div className="relative flex h-full flex-col items-center justify-center px-10 text-center text-white">
      {/* Logo mark */}
      <div className="relative mb-8">
        <div className="absolute inset-0 -m-6 rounded-full bg-leaf-500/20 blur-2xl" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-[38px] bg-gradient-to-br from-leaf-400 via-emerald-500 to-leaf-700 shadow-2xl shadow-leaf-500/40">
          <div className="absolute inset-1 rounded-[34px] bg-gradient-to-br from-white/25 to-transparent" />
          <svg width="70" height="70" viewBox="0 0 24 24" className="relative"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#fff"/><path d="M4 20L12 12" stroke="#0B2A5B" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <div className="absolute -inset-3 rounded-[42px] border-2 border-leaf-400/40 animate-pulse-ring" />
        </div>
      </div>

      <h1 className="font-display text-[52px] font-black leading-none tracking-tighter">
        Gen-<span className="text-shimmer">Young</span>
      </h1>
      <div className="mt-3 font-script text-[26px] font-bold text-amber-200">More opportunities.</div>
      <div className="font-script text-[26px] font-bold text-leaf-300">A brighter you.</div>

      {/* Loading */}
      <div className="absolute bottom-14 left-0 right-0 text-center">
        <div className="inline-flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-leaf-400 shadow-[0_0_10px_#22C55E] animate-pulse" style={{ animationDelay: '0s' }} />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_10px_#FBBF24] animate-pulse" style={{ animationDelay: '0.2s' }} />
          <span className="h-2.5 w-2.5 rounded-full bg-pink-400 shadow-[0_0_10px_#F472B6] animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        <div className="mt-4 text-[10.5px] font-black uppercase tracking-[0.3em] opacity-70">Inclusive · Digital · Sustainable</div>
      </div>
    </div>
  </PhoneFrame>
);
