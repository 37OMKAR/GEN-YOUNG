import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check, ArrowUpRight, QrCode, Plus, CreditCard } from 'lucide-react';
import { useBanking } from '../../context/BankingContext';
import { useToast } from '../../context/ToastContext';

export interface AccountCardProps {
  onSendMoney: () => void;
  onScanQr: () => void;
  onAddMoney: () => void;
  onCardSettings: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  onSendMoney,
  onScanQr,
  onAddMoney,
  onCardSettings,
}) => {
  const { account } = useBanking();
  const { showToast } = useToast();
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [copiedField, setCopiedField] = useState<'acc' | 'ifsc' | null>(null);

  const copyToClipboard = (text: string, field: 'acc' | 'ifsc', label: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      showToast(`${label} copied to clipboard!`, 'info');
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      showToast(`Copied ${text}`, 'info');
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border border-slate-700/70 rounded-2xl p-5 shadow-xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Gen-Young Youth Savings
          </span>
          <span className="bg-emerald-950 text-emerald-300 text-[10px] font-medium px-1.5 py-0.5 rounded border border-emerald-500/30">
            Zero-Min Bal
          </span>
        </div>
        <button
          onClick={() => setIsBalanceHidden(!isBalanceHidden)}
          aria-label={isBalanceHidden ? 'Reveal balance' : 'Hide balance'}
          className="text-slate-400 hover:text-slate-200 transition-colors p-1"
        >
          {isBalanceHidden ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Balance Amount */}
      <div className="mt-3">
        <span className="text-xs text-slate-400 font-medium block">Total Available Balance</span>
        <div className="text-3xl font-extrabold text-white tracking-tight mt-0.5 font-mono">
          {isBalanceHidden ? (
            <span className="tracking-widest">₹ •••••••</span>
          ) : (
            `₹${account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
          )}
        </div>
      </div>

      {/* Account Details Row */}
      <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span>A/C: {account.accountNumber}</span>
          <button
            onClick={() => copyToClipboard(account.accountNumber, 'acc', 'Account Number')}
            aria-label="Copy account number"
            className="text-slate-400 hover:text-emerald-400 transition-colors"
          >
            {copiedField === 'acc' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>IFSC: {account.ifsc}</span>
          <button
            onClick={() => copyToClipboard(account.ifsc, 'ifsc', 'IFSC Code')}
            aria-label="Copy IFSC code"
            className="text-slate-400 hover:text-emerald-400 transition-colors"
          >
            {copiedField === 'ifsc' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {/* 4 Tactile Quick Action Buttons */}
      <div className="grid grid-cols-4 gap-2 mt-5">
        <button
          onClick={onSendMoney}
          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700/60 active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
            <ArrowUpRight size={18} />
          </div>
          <span className="text-[11px] font-semibold text-slate-200 mt-1.5">Send UPI</span>
        </button>

        <button
          onClick={onScanQr}
          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700/60 active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
            <QrCode size={18} />
          </div>
          <span className="text-[11px] font-semibold text-slate-200 mt-1.5">Scan QR</span>
        </button>

        <button
          onClick={onAddMoney}
          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700/60 active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
            <Plus size={18} />
          </div>
          <span className="text-[11px] font-semibold text-slate-200 mt-1.5">Add Money</span>
        </button>

        <button
          onClick={onCardSettings}
          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700/60 active:scale-95 transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-slate-950 transition-colors">
            <CreditCard size={18} />
          </div>
          <span className="text-[11px] font-semibold text-slate-200 mt-1.5">Card</span>
        </button>
      </div>
    </div>
  );
};
