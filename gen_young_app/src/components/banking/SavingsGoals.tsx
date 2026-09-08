import React, { useState } from 'react';
import { Target, Plus, Laptop, BookOpen, Shield, Sparkles, X, Plane, Leaf } from 'lucide-react';
import { useBanking } from '../../context/BankingContext';
import { useToast } from '../../context/ToastContext';
import { SavingsGoal, GoalCategory } from '../../types/banking';
import { triggerGoalCompletedConfetti } from '../../utils/confetti';

export const SavingsGoals: React.FC = () => {
  const { account, topUpGoal, createSavingsGoal } = useBanking();
  const { showToast } = useToast();

  const [activeGoalForTopUp, setActiveGoalForTopUp] = useState<SavingsGoal | null>(null);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newCategory, setNewCategory] = useState<GoalCategory>('tech');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tech':
        return <Laptop size={15} className="text-teal-400" />;
      case 'education':
        return <BookOpen size={15} className="text-amber-400" />;
      case 'emergency':
        return <Shield size={15} className="text-rose-400" />;
      case 'travel':
        return <Plane size={15} className="text-cyan-400" />;
      case 'green':
        return <Leaf size={15} className="text-emerald-400" />;
      default:
        return <Sparkles size={15} className="text-purple-400" />;
    }
  };

  const handleTopUpSubmit = () => {
    if (!activeGoalForTopUp) return;
    const amount = Number(topUpAmount);
    if (!amount || amount <= 0) {
      showToast('Enter a valid amount to top up', 'error');
      return;
    }
    if (amount > account.balance) {
      showToast(`Cannot top up more than available balance (₹${account.balance})`, 'error');
      return;
    }

    const wasCompleted = activeGoalForTopUp.currentAmount + amount >= activeGoalForTopUp.targetAmount;

    topUpGoal(activeGoalForTopUp.id, amount);
    showToast(`Added ₹${amount} to ${activeGoalForTopUp.title}!`, 'success');

    if (wasCompleted) {
      triggerGoalCompletedConfetti();
      showToast(`🎉 Goal achieved: ${activeGoalForTopUp.title}! Outstanding work!`, 'success');
    }

    setActiveGoalForTopUp(null);
    setTopUpAmount('');
  };

  const handleCreateGoal = () => {
    if (!newTitle.trim() || !Number(newTarget)) {
      showToast('Please provide a goal title and target amount', 'error');
      return;
    }

    createSavingsGoal({
      title: newTitle,
      category: newCategory,
      targetAmount: Number(newTarget),
      targetDate: '2026-12-31',
    });

    showToast(`Goal '${newTitle}' created!`, 'success');
    setIsCreateOpen(false);
    setNewTitle('');
    setNewTarget('');
  };

  return (
    <div className="mt-6 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
          <Target size={16} className="text-emerald-400" />
          Target Savings Goals
        </h3>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
        >
          <Plus size={13} /> New Goal
        </button>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 gap-3">
        {account.savingsGoals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const radius = 24;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (percent / 100) * circumference;

          return (
            <div
              key={goal.id}
              className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-4 flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-3">
                {/* SVG Progress Ring */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90">
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      className="text-slate-700"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      className={percent >= 100 ? 'text-teal-300' : 'text-emerald-400'}
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                    />
                  </svg>
                  <span className="absolute text-[11px] font-bold text-white font-mono">
                    {percent}%
                  </span>
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(goal.category)}
                    <h4 className="text-xs font-bold text-white">{goal.title}</h4>
                  </div>
                  <div className="text-xs mt-1">
                    <span className="font-bold text-emerald-400 font-mono">
                      ₹{goal.currentAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-slate-400 font-mono">
                      {' '}
                      / ₹{goal.targetAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {percent >= 100
                      ? '🎉 Fully Achieved!'
                      : `₹${(goal.targetAmount - goal.currentAmount).toLocaleString('en-IN')} remaining`}
                  </span>
                </div>
              </div>

              {/* Top Up CTA */}
              <button
                onClick={() => setActiveGoalForTopUp(goal)}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-xs border border-emerald-500/30 transition-all active:scale-95"
              >
                Top Up
              </button>
            </div>
          );
        })}
      </div>

      {/* TOP UP MODAL */}
      {activeGoalForTopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-white">Top Up {activeGoalForTopUp.title}</h4>
              <button
                onClick={() => setActiveGoalForTopUp(null)}
                className="text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Available balance:{' '}
              <span className="font-mono font-bold text-white">
                ₹{account.balance.toLocaleString('en-IN')}
              </span>
            </p>
            <input
              type="number"
              placeholder="Enter amount (₹)"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono font-bold"
            />
            <div className="flex gap-2">
              {[500, 1000, 2000].map((val) => (
                <button
                  key={val}
                  onClick={() => setTopUpAmount(val.toString())}
                  className="flex-1 py-1 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700 hover:bg-slate-700"
                >
                  +₹{val}
                </button>
              ))}
            </div>
            <button
              onClick={handleTopUpSubmit}
              className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
            >
              Transfer to Goal Pot
            </button>
          </div>
        </div>
      )}

      {/* CREATE GOAL MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-white">Create Target Savings Goal</h4>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-white">
                <X size={16} />
              </button>
            </div>
            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Goal Name</label>
              <input
                type="text"
                placeholder="e.g. Electric Scooter"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Target Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as GoalCategory)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              >
                <option value="tech">Technology</option>
                <option value="education">Education</option>
                <option value="emergency">Emergency Fund</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="travel">Travel</option>
                <option value="green">Green & Sustainability</option>
              </select>
            </div>
            <button
              onClick={handleCreateGoal}
              className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
            >
              Create Goal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
