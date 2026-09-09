import React from 'react';
import { PhoneFrame } from '../shell/PhoneFrame';

/* ========== Card detail ========== */
export const CardScreen: React.FC = () => (
  <PhoneFrame>
    <div className="flex items-center gap-2.5 px-5 pt-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 font-black">‹</div>
      <div className="text-[18px] font-extrabold">Virtual RuPay card</div>
    </div>
    <div className="mx-4 mt-3 rounded-3xl bg-gradient-to-br from-navy-800 to-leaf-500 p-5 text-white shadow-card-soft">
      <div className="flex justify-between">
        <div className="font-extrabold">Gen-Young</div>
        <div className="text-[16px] font-black">RuPay</div>
      </div>
      <div className="mt-9 font-mono text-[17px] font-bold tracking-widest">6521  1284  6412  4487</div>
      <div className="mt-3.5 flex justify-between text-[11px]">
        <div><span className="opacity-70">Card holder</span><br/><b>AANYA SHARMA</b></div>
        <div><span className="opacity-70">Valid</span><br/><b>08/29</b></div>
        <div><span className="opacity-70">CVV</span><br/><b>245</b></div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2.5 px-4 pt-3">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3">
        <div><div className="text-[13px] font-extrabold">Freeze card</div><div className="text-[11px] text-slate-500">Instant lock</div></div>
        <div className="relative h-5 w-9 rounded-full bg-leaf-500"><div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" /></div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <div className="text-[13px] font-extrabold">Show CVV</div>
        <div className="text-[11px] text-slate-500">Auto-hides in 30s</div>
      </div>
    </div>
    <div className="mx-4 mt-3 rounded-2xl border border-slate-200 bg-white p-3.5">
      <div className="flex justify-between">
        <div className="text-[13px] font-extrabold">Online transaction limit</div>
        <div className="font-display font-bold text-navy-800">₹ 10,000</div>
      </div>
      <div className="relative mt-2.5 h-1.5 rounded-full bg-slate-200">
        <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-leaf-500 to-leaf-400" />
        <div className="absolute -top-1 left-[40%] h-4 w-4 -translate-x-2 rounded-full border-[3px] border-leaf-500 bg-white" />
      </div>
      <div className="mt-1.5 flex justify-between text-[10.5px] text-slate-500"><span>₹500</span><span>₹25,000</span></div>
    </div>
    <div className="px-5 pb-2 pt-3 text-[14px] font-extrabold">Recent card activity</div>
    <div className="px-5 pb-24">
      {[
        { n: 'Amazon', time: 'Today', a: '- ₹ 1,299', c: 'text-rose-600', bg: 'bg-amber-500', emoji: '🛒' },
        { n: 'Netflix', time: 'Yesterday', a: '- ₹ 199', c: 'text-rose-600', bg: 'bg-rose-500', emoji: '🎬' },
        { n: 'Refund · Myntra', time: '6 Sep', a: '+ ₹ 899', c: 'text-leaf-600', bg: 'bg-leaf-500', emoji: '↩' },
      ].map((t) => (
        <div key={t.n} className="flex items-center gap-2.5 border-b border-slate-100 py-2.5">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-white ${t.bg}`}>{t.emoji}</div>
          <div className="flex-1"><div className="text-[13px] font-bold">{t.n}</div><div className="text-[10.5px] text-slate-500">{t.time}</div></div>
          <div className={`font-extrabold ${t.c}`}>{t.a}</div>
        </div>
      ))}
    </div>
  </PhoneFrame>
);

/* ========== UPI ========== */
export const UPIScreen: React.FC = () => (
  <PhoneFrame bg="bg-gradient-to-b from-navy-800 to-navy-700" statusColor="white" notchColor="bg-black">
    <div className="flex items-center justify-between px-5 pb-3 pt-2 text-white">
      <div className="text-[18px] font-extrabold">‹ Send money</div>
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-200 to-rose-300" />
    </div>
    <div className="mx-5 mt-2 rounded-3xl bg-white/5 p-5 text-center">
      <div className="mx-auto flex h-52 w-52 items-center justify-center overflow-hidden rounded-2xl bg-navy-800">
        <div className="grid h-40 w-40 grid-cols-8 grid-rows-8 gap-0.5">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`} />
          ))}
        </div>
      </div>
      <div className="mt-3 text-[13px] text-white/85">Point your camera at a UPI QR</div>
    </div>
    <div className="mx-4 mt-3 rounded-3xl bg-white p-3.5 text-navy-800">
      <div className="text-[13px] font-extrabold">Or enter a UPI ID / phone</div>
      <label className="mt-2.5 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-3">
        <span className="text-slate-400">@</span>
        <span className="font-semibold">priya@upi</span>
      </label>
      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-[12px] font-semibold text-slate-500">Amount</div>
        <div className="text-[12px] font-black text-leaf-600">Balance ₹12,480</div>
      </div>
      <div className="font-display text-[36px] font-bold">₹ 500<span className="text-[20px] opacity-40">.00</span></div>
      <div className="mt-2.5 flex gap-1.5">
        {[100, 500, 1000, 2000].map((c) => (
          <div key={c} className="flex-1 rounded-lg bg-slate-100 py-1.5 text-center text-[11.5px] font-bold text-navy-800">₹{c}</div>
        ))}
      </div>
      <button className="mt-3 w-full rounded-xl bg-leaf-500 py-3.5 text-[14px] font-extrabold text-white">Pay ₹ 500</button>
    </div>
  </PhoneFrame>
);

/* ========== PIN entry ========== */
export const PinEntryScreen: React.FC = () => (
  <PhoneFrame bg="bg-gradient-to-b from-navy-800 to-navy-700" statusColor="white" notchColor="bg-black">
    <div className="px-5 pb-2 pt-2 text-white">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">‹</div>
    </div>
    <div className="px-5 pb-3 pt-5 text-center text-white">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-leaf-500 to-leaf-600 shadow-glow-emerald">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>
      </div>
      <div className="font-display text-[22px] font-bold">Enter your UPI PIN</div>
      <div className="mt-1 text-[12.5px] opacity-75">Paying <b>Priya Menon</b> · ₹ 500</div>
    </div>
    <div className="flex justify-center gap-4 py-6">
      {[1, 1, 1, 0, 0, 0].map((f, i) => (
        <div key={i} className={`h-4 w-4 rounded-full ${f ? 'bg-leaf-500 shadow-[0_0_0_4px_rgba(34,197,94,0.25)]' : 'border-2 border-white/35 bg-white/10'}`} />
      ))}
    </div>
    <div className="pb-4 text-center text-[11px] text-white/70">Secure · Never share your PIN</div>
    <div className="mx-5 grid grid-cols-3 gap-3">
      {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k, i) => (
        <div key={i} className={`rounded-2xl py-4 text-center font-display text-[22px] font-bold ${k ? 'border border-white/10 bg-white/5 text-white' : ''}`}>{k}</div>
      ))}
    </div>
    <div className="absolute inset-x-0 bottom-6 text-center text-[11px] text-white/65">Powered by NPCI · UPI 2.0</div>
  </PhoneFrame>
);

/* ========== UPI Success ========== */
export const UPISuccessScreen: React.FC = () => (
  <PhoneFrame bg="bg-gradient-to-b from-leaf-600 to-leaf-800" statusColor="white" notchColor="bg-black">
    <div className="px-5 pb-3 pt-6 text-center text-white">
      <div className="relative mx-auto my-5 flex h-30 w-30 items-center justify-center rounded-full bg-white shadow-[0_20px_50px_rgba(255,255,255,0.25)]" style={{ height: 120, width: 120 }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l6 6L20 6"/></svg>
        <div className="pointer-events-none absolute -inset-2.5 rounded-full border-2 border-dashed border-white/40" />
      </div>
      <h1 className="font-display text-[34px] font-bold">Paid ₹ 500</h1>
      <div className="mt-1.5 text-[13px] opacity-85">to <b>Priya Menon</b> · priya@upi</div>
    </div>
    <div className="mx-4 mt-6 rounded-3xl bg-white p-4 text-navy-800">
      {[
        { l: 'Transaction ID', v: 'UPI-4487-22019', mono: true },
        { l: 'From', v: 'Gen-Young · Aanya S ••4487' },
        { l: 'Time', v: '9 Sep 2026 · 9:41 AM' },
        { l: 'Balance', v: '₹ 11,980.50', bold: true, c: 'text-leaf-600' },
      ].map((r, i) => (
        <div key={r.l} className={`flex justify-between py-1.5 text-[11.5px] ${i > 0 ? 'border-t border-dashed border-slate-200' : ''}`}>
          <span className="text-slate-500">{r.l}</span>
          <span className={`font-bold ${r.mono ? 'font-mono' : ''} ${r.c ?? ''} ${r.bold ? 'font-extrabold' : ''}`}>{r.v}</span>
        </div>
      ))}
      <div className="mt-3 flex justify-center">
        <span className="rounded-full bg-leaf-100 px-2.5 py-1 text-[10px] font-black text-leaf-800">🌿 +5 Green XP · paperless receipt</span>
      </div>
    </div>
    <div className="mt-4 flex gap-2.5 px-4">
      <button className="flex-1 rounded-xl border-2 border-white/25 bg-white/10 py-3.5 text-[13px] font-extrabold text-white">Share receipt</button>
      <button className="flex-1 rounded-xl bg-white py-3.5 text-[13px] font-extrabold text-leaf-800">Done</button>
    </div>
    <div className="absolute inset-x-0 bottom-6 text-center text-[11px] text-white/70">Redirecting to Home in 3s…</div>
  </PhoneFrame>
);

/* ========== Goals ========== */
export const GoalsScreen: React.FC = () => (
  <PhoneFrame>
    <div className="px-5 pb-2 pt-2">
      <div className="font-display text-[20px] font-bold">Savings goals</div>
      <div className="text-[12px] text-slate-500">Save with intention. Grow with confidence.</div>
    </div>
    <div className="mx-4 mt-2 flex items-center gap-4 rounded-3xl bg-gradient-to-br from-navy-800 to-navy-700 p-5 text-white">
      <div className="relative h-30 w-30 shrink-0" style={{ height: 120, width: 120 }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10"/>
          <circle cx="60" cy="60" r="52" fill="none" stroke="#22C55E" strokeWidth="10" strokeDasharray="326" strokeDashoffset="196" strokeLinecap="round" transform="rotate(-90 60 60)"/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display text-[22px] font-bold">40%</div>
          <div className="text-[10px] opacity-75">complete</div>
        </div>
      </div>
      <div>
        <div className="text-[20px] font-extrabold">Laptop for college</div>
        <div className="text-[12px] opacity-85">Category · Education</div>
        <div className="mt-2 text-[13px]"><b>₹18,200</b> <span className="opacity-70">/ ₹45,000</span></div>
        <div className="text-[11px] opacity-85">Target · Nov 2026</div>
        <button className="mt-2.5 rounded-xl bg-leaf-500 px-3.5 py-2 text-[12px] font-extrabold">Top up ₹500</button>
      </div>
    </div>
    <div className="px-5 pb-2 pt-3 text-[14px] font-extrabold">Other goals</div>
    <div className="flex flex-col gap-2 px-4">
      {[
        { name: 'Goa trip with friends', pct: 42, have: '₹6,300', target: '₹15,000', emoji: '✈️', bg: 'bg-violet-100', bar: 'bg-violet-600' },
        { name: 'Emergency fund', pct: 75, have: '₹15,000', target: '₹20,000', emoji: '🛡️', bg: 'bg-blue-100', bar: 'bg-blue-600' },
        { name: 'New headphones', pct: 20, have: '₹1,600', target: '₹8,000', emoji: '🎧', bg: 'bg-rose-100', bar: 'bg-rose-500' },
      ].map((g) => (
        <div key={g.name} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-[20px] ${g.bg}`}>{g.emoji}</div>
          <div className="flex-1">
            <div className="flex justify-between text-[13px] font-extrabold"><span>{g.name}</span><span>{g.pct}%</span></div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className={`h-full ${g.bar}`} style={{ width: `${g.pct}%` }} /></div>
            <div className="mt-1 text-[10.5px] text-slate-500">{g.have} of {g.target}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="mx-4 mb-24 mt-3 rounded-2xl border border-dashed border-leaf-500 bg-leaf-50 p-4 text-center">
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-leaf-500 text-[22px] font-black text-white">+</div>
      <div className="font-extrabold text-navy-800">Create a new goal</div>
      <div className="text-[11.5px] text-leaf-800">Name it, target it, watch it grow.</div>
    </div>
  </PhoneFrame>
);
