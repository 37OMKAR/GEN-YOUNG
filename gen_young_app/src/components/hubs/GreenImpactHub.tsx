/**
 * Gen-Young Green Impact Hub
 * Path: src/components/hubs/GreenImpactHub.tsx
 *
 * Reflects docs/assets/11-green-impact.png & 12-green-journey.png.
 * Log real actions, earn Green Points, unlock badges.
 */

import React from 'react';
import { Leaf, TreePine, Cloud, Droplets, Recycle, Users, TrendingUp, Plus } from 'lucide-react';
import { HubModal } from './HubModal';
import { useDemo, greenActionCatalogue, greenLevels } from '../../context/DemoContext';
import { useToast } from '../../context/ToastContext';
import { playGoalCelebration } from '../../utils/soundEffects';

interface GreenImpactHubProps {
  isOpen: boolean;
  onClose: () => void;
}

// Aggregate community impact figures (from image 11)
const communityImpact = [
  { icon: TreePine, label: 'Trees Supported', value: '1.2 M', accent: 'text-emerald-400' },
  { icon: Cloud, label: 'CO₂ Avoided', value: '25 K T', accent: 'text-teal-400' },
  { icon: Droplets, label: 'Water Conserved', value: '12 M L', accent: 'text-cyan-400' },
  { icon: Recycle, label: 'Waste Recycled', value: '3.8 M kg', accent: 'text-lime-400' },
  { icon: Users, label: 'Youth Engaged', value: '10 L+', accent: 'text-violet-400' },
];

export const GreenImpactHub: React.FC<GreenImpactHubProps> = ({ isOpen, onClose }) => {
  const { greenPoints, greenActions, greenLevel, logGreenAction, resetDemoProgress } = useDemo();
  const { showToast } = useToast();

  const nextTarget = greenLevel.nextTarget;
  const progressPct =
    nextTarget > greenLevel.minPoints
      ? Math.min(
          100,
          Math.round(
            ((greenPoints - greenLevel.minPoints) / (nextTarget - greenLevel.minPoints)) * 100
          )
        )
      : 100;

  const handleLog = (key: string) => {
    const result = logGreenAction(key);
    if (result.success && result.points) {
      playGoalCelebration();
      showToast(`+${result.points} Green Points logged`, 'success');
    }
  };

  return (
    <HubModal
      isOpen={isOpen}
      onClose={onClose}
      title="My Green Impact"
      subtitle="Small actions. A greener tomorrow."
      headerAccent="from-emerald-500 to-lime-500"
    >
      {/* Your progress */}
      <section
        className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-4 shadow-lg"
        aria-label="Your green progress"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">
              Level {greenLevel.level} · {greenLevel.title}
            </span>
            <div className="text-2xl font-extrabold text-white mt-0.5 font-mono">
              {greenPoints}{' '}
              <span className="text-xs font-normal text-slate-400">Green Points</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
            <Leaf size={26} className="text-emerald-400" />
          </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-lime-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {nextTarget > greenPoints && (
          <p className="text-[10px] text-slate-400 mt-1.5">
            {nextTarget - greenPoints} points to next level ({greenLevels.find((l) => l.minPoints === nextTarget)?.title})
          </p>
        )}
      </section>

      {/* Action buttons */}
      <section className="mt-4" aria-label="Log a green action">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Log an action · earn points
        </h3>
        <div className="space-y-2">
          {greenActionCatalogue.map((action) => (
            <button
              key={action.key}
              onClick={() => handleLog(action.key)}
              className="w-full p-3 rounded-xl bg-slate-850 border border-slate-700/60 hover:border-emerald-500/40 flex items-center justify-between text-left transition-all active:scale-[0.99]"
            >
              <div className="flex-1 min-w-0">
                <span className={`text-xs font-bold block ${action.accent}`}>{action.label}</span>
                <span className="text-[10px] text-slate-400">{action.detail}</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-white bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded-lg">
                <Plus size={11} />
                {action.points} pts
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Community impact */}
      <section className="mt-4" aria-label="Community impact">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <TrendingUp size={12} className="text-emerald-400" />
          Community impact (all Gen-Young users)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {communityImpact.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2"
              >
                <Icon size={16} className={m.accent} />
                <div className="min-w-0">
                  <span className="text-xs font-mono font-bold text-white block">{m.value}</span>
                  <span className="text-[9px] text-slate-400 truncate block">{m.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent action log */}
      {greenActions.length > 0 && (
        <section className="mt-4" aria-label="Your action log">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Your action log ({greenActions.length})
          </h3>
          <ul className="space-y-1.5">
            {greenActions.slice(0, 5).map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between text-xs bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2"
              >
                <span className="text-slate-200">{a.label}</span>
                <span className="text-emerald-300 font-mono">+{a.points}</span>
              </li>
            ))}
          </ul>
          {greenActions.length > 0 && (
            <button
              onClick={() => {
                resetDemoProgress();
                showToast('Green passport reset for next demo', 'success');
              }}
              className="mt-3 w-full text-[10px] text-slate-500 hover:text-slate-300 underline"
            >
              Reset demo progress
            </button>
          )}
        </section>
      )}
    </HubModal>
  );
};
