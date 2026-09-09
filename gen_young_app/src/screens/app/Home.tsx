import React from 'react';
import { PhoneFrame, defaultNav } from '../shell/PhoneFrame';

const chips = [
  { label: 'All',       from: 'from-navy-800',   to: 'to-navy-700',    icon: '▦', dark: true },
  { label: 'Learning',  from: 'from-blue-500',   to: 'to-indigo-600',  icon: '🎓' },
  { label: 'Food',      from: 'from-orange-400', to: 'to-rose-500',    icon: '🍔' },
  { label: 'Travel',    from: 'from-violet-500', to: 'to-fuchsia-600', icon: '✈️' },
  { label: 'Style',     from: 'from-pink-500',   to: 'to-rose-600',    icon: '🛍️' },
  { label: 'Health',    from: 'from-leaf-500',   to: 'to-emerald-600', icon: '❤' },
];

const offers = [
  { tag: 'STUDENT · AI',    title: 'AI Pro Plan',           sub: '1 year free · Google AI',        btn: 'Claim',   from: 'from-sky-500 via-blue-600',   to: 'to-indigo-700', accent: 'bg-amber-400 text-navy-800', emoji: '🤖' },
  { tag: 'LEARN · CERT',    title: 'Sustainability Course', sub: 'Free · certificate · self-paced', btn: 'Enroll', from: 'from-emerald-500 via-leaf-500', to: 'to-teal-600',   accent: 'bg-white text-emerald-700', emoji: '🌱' },
  { tag: 'FOOD · WEEKLY',   title: '₹200 Food Voucher',     sub: 'Popular outlets · 30 days',       btn: 'Grab',   from: 'from-orange-400 via-amber-500', to: 'to-rose-500',   accent: 'bg-white text-orange-600', emoji: '🍔' },
  { tag: 'DROP · FRIDAY',   title: 'Movie Tickets',         sub: 'Flat 50% off · this weekend',     btn: 'Grab',   from: 'from-violet-600 via-fuchsia-600', to: 'to-pink-600',  accent: 'bg-white text-violet-700', emoji: '🎬' },
];

export const HomeScreen: React.FC<{ onNav?: (id: string) => void }> = ({ onNav }) => (
  <PhoneFrame bg="bg-slate-50">
    {/* Header — brand + notification + avatar */}
    <div className="flex items-center justify-between px-5 pb-3 pt-1">
      <div>
        <div className="font-display text-[24px] font-black leading-none">
          Gen-<span className="text-shimmer">Young</span>
          <svg width="14" height="14" viewBox="0 0 24 24" className="ml-1 inline align-[-1px]"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#22C55E"/></svg>
        </div>
        <div className="mt-0.5 font-script text-[16px] text-navy-700">Hey Aanya — your Friday's loaded ✨</div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative rounded-2xl bg-white p-2 shadow-card-soft">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B2A5B" strokeWidth="2"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 003.4 0"/></svg>
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
        <div className="relative">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-300 via-rose-300 to-pink-400 p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-amber-200 to-rose-300 text-[16px] font-black text-navy-800">A</div>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-leaf-500 ring-2 ring-white" />
        </div>
      </div>
    </div>

    {/* Hero — mesh gradient with floating shapes */}
    <div className="relative mx-4 overflow-hidden rounded-[28px] p-5 text-white mesh-navy grainy">
      <div className="absolute -right-6 -top-6 h-32 w-32 animate-float-slow rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-6 h-36 w-36 animate-float-slower rounded-full bg-leaf-500/25 blur-2xl" />
      <div className="relative">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf-400" /> Live · new offers today
        </div>
        <div className="mt-2.5 font-display text-[28px] font-black leading-[0.95] tracking-tight">
          Discover offers<br/><span className="text-leaf-400">made for you.</span>
        </div>
        <div className="mt-2 text-[12.5px] opacity-90">Learn · save · experience · grow.</div>
        <div className="mt-4 flex items-center gap-2">
          <button className="rounded-full bg-white px-4 py-2 text-[12.5px] font-black text-navy-800 shadow-lg shadow-black/20">Explore all →</button>
          <button className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[12.5px] font-bold backdrop-blur">Ask AI ✨</button>
        </div>
      </div>
    </div>

    {/* Streak + XP quickbar */}
    <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
      {[
        { n: '🔥 12', l: 'Day streak', from: 'from-orange-400 to-rose-500' },
        { n: '⚡ 1,240', l: 'Total XP', from: 'from-amber-300 to-amber-500' },
        { n: '🌿 42kg', l: 'CO₂ saved', from: 'from-leaf-400 to-leaf-600' },
      ].map((s) => (
        <div key={s.l} className={`rounded-2xl bg-gradient-to-br p-2.5 text-white shadow-card-soft ${s.from}`}>
          <div className="font-mono-display text-[14px] font-black leading-none">{s.n}</div>
          <div className="mt-1 text-[10px] font-bold opacity-90">{s.l}</div>
        </div>
      ))}
    </div>

    {/* Category chip row — gradient pills */}
    <div className="no-scrollbar mt-4 flex gap-2.5 overflow-x-auto px-4 pb-2">
      {chips.map((c, i) => (
        <div key={c.label} className={`flex shrink-0 flex-col items-center gap-1 ${i === 0 ? '' : ''}`}>
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.from} ${c.to} text-[20px] text-white shadow-lg`} style={{ boxShadow: '0 10px 25px -8px rgba(11,42,91,0.35)' }}>
            {c.icon}
          </div>
          <div className="text-[10.5px] font-extrabold text-navy-800">{c.label}</div>
        </div>
      ))}
    </div>

    {/* Section header */}
    <div className="mt-2 flex items-end justify-between px-5 pb-2">
      <div>
        <div className="font-display text-[18px] font-black leading-none">Featured for you</div>
        <div className="mt-0.5 text-[11px] text-slate-500">4 hand-picked · updated today</div>
      </div>
      <a className="text-[11.5px] font-black text-navy-800">See all →</a>
    </div>

    {/* Offer cards — full-color gradient cards */}
    <div className="grid grid-cols-2 gap-3 px-4">
      {offers.map((o) => (
        <div key={o.title} className={`relative overflow-hidden rounded-[22px] bg-gradient-to-br ${o.from} ${o.to} p-3 text-white shadow-card-soft`}>
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/15 blur-xl" />
          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="rounded-full bg-white/20 px-2 py-0.5 text-[8.5px] font-black tracking-wider backdrop-blur">{o.tag}</div>
              <div className="text-[22px] leading-none">{o.emoji}</div>
            </div>
            <div className="mt-2 font-display text-[15px] font-black leading-tight">{o.title}</div>
            <div className="mt-0.5 text-[10.5px] font-medium opacity-90">{o.sub}</div>
            <button className={`mt-2.5 w-full rounded-xl py-1.5 text-[11px] font-black ${o.accent}`}>{o.btn} →</button>
          </div>
        </div>
      ))}
    </div>

    {/* Green banner */}
    <div className="relative mx-4 mb-24 mt-3 overflow-hidden rounded-[22px] mesh-forest p-4 text-white">
      <div className="absolute -right-4 -top-4 h-24 w-24 animate-float-slow rounded-full bg-leaf-400/25 blur-xl" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur text-[26px]">🌿</div>
        <div className="flex-1">
          <div className="font-display text-[16px] font-black leading-tight">Small steps. Big change.</div>
          <div className="text-[11px] opacity-90">You've saved 42 kg of CO₂ · claim your next badge</div>
        </div>
        <button className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-leaf-800">Open</button>
      </div>
    </div>

    {defaultNav('home', onNav)}
  </PhoneFrame>
);
