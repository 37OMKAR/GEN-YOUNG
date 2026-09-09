import React, { useState } from 'react';
import { PhoneFrame, BrandHeader, defaultNav, AppBottomNav, Icon } from '../shell/PhoneFrame';

/* ============ Search ============ */
export const SearchScreen: React.FC = () => (
  <PhoneFrame>
    <div className="flex items-center gap-2.5 px-4 pt-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">‹</div>
      <label className="flex flex-1 items-center gap-2.5 rounded-xl border-2 border-navy-800 bg-slate-100 px-3.5 py-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B2A5B" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
        <span className="text-[14px] font-semibold text-navy-800">student ai</span>
      </label>
    </div>
    <div className="mx-4 mt-3 flex items-center gap-2.5 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-200 p-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white font-black">✨</div>
      <div className="flex-1 text-[12.5px] text-violet-900"><b>Ask Gen-Young:</b> "Best free AI benefits for a 21-year-old student"</div>
      <div className="font-black text-violet-600">›</div>
    </div>
    <div className="flex gap-1.5 overflow-hidden px-4 pb-3 pt-3">
      {['All','Free','For students','Under 30 min','Verified today'].map((c,i) => (
        <div key={c} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[11.5px] font-bold ${i===0 ? 'border-navy-800 bg-navy-800 text-white' : 'border-slate-200 bg-slate-100 text-navy-800'}`}>{c}</div>
      ))}
    </div>
    <div className="px-5 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">28 results · verified 3 Sep</div>
    <div className="flex flex-col gap-2 px-4">
      {[
        { title: 'Google AI Plus · 1 year student tier', tag: 'AI & Learning', meta: 'Free · Eligible', metaClr: 'text-leaf-600', emoji: '🤖', bg: 'bg-blue-100' },
        { title: 'IndiaAI compute credits', tag: 'Government scheme', meta: 'Free · Check eligibility', metaClr: 'text-blue-600', emoji: '⚡', bg: 'bg-violet-100' },
        { title: 'SATHEE · AI-guided JEE prep', tag: 'Education', meta: 'Free · Recommended', metaClr: 'text-leaf-600', emoji: '🎓', bg: 'bg-leaf-100' },
        { title: 'SWAYAM · Intro to AI', tag: 'Certification', meta: 'Free · 6 weeks', metaClr: 'text-slate-500', emoji: '📚', bg: 'bg-amber-100' },
      ].map((r) => (
        <div key={r.title} className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-2.5">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-[20px] ${r.bg}`}>{r.emoji}</div>
          <div className="flex-1">
            <div className="text-[13px] font-extrabold">{r.title}</div>
            <div className="text-[11px] text-slate-500">{r.tag} · <span className={`font-bold ${r.metaClr}`}>{r.meta}</span></div>
          </div>
          <div className="font-extrabold text-slate-400">›</div>
        </div>
      ))}
    </div>
    <div className="px-5 pb-2 pt-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Recent</div>
    <div className="flex flex-wrap gap-1.5 px-4 pb-6">
      {['upi student','friday drop','free health cover','sustainability course','sos setup'].map((q) => (
        <div key={q} className="rounded-full bg-slate-100 px-3 py-1 text-[11.5px] font-semibold text-navy-800">🕐 {q}</div>
      ))}
    </div>
  </PhoneFrame>
);

/* ============ Notifications ============ */
export const NotificationsScreen: React.FC = () => (
  <PhoneFrame>
    <div className="flex items-center justify-between px-5 pb-3 pt-3">
      <div>
        <div className="font-display text-[22px] font-bold">Inbox</div>
        <div className="text-[11.5px] text-slate-500">3 unread · 12 today</div>
      </div>
      <div className="flex gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 font-black text-navy-800">≡</div>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 font-black text-navy-800">✓</div>
      </div>
    </div>
    <div className="flex gap-1.5 overflow-hidden px-4 pb-3">
      {[
        { label: 'All', n: 12, on: true }, { label: 'Drops', n: 3 }, { label: 'Benefits', n: 5 }, { label: 'Safety', n: 1 },
      ].map((t) => (
        <div key={t.label} className={`rounded-full border px-3 py-1.5 text-[11.5px] font-bold ${t.on ? 'border-navy-800 bg-navy-800 text-white' : 'border-slate-200 bg-slate-100 text-navy-800'}`}>{t.label}<span className="ml-1 opacity-70">{t.n}</span></div>
      ))}
    </div>
    <div className="flex flex-col gap-2 px-4">
      {[
        { title: 'Friday Drop opens in 12 min', body: '100,000 movie tickets · 50% off. Be ready when the counter hits zero.', time: 'now', emoji: '⚡', iconBg: 'bg-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', unread: true, cta: 'Open Drop', ctaBg: 'bg-amber-500' },
        { title: 'Your Green Passport levelled up', body: 'Level 3 · Climate Learner unlocked. New badge on your profile.', time: '2m ago', emoji: '🌿', iconBg: 'bg-leaf-500', bg: 'bg-leaf-50', border: 'border-leaf-200', unread: true },
        { title: 'Refund from Myntra · ₹899', body: 'Credited to your Gen-Young RuPay ending 4487.', time: '1h ago', emoji: '↩', iconBg: 'bg-leaf-600', bg: 'bg-white', border: 'border-slate-200', unread: true },
        { title: 'Sustainability course · new module', body: '"Circular economy at home" is live. Enroll in one tap.', time: '3h ago', emoji: '🎓', iconBg: 'bg-violet-600', bg: 'bg-white', border: 'border-slate-200', cta: 'Enroll', ctaBg: 'bg-violet-600' },
        { title: 'Heavy rain warning · Mumbai', body: 'Waterlogging 4–8 pm. Consider staying indoors.', time: '5h ago', emoji: '🌧', iconBg: 'bg-blue-500', bg: 'bg-white', border: 'border-slate-200' },
      ].map((n) => (
        <div key={n.title} className={`flex gap-3 rounded-2xl border p-3 ${n.bg} ${n.border}`}>
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[18px] text-white ${n.iconBg}`}>{n.emoji}</div>
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="text-[13px] font-extrabold text-navy-800">{n.title}</div>
              <div className="text-[10.5px] font-semibold text-slate-400">{n.time}</div>
            </div>
            <div className="mt-0.5 text-[11.5px] leading-snug text-slate-600">{n.body}</div>
            {n.cta && (
              <div className="mt-2 flex gap-1.5">
                <button className={`rounded-lg px-3 py-1 text-[11px] font-extrabold text-white ${n.ctaBg}`}>{n.cta}</button>
                <button className="rounded-lg px-2 py-1 text-[11px] font-bold text-slate-500">Later</button>
              </div>
            )}
          </div>
          {n.unread && <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-leaf-500" />}
        </div>
      ))}
    </div>
  </PhoneFrame>
);

/* ============ Benefit detail ============ */
export const BenefitDetailScreen: React.FC = () => (
  <PhoneFrame>
    <div className="flex items-center justify-between px-4 pt-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 font-extrabold">‹</div>
      <div className="text-[14px] font-extrabold">Benefit detail</div>
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 font-extrabold">🔊</div>
    </div>
    <div className="relative mx-4 mt-2 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-4 text-white">
      <div className="inline-block rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-black tracking-wide">AI & TECHNOLOGY · STUDENT OFFER</div>
      <div className="mt-2 font-display text-[22px] font-bold leading-tight">Google AI Plus · 1 year free</div>
      <div className="mt-0.5 text-[12px] opacity-85">Provider: Google India</div>
      <div className="mt-3 flex gap-2">
        {['FREE', 'Verified 3 Sep', 'Ends 31 Dec 26'].map((t) => (
          <span key={t} className="rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-bold">{t}</span>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-2 px-4 pt-3">
      {[
        { q: 'W', title: 'What is it?', body: 'One-year free Google AI Plus subscription with Gemini access, cloud credits and study tools.', bg: 'bg-blue-500' },
        { q: 'W', title: 'Why does it help?', body: 'Faster research, better study notes, and hands-on AI skills without paying for the tier.', bg: 'bg-leaf-500' },
        { q: 'W', title: 'Who can claim?', body: 'Verified students aged 18–24 with an active .edu / DigiLocker credential.', bg: 'bg-amber-500' },
        { q: '₹', title: 'What does it cost?', body: 'Free for the first 12 months. Renewal ₹19,500 / year (disclosed upfront).', bg: 'bg-violet-600' },
        { q: '✓', title: 'How to redeem?', body: 'Tap Claim → sign in with Google → we verify and unlock. Voucher stays in your Wallet.', bg: 'bg-rose-500' },
      ].map((r, i) => (
        <div key={i} className="flex gap-2.5 rounded-2xl border border-slate-200 bg-white p-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg font-black text-white ${r.bg}`}>{r.q}</div>
          <div>
            <div className="text-[13px] font-extrabold">{r.title}</div>
            <div className="text-[11.5px] leading-snug text-slate-600">{r.body}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="mx-4 mt-3 rounded-2xl border border-leaf-200 bg-leaf-50 p-3">
      <div className="text-[13px] font-extrabold text-leaf-800">Why am I seeing this?</div>
      <div className="mt-1 text-[11.5px] leading-snug text-leaf-800/90">You're a verified student, age 21, from Mumbai. Interests include AI and design.</div>
      <div className="mt-2 text-[10.5px] text-leaf-800/80">✓ Student status · ✓ Age 18–24 · ✓ Location: India · ● No third-party ad shared</div>
    </div>
    <div className="mx-4 mb-24 mt-3 rounded-xl border border-amber-200 bg-amber-100 px-3 py-2.5 text-[11.5px] text-amber-900">
      <b>Heads-up:</b> Renews at ₹19,500/yr after the free year. Cancel anytime, no penalty.
    </div>
    <div className="absolute inset-x-0 bottom-0 flex gap-2.5 border-t border-slate-200 bg-white px-4 pb-6 pt-3.5">
      <button className="flex-1 rounded-2xl bg-slate-100 py-3.5 text-[13px] font-extrabold text-navy-800">Check eligibility</button>
      <button className="flex-[1.4] rounded-2xl bg-leaf-500 py-3.5 text-[13px] font-extrabold text-white">Claim now</button>
    </div>
  </PhoneFrame>
);

/* ============ Wallet ============ */
export const WalletScreen: React.FC = () => (
  <PhoneFrame>
    <div className="px-5 pb-2 pt-2">
      <div className="font-display text-[20px] font-bold">Benefits Wallet</div>
      <div className="text-[12px] text-slate-500">Everything you've unlocked, in one place.</div>
    </div>
    <div className="grid grid-cols-4 gap-1.5 px-4 pb-3">
      {[{ label: 'Available', n: 12, on: true }, { label: 'Claimed', n: 8 }, { label: 'Active', n: 5 }, { label: 'Expiring', n: 3 }].map((t) => (
        <div key={t.label} className={`rounded-xl border px-2 py-2.5 text-center text-[11px] font-extrabold ${t.on ? 'border-navy-800 bg-navy-800 text-white' : 'border-slate-200 bg-slate-100 text-navy-800'}`}>
          {t.label}<div className="mt-0.5 text-[14px] font-black">{t.n}</div>
        </div>
      ))}
    </div>
    <div className="px-5 pb-2 text-[14px] font-extrabold">Claimed & active</div>
    <div className="flex flex-col gap-2 px-4 pb-6">
      {[
        { title: 'AI Pro Plan · 1 year', code: 'GYAI-4487', expiry: 'Valid till 31 Dec 2026', emoji: '🤖', bg: 'bg-blue-100', tag: 'Active', tagBg: 'bg-leaf-100 text-leaf-800' },
        { title: 'Movie tickets · 50% off', code: 'MOVE-2201', expiry: 'Ends Sunday', emoji: '🎬', bg: 'bg-violet-100', tag: 'Expiring', tagBg: 'bg-amber-100 text-amber-800' },
        { title: '₹200 food voucher', code: 'FOOD-8890', expiry: '30 days left', emoji: '🍔', bg: 'bg-amber-100', tag: 'Active', tagBg: 'bg-leaf-100 text-leaf-800' },
        { title: 'Sustainability course', code: 'SDG-1015', expiry: 'Self-paced', emoji: '🌱', bg: 'bg-leaf-100', tag: 'Claimed', tagBg: 'bg-blue-100 text-blue-700' },
      ].map((i) => (
        <div key={i.code} className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-[20px] ${i.bg}`}>{i.emoji}</div>
          <div className="flex-1">
            <div className="text-[13px] font-extrabold">{i.title}</div>
            <div className="text-[10.5px] text-slate-500">Code · <b>{i.code}</b> · {i.expiry}</div>
          </div>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${i.tagBg}`}>{i.tag}</span>
        </div>
      ))}
    </div>
  </PhoneFrame>
);

/* ============ Profile ============ */
export const ProfileScreen: React.FC<{ onNav?: (id: string) => void }> = ({ onNav }) => (
  <PhoneFrame bg="bg-slate-50">
    <div className="px-5 pb-2 pt-1">
      <div className="font-display text-[20px] font-bold">Benefits Engine <span className="text-leaf-500">🌿</span></div>
      <div className="text-[11.5px] text-slate-500">The right opportunities, for the right you.</div>
    </div>
    <div className="mx-4 mt-2 rounded-3xl bg-gradient-to-br from-navy-800 to-navy-700 p-4 text-center text-white">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-leaf-500 bg-gradient-to-br from-amber-200 to-rose-300 text-[32px]">👩🏻</div>
      <div className="mt-2 text-[17px] font-extrabold">Aanya Sharma</div>
      <div className="text-[11px] opacity-85">Student · 21 · Mumbai</div>
      <div className="mt-0.5 text-[11px] opacity-70">Learning · Growing · Making an impact</div>
      <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-leaf-500/20 px-3 py-1 text-[11px] font-black text-leaf-400">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="#22C55E"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
        Profile secure · DPDP verified
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {['AI','Sustainability','Design'].map((t) => (
          <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-[10.5px] font-bold">{t}</span>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 px-4 pt-3">
      {[
        { n: '24', l: 'Matched', c: 'text-blue-600' },
        { n: '8', l: 'Claimed', c: 'text-leaf-600' },
        { n: '3', l: 'Expiring', c: 'text-amber-500' },
      ].map((s) => (
        <div key={s.l} className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
          <div className={`font-display text-[20px] font-bold ${s.c}`}>{s.n}</div>
          <div className="mt-0.5 text-[10.5px] font-semibold text-slate-600">{s.l}</div>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between px-5 pb-2 pt-3 text-[14px] font-extrabold">Matched for you <a className="text-[12px] font-bold">See all</a></div>
    <div className="flex flex-col gap-2 px-4 pb-24">
      {[
        { title: 'Banking', sub: 'Savings · UPI · Card · Rewards', emoji: '🏦', bg: 'bg-blue-600', tag: 'Active', tagBg: 'bg-leaf-100 text-leaf-800' },
        { title: 'Education & Learning', sub: 'Free courses · Certifications', emoji: '🎓', bg: 'bg-leaf-600', tag: 'Recommended', tagBg: 'bg-leaf-100 text-leaf-800' },
        { title: 'AI & Technology', sub: 'AI tools · Cloud credits', emoji: '⚡', bg: 'bg-violet-600', tag: 'Eligible', tagBg: 'bg-violet-100 text-violet-700' },
        { title: 'Career & Opportunities', sub: 'Internships · Jobs · Resume', emoji: '💼', bg: 'bg-rose-500', tag: 'Check', tagBg: 'bg-blue-100 text-blue-700' },
        { title: 'Green Future', sub: 'Sustainability · Green jobs', emoji: '🌿', bg: 'bg-leaf-500', tag: 'Recommended', tagBg: 'bg-leaf-100 text-leaf-800' },
      ].map((m) => (
        <div key={m.title} className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-[15px] text-white ${m.bg}`}>{m.emoji}</div>
          <div className="flex-1">
            <div className="text-[13px] font-extrabold">{m.title}</div>
            <div className="text-[10.5px] text-slate-500">{m.sub}</div>
          </div>
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black ${m.tagBg}`}>{m.tag}</span>
        </div>
      ))}
    </div>
    {defaultNav('profile', onNav)}
  </PhoneFrame>
);
