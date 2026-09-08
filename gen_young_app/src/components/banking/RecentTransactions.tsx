import React, { useState } from 'react';
import { History } from 'lucide-react';
import { useBanking } from '../../context/BankingContext';
import { formatTimestamp } from '../../utils/formatters';

export const RecentTransactions: React.FC = () => {
  const { account } = useBanking();
  const [txFilter, setTxFilter] = useState<'all' | 'upi' | 'card' | 'goal'>('all');

  const filteredTransactions = account.transactions.filter((tx) => {
    if (txFilter === 'all') return true;
    return tx.category === txFilter;
  });

  return (
    <section className="mt-6 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
          <History size={16} className="text-emerald-400" />
          Recent Activity
        </h3>
        <div className="flex gap-1">
          {(['all', 'upi', 'card', 'goal'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTxFilter(filter)}
              className={`text-[10px] px-2 py-0.5 rounded-md font-medium uppercase transition-colors ${
                txFilter === filter
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs bg-slate-800/40 rounded-xl border border-slate-700/40">
            No transactions found in this category
          </div>
        ) : (
          filteredTransactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    tx.type === 'credit'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-700/60 text-slate-300'
                  }`}
                >
                  {tx.category === 'upi' && 'UPI'}
                  {tx.category === 'card' && 'CARD'}
                  {tx.category === 'goal' && 'POT'}
                  {tx.category === 'allowance' && 'DEP'}
                  {tx.category === 'transfer' && 'TX'}
                  {tx.category === 'perk' && 'PERK'}
                  {tx.category === 'refund' && 'REF'}
                  {tx.category === 'salary' && 'SAL'}
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">{tx.title}</span>
                  <span className="text-[10px] text-slate-400">
                    {formatTimestamp(tx.timestamp)} • {tx.senderOrRecipient}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs font-mono font-bold block ${
                    tx.type === 'credit' ? 'text-emerald-400' : 'text-slate-200'
                  }`}
                >
                  {tx.type === 'credit' ? `+₹${tx.amount.toFixed(2)}` : `-₹${tx.amount.toFixed(2)}`}
                </span>
                <span className="text-[9px] text-emerald-400/90 font-medium">Success</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
