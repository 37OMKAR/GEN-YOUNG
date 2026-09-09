import React from 'react';
import { PhoneFrame, BrandHeader } from '../shell/PhoneFrame';

/* ========== Learn ========== */
export const LearnScreen: React.FC = () => (
  <PhoneFrame>
    <BrandHeader subtitle="Skills for a Brighter Tomorrow." />
    <div className="px-5 pb-3 pt-1">
      <label className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
        <span className="text-[13px] text-slate-400">Search courses, internships, jobs…</span>
      </label>
    </div>
    <div className="flex gap-2 px-5 pb-2.5">
      {[
        { label: 'All', bg: 'bg-navy-800', fg: 'text-white', icon: '▦' },
        { label: 'Tech & AI', bg: 'bg-blue-100', fg: 'text-blue-700', icon: '⚡' },
        { label: 'Sustainability', bg: 'bg-leaf-100', fg: 'text-leaf-700', icon: '🌱' },
        { label: 'Finance', bg: 'bg-blue-100', fg: 'text-blue-700', icon: '₹' },
        { label: 'Life Skills', bg: 'bg-violet-100', fg: 'text-violet-700', icon: '♥' },
      ].map((c) => (
        <div key={c.label} className="flex flex-1 flex-col items-center gap-1">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${c.bg} ${c.fg} font-black`}>{c.icon}</div>
          <div className="text-[9.5px] font-bold text-slate-600">{c.label}</div>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between px-5 pb-2 pt-1"><div className="text-[15px] font-extrabold">Recommended for You</div><a className="text-[12px] font-bold">See All</a></div>
    <div className="flex flex-col gap-2.5 px-4">
      {[
        { title: 'AI for Everyone', sub: 'Build your future with AI', dur: '4 weeks', emoji: '🤖', bg: 'bg-blue-100' },
        { title: 'Green Skills for a Sustainable India', sub: 'Learn. Contribute. Grow.', dur: '6 weeks', emoji: '🌿', bg: 'bg-leaf-100' },
        { title: 'Financial Literacy', sub: 'Smart choices. Brighter future.', dur: '3 weeks', emoji: '📈', bg: 'bg-amber-100' },
      ].map((k) => (
        <div key={k.title} className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-2.5">
          <div className={`flex h-15 w-17 shrink-0 items-center justify-center rounded-xl text-[28px] ${k.bg}`} style={{ height: 60, width: 68 }}>{k.emoji}</div>
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-extrabold">{k.title}</div>
            <div className="text-[11px] text-slate-500">{k.sub}</div>
            <div className="mt-1.5 flex gap-1.5">
              <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[9.5px] font-bold text-blue-700">Free</span>
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[9.5px] font-bold text-slate-600">⏱ {k.dur}</span>
            </div>
          </div>
          <button className="shrink-0 rounded-xl bg-leaf-500 px-3 py-2 text-[11px] font-extrabold text-white">Start Now</button>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between px-5 pb-2 pt-3.5"><div className="text-[15px] font-extrabold">Featured Internships</div><a className="text-[12px] font-bold">See All</a></div>
    <div className="mb-24 px-4">
      <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-2.5">
        <div className="flex h-13 w-15 items-center justify-center rounded-xl bg-leaf-100 text-[24px]" style={{ height: 54, width: 62 }}>🌱</div>
        <div className="flex-1">
          <div className="text-[13px] font-extrabold">Sustainability Research Intern</div>
          <div className="text-[10.5px] text-slate-500">Build real-world experience</div>
          <div className="mt-0.5 text-[10.5px] font-semibold text-leaf-600">📍 Pan India</div>
        </div>
        <button className="rounded-xl bg-leaf-500 px-3.5 py-2 text-[11px] font-extrabold text-white">Apply</button>
      </div>
    </div>
  </PhoneFrame>
);

/* ========== Finance journey ========== */
export const FinanceScreen: React.FC = () => (
  <PhoneFrame>
    <BrandHeader subtitle="Learn Today. A Brighter Tomorrow." />
    <div className="mx-4 mt-2 flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-3.5">
      <div className="flex-1">
        <div className="font-display text-[18px] font-bold leading-tight">Your Financial<br/>Learning Journey</div>
        <div className="mt-1 text-[11.5px] text-slate-500">Small steps. Big possibilities.</div>
      </div>
      <svg width="74" height="60" viewBox="0 0 74 60">
        <rect x="0" y="45" width="16" height="15" fill="#DBEAFE" rx="2"/>
        <rect x="20" y="30" width="16" height="30" fill="#BFDBFE" rx="2"/>
        <rect x="40" y="15" width="16" height="45" fill="#22C55E" rx="2"/>
        <circle cx="68" cy="10" r="4" fill="#DC2626"/>
      </svg>
    </div>
    <div className="mx-4 mt-3">
      <div className="mb-1.5 flex justify-between"><div className="text-[13px] font-extrabold">Your Progress</div><div className="text-[11.5px] font-black text-leaf-500">Level 2 · 60% complete</div></div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-[60%] bg-gradient-to-r from-leaf-500 to-leaf-400" /></div>
    </div>
    <div className="mx-4 mt-3.5 grid grid-cols-3 gap-2.5">
      {[
        { title: 'Learn', sub: 'Short modules for real life', bg: 'bg-leaf-100', iconBg: 'bg-leaf-600', icon: '🎓' },
        { title: 'Practise', sub: 'Interactive tools and quizzes', bg: 'bg-blue-100', iconBg: 'bg-blue-500', icon: '✎' },
        { title: 'Apply', sub: 'Use your knowledge in daily life', bg: 'bg-violet-100', iconBg: 'bg-violet-600', icon: '✓' },
      ].map((t) => (
        <div key={t.title} className={`rounded-2xl p-3 text-center ${t.bg}`}>
          <div className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl text-white ${t.iconBg}`}>{t.icon}</div>
          <div className="text-[13px] font-extrabold text-navy-800">{t.title}</div>
          <div className="mt-0.5 text-[10px] leading-snug text-slate-500">{t.sub}</div>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between px-5 pb-2 pt-3.5"><div className="text-[15px] font-extrabold">Featured Learning Modules</div><a className="text-[12px] font-bold">See All</a></div>
    <div className="mb-24 flex flex-col gap-2 px-4">
      {[
        { n: '1', title: 'Budgeting Basics', sub: 'Manage your money better', dur: '15 min', bg: 'bg-blue-100', clr: 'text-blue-600' },
        { n: '2', title: 'Saving for Your Goals', sub: 'Turn dreams into plans', dur: '15 min', bg: 'bg-leaf-100', clr: 'text-leaf-600' },
        { n: '3', title: 'Smart Digital Banking', sub: 'Bank safely and confidently', dur: '10 min', bg: 'bg-amber-100', clr: 'text-amber-700' },
      ].map((m) => (
        <div key={m.n} className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-full font-black ${m.bg} ${m.clr}`}>{m.n}</div>
          <div className="flex-1"><div className="text-[13px] font-extrabold">{m.title}</div><div className="text-[10.5px] text-slate-500">{m.sub}</div></div>
          <div className="text-[10.5px] font-bold text-slate-500">{m.dur}</div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600">▶</div>
        </div>
      ))}
    </div>
  </PhoneFrame>
);

/* ========== Quiz ========== */
export const QuizScreen: React.FC = () => (
  <PhoneFrame bg="bg-gradient-to-b from-navy-800 to-navy-700" statusColor="white" notchColor="bg-black">
    <div className="flex items-center justify-between px-5 pb-2 pt-2 text-white">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">✕</div>
      <div className="text-[12px] opacity-85">Question <b>3 / 5</b></div>
      <div className="rounded-full bg-leaf-500 px-2.5 py-1 text-[11px] font-black text-navy-800">🔥 12</div>
    </div>
    <div className="mx-5 mt-2 mb-5 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[60%] bg-gradient-to-r from-leaf-500 to-leaf-400" /></div>
    <div className="px-5 pb-3 text-white">
      <div className="text-[11.5px] font-black uppercase tracking-wider opacity-75">Budgeting Basics</div>
      <div className="mt-1.5 font-display text-[22px] font-bold leading-snug">Priya earns ₹8,000 a month. Which spending split follows the 50/30/20 rule?</div>
    </div>
    <div className="flex flex-col gap-2.5 px-4">
      {[
        { k: 'A', text: '₹4,000 needs · ₹2,400 wants · ₹1,600 save', on: true },
        { k: 'B', text: '₹3,000 needs · ₹3,000 wants · ₹2,000 save' },
        { k: 'C', text: '₹5,000 needs · ₹1,500 wants · ₹1,500 save' },
        { k: 'D', text: '₹6,000 wants · ₹2,000 save · ₹0 needs' },
      ].map((o) => (
        <div key={o.k} className={`flex items-center gap-3 rounded-2xl border-2 p-3.5 text-white ${o.on ? 'border-leaf-500 bg-leaf-500' : 'border-white/15 bg-white/5'}`}>
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl font-black ${o.on ? 'bg-white/25 text-white' : 'bg-white/10 text-white'}`}>{o.k}</div>
          <div className="flex-1 text-[13.5px] font-bold">{o.text}</div>
          {o.on && <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] font-black text-leaf-600">✓</div>}
        </div>
      ))}
    </div>
    <div className="mx-4 mt-3 rounded-2xl bg-leaf-100 p-3 text-leaf-900">
      <div className="text-[13px] font-extrabold">Correct! ✨ +20 XP</div>
      <div className="mt-0.5 text-[11.5px] leading-snug">50% for needs, 30% for wants, 20% for savings — the classic split for a first paycheck.</div>
    </div>
    <div className="absolute inset-x-0 bottom-0 bg-navy-800/60 px-4 pb-6 pt-3.5 backdrop-blur">
      <button className="w-full rounded-2xl bg-leaf-500 py-3.5 text-[14px] font-extrabold text-white">Next question →</button>
    </div>
  </PhoneFrame>
);

/* ========== Quiz result ========== */
export const QuizResultScreen: React.FC = () => (
  <PhoneFrame bg="bg-gradient-to-b from-navy-800 via-navy-700 to-leaf-600" statusColor="white" notchColor="bg-black">
    <div className="px-5 pb-3 pt-2 text-center text-white">
      <div className="font-script text-[24px] text-amber-200">Well done, Aanya!</div>
      <h1 className="mt-1.5 font-display text-[34px] font-bold leading-none">Level up · <span className="text-leaf-500">2 → 3</span></h1>
      <div className="mt-1 text-[13px] opacity-85">Budgeting Basics · Chapter complete</div>
    </div>
    <div className="mx-4 mt-5 rounded-3xl border border-white/15 bg-white/10 p-5 text-center text-white">
      <div className="relative mx-auto mb-3 h-28 w-28">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FBBF24"/><stop offset="1" stopColor="#F59E0B"/></linearGradient></defs>
          <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="9"/>
          <circle cx="55" cy="55" r="46" fill="none" stroke="url(#g1)" strokeWidth="9" strokeLinecap="round" strokeDasharray="289" strokeDashoffset="43" transform="rotate(-90 55 55)"/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center"><div className="font-display text-[32px] font-bold leading-none">85</div><div className="text-[10.5px] opacity-75">/ 100</div></div>
      </div>
      <div className="flex justify-around">
        {[{ n: '4/5', l: 'Correct', c: 'text-leaf-500' }, { n: '+80', l: 'XP earned', c: 'text-amber-400' }, { n: '🔥13', l: 'Day streak', c: 'text-orange-500' }].map((s) => (
          <div key={s.l}><div className={`font-display text-[22px] font-bold ${s.c}`}>{s.n}</div><div className="text-[10.5px] font-semibold opacity-80">{s.l}</div></div>
        ))}
      </div>
    </div>
    <div className="px-4 pb-2 pt-3 text-[14px] font-extrabold text-white">You just unlocked</div>
    <div className="mb-24 flex flex-col gap-2 px-4">
      {[
        { title: 'Money Explorer · Level 3', sub: 'Unlocks weekly quest slots', emoji: '🎖️', bg: 'bg-amber-500/20' },
        { title: 'Sustainable Finance Learner', sub: 'Verified badge on your Green Passport', emoji: '🌿', bg: 'bg-leaf-500/20' },
        { title: 'Partner perk: 20% off SBI YONO SIP', sub: 'Auto-added to your Wallet', emoji: '🎁', bg: 'bg-violet-500/20' },
      ].map((r) => (
        <div key={r.title} className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 p-3 text-white">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-[18px] ${r.bg}`}>{r.emoji}</div>
          <div className="flex-1"><div className="text-[13px] font-extrabold">{r.title}</div><div className="text-[11px] opacity-75">{r.sub}</div></div>
          <span className="rounded-full bg-leaf-500 px-2 py-0.5 text-[10px] font-black text-white">NEW</span>
        </div>
      ))}
    </div>
    <div className="absolute inset-x-0 bottom-0 flex gap-2.5 bg-navy-800/70 px-4 pb-6 pt-3.5 backdrop-blur">
      <button className="flex-1 rounded-xl border-2 border-white/20 bg-white/15 py-3.5 text-[13px] font-extrabold text-white">Review answers</button>
      <button className="flex-[1.2] rounded-xl bg-leaf-500 py-3.5 text-[13px] font-extrabold text-white">Next chapter →</button>
    </div>
  </PhoneFrame>
);

/* ========== Quest ========== */
export const QuestScreen: React.FC = () => (
  <PhoneFrame>
    <div className="flex items-center justify-between px-5 pb-2 pt-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100">‹</div>
      <span className="rounded-full bg-leaf-100 px-2.5 py-1 text-[10.5px] font-black text-leaf-800">🔥 12-day streak</span>
    </div>
    <div className="relative mx-4 mt-2 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 text-white">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/8" />
      <div className="text-[11px] font-black uppercase tracking-wider opacity-90">Active quest · Week 37</div>
      <h1 className="mt-1.5 font-display text-[26px] font-bold leading-tight">Build your career<br/>in 3 steps</h1>
      <div className="mt-1 text-[12.5px] opacity-90">Finish all 3 to unlock a mentorship call with Zomato Careers.</div>
      <div className="mt-3.5 flex items-center gap-1.5">
        <div className="h-1.5 flex-1 rounded-full bg-leaf-500" />
        <div className="h-1.5 flex-1 rounded-full bg-leaf-500" />
        <div className="h-1.5 flex-1 rounded-full bg-white/25" />
        <span className="font-display text-[13px] font-bold">2 / 3</span>
      </div>
    </div>
    <div className="flex flex-col gap-2 px-4 pt-3">
      {[
        { icon: '✓', title: 'Build a 1-page CV in Gen-Young', sub: 'You did this on 4 Sep · +30 XP', tag: 'DONE', done: true },
        { icon: '✓', title: 'Complete the "AI at work" quiz', sub: 'Scored 85 · +80 XP · Badge earned', tag: 'DONE', done: true },
        { icon: '3', title: 'Apply to a Career Explorer internship', sub: 'One tap · we auto-fill your CV', tag: 'DO NOW', done: false },
      ].map((s, i) => (
        <div key={i} className={`flex items-center gap-3 rounded-2xl border p-3.5 ${s.done ? 'border-leaf-200 bg-leaf-50' : 'border-violet-200 bg-violet-50'}`}>
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl text-[18px] font-display font-bold text-white ${s.done ? 'bg-leaf-500' : 'bg-violet-600'}`}>{s.icon}</div>
          <div className="flex-1"><div className={`text-[14px] font-extrabold ${s.done ? 'text-leaf-900' : 'text-navy-800'}`}>{s.title}</div><div className={`text-[11px] ${s.done ? 'text-leaf-800' : 'text-slate-500'}`}>{s.sub}</div></div>
          <span className={`rounded-full px-2.5 py-1 text-[10.5px] font-black ${s.done ? 'bg-leaf-100 text-leaf-800' : 'bg-amber-400 text-amber-900'}`}>{s.tag}</span>
        </div>
      ))}
    </div>
    <div className="mx-4 mt-3 flex items-center gap-3 rounded-2xl bg-navy-800 p-3.5 text-white">
      <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-[26px]" style={{ height: 52, width: 52 }}>🏆</div>
      <div className="flex-1">
        <div className="text-[13.5px] font-extrabold">Unlock after all 3</div>
        <div className="text-[11.5px] opacity-85">30-min 1:1 mentorship call · Zomato Careers · verified perk</div>
      </div>
    </div>
    <div className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-white px-4 pb-6 pt-3.5">
      <button className="w-full rounded-2xl bg-leaf-500 py-3.5 text-[14px] font-extrabold text-white">Continue step 3 →</button>
    </div>
  </PhoneFrame>
);
