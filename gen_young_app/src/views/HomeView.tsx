import React, { useState } from 'react';
import {
  Search, Landmark, Building2, Cpu, HeartPulse, Briefcase, ShoppingBag,
  ShieldCheck, Leaf, Accessibility, ChevronRight, Bell, LucideIcon,
} from 'lucide-react';
import { usePersona } from '../context/PersonaContext';
import { useBanking } from '../context/BankingContext';
import { useToast } from '../context/ToastContext';
import { AccountCard } from '../components/banking/AccountCard';
import { VirtualDebitCard } from '../components/banking/VirtualDebitCard';
import { SavingsGoals } from '../components/banking/SavingsGoals';
import { RecentTransactions } from '../components/banking/RecentTransactions';
import { UpiTransferModal } from '../components/banking/UpiTransferModal';
import { GreenImpactHub } from '../components/hubs/GreenImpactHub';
import { CommunityHub } from '../components/hubs/CommunityHub';
import { InsuranceHub } from '../components/hubs/InsuranceHub';
import { NavTabId } from '../components/common/BottomNav';

export interface HomeViewProps {
  onNavigateTab: (tab: NavTabId) => void;
}

type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string; // bg for the icon badge
  onClick?: () => void;
};

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateTab }) => {
  const { activePersona } = usePersona();
  const { depositMoney } = useBanking();
  const { showToast } = useToast();

  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [upiInitialMode, setUpiInitialMode] = useState<'send' | 'scan'>('send');
  const [openHub, setOpenHub] = useState<'green' | 'community' | 'insurance' | null>(null);

  const handleOpenSend = () => { setUpiInitialMode('send'); setIsUpiModalOpen(true); };
  const handleOpenScan = () => { setUpiInitialMode('scan'); setIsUpiModalOpen(true); };
  const handleSimulatedAddMoney = () => {
    depositMoney(1000);
    showToast('Simulated deposit: ₹1,000 added to your Youth Account!', 'success');
  };
  const handleScrollToCard = () => {
    const el = document.getElementById('virtual-debit-card-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const categories: Category[] = [
    { id: 'banking',   label: 'Banking',       icon: Landmark,      color: 'bg-blue-600' },
    { id: 'gov',       label: 'Govt Benefits', icon: Building2,     color: 'bg-emerald-600',  onClick: () => onNavigateTab('benefits') },
    { id: 'ai',        label: 'AI & Learning', icon: Cpu,           color: 'bg-violet-600',   onClick: () => onNavigateTab('learn') },
    { id: 'health',    label: 'Health',        icon: HeartPulse,    color: 'bg-rose-500' },
    { id: 'career',    label: 'Career',        icon: Briefcase,     color: 'bg-orange-500' },
    { id: 'lifestyle', label: 'Lifestyle',     icon: ShoppingBag,   color: 'bg-pink-500',     onClick: () => onNavigateTab('drops') },
    { id: 'insurance', label: 'Insurance',     icon: ShieldCheck,   color: 'bg-teal-600',     onClick: () => setOpenHub('insurance') },
    { id: 'green',     label: 'Green Future',  icon: Leaf,          color: 'bg-green-600',    onClick: () => setOpenHub('green') },
    { id: 'access',    label: 'Accessibility', icon: Accessibility, color: 'bg-indigo-600',   onClick: () => setOpenHub('community') },
  ];

  return (
    <main className="max-w-md mx-auto px-4 pt-3 pb-28 space-y-5">
      {/* Greeting */}
      <section className="flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-muted">{greet()}, {activePersona.name.split(' ')[0]}</p>
          <h1 className="text-2xl font-extrabold text-ink-strong leading-tight mt-0.5">
            Your Future <span className="text-blue-700">in One Place</span>
            <svg className="inline-block ml-1 -mt-1" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2C7 6 4 10 4 14c0 4 3 7 7 7 1 0 2-.2 3-.6-.5-2 .5-4 2-5 2-1 4-1 6 0 .3-1 .5-2 .5-3 0-4-3-8-11-10.4Z" fill="#22C55E"/>
            </svg>
          </h1>
        </div>
        <button aria-label="Notifications" className="relative p-2 rounded-full bg-white border border-slate-200 shadow-sm active:scale-95">
          <Bell size={18} className="text-slate-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
      </section>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search benefits, courses, offers…"
          className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60"
        />
      </div>

      {/* Category grid — the hero, matches marketing */}
      <section aria-label="Categories" className="grid grid-cols-3 gap-3">
        {categories.map(({ id, label, icon: Icon, color, onClick }) => (
          <button
            key={id}
            onClick={onClick}
            className="tile p-3 flex flex-col items-center text-center gap-2"
          >
            <span className={`tile-icon ${color}`}>
              <Icon size={22} className="stroke-[2.2px]" />
            </span>
            <span className="text-[12px] font-semibold text-ink-strong leading-tight">
              {label}
            </span>
          </button>
        ))}
      </section>

      {/* Recommended row */}
      <section aria-label="Recommended for you" className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink-strong">Recommended for You</h3>
          <button className="text-xs font-semibold text-blue-700 flex items-center gap-0.5" onClick={() => onNavigateTab('benefits')}>
            See All <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigateTab('benefits')}
            className="tile p-3 text-left"
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">Student Offer</span>
            <p className="text-sm font-bold text-ink-strong mt-2">AI Pro Plan</p>
            <p className="text-xs text-ink-muted mt-0.5">1 year free for eligible students</p>
            <span className="mt-3 inline-flex items-center justify-center text-xs font-semibold text-white bg-blue-600 rounded-full px-3 py-1.5 w-full">Claim Now</span>
          </button>
          <button
            onClick={() => onNavigateTab('drops')}
            className="tile p-3 text-left"
          >
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">Friday Drop</span>
            <p className="text-sm font-bold text-ink-strong mt-2">Movie Tickets</p>
            <p className="text-xs text-ink-muted mt-0.5">100,000 claims · 2D 12H 30M left</p>
            <span className="mt-3 inline-flex items-center justify-center text-xs font-semibold text-slate-800 bg-slate-100 rounded-full px-3 py-1.5 w-full">Get Reminder</span>
          </button>
        </div>
      </section>

      {/* Banking summary (kept from before, will look weird on light until AccountCard is also reskinned) */}
      <AccountCard
        onSendMoney={handleOpenSend}
        onScanQr={handleOpenScan}
        onAddMoney={handleSimulatedAddMoney}
        onCardSettings={handleScrollToCard}
      />

      <div id="virtual-debit-card-section">
        <VirtualDebitCard />
      </div>
      <SavingsGoals />
      <RecentTransactions />

      <UpiTransferModal isOpen={isUpiModalOpen} initialMode={upiInitialMode} onClose={() => setIsUpiModalOpen(false)} />
      <GreenImpactHub isOpen={openHub === 'green'} onClose={() => setOpenHub(null)} />
      <CommunityHub isOpen={openHub === 'community'} onClose={() => setOpenHub(null)} />
      <InsuranceHub isOpen={openHub === 'insurance'} onClose={() => setOpenHub(null)} />
    </main>
  );
};
