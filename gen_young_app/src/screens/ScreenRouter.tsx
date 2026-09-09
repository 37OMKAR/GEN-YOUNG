import React, { useState } from 'react';
import { SplashScreen } from './app/Splash';
import { OnboardScreen } from './app/Onboard';
import { HomeScreen } from './app/Home';
import { SearchScreen, NotificationsScreen, BenefitDetailScreen, WalletScreen, ProfileScreen } from './app/Screens';
import { BankingScreen } from './app/Banking';
import { CardScreen, UPIScreen, PinEntryScreen, UPISuccessScreen, GoalsScreen } from './app/PaymentFlow';
import { LearnScreen, FinanceScreen, QuizScreen, QuizResultScreen, QuestScreen } from './app/LearnFlow';
import { DropScreen, DropClaimScreen, WaitlistScreen, GreenScreen } from './app/DropFlow';
import { SOSScreen, SOSHoldScreen, SOSDispatchScreen, HazardsScreen, AccessibilityScreen } from './app/SafetyFlow';

type ScreenDef = { id: string; label: string; group: string; comp: React.ReactNode };

export const useAllScreens = (): { screens: ScreenDef[]; groups: string[] } => {
  const [screenId, setScreenId] = useState('home');
  const goto = (id: string) => setScreenId(id);

  const screens: ScreenDef[] = [
    { id: 'splash',        label: '01 Splash',            group: 'Onboarding', comp: <SplashScreen /> },
    { id: 'onboard',       label: '02 Onboard · persona', group: 'Onboarding', comp: <OnboardScreen onContinue={() => goto('home')} /> },
    { id: 'home',          label: '03 Home · Marketplace', group: 'Home',      comp: <HomeScreen onNav={goto} /> },
    { id: 'search',        label: '04 Search',             group: 'Home',      comp: <SearchScreen /> },
    { id: 'notifications', label: '05 Notifications',      group: 'Home',      comp: <NotificationsScreen /> },
    { id: 'benefit',       label: '06 Benefit detail',     group: 'Home',      comp: <BenefitDetailScreen /> },
    { id: 'wallet',        label: '07 Benefits wallet',    group: 'Home',      comp: <WalletScreen /> },
    { id: 'profile',       label: '08 Profile',            group: 'Home',      comp: <ProfileScreen onNav={goto} /> },

    { id: 'banking',       label: '09 Banking dashboard',  group: 'Banking',   comp: <BankingScreen onNav={goto} /> },
    { id: 'card',          label: '10 Virtual card',       group: 'Banking',   comp: <CardScreen /> },
    { id: 'goals',         label: '11 Savings goals',      group: 'Banking',   comp: <GoalsScreen /> },
    { id: 'upi',           label: '12 UPI send',           group: 'Banking',   comp: <UPIScreen /> },
    { id: 'pin',           label: '13 PIN entry',          group: 'Banking',   comp: <PinEntryScreen /> },
    { id: 'upi-success',   label: '14 UPI success',        group: 'Banking',   comp: <UPISuccessScreen /> },

    { id: 'learn',         label: '15 Learn · Skills',     group: 'Learn',     comp: <LearnScreen /> },
    { id: 'finance',       label: '16 Financial learning', group: 'Learn',     comp: <FinanceScreen /> },
    { id: 'quiz',          label: '17 Quiz',               group: 'Learn',     comp: <QuizScreen /> },
    { id: 'quiz-result',   label: '18 Quiz result',        group: 'Learn',     comp: <QuizResultScreen /> },
    { id: 'quest',         label: '19 3-step quest',       group: 'Learn',     comp: <QuestScreen /> },

    { id: 'drop',          label: '20 Friday Drop',        group: 'Drop',      comp: <DropScreen /> },
    { id: 'drop-claim',    label: '21 Drop claim',         group: 'Drop',      comp: <DropClaimScreen /> },
    { id: 'waitlist',      label: '22 Drop waitlist',      group: 'Drop',      comp: <WaitlistScreen /> },
    { id: 'green',         label: '23 Green Passport',     group: 'Drop',      comp: <GreenScreen /> },

    { id: 'sos',           label: '24 Emergency SOS',      group: 'Safety',    comp: <SOSScreen /> },
    { id: 'sos-hold',      label: '25 SOS · 3-sec hold',   group: 'Safety',    comp: <SOSHoldScreen /> },
    { id: 'sos-dispatch',  label: '26 SOS · dispatched',   group: 'Safety',    comp: <SOSDispatchScreen /> },
    { id: 'hazards',       label: '27 Weather & hazards',  group: 'Safety',    comp: <HazardsScreen /> },
    { id: 'accessibility', label: '28 Accessibility',      group: 'Safety',    comp: <AccessibilityScreen /> },
  ];

  const groups = Array.from(new Set(screens.map((s) => s.group)));
  return { screens, groups };
};

export const ScreenShowcase: React.FC = () => {
  const [screenId, setScreenId] = useState('splash');
  const { screens, groups } = useAllScreens();
  const active = screens.find((s) => s.id === screenId) ?? screens[0];
  const [open, setOpen] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 pb-20">
      {/* Ambient decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-leaf-400/20 blur-3xl" />
        <div className="absolute -right-24 top-40 h-[500px] w-[500px] rounded-full bg-navy-800/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-300/15 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 via-leaf-500 to-emerald-600 text-white shadow-lg shadow-leaf-500/30">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#fff"/></svg>
            </div>
            <div>
              <div className="font-display text-[18px] font-black leading-none tracking-tight">
                Gen-<span className="text-shimmer">Young</span>
              </div>
              <div className="text-[11px] font-medium text-slate-500">{active.label} · Design showcase</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 md:block">
              {screens.length} screens · {groups.length} flows
            </div>
            <button onClick={() => setOpen((o) => !o)} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-bold text-navy-800 hover:bg-slate-50">
              {open ? 'Hide picker' : 'Show picker'}
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-6xl gap-4 px-4 py-4">
        {open && (
          <aside className="hidden w-64 shrink-0 rounded-3xl border border-white/60 bg-white/85 p-3 shadow-xl shadow-navy-800/10 backdrop-blur md:block">
            <div className="mb-2 rounded-2xl bg-gradient-to-br from-navy-800 to-leaf-600 p-3 text-white">
              <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Design showcase</div>
              <div className="mt-0.5 font-display text-[18px] font-black">{screens.length} screens</div>
              <div className="text-[10.5px] opacity-85">Across {groups.length} youth flows</div>
            </div>
            {groups.map((g) => (
              <div key={g} className="mb-3">
                <div className="mb-1 px-1 text-[10.5px] font-black uppercase tracking-wider text-slate-500">{g}</div>
                {screens.filter((s) => s.group === g).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScreenId(s.id)}
                    className={`block w-full rounded-xl px-2.5 py-1.5 text-left text-[12px] font-semibold transition ${
                      screenId === s.id
                        ? 'bg-gradient-to-r from-navy-800 to-leaf-600 text-white shadow-lg shadow-navy-800/25'
                        : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            ))}
          </aside>
        )}
        <section className="flex flex-1 items-start justify-center">{active.comp}</section>
      </main>

      {/* Mobile picker */}
      <div className="fixed inset-x-4 bottom-4 z-40 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-card-soft backdrop-blur md:hidden">
        <select
          value={screenId}
          onChange={(e) => setScreenId(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-navy-800"
        >
          {screens.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
