import React from 'react';
import { PhoneFrame, BrandHeader, defaultNav } from '../shell/PhoneFrame';

export const BankingScreen: React.FC<{ onNav?: (id: string) => void }> = ({ onNav }) => (
  <PhoneFrame>
    <BrandHeader subtitle="Zero balance · UPI · Rewards" />
    <div className="relative mx-4 mt-2 overflow-hidden rounded-2xl bg-gradient-to-br from-navy-800 via-navy-700 to-leaf-500 p-4 text-white shadow-card-soft">
      <div className="pointer-events-none absolute -right-5 -top-5 h-36 w-36 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-leaf-500/20" />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] opacity-75">Available balance</div>
          <div className="font-display text-[26px] font-bold">₹ 12,480.<span className="opacity-70">50</span></div>
        </div>
        <div className="text-right">
          <div className="text-[14px] font-extrabold">RuPay</div>
          <div className="text-[9.5px] opacity-75">Virtual · Debit</div>
        </div>
      </div>
      <div className="mt-4 font-mono text-[15px] font-bold tracking-widest">6521  ••••  ••••  4487</div>
      <div className="mt-3 flex justify-between text-[10.5px]">
        <div><span className="opacity-70">Card holder</span><br/><b className="text-[12px]">AANYA SHARMA</b></div>
        <div><span className="opacity-70">Exp</span><br/><b className="text-[12px]">08/29</b></div>
        <div><span className="opacity-70">CVV</span><br/><b className="text-[12px]">•••</b></div>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-2.5 px-4 pb-3 pt-3">
      {[
        { label: 'Scan & Pay', bg: 'bg-navy-800', icon: '▦' },
        { label: 'Send UPI', bg: 'bg-leaf-500', icon: '➤' },
        { label: 'Add money', bg: 'bg-amber-500', icon: '＋' },
        { label: 'Rewards', bg: 'bg-violet-600', icon: '★' },
      ].map((a) => (
        <div key={a.label} className="flex flex-col items-center gap-1.5">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white text-[16px] ${a.bg}`}>{a.icon}</div>
          <div className="text-center text-[10.5px] font-bold text-navy-800">{a.label}</div>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between px-5 pb-2 text-[15px] font-extrabold">Savings Goals <a className="text-[12px] font-bold">+ New goal</a></div>
    <div className="flex gap-2.5 px-4 pb-2">
      {[
        { name: 'Laptop', have: '₹18,200', target: '₹45,000', pct: 40, emoji: '💻', bg: 'bg-blue-100', bar: 'from-blue-500 to-blue-400' },
        { name: 'Goa trip', have: '₹6,300', target: '₹15,000', pct: 42, emoji: '✈️', bg: 'bg-violet-100', bar: 'from-violet-500 to-violet-400' },
      ].map((g) => (
        <div key={g.name} className="flex-1 rounded-2xl border border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-[16px] ${g.bg}`}>{g.emoji}</div>
            <div>
              <div className="text-[12.5px] font-extrabold">{g.name}</div>
              <div className="text-[10.5px] text-slate-500">{g.have} / {g.target}</div>
            </div>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div className={`h-full bg-gradient-to-r ${g.bar}`} style={{ width: `${g.pct}%` }} />
          </div>
          <div className="mt-1 text-[10.5px] font-bold text-navy-800">{g.pct}%</div>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between px-5 pb-2 pt-2 text-[15px] font-extrabold">Recent activity <a className="text-[12px] font-bold">See all</a></div>
    <div className="px-5 pb-24">
      {[
        { name: 'Zomato', time: 'Today · 1:12 pm', amt: '- ₹ 320', color: 'text-rose-600', emoji: '🍔', bg: 'bg-rose-500' },
        { name: 'UPI from Priya', time: 'Today · 11:04 am', amt: '+ ₹ 500', color: 'text-leaf-600', emoji: '↓', bg: 'bg-leaf-500' },
        { name: 'BEST bus pass', time: 'Yesterday', amt: '- ₹ 40', color: 'text-rose-600', emoji: '🚌', bg: 'bg-amber-500' },
        { name: 'Freelance gig', time: '7 Sep', amt: '+ ₹ 2,000', color: 'text-leaf-600', emoji: '💼', bg: 'bg-blue-500' },
      ].map((t) => (
        <div key={t.time} className="flex items-center gap-2.5 border-b border-slate-100 py-2">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-white ${t.bg}`}>{t.emoji}</div>
          <div className="flex-1">
            <div className="text-[13px] font-bold">{t.name}</div>
            <div className="text-[10.5px] text-slate-500">{t.time}</div>
          </div>
          <div className={`text-[13px] font-extrabold ${t.color}`}>{t.amt}</div>
        </div>
      ))}
    </div>
    {defaultNav('home', onNav)}
  </PhoneFrame>
);
