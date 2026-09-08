/**
 * Gen-Young Emergency SOS & Safety Hub — Demo-Ready
 * Path: src/views/SosView.tsx
 *
 * Reflects docs/assets/07-emergency-sos.png and 17-weather-safety.png:
 *   3-second press-and-hold trigger → 10-second cancel window → simulated
 *   112 ERSS dispatch → trusted contact fan-out → weather / hazard alerts.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  MapPin,
  AlertTriangle,
  CloudRain,
  Users,
  CheckCircle2,
  RotateCw,
} from 'lucide-react';
import { usePersona } from '../context/PersonaContext';
import { useToast } from '../context/ToastContext';
import { SosHoldTrigger, DispatchCancelBanner } from '../components/sos/SosHoldTrigger';

type SosStage = 'idle' | 'dispatched' | 'confirmed' | 'cancelled';

interface DispatchState {
  stage: SosStage;
  ticketId?: string;
  cancelSecondsLeft: number;
  contactsNotified: string[];
}

const initialState: DispatchState = {
  stage: 'idle',
  cancelSecondsLeft: 0,
  contactsNotified: [],
};

function generateTicketId(): string {
  const now = new Date();
  const yyyymmdd = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `ERSS-${yyyymmdd}-${rand}`;
}

export const SosView: React.FC = () => {
  const { activePersona } = usePersona();
  const { showToast } = useToast();
  const [state, setState] = useState<DispatchState>(initialState);
  const cancelTimerRef = useRef<number | null>(null);

  // Weather alerts per city (deterministic mock)
  const weatherAlert = useMemo(() => {
    const city = activePersona.location.city;
    if (city === 'Mumbai') {
      return {
        title: 'IMD Severe Rainfall Warning',
        severity: 'High',
        body: 'Heavy to very heavy rainfall expected in Mumbai over the next 24 hours. Localised flooding and travel disruption likely.',
        source: 'India Meteorological Department (IMD)',
      };
    }
    if (city === 'Bengaluru') {
      return {
        title: 'BBMP Waterlogging Advisory',
        severity: 'Moderate',
        body: 'Localised waterlogging expected on 100 Feet Road and Old Airport Road due to overnight showers. Metro services running normal.',
        source: 'BBMP Emergency Ops',
      };
    }
    return {
      title: 'IMD Heatwave Watch',
      severity: 'Moderate',
      body: 'Day temperatures 4–5°C above normal expected. Stay hydrated and avoid direct sun between 12–3 PM.',
      source: 'India Meteorological Department (IMD)',
    };
  }, [activePersona.location.city]);

  // Handle the 10-second cancel window countdown
  useEffect(() => {
    if (state.stage !== 'dispatched') return;
    cancelTimerRef.current = window.setInterval(() => {
      setState((prev) => {
        if (prev.stage !== 'dispatched') return prev;
        const next = prev.cancelSecondsLeft - 1;
        if (next <= 0) {
          return { ...prev, stage: 'confirmed', cancelSecondsLeft: 0 };
        }
        return { ...prev, cancelSecondsLeft: next };
      });
    }, 1000);
    return () => {
      if (cancelTimerRef.current !== null) window.clearInterval(cancelTimerRef.current);
    };
  }, [state.stage]);

  const handleTriggered = () => {
    const ticketId = generateTicketId();
    // Stagger the contact-notification toasts for visual drama
    activePersona.trustedContacts.forEach((c, idx) => {
      window.setTimeout(() => {
        setState((prev) => {
          if (prev.stage !== 'dispatched') return prev;
          return {
            ...prev,
            contactsNotified: [...prev.contactsNotified, c.name],
          };
        });
      }, 400 * (idx + 1));
    });

    setState({
      stage: 'dispatched',
      ticketId,
      cancelSecondsLeft: 10,
      contactsNotified: [],
    });
    showToast(`SOS dispatched · Ticket ${ticketId}`, 'success');
  };

  const handleCancel = () => {
    setState({ ...initialState, stage: 'cancelled' });
    showToast('SOS dispatch cancelled — no responder was sent.', 'success');
    // Auto-reset back to idle after 4s
    window.setTimeout(() => setState(initialState), 4000);
  };

  const handleReset = () => {
    setState(initialState);
    showToast('Emergency system reset — ready for next demo.', 'success');
  };

  return (
    <main className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-5">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-rose-400" size={20} />
          <h1 className="text-lg font-bold text-white tracking-tight">Emergency SOS & Safety</h1>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Simulated 112 ERSS integration · GPS dispatch · 5 trusted contacts
        </p>
      </header>

      {/* SOS Hold Trigger OR Dispatch banner */}
      <section
        className="bg-gradient-to-br from-rose-950/40 via-slate-850 to-slate-900 border border-rose-500/30 rounded-2xl p-5 shadow-xl flex flex-col items-center gap-4"
        aria-live="polite"
      >
        {state.stage === 'idle' && (
          <>
            <div className="flex items-center gap-2 self-start">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Simulated 112 ERSS Ready
              </span>
            </div>
            <SosHoldTrigger onTriggered={handleTriggered} />
          </>
        )}

        {state.stage === 'dispatched' && state.ticketId && (
          <div className="w-full space-y-3">
            <DispatchCancelBanner
              ticketId={state.ticketId}
              secondsLeft={state.cancelSecondsLeft}
              onCancel={handleCancel}
            />
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Users size={11} /> Trusted contacts fan-out
              </span>
              {activePersona.trustedContacts.map((c) => {
                const notified = state.contactsNotified.includes(c.name);
                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-between text-xs py-1"
                  >
                    <span className="text-slate-200">{c.name}</span>
                    {notified ? (
                      <span className="text-emerald-300 font-bold flex items-center gap-1">
                        <CheckCircle2 size={12} /> Notified
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px] animate-pulse">Sending…</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {state.stage === 'confirmed' && state.ticketId && (
          <div className="w-full space-y-3">
            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-950/40 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">Dispatch confirmed by 112 ERSS</h3>
                  <p className="text-[11px] text-emerald-200 mt-0.5 leading-snug">
                    Nearest responder assigned · Ticket{' '}
                    <span className="font-mono font-bold">{state.ticketId}</span>. Keep your phone
                    with you.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              <RotateCw size={12} /> Reset for next demo
            </button>
          </div>
        )}

        {state.stage === 'cancelled' && (
          <div className="w-full rounded-2xl border border-slate-700 bg-slate-900 p-4 text-center">
            <p className="text-xs text-slate-200 font-bold">Dispatch cancelled</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              No responder was sent. Returning to idle in a moment…
            </p>
          </div>
        )}

        {/* Live location badge */}
        {state.stage === 'idle' && (
          <div className="flex items-center gap-2 w-full pt-3 border-t border-slate-700/50 text-xs text-slate-300">
            <MapPin size={14} className="text-emerald-400 shrink-0" />
            <span>
              {activePersona.location.locality}, {activePersona.location.city} (±
              {activePersona.location.coordinates.accuracy}m GPS)
            </span>
          </div>
        )}
      </section>

      {/* Trusted Contacts list (always visible) */}
      <section aria-label="Trusted contacts">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Configured Trusted Contacts ({activePersona.trustedContacts.length})
        </h3>
        <ul className="space-y-2">
          {activePersona.trustedContacts.map((contact) => (
            <li
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
                    {contact.relation} · {contact.phone}
                  </span>
                </div>
              </div>
              {contact.isPrimary && (
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30 font-semibold">
                  Primary
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Weather / Hazard Alert */}
      <section aria-label="Local hazard alerts">
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <div className="flex items-start gap-2.5">
            <CloudRain size={20} className="text-amber-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-amber-300">{weatherAlert.title}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-200 uppercase tracking-wider">
                  {weatherAlert.severity}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {weatherAlert.body}
              </p>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] text-amber-400">
                <AlertTriangle size={10} />
                Source: {weatherAlert.source}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
        <span className="font-bold text-slate-200 block mb-1">How the SOS flow works</span>
        Press and hold the SOS button for a full 3 seconds. On release before 3s, the dispatch is
        cancelled. After 3s, a simulated 112 ERSS ticket is generated, your live location is shared,
        and your trusted contacts are notified in parallel. You have 10 seconds to cancel a
        false-alarm before the dispatch is committed.
      </div>
    </main>
  );
};
