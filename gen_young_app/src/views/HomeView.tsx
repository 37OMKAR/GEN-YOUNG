import React, { useState } from 'react';
import { Sparkles, Flame, Leaf, Users, Shield } from 'lucide-react';
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

export const HomeView: React.FC<HomeViewProps> = ({ onNavigateTab }) => {
  const { activePersona } = usePersona();
  const { depositMoney } = useBanking();
  const { showToast } = useToast();

  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [upiInitialMode, setUpiInitialMode] = useState<'send' | 'scan'>('send');
  const [openHub, setOpenHub] = useState<'green' | 'community' | 'insurance' | null>(null);

  const handleOpenSend = () => {
    setUpiInitialMode('send');
    setIsUpiModalOpen(true);
  };

  const handleOpenScan = () => {
    setUpiInitialMode('scan');
    setIsUpiModalOpen(true);
  };

  const handleSimulatedAddMoney = () => {
    depositMoney(1000);
    showToast('Simulated deposit: ₹1,000 added to your Youth Account!', 'success');
  };

  const handleScrollToCard = () => {
    const el = document.getElementById('virtual-debit-card-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="max-w-md mx-auto px-4 pt-3 pb-24 space-y-5">
      {/* 1. Contextual Greeting Banner */}
      <section className="bg-gradient-to-r from-emerald-900/30 via-slate-800/40 to-slate-900/30 border border-emerald-500/20 rounded-2xl p-3.5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Hi, {activePersona.name.split(' ')[0]} 👋
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {activePersona.role === 'student' && 'College Senior • Mumbai Tech Track'}
            {activePersona.role === 'aspirant' && 'Class 11 Aspirant • Minor Account'}
            {activePersona.role === 'professional' && 'Young Pro • Bengaluru FinTrack'}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
            {activePersona.location.city}
          </span>
        </div>
      </section>

      {/* 2. Primary Account Card */}
      <AccountCard
        onSendMoney={handleOpenSend}
        onScanQr={handleOpenScan}
        onAddMoney={handleSimulatedAddMoney}
        onCardSettings={handleScrollToCard}
      />

      {/* 3. Virtual Debit Card with 3D Flip */}
      <div id="virtual-debit-card-section">
        <VirtualDebitCard />
      </div>

      {/* 4. Target Savings Goals */}
      <SavingsGoals />

      {/* 5. Recent Transactions Ledger */}
      <RecentTransactions />

      {/* 6. Benefits & Drops Teaser Cards */}
      <section className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Featured Opportunities
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onNavigateTab('benefits')}
            className="p-3 bg-chip-perk border border-purple-500/30 rounded-xl text-left hover:border-purple-400/60 transition-all active:scale-95 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-purple-500/20 text-purple-300 font-semibold px-1.5 py-0.5 rounded">
                AI Perk
              </span>
              <Sparkles size={13} className="text-purple-400" />
            </div>
            <span className="text-xs font-bold text-white block mt-2 group-hover:text-purple-300">
              Google AI Plus
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">1 Year Free for Students</span>
          </button>

          <button
            onClick={() => onNavigateTab('drops')}
            className="p-3 bg-chip-drop border border-amber-500/30 rounded-xl text-left hover:border-amber-400/60 transition-all active:scale-95 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.5 rounded">
                Friday Drop
              </span>
              <Flame size={13} className="text-amber-400" />
            </div>
            <span className="text-xs font-bold text-white block mt-2 group-hover:text-amber-300">
              PVR Cinema Pass
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">100,000 claims available</span>
          </button>
        </div>
      </section>

      {/* 7. Life-Hub Launchers (Green / Community / Insurance) */}
      <section className="mt-5 pt-4 border-t border-slate-800/80 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          More Than Banking
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setOpenHub('green')}
            className="p-2.5 rounded-xl bg-hub-green border border-emerald-500/30 text-left hover:border-emerald-400/60 transition-all active:scale-95 group"
            aria-label="Open Green Impact hub"
          >
            <Leaf size={16} className="text-emerald-400" />
            <span className="block text-[11px] font-bold text-white mt-1.5 group-hover:text-emerald-300">
              Green Impact
            </span>
            <span className="block text-[9px] text-slate-400 mt-0.5">Log actions · earn pts</span>
          </button>

          <button
            onClick={() => setOpenHub('community')}
            className="p-2.5 rounded-xl bg-hub-community border border-violet-500/30 text-left hover:border-violet-400/60 transition-all active:scale-95 group"
            aria-label="Open Community hub"
          >
            <Users size={16} className="text-violet-400" />
            <span className="block text-[11px] font-bold text-white mt-1.5 group-hover:text-violet-300">
              Community
            </span>
            <span className="block text-[9px] text-slate-400 mt-0.5">Join · learn · grow</span>
          </button>

          <button
            onClick={() => setOpenHub('insurance')}
            className="p-2.5 rounded-xl bg-hub-insurance border border-teal-500/30 text-left hover:border-teal-400/60 transition-all active:scale-95 group"
            aria-label="Open Insurance hub"
          >
            <Shield size={16} className="text-teal-400" />
            <span className="block text-[11px] font-bold text-white mt-1.5 group-hover:text-teal-300">
              Insurance
            </span>
            <span className="block text-[9px] text-slate-400 mt-0.5">Health · life · travel</span>
          </button>
        </div>
      </section>

      {/* UPI Transfer Modal */}
      <UpiTransferModal
        isOpen={isUpiModalOpen}
        initialMode={upiInitialMode}
        onClose={() => setIsUpiModalOpen(false)}
      />

      {/* Life-Hub Modals */}
      <GreenImpactHub isOpen={openHub === 'green'} onClose={() => setOpenHub(null)} />
      <CommunityHub isOpen={openHub === 'community'} onClose={() => setOpenHub(null)} />
      <InsuranceHub isOpen={openHub === 'insurance'} onClose={() => setOpenHub(null)} />
    </main>
  );
};
