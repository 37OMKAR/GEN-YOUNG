import React from 'react';
import { GraduationCap, Flame, Award, BookOpen } from 'lucide-react';
import { usePersona } from '../context/PersonaContext';

export const LearnView: React.FC = () => {
  const { activePersona } = usePersona();
  const lp = activePersona.learningProfile;

  return (
    <main className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <GraduationCap className="text-emerald-400" size={20} />
          <h1 className="text-lg font-bold text-white tracking-tight">Financial Literacy & Skills</h1>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Bite-sized modules, interactive quizzes, and quest streaks
        </p>
      </div>

      {/* Gamified Progress Header Card */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-850 to-slate-900 border border-purple-500/30 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-purple-300 uppercase tracking-wider font-bold">
              Level {lp.level} • {lp.levelTitle}
            </span>
            <div className="text-xl font-extrabold text-white mt-0.5">
              {lp.xp} <span className="text-xs font-normal text-slate-400">/ {lp.nextLevelXp} XP</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-400">
            <Flame size={18} className="animate-pulse" />
            <span className="text-xs font-bold font-mono">{lp.streakDays} Day Streak</span>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-teal-400 h-2 rounded-full"
            style={{ width: `${Math.min(100, Math.round((lp.xp / lp.nextLevelXp) * 100))}%` }}
          />
        </div>
      </div>

      {/* Learning Modules Preview */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Tracks</h3>
        {[
          { title: 'Budgeting Basics for Youth', dur: '5 min', xp: '+50 XP', icon: BookOpen },
          { title: 'Smart Digital Banking & UPI Safety', dur: '6 min', xp: '+60 XP', icon: Award },
          { title: 'Target Savings & Goal Mastery', dur: '4 min', xp: '+40 XP', icon: GraduationCap },
        ].map((mod, i) => {
          const Icon = mod.icon;
          return (
            <div
              key={i}
              className="p-3.5 bg-slate-850 border border-slate-700/60 rounded-xl flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Icon size={16} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">{mod.title}</span>
                  <span className="text-[10px] text-slate-400">{mod.dur} read</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">{mod.xp}</span>
            </div>
          );
        })}
      </div>

      {/* Milestone 4 Staging Notice */}
      <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-center">
        <span className="text-xs font-bold text-purple-400 block">
          Interactive Quizzes & Action Quests
        </span>
        <span className="text-[11px] text-slate-300 mt-1 block">
          Full 5-minute interactive quiz engine and multi-step partner quests will be activated in Milestone 4.
        </span>
      </div>
    </main>
  );
};
