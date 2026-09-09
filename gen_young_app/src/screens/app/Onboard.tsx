import React, { useState } from 'react';
import { PhoneFrame } from '../shell/PhoneFrame';

const personas = [
  { id: 'aarav', name: 'Aarav', age: 16, city: 'Delhi', role: 'High-school aspirant', hook: 'Scholarships · UPI · AI tutor', emoji: '🎒', avatar: 'from-amber-200 to-amber-100' },
  { id: 'aanya', name: 'Aanya', age: 21, city: 'Mumbai', role: 'College student', hook: 'Internships · AI Plus · Green futures', emoji: '👩🏻‍🎓', avatar: 'from-rose-300 to-rose-200' },
  { id: 'ananya', name: 'Ananya', age: 24, city: 'Bengaluru', role: 'Young professional', hook: 'Zero-fee card · Health cover · Rewards', emoji: '👩🏽‍💼', avatar: 'from-sky-300 to-sky-200' },
];

export const OnboardScreen: React.FC<{ onContinue?: () => void }> = ({ onContinue }) => {
  const [picked, setPicked] = useState('aanya');
  const current = personas.find((p) => p.id === picked)!;
  return (
    <PhoneFrame bg="bg-gradient-to-br from-navy-800 via-navy-700 to-leaf-600/40" statusColor="white" notchColor="bg-black">
      <div className="px-6 pb-3 pt-3 text-white">
        <div className="font-display text-[26px] font-bold">Gen-<span className="text-leaf-500">Young</span> <svg width="16" height="16" viewBox="0 0 24 24" className="inline align-[-2px]"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#22C55E"/></svg></div>
        <div className="mt-0.5 font-script text-[22px] text-amber-200">More opportunities. A brighter you.</div>
      </div>
      <div className="px-6 pb-3 text-white">
        <div className="text-[22px] font-extrabold leading-tight">Who are you today?</div>
        <div className="mt-1 text-[12.5px] opacity-85">Pick a profile. You can switch anytime.</div>
      </div>
      <div className="flex flex-col gap-2.5 px-4 pb-2">
        {personas.map((p) => {
          const on = p.id === picked;
          return (
            <button
              key={p.id}
              onClick={() => setPicked(p.id)}
              className={`flex items-center gap-3.5 rounded-2xl border-2 p-3.5 text-left transition ${
                on ? 'border-leaf-500 bg-white text-navy-800' : 'border-white/15 bg-white/10 text-white'
              }`}
            >
              <div className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br text-[26px] ${p.avatar}`} style={{ height: 52, width: 52 }}>
                {p.emoji}
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-extrabold">{p.name} · {p.age}</div>
                <div className="text-[11.5px] opacity-85">{p.city} · {p.role}</div>
                <div className="mt-0.5 text-[11px] opacity-75">{p.hook}</div>
              </div>
              <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[13px] font-black ${on ? 'bg-leaf-500 text-white' : 'bg-white/15 text-white/60'}`}>
                {on ? '✓' : ''}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mx-4 mt-3 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 p-3 text-white">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-leaf-500 text-[11px] font-black">✓</div>
        <div className="text-[11.5px] opacity-90">I agree to DPDP-compliant profile matching. No marketing calls. No third-party ad sharing.</div>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-4 pb-6 pt-3.5">
        <button onClick={onContinue} className="w-full rounded-2xl bg-leaf-500 py-4 text-[15px] font-black text-navy-800 transition hover:bg-leaf-400">
          Continue as {current.name} →
        </button>
        <div className="mt-2 text-center text-[11.5px] text-white/80">Already a member? <b className="text-amber-200">Sign in</b></div>
      </div>
    </PhoneFrame>
  );
};
