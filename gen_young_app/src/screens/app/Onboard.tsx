import React, { useState } from 'react';
import { PhoneFrame } from '../shell/PhoneFrame';

const personas = [
  { id: 'aarav',  name: 'Aarav',  age: 16, city: 'Delhi',     role: 'High-school aspirant', hook: 'Scholarships · UPI · AI tutor',      emoji: '🎒', from: 'from-amber-300',  to: 'to-orange-400' },
  { id: 'aanya',  name: 'Aanya',  age: 21, city: 'Mumbai',    role: 'College student',      hook: 'Internships · AI Plus · Green futures', emoji: '👩🏻‍🎓', from: 'from-pink-300', to: 'to-rose-400' },
  { id: 'ananya', name: 'Ananya', age: 24, city: 'Bengaluru', role: 'Young professional',   hook: 'Zero-fee card · Health cover · Rewards', emoji: '👩🏽‍💼', from: 'from-sky-300',  to: 'to-blue-500' },
];

export const OnboardScreen: React.FC<{ onContinue?: () => void }> = ({ onContinue }) => {
  const [picked, setPicked] = useState('aanya');
  const current = personas.find((p) => p.id === picked)!;
  return (
    <PhoneFrame bg="mesh-navy" statusColor="white" notchColor="bg-black">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-6 top-24 h-28 w-28 animate-float-slower rounded-full bg-leaf-500/30 blur-2xl" />
        <div className="absolute -left-4 bottom-40 h-32 w-32 animate-float-slow rounded-full bg-amber-400/25 blur-2xl" />
      </div>

      <div className="relative px-6 pb-2 pt-3 text-white">
        <div className="font-display text-[30px] font-black leading-none tracking-tighter">
          Gen-<span className="text-shimmer">Young</span>
          <svg width="20" height="20" viewBox="0 0 24 24" className="ml-1 inline align-[-3px]"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#22C55E"/></svg>
        </div>
        <div className="mt-1 font-script text-[24px] font-bold text-amber-200">More opportunities. A brighter you.</div>
      </div>

      <div className="relative px-6 pb-3 pt-2 text-white">
        <div className="font-display text-[26px] font-black leading-tight">Who are you today?</div>
        <div className="mt-1 text-[12.5px] opacity-85">Pick a profile — you can switch anytime ✨</div>
      </div>

      {/* Persona cards */}
      <div className="relative flex flex-col gap-2.5 px-4 pb-2">
        {personas.map((p) => {
          const on = p.id === picked;
          return (
            <button
              key={p.id}
              onClick={() => setPicked(p.id)}
              className={`group relative flex items-center gap-3.5 rounded-[22px] p-3.5 text-left transition-all ${
                on ? 'bg-white text-navy-800 shadow-2xl shadow-black/25 scale-[1.02]' : 'bg-white/8 text-white backdrop-blur border border-white/12'
              }`}
            >
              {on && <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-[24px] bg-gradient-to-br from-leaf-400 via-amber-300 to-pink-400 opacity-90 blur-sm" />}
              <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.from} ${p.to} text-[28px] shadow-lg`}>
                {p.emoji}
              </div>
              <div className="flex-1">
                <div className="font-display text-[17px] font-black tracking-tight">{p.name} · {p.age}</div>
                <div className="text-[11.5px] opacity-85">{p.city} · {p.role}</div>
                <div className={`mt-0.5 text-[11px] font-semibold ${on ? 'text-leaf-700' : 'text-leaf-300 opacity-90'}`}>{p.hook}</div>
              </div>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-[16px] font-black transition ${on ? 'bg-leaf-500 text-white shadow-lg shadow-leaf-500/50' : 'bg-white/12 text-white/60'}`}>
                {on ? '✓' : '→'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Consent */}
      <div className="relative mx-4 mt-3 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/8 p-3 text-white backdrop-blur">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-leaf-500 text-[13px] font-black text-white shadow-glow-emerald">✓</div>
        <div className="text-[11.5px] leading-snug opacity-92">DPDP-compliant matching · <b>no marketing calls</b> · <b>no third-party ad sharing</b>.</div>
      </div>

      {/* CTA */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-6 pt-4">
        <button
          onClick={onContinue}
          className="relative w-full overflow-hidden rounded-[18px] bg-gradient-to-r from-leaf-400 via-leaf-500 to-emerald-500 py-4 text-[16px] font-black text-navy-800 shadow-2xl shadow-leaf-500/40 transition hover:scale-[1.01]"
        >
          <span className="relative">Continue as {current.name} →</span>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
        </button>
        <div className="mt-2.5 text-center text-[11.5px] text-white/80">
          Already a member? <b className="text-amber-200 underline underline-offset-2">Sign in</b>
        </div>
      </div>
    </PhoneFrame>
  );
};
