import React from 'react';
import { PhoneFrame } from '../shell/PhoneFrame';

export const SOSScreen: React.FC = () => (
  <PhoneFrame bg="bg-navy-800" statusColor="white" notchColor="bg-black">
    <div className="flex items-center justify-between px-5 pb-2 pt-1 text-white">
      <div className="text-[20px] font-extrabold">Gen-<span className="text-leaf-500">Young</span></div>
      <div className="h-8 w-8 rounded-full border-2 border-leaf-500 bg-gradient-to-br from-amber-200 to-rose-300" />
    </div>
    <div className="px-5 pt-2 text-center text-white">
      <div className="font-display text-[24px] font-bold">Emergency SOS</div>
      <div className="mt-1 text-[12px] opacity-75">Help is just one tap away</div>
    </div>
    <div className="flex justify-center py-4">
      <div className="relative h-[200px] w-[200px]">
        <div className="absolute inset-0 rounded-full bg-radial-gradient" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.35), transparent 70%)' }} />
        <div className="absolute inset-3 rounded-full border-2 border-dashed border-rose-500/50" />
        <div className="absolute inset-6 flex flex-col items-center justify-center rounded-full text-white shadow-[0_12px_40px_rgba(220,38,38,0.5)]" style={{ background: 'radial-gradient(circle at 30% 30%,#F87171,#DC2626)' }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="#fff"><path d="M4 4c3-1 6 0 7 4l-2 2c2 3 4 5 7 7l2-2c4 1 5 4 4 7-8 1-19-9-18-18z"/></svg>
          <div className="mt-1 font-display text-[26px] font-black tracking-wider">SOS</div>
        </div>
      </div>
    </div>
    <div className="-mt-1 text-center text-[12px] text-white/85">Tap and hold for 3 seconds to call 112</div>
    <div className="mx-4 mt-3.5 flex items-center gap-3 rounded-2xl bg-white p-3 text-navy-800">
      <div className="flex-1">
        <div className="flex items-center gap-1.5 text-[13px] font-extrabold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#22C55E"><path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z"/></svg>
          Your Live Location
          <span className="ml-auto text-[11px] font-bold text-blue-500">Change</span>
        </div>
        <div className="mt-0.5 text-[11px] text-slate-500">Sharing with emergency services</div>
        <div className="mt-1.5 text-[13px] font-bold">Mumbai, Maharashtra</div>
        <div className="mt-0.5 text-[10.5px] font-semibold text-leaf-600">● Accuracy: High</div>
      </div>
      <div className="relative h-[74px] w-[74px] overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-3 w-3 rounded-full bg-rose-500 ring-4 ring-rose-500/40" />
        </div>
      </div>
    </div>
    <div className="mx-4 mt-3 rounded-2xl bg-white p-3 text-navy-800">
      <div className="flex items-center justify-between">
        <div><div className="text-[13px] font-extrabold">Also Notify</div><div className="text-[10.5px] text-slate-500">Select who to alert</div></div>
        <span className="text-[11px] font-bold text-blue-500">Edit</span>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
        {[{ n: 'Mom', r: 'Primary', i: 'M', bg: 'bg-amber-500' }, { n: 'Best Friend', r: 'Secondary', i: 'B', bg: 'bg-leaf-500' }, { n: 'Guardian', r: 'Family', i: 'G', bg: 'bg-blue-500' }].map((c) => (
          <div key={c.n} className="flex flex-col items-center gap-1">
            <div className={`flex h-11 w-11 items-center justify-center rounded-full font-black text-white ${c.bg}`}>{c.i}</div>
            <div className="text-[11.5px] font-extrabold">{c.n}</div>
            <div className="text-[9.5px] text-slate-500">{c.r}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="mx-4 mb-24 mt-3 flex items-center gap-2.5 rounded-2xl bg-white p-3 text-navy-800">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-500">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v13H8l-4 3z"/></svg>
      </div>
      <div className="flex-1"><div className="text-[13px] font-extrabold">Chat with Support</div><div className="text-[11px] text-slate-500">Get help, resources and guidance</div></div>
      <div className="text-slate-400">›</div>
    </div>
  </PhoneFrame>
);

export const SOSHoldScreen: React.FC = () => (
  <PhoneFrame bg="bg-gradient-radial from-rose-500 via-rose-800 to-rose-950" statusColor="white" notchColor="bg-black">
    <div className="px-5 pb-1 pt-2 text-center text-white">
      <div className="inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-[11.5px] font-bold">
        <span className="h-2 w-2 rounded-full bg-amber-400" /> Hold to send SOS
      </div>
      <h1 className="mt-3.5 font-display text-[26px] font-bold">Keep holding…</h1>
      <div className="text-[13px] opacity-90">Release to cancel · <b>2s</b> to dispatch 112</div>
    </div>
    <div className="flex justify-center py-6">
      <div className="relative h-[260px] w-[260px]">
        <svg width="260" height="260" viewBox="0 0 260 260">
          <circle cx="130" cy="130" r="118" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="14"/>
          <circle cx="130" cy="130" r="118" fill="none" stroke="#FBBF24" strokeWidth="14" strokeLinecap="round" strokeDasharray="741" strokeDashoffset="247" transform="rotate(-90 130 130)"/>
        </svg>
        <div className="absolute inset-[22px] flex flex-col items-center justify-center rounded-full text-white shadow-[0_0_60px_rgba(239,68,68,0.6),inset_0_-6px_20px_rgba(0,0,0,0.25)]" style={{ background: 'radial-gradient(circle at 30% 30%,#EF4444,#B91C1C)' }}>
          <div className="font-display text-[60px] font-black leading-none">2</div>
          <div className="text-[12px] font-bold tracking-wider opacity-85">SECONDS</div>
        </div>
      </div>
    </div>
    <div className="text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3.5 py-2 text-[12px] font-bold text-white">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24"><path d="M3 10v4h4l5 5V5L7 10zM16 8a5 5 0 010 8"/></svg>
        Beep · Beep · <span className="opacity-60">Beep</span>
      </div>
    </div>
    <div className="mx-4 mt-6 flex items-center gap-2.5 rounded-2xl bg-black/35 p-3 text-white">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#22C55E"><path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z"/></svg>
      <div className="flex-1">
        <div className="text-[13px] font-extrabold">Bandra West, Mumbai</div>
        <div className="text-[11px] opacity-75">Accuracy ±5 m · Ready to share with 112</div>
      </div>
    </div>
    <div className="absolute inset-x-0 bottom-6 text-center text-[11.5px] text-white/85">Release your finger anytime to abort</div>
  </PhoneFrame>
);

export const SOSDispatchScreen: React.FC = () => (
  <PhoneFrame bg="bg-gradient-to-b from-rose-900 to-rose-950" statusColor="white" notchColor="bg-black">
    <div className="px-5 pb-2 pt-2 text-center text-white">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1.5 text-[12px] font-black">
        <span className="h-2 w-2 rounded-full bg-amber-400 ring-4 ring-amber-400/35" />
        LIVE · 112 ERSS dispatched
      </div>
      <div className="mt-3.5 font-display text-[26px] font-black">Help is on the way</div>
      <div className="mt-1 text-[12px] opacity-85">Ticket ID <b>ERSS-24-88521</b> · ETA 6 min</div>
    </div>
    <div className="mx-4 mt-4 flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/10 p-3.5 text-white">
      <div className="relative h-16 w-16 shrink-0">
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6"/>
          <circle cx="32" cy="32" r="28" fill="none" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" strokeDasharray="176" strokeDashoffset="88" transform="rotate(-90 32 32)"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-black text-[20px]">5</div>
      </div>
      <div className="flex-1"><div className="text-[14px] font-extrabold">False alarm?</div><div className="text-[11.5px] opacity-85">Tap Cancel within 10 seconds to abort dispatch.</div></div>
      <button className="rounded-xl bg-amber-400 px-3.5 py-2.5 text-[12px] font-black text-rose-900">Cancel</button>
    </div>
    <div className="mx-4 mt-3 rounded-2xl bg-white p-3.5 text-navy-800">
      <div className="flex justify-between text-[13px] font-extrabold"><span>📍 Live location shared</span><span className="text-[11px] text-leaf-500">±5m accuracy</span></div>
      <div className="mt-0.5 text-[11.5px] text-slate-600">Lat 19.0760 · Long 72.8777 · Bandra West, Mumbai</div>
      <div className="relative mt-2.5 h-[100px] overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-4 w-4 rounded-full bg-rose-500 ring-4 ring-white ring-offset-8 ring-offset-rose-500/30" />
        </div>
      </div>
    </div>
    <div className="mx-4 mt-3 rounded-2xl border border-white/15 bg-white/8 p-3.5 text-white">
      <div className="mb-2 text-[13px] font-extrabold">Notified · 3 contacts</div>
      {[{ name: 'Mom', role: 'Primary', i: 'M', bg: 'bg-amber-500' }, { name: 'Best Friend', role: 'Secondary', i: 'B', bg: 'bg-leaf-500' }, { name: 'Guardian', role: 'Family', i: 'G', bg: 'bg-blue-500' }].map((c) => (
        <div key={c.name} className="flex items-center gap-2.5 py-1.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full font-black text-white ${c.bg}`}>{c.i}</div>
          <div className="flex-1 text-[12.5px] font-bold">{c.name} <span className="font-normal opacity-70">· {c.role}</span></div>
          <span className="text-[10.5px] font-black text-leaf-400">✓ SMS sent</span>
        </div>
      ))}
    </div>
    <div className="absolute inset-x-4 bottom-6 text-center text-[11px] text-white/85">Stay on the line. Support is on the way.</div>
  </PhoneFrame>
);

export const HazardsScreen: React.FC = () => (
  <PhoneFrame>
    <div className="px-5 pt-2">
      <div className="font-display text-[20px] font-bold">Local safety today</div>
      <div className="text-[12px] text-slate-500">Mumbai · Updated 8 min ago · IMD & NDMA feeds</div>
    </div>
    <div className="mx-4 mt-2 flex items-center justify-between rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-700 p-4 text-white">
      <div>
        <div className="text-[12px] opacity-85">Mumbai · Bandra</div>
        <div className="font-display text-[44px] font-black leading-none">29°</div>
        <div className="mt-0.5 text-[12px] opacity-85">Light rain · Feels 33°</div>
      </div>
      <div className="text-right">
        <div className="text-[46px]">☀️</div>
        <div className="mt-0.5 text-[11px] font-bold">☔ 60% rain</div>
      </div>
    </div>
    <div className="px-5 pb-2 pt-3 text-[14px] font-extrabold">Active alerts</div>
    <div className="flex flex-col gap-2 px-4 pb-3">
      {[
        { title: 'Heavy rain warning', msg: 'Waterlogging expected 4–8 pm in low-lying areas. Avoid Andheri subway route.', level: 'ORANGE', icon: '🌧', iconBg: 'bg-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', fg: 'text-amber-900', body: 'text-amber-800', tagBg: 'bg-amber-500' },
        { title: 'Heatwave watch', msg: 'Peak 36°C between 12–3 pm. Carry water; wear light cotton.', level: 'YELLOW', icon: '🌡', iconBg: 'bg-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200', fg: 'text-yellow-900', body: 'text-yellow-800', tagBg: 'bg-yellow-500' },
        { title: 'Traffic diversion', msg: 'S V Road closed near Khar station · Use Linking Road.', level: 'INFO', icon: '🚧', iconBg: 'bg-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', fg: 'text-blue-900', body: 'text-blue-800', tagBg: 'bg-blue-500' },
      ].map((a) => (
        <div key={a.title} className={`flex gap-2.5 rounded-2xl border p-3 ${a.bg} ${a.border}`}>
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-[20px] text-white ${a.iconBg}`}>{a.icon}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className={`text-[13px] font-extrabold ${a.fg}`}>{a.title}</div>
              <span className={`rounded-full px-2 py-0.5 text-[9.5px] font-black text-white ${a.tagBg}`}>{a.level}</span>
            </div>
            <div className={`mt-0.5 text-[11.5px] leading-snug ${a.body}`}>{a.msg}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="px-5 pb-2 text-[14px] font-extrabold">Quick safety tips</div>
    <div className="mb-24 flex flex-col gap-1.5 px-4">
      {[
        'Share your live location with a trusted contact when travelling after 8 pm.',
        'Save 112 as a favourite. Long-press power to call it from lock screen.',
        'Charge your phone above 40% before heading out in the monsoon.',
      ].map((t) => (
        <div key={t} className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-leaf-100 font-bold text-leaf-800">✓</div>
          <div className="text-[12px]">{t}</div>
        </div>
      ))}
    </div>
  </PhoneFrame>
);

export const AccessibilityScreen: React.FC = () => (
  <PhoneFrame>
    <div className="px-5 pt-2">
      <div className="font-display text-[20px] font-bold">Accessibility & Privacy</div>
      <div className="text-[12px] text-slate-500">Designed for every young Indian.</div>
    </div>
    <div className="mx-4 mt-2 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-200 p-3.5">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-[20px] text-white">🔊</div>
      <div className="flex-1"><div className="text-[13px] font-extrabold">Read aloud</div><div className="text-[11.5px] text-violet-900">On benefit cards and lessons. Speed 1.0×</div></div>
      <div className="relative h-6 w-11 rounded-full bg-violet-600"><div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white" /></div>
    </div>
    <div className="px-5 pb-1.5 pt-3 text-[13px] font-extrabold uppercase tracking-wider text-slate-500">Vision</div>
    <div className="mx-4 rounded-2xl border border-slate-200 bg-white px-3 py-1">
      {[
        { name: 'Text size', sub: 'Preserves layout at every size', options: ['A', 'A+', 'A++'], sel: 'A+' },
        { name: 'Contrast', sub: 'WCAG AAA yellow/black/cyan', options: ['Normal', 'High-contrast'], sel: 'High-contrast' },
        { name: 'Theme', sub: 'Auto-follows sunset in your city', options: ['Light', 'Dark'], sel: 'Light' },
      ].map((v, i) => (
        <div key={v.name} className={`flex items-center justify-between py-2.5 ${i < 2 ? 'border-b border-slate-100' : ''}`}>
          <div><div className="text-[13px] font-bold">{v.name}</div><div className="text-[11px] text-slate-500">{v.sub}</div></div>
          <div className="flex gap-1.5">
            {v.options.map((o) => (
              <span key={o} className={`rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${v.sel === o ? 'border-navy-800 bg-navy-800 text-white' : 'border-slate-200 bg-slate-100 text-navy-800'}`}>{o}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="mx-4 mt-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-[20px] text-white">🤟</div>
      <div className="flex-1"><div className="text-[13px] font-extrabold">Indian Sign Language guides</div><div className="text-[11px] text-slate-500">Banking basics · SOS · claiming benefits</div></div>
      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10.5px] font-black text-blue-700">Open</span>
    </div>
    <div className="px-5 pb-1.5 pt-3 text-[13px] font-extrabold uppercase tracking-wider text-slate-500">Privacy · DPDP</div>
    <div className="mx-4 mb-3 rounded-2xl border border-slate-200 bg-white px-3 py-1">
      {[
        { name: 'Location matching', sub: 'Only used to show relevant benefits', on: true },
        { name: 'Partner personalisation', sub: 'Never for marketing calls', on: false },
        { name: 'Read-aloud analytics', sub: 'Anonymous, on-device only', on: true },
        { name: 'Data access audit trail', sub: 'See every criterion matched, always', on: true },
      ].map((p, i) => (
        <div key={p.name} className={`flex items-center justify-between py-2.5 ${i < 3 ? 'border-b border-slate-100' : ''}`}>
          <div><div className="text-[13px] font-bold">{p.name}</div><div className="text-[11px] text-slate-500">{p.sub}</div></div>
          <div className={`relative h-6 w-10 rounded-full ${p.on ? 'bg-leaf-500' : 'bg-slate-400'}`}><div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white ${p.on ? 'right-0.5' : 'left-0.5'}`} /></div>
        </div>
      ))}
    </div>
    <div className="mx-4 mb-24 rounded-xl border border-leaf-200 bg-leaf-50 px-3 py-2.5 text-[11.5px] text-leaf-800">
      ● Zero third-party ad sharing · full data-access audit trail available.
    </div>
  </PhoneFrame>
);
