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
    <div className="min-h-screen bg-slate-100 pb-20">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-navy-800 to-leaf-500 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 20c0-8 6-14 16-16-1 10-7 16-16 16z" fill="#fff"/></svg>
            </div>
            <div>
              <div className="font-display text-[16px] font-bold leading-none">Gen-<span className="text-leaf-500">Young</span> app</div>
              <div className="text-[11px] text-slate-500">{active.label}</div>
            </div>
          </div>
          <button onClick={() => setOpen((o) => !o)} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-bold text-navy-800 hover:bg-slate-50">
            {open ? 'Hide picker' : 'Show picker'}
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl gap-4 px-4 py-4">
        {open && (
          <aside className="hidden w-64 shrink-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-card-soft md:block">
            <div className="mb-2 text-[11px] font-black uppercase tracking-wider text-slate-500">Screens · {screens.length}</div>
            {groups.map((g) => (
              <div key={g} className="mb-3">
                <div className="mb-1 text-[11.5px] font-extrabold text-navy-800">{g}</div>
                {screens.filter((s) => s.group === g).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScreenId(s.id)}
                    className={`block w-full rounded-lg px-2 py-1.5 text-left text-[12px] font-semibold ${screenId === s.id ? 'bg-navy-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
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
