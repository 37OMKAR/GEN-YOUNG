import React from 'react';
import { PhoneFrame, BrandHeader, defaultNav } from '../shell/PhoneFrame';

const chips = [
  { label: 'All', bg: 'bg-navy-800', fg: 'text-white', icon: '▦' },
  { label: 'Learning', bg: 'bg-slate-100', fg: 'text-navy-800', icon: '🎓' },
  { label: 'Food', bg: 'bg-slate-100', fg: 'text-orange-600', icon: '🍔' },
  { label: 'Travel', bg: 'bg-slate-100', fg: 'text-violet-600', icon: '✈️' },
  { label: 'Lifestyle', bg: 'bg-slate-100', fg: 'text-pink-600', icon: '🛍️' },
  { label: 'Health', bg: 'bg-slate-100', fg: 'text-leaf-600', icon: '❤' },
];

const offers = [
  { tag: 'STUDENT EXCLUSIVE', tagBg: 'bg-blue-100 text-blue-700', title: 'AI Pro Plan', sub: '1 year free · eligible students · till 31 Dec 26', btn: 'Claim Now', btnBg: 'bg-orange-500', card: 'bg-orange-50', img: 'bg-orange-200', emoji: '🤖' },
  { tag: 'LEARN & GROW', tagBg: 'bg-leaf-100 text-leaf-800', title: 'Sustainability Course', sub: 'Free · certificate · self-paced', btn: 'Enroll Now', btnBg: 'bg-leaf-500', card: 'bg-leaf-50', img: 'bg-leaf-200', emoji: '🌱' },
  { tag: 'FOOD & BEVERAGE', tagBg: 'bg-amber-100 text-amber-800', title: '₹200 Food Voucher', sub: 'Popular outlets · 30 days', btn: 'Claim Now', btnBg: 'bg-amber-500', card: 'bg-amber-50', img: 'bg-amber-200', emoji: '🍔' },
  { tag: 'ENTERTAINMENT', tagBg: 'bg-violet-100 text-violet-700', title: 'Movie Tickets', sub: 'Flat 50% off · this weekend', btn: 'Grab Offer', btnBg: 'bg-violet-600', card: 'bg-violet-50', img: 'bg-violet-200', emoji: '🎬' },
];

export const HomeScreen: React.FC<{ onNav?: (id: string) => void }> = ({ onNav }) => (
  <PhoneFrame>
    <BrandHeader />
    <div className="mx-4 mt-2 overflow-hidden rounded-[20px] bg-gradient-to-br from-navy-800 to-navy-700 p-4 text-white relative">
      <div className="font-display text-[20px] font-bold leading-tight">Discover Offers<br/>Made for You</div>
      <div className="mt-1.5 text-[12px] opacity-85">Learn. Save. Experience. Grow.</div>
      <svg width="24" height="24" viewBox="0 0 24 24" className="absolute right-3.5 top-3"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#22C55E"/></svg>
      <div className="pointer-events-none absolute -bottom-2.5 -right-2.5 h-28 w-28 rounded-full bg-blue-500/40 blur-2xl" />
    </div>

    <div className="flex gap-2.5 overflow-hidden px-4 pb-3 pt-1">
      {chips.map((c) => (
        <div key={c.label} className="flex min-w-[52px] flex-col items-center gap-1">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-[15px] font-black ${c.bg} ${c.fg}`}>{c.icon}</div>
          <div className="text-[10.5px] font-bold text-slate-600">{c.label}</div>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between px-5 pb-2">
      <div className="text-[15px] font-extrabold text-navy-800">Featured for You</div>
      <a className="text-[12px] font-bold text-navy-800">See All</a>
    </div>

    <div className="grid grid-cols-2 gap-2.5 px-4 pb-2">
      {offers.map((o) => (
        <div key={o.title} className={`flex flex-col gap-1.5 rounded-2xl border border-slate-200 p-2.5 ${o.card}`}>
          <div className={`flex h-11 items-center justify-center rounded-lg text-[22px] ${o.img}`}>{o.emoji}</div>
          <div className={`inline-block self-start rounded px-1.5 py-0.5 text-[8.5px] font-black tracking-wide ${o.tagBg}`}>{o.tag}</div>
          <div className="text-[12.5px] font-extrabold text-navy-800 leading-tight">{o.title}</div>
          <div className="text-[10px] text-slate-500 leading-tight">{o.sub}</div>
          <button className={`mt-0.5 w-full rounded-lg py-1.5 text-[11px] font-extrabold text-white ${o.btnBg}`}>{o.btn}</button>
        </div>
      ))}
    </div>

    {defaultNav('home', onNav)}
  </PhoneFrame>
);
