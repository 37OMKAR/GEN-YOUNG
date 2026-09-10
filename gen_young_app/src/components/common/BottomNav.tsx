import React from 'react';
import { Home, Sparkles, GraduationCap, Flame, ShieldAlert, User, LucideIcon } from 'lucide-react';

export type NavTabId = 'home' | 'benefits' | 'learn' | 'drops' | 'safety' | 'profile';

export interface BottomNavProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  dropBadgeCount?: number;
  hasActiveSos?: boolean;
}

interface TabConfig {
  id: NavTabId;
  label: string;
  icon: LucideIcon;
  isSpecial?: boolean;
}

const noMotion = typeof window !== 'undefined'
  && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  dropBadgeCount = 0,
  hasActiveSos = false,
}) => {
  const tabs: TabConfig[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'benefits', label: 'Benefits', icon: Sparkles },
    { id: 'learn', label: 'Learn', icon: GraduationCap },
    { id: 'drops', label: 'Drops', icon: Flame },
    { id: 'safety', label: 'SOS', icon: ShieldAlert, isSpecial: true },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main application navigation"
      className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-xl border-t border-slate-200/80 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(15,23,42,0.06)]"
    >
      <div className="grid grid-cols-6 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isSafety = tab.id === 'safety';
          const activeColor = isSafety ? 'text-rose-600' : 'text-blue-700';
          const activeBg = isSafety ? 'bg-rose-50' : 'bg-blue-50';

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-label={`${tab.label} tab`}
              aria-current={isActive ? 'page' : undefined}
              className={`min-h-[56px] flex flex-col items-center justify-center gap-0.5 relative rounded-2xl transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                isActive ? `${activeColor} ${activeBg}` : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.id === 'drops' && dropBadgeCount > 0 && (
                <span className={`absolute top-1 right-2 min-w-[16px] h-4 px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ${noMotion ? '' : 'animate-pulse'}`}>
                  {dropBadgeCount}
                </span>
              )}
              {isSafety && hasActiveSos && (
                <span className={`absolute top-1 right-3 w-2 h-2 bg-rose-500 rounded-full ${noMotion ? '' : 'animate-ping'}`} />
              )}
              <Icon size={20} className={isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'} />
              <span className={`text-[11px] tracking-tight ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
