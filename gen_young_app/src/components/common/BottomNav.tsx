import React from 'react';
import { Home, Sparkles, GraduationCap, Flame, ShieldAlert, User, LucideIcon } from 'lucide-react';

export type NavTabId = 'home' | 'benefits' | 'learn' | 'drops' | 'safety' | 'profile';

export interface BottomNavProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  dropBadgeCount?: number;
  hasActiveSos?: boolean;
}

const noMotion = typeof window !== 'undefined'
  && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

interface TabConfig {
  id: NavTabId;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
  isSpecial?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  dropBadgeCount = 1,
  hasActiveSos = false,
}) => {
  const tabs: TabConfig[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'benefits', label: 'Benefits', icon: Sparkles },
    { id: 'learn', label: 'Learn', icon: GraduationCap },
    { id: 'drops', label: 'Drops', icon: Flame, badge: dropBadgeCount > 0 ? 'LIVE' : undefined },
    { id: 'safety', label: 'SOS', icon: ShieldAlert, isSpecial: true },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main application navigation"
      className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 px-1 py-1.5 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]"
    >
      <div className="grid grid-cols-6 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isSafety = tab.id === 'safety';

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-label={`${tab.label} tab`}
              aria-current={isActive ? 'page' : undefined}
              className={`min-h-[50px] flex flex-col items-center justify-center relative rounded-xl transition-all duration-150 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                isActive
                  ? isSafety
                    ? 'text-rose-400 bg-rose-500/15'
                    : 'text-emerald-400 bg-emerald-500/10'
                  : isSafety
                  ? 'text-rose-400/80 hover:text-rose-300 hover:bg-rose-950/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {/* Badge indicator */}
              {tab.badge && (
                <span className={`absolute -top-1 right-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase shadow-sm tracking-wider ${noMotion ? '' : 'animate-pulse'}`}>
                  {tab.badge}
                </span>
              )}

              {/* Safety SOS glowing indicator */}
              {isSafety && hasActiveSos && (
                <span className={`absolute -top-1 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full ${noMotion ? '' : 'animate-ping'}`} />
              )}

              <Icon size={20} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
              <span
                className={`text-[11px] mt-0.5 tracking-tight ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>

              {/* Active dot */}
              {isActive && (
                <span
                  className={`w-1 h-1 rounded-full mt-0.5 ${
                    isSafety ? 'bg-rose-400' : 'bg-emerald-400'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
