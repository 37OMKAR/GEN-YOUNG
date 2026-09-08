import React from 'react';
import { ShieldAlert, PhoneCall, MapPin, AlertTriangle } from 'lucide-react';
import { usePersona } from '../context/PersonaContext';

export const SosView: React.FC = () => {
  const { activePersona } = usePersona();

  return (
    <main className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-rose-400" size={20} />
          <h1 className="text-lg font-bold text-white tracking-tight">Emergency SOS & Safety</h1>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Simulated 112 ERSS integration, GPS dispatch & trusted contacts
        </p>
      </div>

      {/* High Urgency Notice Card */}
      <div className="bg-gradient-to-br from-rose-950/40 via-slate-850 to-slate-900 border border-rose-500/30 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            Simulated 112 Emergency System Ready
          </span>
        </div>
        <p className="text-xs text-slate-300">
          In distress, press and hold the 3-second SOS trigger to dispatch your live location to 112 India and your trusted emergency contacts.
        </p>

        {/* Current Location Badge */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50 text-xs text-slate-300">
          <MapPin size={14} className="text-emerald-400 shrink-0" />
          <span>
            {activePersona.location.locality}, {activePersona.location.city} (±5m simulated GPS)
          </span>
        </div>
      </div>

      {/* Trusted Contacts Preview */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Configured Trusted Contacts ({activePersona.trustedContacts.length})
        </h3>
        {activePersona.trustedContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-3 bg-slate-850 border border-slate-700/60 rounded-xl flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <PhoneCall size={14} />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">{contact.name}</span>
                <span className="text-[10px] text-slate-400">
                  {contact.relation} • {contact.phone}
                </span>
              </div>
            </div>
            {contact.isPrimary && (
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30 font-semibold">
                Primary
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Local Weather Hazard Alert Preview */}
      <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5">
        <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold text-amber-300 block">
            IMD Monsoon & Coastal Warning ({activePersona.location.city})
          </span>
          <span className="text-[11px] text-slate-300 block mt-0.5">
            Moderate waterlogging expected near low-lying roads. Transit authorities active.
          </span>
        </div>
      </div>

      {/* Milestone 3 Staging Notice */}
      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-center">
        <span className="text-xs font-bold text-rose-400 block">
          3-Second Hold SOS & ERSS Dispatch Simulation
        </span>
        <span className="text-[11px] text-slate-300 mt-1 block">
          Full 3-second hold countdown, Web Audio alarm beeps, 10s false-alarm cancel window, and dispatch simulation will be activated in Milestone 3.
        </span>
      </div>
    </main>
  );
};
