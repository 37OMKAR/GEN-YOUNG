import React, { useState } from 'react';
import { Sparkles, Flame } from 'lucide-react';
import { usePersona } from '../context/PersonaContext';
import { useBanking } from '../context/BankingContext';
import { useToast } from '../context/ToastContext';
import { AccountCard } from '../components/banking/AccountCard';
import { VirtualDebitCard } from '../components/banking/VirtualDebitCard';
import { SavingsGoals } from '../components/banking/SavingsGoals';
import { RecentTransactions } from '../components/banking/RecentTransactions';
import { UpiTransferModal } from '../components/banking/UpiTransferModal';
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
          <p className="text-[11px] text-slate-300 mt-0.5">
            {activePersona.role === 'student' && '📚 College Senior • Mumbai Tech Track'}
            {activePersona.role === 'aspirant' && '🎯 Class 11 Aspirant • Minor Account'}
            {activePersona.role === 'professional' && '💼 Young Pro • Bengaluru FinTrack'}
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
            className="p-3 bg-gradient-to-br from-purple-950/40 to-slate-850 border border-purple-500/30 rounded-xl text-left hover:border-purple-400/60 transition-all active:scale-95 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-purple-500/20 text-purple-300 font-semibold px-1.5 py-0.2 rounded">
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
            className="p-3 bg-gradient-to-br from-amber-950/40 to-slate-850 border border-amber-500/30 rounded-xl text-left hover:border-amber-400/60 transition-all active:scale-95 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.2 rounded">
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

      {/* UPI Transfer Modal */}
      <UpiTransferModal
        isOpen={isUpiModalOpen}
        initialMode={upiInitialMode}
        onClose={() => setIsUpiModalOpen(false)}
      />
    </main>
  );
};
