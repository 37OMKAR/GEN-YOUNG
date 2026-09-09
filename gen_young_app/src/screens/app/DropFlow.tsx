import React from 'react';
import { PhoneFrame, BrandHeader } from '../shell/PhoneFrame';

export const DropScreen: React.FC = () => (
  <PhoneFrame bg="bg-slate-50">
    <BrandHeader />
    <div className="relative mx-4 mt-2 overflow-hidden rounded-[28px] mesh-navy grainy p-5 text-center text-white">
      <div className="absolute -right-8 -top-8 h-32 w-32 animate-float-slow rounded-full bg-amber-400/30 blur-2xl" />
      <div className="absolute -bottom-10 -left-8 h-36 w-36 animate-float-slower rounded-full bg-leaf-500/30 blur-2xl" />
      <div className="relative">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10.5px] font-black uppercase tracking-widest backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400 shadow-[0_0_10px_#FBBF24]" /> Get ready
        </div>
        <div className="mt-2 font-display text-[46px] font-black leading-none tracking-tighter">
          Friday <span className="text-shimmer">Drop</span>
        </div>
        <div className="mt-1.5 text-[12.5px] opacity-90">Exclusive weekly drop for Gen-Young</div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[{n:'02',l:'DAYS'},{n:'14',l:'HRS'},{n:'18',l:'MIN'},{n:'32',l:'SEC'}].map((t) => (
            <div key={t.l} className="rounded-2xl border border-white/20 bg-white/10 py-2.5 backdrop-blur">
              <div className="font-mono-display text-[28px] font-black leading-none">{t.n}</div>
              <div className="mt-1 text-[9px] font-black tracking-[0.15em] opacity-80">{t.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-white/15 bg-white/8 p-3.5 text-left backdrop-blur">
          <div className="flex justify-between text-[12px] font-black">
            <span className="flex items-center gap-1.5">🎟️ <b className="font-mono-display text-[15px]">100,000</b> claims live</span>
            <span className="rounded-full bg-leaf-500 px-2 py-0.5 text-[9px] font-black">READY</span>
          </div>
          <div className="mt-0.5 text-[10.5px] opacity-70">First come, first served — no chance, no pay-to-win</div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/18"><div className="h-full w-full bg-gradient-to-r from-amber-300 via-leaf-400 to-leaf-500" /></div>
        </div>
        <button className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 py-3.5 text-[15px] font-black text-navy-800 shadow-lg shadow-amber-500/40">
          🔔 Remind me →
        </button>
        <div className="mt-2 text-[11px] opacity-85">📅 Friday, 10:00 AM · India time</div>
      </div>
    </div>
    <div className="flex items-center justify-between px-5 pb-2 pt-1">
      <div className="text-[15px] font-extrabold">Sneak Peek<div className="mt-0.5 text-[10.5px] font-medium text-slate-500">Here's what's coming…</div></div>
      <a className="text-[12px] font-bold">View All</a>
    </div>
    <div className="grid grid-cols-3 gap-2 px-4 pb-24">
      {[
        { title: 'Free Movie Tickets', emoji: '🍿', bg: 'bg-rose-100', tag: 'ENTERTAINMENT', tagBg: 'bg-violet-100 text-violet-700' },
        { title: '₹200 Food Voucher', emoji: '🍔', bg: 'bg-amber-100', tag: 'FOOD & BEVERAGE', tagBg: 'bg-amber-100 text-amber-800' },
        { title: 'Premium Headphones', emoji: '🎧', bg: 'bg-violet-100', tag: 'LIFESTYLE', tagBg: 'bg-pink-100 text-pink-700' },
      ].map((p) => (
        <div key={p.title} className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-2">
          <div className={`flex h-13 items-center justify-center rounded-lg text-[26px] ${p.bg}`}>{p.emoji}</div>
          <div className={`self-start rounded px-1.5 py-0.5 text-[8px] font-black tracking-wide ${p.tagBg}`}>{p.tag}</div>
          <div className="text-[11px] font-extrabold leading-tight">{p.title}</div>
          <div className="text-[9.5px] font-bold text-slate-400">Coming Soon</div>
        </div>
      ))}
    </div>
  </PhoneFrame>
);

export const DropClaimScreen: React.FC = () => (
  <PhoneFrame bg="bg-gradient-to-b from-navy-800 to-navy-700" statusColor="white" notchColor="bg-black">
    <div className="px-5 pb-5 pt-5 text-center text-white">
      <div className="mx-auto mb-3.5 mt-5 flex h-30 w-30 items-center justify-center rounded-full bg-gradient-radial from-leaf-500 to-leaf-600 shadow-[0_20px_40px_rgba(34,197,94,0.4)]" style={{ height: 120, width: 120 }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l6 6L20 6"/></svg>
      </div>
      <h1 className="font-display text-[32px] font-bold">Claimed!</h1>
      <div className="mt-1.5 text-[13px] opacity-85">Your Friday Drop is safely in your Wallet.</div>
    </div>
    <div className="mx-4 rounded-3xl bg-white p-4 text-navy-800">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-black tracking-wide text-rose-600">ENTERTAINMENT</div>
          <div className="font-display text-[18px] font-bold">Movie Tickets · Flat 50% off</div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-[22px]">🎬</div>
      </div>
      <div className="mt-3 border-t-2 border-dashed border-slate-200 pt-3">
        <div className="text-[11px] font-semibold text-slate-500">Voucher code</div>
        <div className="font-mono font-display text-[22px] font-bold tracking-wider">MOVE-4487-2201</div>
      </div>
      <div className="mt-2.5 flex justify-between text-[11px] text-slate-600"><span>Valid till <b>Sunday, 14 Sep · 11:59 pm</b></span><span>PVR · Inox</span></div>
    </div>
    <div className="mx-4 mt-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 text-white">
      <div className="flex justify-between text-[12px] font-extrabold"><span>Remaining after your claim</span><span>84,213 / 100,000</span></div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/18"><div className="h-full w-[84%] bg-gradient-to-r from-leaf-500 to-leaf-400" /></div>
      <div className="mt-1 text-[10.5px] opacity-75">Live · updated 2 seconds ago</div>
    </div>
    <div className="mt-3 flex gap-2.5 px-4">
      <button className="flex-1 rounded-2xl border border-white/20 bg-white/12 py-3.5 text-[13px] font-extrabold text-white">Add to Calendar</button>
      <button className="flex-1 rounded-2xl bg-leaf-500 py-3.5 text-[13px] font-extrabold text-white">Open Wallet</button>
    </div>
  </PhoneFrame>
);

export const WaitlistScreen: React.FC = () => (
  <PhoneFrame>
    <div className="flex items-center justify-between px-5 pt-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100">‹</div>
      <div className="text-[14px] font-bold">Friday Drop</div>
      <div className="h-8 w-8" />
    </div>
    <div className="mx-4 mt-2 rounded-3xl bg-gradient-to-br from-orange-500 to-rose-600 p-5 text-center text-white">
      <div className="text-[11px] font-black uppercase tracking-wider opacity-90">This week's drop</div>
      <h1 className="mt-1.5 font-display text-[28px] font-bold leading-tight">All 100,000<br/>tickets claimed</h1>
      <div className="mt-1 text-[12px] opacity-90">…in <b>4 min 12 s</b>. That was fast!</div>
      <div className="mt-3.5 h-2 overflow-hidden rounded-full bg-white/25"><div className="h-full w-full bg-white" /></div>
    </div>
    <div className="mx-4 mt-3 rounded-3xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 to-leaf-500 p-3 text-white" style={{ height: 56, width: 56 }}>
          <div className="font-display text-[20px] font-bold">#412</div>
          <div className="text-[8px] tracking-wider opacity-85">IN QUEUE</div>
        </div>
        <div>
          <div className="text-[15px] font-extrabold">You're on the waitlist</div>
          <div className="text-[11.5px] leading-snug text-slate-500">If any tickets are returned or unused, they'll roll to the top of the queue automatically.</div>
        </div>
      </div>
      <div className="mt-3.5 grid grid-cols-3 gap-2.5">
        {[{ n: '7%', l: 'Est. release chance' }, { n: '72h', l: 'Waitlist window' }, { n: '🔔', l: 'Alerts ON' }].map((s) => (
          <div key={s.l} className="rounded-lg bg-slate-100 p-2 text-center">
            <div className="font-display text-[16px] font-bold text-navy-800">{s.n}</div>
            <div className="text-[10px] text-slate-500">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="px-5 pb-2 pt-3 text-[14px] font-extrabold">Coming up next</div>
    <div className="mb-24 flex flex-col gap-2 px-4">
      {[
        { title: 'BEST bus pass · 30 days free', when: 'Wednesday · 10:00 AM', emoji: '🚌', bg: 'bg-blue-100' },
        { title: '₹300 grocery voucher', when: 'Friday · 10:00 AM', emoji: '🛒', bg: 'bg-leaf-100' },
        { title: 'Free coding bootcamp seat', when: 'Next Friday · 10:00 AM', emoji: '💻', bg: 'bg-violet-100' },
      ].map((u) => (
        <div key={u.title} className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-[20px] ${u.bg}`}>{u.emoji}</div>
          <div className="flex-1"><div className="text-[13px] font-extrabold">{u.title}</div><div className="text-[11px] text-slate-500">{u.when}</div></div>
          <button className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-[11px] font-extrabold text-navy-800">Remind</button>
        </div>
      ))}
    </div>
    <div className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-white px-4 pb-6 pt-3.5">
      <button className="w-full rounded-xl bg-leaf-500 py-3.5 text-[14px] font-extrabold text-white">Notify me instantly</button>
    </div>
  </PhoneFrame>
);

export const GreenScreen: React.FC = () => (
  <PhoneFrame bg="bg-gradient-to-b from-leaf-50 to-leaf-100">
    <div className="flex items-center justify-between px-5 pb-2 pt-1">
      <div>
        <div className="font-display text-[20px] font-bold">Green Passport <svg width="14" height="14" viewBox="0 0 24 24" className="inline align-[-2px]"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#22C55E"/></svg></div>
        <div className="text-[11.5px] font-semibold text-leaf-800">Small steps · Big change</div>
      </div>
      <div className="h-8 w-8 rounded-full border-2 border-leaf-500 bg-gradient-to-br from-amber-200 to-rose-300" />
    </div>
    <div className="relative mx-4 mt-2 overflow-hidden rounded-3xl bg-gradient-to-br from-leaf-800 to-leaf-500 p-4 text-white">
      <div className="pointer-events-none absolute -right-5 -top-5 h-36 w-36 rounded-full bg-white/8" />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-black uppercase tracking-wider opacity-85">Your impact</div>
          <div className="font-display text-[32px] font-bold leading-none">128 <span className="text-[14px] font-bold opacity-85">green actions</span></div>
          <div className="mt-1.5 text-[11.5px] opacity-90">≈ 42 kg CO₂ saved this year</div>
        </div>
        <svg width="52" height="52" viewBox="0 0 24 24"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#FDE68A"/></svg>
      </div>
      <div className="mt-3">
        <div className="mb-1 flex justify-between text-[11px] font-bold"><span>Level 3 · Climate Learner</span><span>640 / 1000 XP</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full w-[64%] bg-gradient-to-r from-amber-200 to-amber-400" /></div>
      </div>
    </div>
    <div className="flex items-center justify-between px-5 pb-2 pt-3"><div className="text-[14px] font-extrabold">Verifiable badges</div><a className="text-[12px] font-bold">View wallet</a></div>
    <div className="grid grid-cols-4 gap-2 px-4 pb-3">
      {[
        { name: 'Climate Learner', emoji: '🌍', bg: 'bg-leaf-100', ring: 'border-leaf-500' },
        { name: 'Circular Explorer', emoji: '♻️', bg: 'bg-blue-100', ring: 'border-blue-500' },
        { name: 'Sustainable Finance', emoji: '💚', bg: 'bg-amber-100', ring: 'border-amber-500' },
        { name: 'Digital First', emoji: '📱', bg: 'bg-violet-100', ring: 'border-violet-500' },
      ].map((b) => (
        <div key={b.name} className="rounded-2xl border border-slate-200 bg-white p-2.5 text-center">
          <div className={`mx-auto mb-1.5 flex h-11 w-11 items-center justify-center rounded-full border-2 text-[22px] ${b.bg} ${b.ring}`}>{b.emoji}</div>
          <div className="text-[10px] font-extrabold leading-tight text-navy-800">{b.name}</div>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between px-5 pb-2"><div className="text-[14px] font-extrabold">Today's green actions</div><span className="rounded-full bg-leaf-100 px-2 py-1 text-[10.5px] font-black text-leaf-800">🔥 12 day streak</span></div>
    <div className="flex flex-col gap-2 px-4 pb-2">
      {[
        { title: 'Go paperless on statements', sub: 'One-tap opt-in', xp: 20, emoji: '📄', bg: 'bg-blue-500', btn: 'Enable', btnBg: 'bg-leaf-500' },
        { title: 'UN SDG mini-quiz', sub: '5 questions · 2 min', xp: 15, emoji: '🎯', bg: 'bg-amber-500', btn: 'Start', btnBg: 'bg-navy-800' },
        { title: 'Share a green tip', sub: 'Post to community feed', xp: 10, emoji: '💬', bg: 'bg-violet-600', btn: 'Share', btnBg: 'bg-leaf-500' },
      ].map((a) => (
        <div key={a.title} className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-[16px] text-white ${a.bg}`}>{a.emoji}</div>
          <div className="flex-1"><div className="text-[13px] font-extrabold">{a.title}</div><div className="text-[10.5px] text-slate-500">+{a.xp} XP · {a.sub}</div></div>
          <button className={`rounded-lg px-3 py-1.5 text-[11px] font-extrabold text-white ${a.btnBg}`}>{a.btn}</button>
        </div>
      ))}
    </div>
    <div className="mx-4 mb-24 mt-1 grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-3">
      {[{n:'42',l:'kg CO₂ saved'},{n:'128',l:'paperless statements'},{n:'9',l:'green courses'}].map((m) => (
        <div key={m.l} className="text-center">
          <div className="font-display text-[18px] font-bold text-leaf-600">{m.n}</div>
          <div className="text-[10px] font-semibold leading-tight text-slate-600">{m.l}</div>
        </div>
      ))}
    </div>
  </PhoneFrame>
);
