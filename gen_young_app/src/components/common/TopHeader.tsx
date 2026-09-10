import React from 'react';
import { ChevronDown, Contrast, Hand, Bell } from 'lucide-react';
import { usePersona } from '../../context/PersonaContext';
import { useAccessibility } from '../../context/AccessibilityContext';

export interface TopHeaderProps {
  onOpenPersonaSwitcher: () => void;
  onOpenAccessibilityDrawer?: () => void;
  onOpenSignLanguage?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenPersonaSwitcher,
  onOpenSignLanguage,
}) => {
  const { activePersona } = usePersona();
  const { settings, toggleHighContrast } = useAccessibility();

  return (
    <header className="sticky top-0 z-30 max-w-md mx-auto w-full bg-white/90 backdrop-blur-md border-b border-slate-200/70 px-4 py-3 flex items-center justify-between">
      {/* Brand — deep blue wordmark + green leaf */}
      <button
        onClick={onOpenPersonaSwitcher}
        aria-label="Open persona switcher"
        className="flex items-center gap-1.5 active:scale-95 transition-transform"
      >
        <span className="font-extrabold text-xl tracking-tight text-blue-800">
          Gen-Young
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2C7 6 4 10 4 14c0 4 3 7 7 7 1 0 2-.2 3-.6-.5-2 .5-4 2-5 2-1 4-1 6 0 .3-1 .5-2 .5-3 0-4-3-8-11-10.4Z" fill="#22C55E"/>
          <path d="M6 20c2-4 6-7 12-9" stroke="#065F46" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleHighContrast}
          aria-label="Toggle High-Contrast Mode"
          aria-pressed={settings.highContrast}
          title="Toggle High-Contrast Mode"
          className={`p-2 rounded-full transition-all active:scale-95 ${
            settings.highContrast
              ? 'bg-yellow-300 text-black'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Contrast size={16} />
        </button>

        {onOpenSignLanguage && (
          <button
            onClick={onOpenSignLanguage}
            aria-label="Open Indian Sign Language Guide"
            className="p-2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all active:scale-95"
          >
            <Hand size={16} />
          </button>
        )}

        <button
          aria-label="Notifications"
          className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all active:scale-95"
        >
          <Bell size={16} />
        </button>

        <button
          onClick={onOpenPersonaSwitcher}
          aria-label={`Current Persona: ${activePersona.name}. Click to switch.`}
          className="flex items-center gap-1.5 pl-0.5 pr-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all"
        >
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            {activePersona.avatarInitials || activePersona.name.charAt(0)}
          </div>
          <ChevronDown size={14} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
};
