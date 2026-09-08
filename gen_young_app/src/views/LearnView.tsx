/**
 * Gen-Young Financial Learning & Skills — Demo-Ready
 * Path: src/views/LearnView.tsx
 *
 * Interactive quiz launcher, live XP progression from DemoContext,
 * daily streak, and skill tracks — reflects docs/assets/08-learning-hub.png,
 * 13-growth-hub.png, and 16-career-ready.png.
 */

import React, { useMemo, useState } from 'react';
import {
  GraduationCap,
  Flame,
  Award,
  BookOpen,
  Sparkles,
  Trophy,
  Play,
  Check,
} from 'lucide-react';
import { usePersona } from '../context/PersonaContext';
import { useDemo } from '../context/DemoContext';
import { Quiz } from '../types/learning';
import { mockQuizzes } from '../data/mockQuizzes';
import { QuizModal } from '../components/learn/QuizModal';

const skillTracks = [
  { id: 'ai_data', title: 'AI & Data Skills', accent: 'text-purple-300', chip: 'bg-purple-500/15 border-purple-500/30' },
  { id: 'green_econ', title: 'Green Economy', accent: 'text-emerald-300', chip: 'bg-emerald-500/15 border-emerald-500/30' },
  { id: 'entrepreneur', title: 'Entrepreneurship', accent: 'text-amber-300', chip: 'bg-amber-500/15 border-amber-500/30' },
  { id: 'design', title: 'Design & Creativity', accent: 'text-cyan-300', chip: 'bg-cyan-500/15 border-cyan-500/30' },
];

export const LearnView: React.FC = () => {
  const { activePersona } = usePersona();
  const { totalXp, quizAttempts, isQuizCompleted } = useDemo();
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  // Combine persona baseline XP + demo-earned XP
  const combinedXp = activePersona.learningProfile.xp + totalXp;
  const nextTarget = activePersona.learningProfile.nextLevelXp;
  const progressPct = Math.min(100, Math.round((combinedXp / nextTarget) * 100));
  const streakDays = activePersona.learningProfile.streakDays;

  const completedCount = useMemo(
    () => mockQuizzes.filter((q) => isQuizCompleted(q.id)).length,
    [isQuizCompleted]
  );

  return (
    <main className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-5">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2">
          <GraduationCap className="text-emerald-400" size={20} />
          <h1 className="text-lg font-bold text-white tracking-tight">
            Financial Learning & Skills
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Bite-sized modules · 5-minute quizzes · streaks that build competence
        </p>
      </header>

      {/* Gamified Progress Header */}
      <section
        className="bg-gradient-to-r from-purple-950/40 via-slate-850 to-slate-900 border border-purple-500/30 rounded-2xl p-4 shadow-lg"
        aria-label="Learning progress"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-purple-300 uppercase tracking-wider font-bold">
              Level {activePersona.learningProfile.level} ·{' '}
              {activePersona.learningProfile.levelTitle}
            </span>
            <div className="text-xl font-extrabold text-white mt-0.5 font-mono">
              {combinedXp}{' '}
              <span className="text-xs font-normal text-slate-400">/ {nextTarget} XP</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-400">
            <Flame size={18} className="animate-pulse" />
            <span className="text-xs font-bold font-mono">{streakDays}-Day Streak</span>
          </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-teal-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-700/50">
            <span className="font-mono font-bold text-purple-300 text-sm block">{totalXp}</span>
            <span className="text-[9px] text-slate-400">Session XP</span>
          </div>
          <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-700/50">
            <span className="font-mono font-bold text-teal-300 text-sm block">
              {completedCount}
            </span>
            <span className="text-[9px] text-slate-400">Quizzes Done</span>
          </div>
          <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-700/50">
            <span className="font-mono font-bold text-emerald-300 text-sm block">
              {quizAttempts.length}
            </span>
            <span className="text-[9px] text-slate-400">Attempts</span>
          </div>
        </div>
      </section>

      {/* Interactive Quizzes */}
      <section aria-label="Interactive quizzes">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles size={12} className="text-purple-400" />
            Interactive Quizzes
          </h2>
          <span className="text-[10px] text-slate-500">
            {completedCount} / {mockQuizzes.length} complete
          </span>
        </div>
        <ul className="space-y-2.5">
          {mockQuizzes.map((quiz) => {
            const done = isQuizCompleted(quiz.id);
            const attempt = quizAttempts.find((a) => a.quizId === quiz.id);
            return (
              <li key={quiz.id}>
                <button
                  onClick={() => setActiveQuiz(quiz)}
                  className="w-full p-3.5 bg-slate-850 border border-slate-700/60 rounded-xl flex items-center justify-between text-left hover:border-purple-500/40 shadow-sm transition-all active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                        done
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                          : 'bg-purple-500/15 border-purple-500/30 text-purple-400'
                      }`}
                    >
                      {done ? <Check size={16} /> : <BookOpen size={16} />}
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block leading-snug">
                        {quiz.title}
                      </span>
                      <span className="text-[10px] text-slate-400 line-clamp-1">
                        {quiz.description}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        {quiz.durationMinutes} min ·{' '}
                        {done && attempt
                          ? `Scored ${attempt.correctCount}/${attempt.totalCount} (+${attempt.xpEarned} XP)`
                          : `+${quiz.xpReward} XP available`}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      done ? 'bg-emerald-500/20 text-emerald-300' : 'bg-purple-500/20 text-purple-300'
                    }`}
                  >
                    {done ? <Trophy size={13} /> : <Play size={13} />}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Skill Tracks (from Growth Hub board) */}
      <section aria-label="Skill tracks">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <Award size={12} className="text-emerald-400" />
          Skill Tracks
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {skillTracks.map((track) => (
            <div
              key={track.id}
              className={`p-3 rounded-xl border ${track.chip} shadow-sm`}
            >
              <span className={`text-xs font-bold block ${track.accent}`}>{track.title}</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Course pipeline coming</span>
            </div>
          ))}
        </div>
      </section>

      {/* Learning outcome footer */}
      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
        <span className="font-bold text-slate-200 block mb-1">Learn · Practise · Apply</span>
        Every quiz you finish credits real XP to your persona, and each correct answer moves your
        level bar. Content pipelines from SWAYAM, NPTEL, SATHEE, AIKosh, Skill India and approved
        AI-learning partners.
      </div>

      {/* Quiz Modal */}
      <QuizModal quiz={activeQuiz} onClose={() => setActiveQuiz(null)} />
    </main>
  );
};
