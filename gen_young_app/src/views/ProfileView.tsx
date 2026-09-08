import React from 'react';
import { User, Leaf, Shield, Contrast, Volume2, MapPin, Eye } from 'lucide-react';
import { usePersona } from '../context/PersonaContext';
import { useAccessibility } from '../context/AccessibilityContext';

export interface ProfileViewProps {
  onOpenPersonaModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenPersonaModal }) => {
  const { activePersona } = usePersona();
  const { settings, toggleHighContrast, setFontSize, setSpeechRate, toggleLocationSharing, togglePartnerPersonalization, auditLogs } = useAccessibility();
  const gp = activePersona.greenProfile;

  return (
    <main className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-5">
      {/* 1. Header & Persona Summary Card */}
      <div className="bg-slate-850 border border-slate-700/60 rounded-2xl p-4 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
              {activePersona.avatarInitials || activePersona.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{activePersona.name}</h2>
              <span className="text-xs text-emerald-400 font-medium block">
                {activePersona.roleLabel} • {activePersona.age} yrs
              </span>
            </div>
          </div>
          <button
            onClick={onOpenPersonaModal}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 font-bold text-xs border border-emerald-500/30 transition-all"
          >
            Switch
          </button>
        </div>

        <p className="text-xs text-slate-300 mt-3">{activePersona.bio}</p>

        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-700/50 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">Institution / Org</span>
            <span className="font-semibold text-slate-200 truncate block">
              {activePersona.institutionOrCompany}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Location</span>
            <span className="font-semibold text-slate-200 truncate block">
              {activePersona.location.city}, {activePersona.location.state}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Green Gen-Young Passport Preview */}
      <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf size={18} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Green Gen-Young Passport</h3>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
            {gp.unlockedBadges.length} Badges
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <span className="font-mono font-bold text-emerald-400 text-sm block">
              {gp.paperlessMonths} mo
            </span>
            <span className="text-[9px] text-slate-400">Paperless Banking</span>
          </div>
          <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <span className="font-mono font-bold text-teal-400 text-sm block">
              {gp.carbonOffsetKg} kg
            </span>
            <span className="text-[9px] text-slate-400">CO₂ Avoided</span>
          </div>
          <div className="p-2 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <span className="font-mono font-bold text-cyan-400 text-sm block">
              {gp.unSdgCoursesCompleted}
            </span>
            <span className="text-[9px] text-slate-400">UN SDG Courses</span>
          </div>
        </div>
      </div>

      {/* 3. Universal Accessibility Controls */}
      <div className="bg-slate-850 border border-slate-700/60 rounded-2xl p-4 shadow-lg space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Contrast size={14} className="text-yellow-400" />
          Universal Accessibility
        </h3>

        {/* High-Contrast Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white block">High-Contrast Mode</span>
            <span className="text-[10px] text-slate-400">WCAG AAA compliant black/yellow palette</span>
          </div>
          <button
            onClick={toggleHighContrast}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              settings.highContrast
                ? 'bg-yellow-400 text-slate-950 font-bold'
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {settings.highContrast ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Font Size Scaling */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
          <div>
            <span className="text-xs font-bold text-white block">Text Resizing</span>
            <span className="text-[10px] text-slate-400">Adjust text size across the UI</span>
          </div>
          <div className="flex gap-1">
            {(['normal', 'large', 'xl'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  settings.fontSize === size
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Speech Rate */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
          <div>
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <Volume2 size={13} />
              Read-Aloud TTS Speed
            </span>
            <span className="text-[10px] text-slate-400">Web Speech API rate</span>
          </div>
          <div className="flex gap-1">
            {[0.75, 1.0, 1.25].map((rate) => (
              <button
                key={rate}
                onClick={() => setSpeechRate(rate)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  settings.speechRate === rate
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Privacy & Consent Control Center */}
      <div className="bg-slate-850 border border-slate-700/60 rounded-2xl p-4 shadow-lg space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Shield size={14} className="text-emerald-400" />
          Privacy & Offers Control
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-white block">Location Sharing for Perks</span>
            <span className="text-[10px] text-slate-400">Localize transit and campus perks</span>
          </div>
          <button
            onClick={toggleLocationSharing}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              settings.locationSharing ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
            }`}
          >
            {settings.locationSharing ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
          <div>
            <span className="text-xs font-bold text-white block">Partner Personalization</span>
            <span className="text-[10px] text-slate-400">Match student & career benefits</span>
          </div>
          <button
            onClick={togglePartnerPersonalization}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              settings.partnerPersonalization ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
            }`}
          >
            {settings.partnerPersonalization ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Data Access Audit Log Mini-Summary */}
        <div className="pt-2 border-t border-slate-700/40">
          <span className="text-[11px] font-bold text-slate-300 block mb-1">
            Data Access Audit Log ({auditLogs.length} Verified Entries)
          </span>
          <div className="space-y-1.5">
            {auditLogs.slice(0, 2).map((log) => (
              <div key={log.id} className="p-2 bg-slate-900/60 rounded-lg text-[10px] text-slate-400">
                <span className="font-semibold text-slate-200 block">{log.action}</span>
                <span>{log.partner} • {log.purpose}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
