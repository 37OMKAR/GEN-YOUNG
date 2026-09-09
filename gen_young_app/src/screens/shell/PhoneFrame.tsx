import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  bg?: string;
  statusColor?: 'navy' | 'white';
  notchColor?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  bg = 'bg-white',
  statusColor = 'navy',
  notchColor = 'bg-navy-800',
}) => {
  const sc = statusColor === 'navy' ? '#0B2A5B' : '#ffffff';
  return (
    <div className={`relative mx-auto my-6 h-[844px] w-[390px] overflow-hidden rounded-[44px] shadow-phone ${bg}`}>
      <div className={`absolute left-1/2 top-2 z-30 h-7 w-28 -translate-x-1/2 rounded-[20px] ${notchColor}`} />
      <div className="flex items-center justify-between px-7 pb-2 pt-3.5 text-[13px] font-bold" style={{ color: sc }}>
        <span>9:41</span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="16" height="10" viewBox="0 0 16 10"><rect x="0" y="7" width="3" height="3" rx="0.5" fill={sc}/><rect x="4" y="5" width="3" height="5" rx="0.5" fill={sc}/><rect x="8" y="3" width="3" height="7" rx="0.5" fill={sc}/><rect x="12" y="1" width="3" height="9" rx="0.5" fill={sc}/></svg>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke={sc} strokeWidth="1.4" strokeLinecap="round"><path d="M1 4a10 10 0 0114 0"/><path d="M3.5 6a7 7 0 019 0"/></svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="1" y="1" width="20" height="10" rx="3" stroke={sc} strokeWidth="1.5"/><rect x="3" y="3" width="16" height="6" rx="1.5" fill={sc}/><rect x="22" y="4" width="2" height="4" rx="1" fill={sc}/></svg>
        </span>
      </div>
      <div className="h-[calc(844px-40px)] overflow-y-auto no-scrollbar">{children}</div>
    </div>
  );
};

interface BrandStrip {
  subtitle?: string;
  onBell?: () => void;
}

export const BrandHeader: React.FC<BrandStrip> = ({ subtitle = 'More Opportunities. A Brighter You.', onBell }) => (
  <div className="flex items-center justify-between px-5 py-1.5">
    <div>
      <div className="text-[20px] font-extrabold tracking-tight">
        Gen-<span className="text-leaf-500">Young</span>
        <svg width="12" height="12" viewBox="0 0 24 24" className="ml-0.5 inline align-[-1px]"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#22C55E"/></svg>
      </div>
      <div className="text-[11px] font-medium text-slate-500">{subtitle}</div>
    </div>
    <div className="flex items-center gap-3">
      <button onClick={onBell} className="relative">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B2A5B" strokeWidth="1.8" strokeLinecap="round"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 003.4 0"/></svg>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-white bg-leaf-500" />
      </button>
      <div className="h-8 w-8 rounded-full border-2 border-leaf-500 bg-gradient-to-br from-amber-200 to-rose-300" />
    </div>
  </div>
);

export type NavItem = { id: string; label: string; icon: React.ReactNode; active?: boolean };

export const AppBottomNav: React.FC<{ items: NavItem[]; onNav?: (id: string) => void }> = ({ items, onNav }) => (
  <div className="absolute bottom-0 left-0 right-0 flex justify-around border-t border-slate-200 bg-white px-2 pb-5 pt-2.5">
    {items.map((it) => (
      <button
        key={it.id}
        onClick={() => onNav?.(it.id)}
        className={`flex flex-col items-center gap-1 text-[10.5px] font-semibold ${it.active ? 'text-navy-800' : 'text-slate-400'}`}
      >
        {it.icon}
        <span>{it.label}</span>
      </button>
    ))}
  </div>
);

export const Icon = {
  home: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill={c}><path d="M3 12L12 3l9 9v9h-6v-6H9v6H3z"/></svg>,
  benefits: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><path d="M5 8h14l-1 12H6z M9 8V6a3 3 0 016 0v2"/></svg>,
  learn: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinejoin="round"><path d="M4 6l8-3 8 3-8 3-8-3z M4 6v6c0 2 4 4 8 4s8-2 8-4V6"/></svg>,
  drop: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill={c}><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>,
  profile: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 5-6 8-6s7 2 8 6"/></svg>,
  sos: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 24 24" fill={c}><path d="M12 2l10 18H2z"/></svg>,
  leaf: (c = '#22C55E') => <svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill={c}/></svg>,
};

export const defaultNav = (active: string, onNav?: (id: string) => void): React.ReactElement => (
  <AppBottomNav
    onNav={onNav}
    items={[
      { id: 'home', label: 'Home', active: active === 'home', icon: Icon.home(active === 'home' ? '#0B2A5B' : '#94A3B8') },
      { id: 'benefits', label: 'Benefits', active: active === 'benefits', icon: Icon.benefits(active === 'benefits' ? '#0B2A5B' : '#94A3B8') },
      { id: 'learn', label: 'Learn', active: active === 'learn', icon: Icon.learn(active === 'learn' ? '#0B2A5B' : '#94A3B8') },
      { id: 'drop', label: 'Drop', active: active === 'drop', icon: Icon.drop(active === 'drop' ? '#0B2A5B' : '#94A3B8') },
      { id: 'profile', label: 'Profile', active: active === 'profile', icon: Icon.profile(active === 'profile' ? '#0B2A5B' : '#94A3B8') },
    ]}
  />
);
