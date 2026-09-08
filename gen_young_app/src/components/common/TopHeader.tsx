import React from 'react';
import { Sprout, ChevronDown, CheckCircle2, Contrast, Hand } from 'lucide-react';
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
    <header className="sticky top-0 z-30 max-w-md mx-auto w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between shadow-sm">
      {/* Brand & Zero-Balance Badge */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-sm shadow-emerald-500/30">
            <Sprout size={15} className="stroke-[2.5px]" />
          </div>
          <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent">
            Gen-Young
          </span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <CheckCircle2 size={10} className="text-emerald-400" />
          <span className="text-[10px] font-medium text-slate-400">
            Zero-Balance Youth Account
          </span>
        </div>
      </div>

      {/* Right Controls: High-Contrast Toggle & Active Persona Chip */}
      <div className="flex items-center gap-2">
        {/* High Contrast Quick Toggle */}
        <button
          onClick={toggleHighContrast}
          aria-label="Toggle High-Contrast Mode"
          title="Toggle High-Contrast Mode"
          className={`p-1.5 rounded-lg border transition-all active:scale-95 ${
            settings.highContrast
              ? 'bg-yellow-400 text-slate-950 border-yellow-300 font-bold'
              : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:text-white hover:bg-slate-700'
          }`}
        >
          <Contrast size={16} />
        </button>

        {/* Indian Sign Language (ISL) Assistant Toggle */}
        {onOpenSignLanguage && (
          <button
            onClick={onOpenSignLanguage}
            aria-label="Open Indian Sign Language Guide"
            title="Indian Sign Language (ISL) Assistant - Quoted from 37OMKAR/text-to-signlanguage"
            className="p-1.5 rounded-lg border border-emerald-500/50 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/50 hover:text-white transition-all active:scale-95"
          >
            <Hand size={16} />
          </button>
        )}

        {/* Persona Chip Selector */}
        <button
          onClick={onOpenPersonaSwitcher}
          aria-label={`Current Persona: ${activePersona.name}, age ${activePersona.age}. Click to switch.`}
          className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700/80 active:scale-95 transition-all border border-slate-700/70 rounded-full pl-1.5 pr-2.5 py-1 text-left"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-xs font-bold uppercase">
            {activePersona.avatarInitials || activePersona.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-100 leading-tight">
              {activePersona.name.split(' ')[0]}
            </span>
            <span className="text-[9px] text-emerald-400 font-medium leading-none">
              Age {activePersona.age}
            </span>
          </div>
          <ChevronDown size={14} className="text-slate-400 ml-0.5" />
        </button>
      </div>
    </header>
  );
};
