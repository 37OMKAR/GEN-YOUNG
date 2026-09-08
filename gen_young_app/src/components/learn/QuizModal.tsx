/**
 * Gen-Young Interactive Quiz Modal
 * Path: src/components/learn/QuizModal.tsx
 *
 * Question-by-question quiz with immediate feedback, XP-tally screen,
 * and hookup to DemoContext to persist the attempt & award XP.
 */

import React, { useState } from 'react';
import { X, Check, ChevronRight, Trophy, RefreshCw } from 'lucide-react';
import { Quiz } from '../../types/learning';
import { useDemo } from '../../context/DemoContext';
import { useToast } from '../../context/ToastContext';
import { playClickSound, playGoalCelebration, playErrorSound } from '../../utils/soundEffects';

interface QuizModalProps {
  quiz: Quiz | null;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, onClose }) => {
  const { submitQuizAttempt } = useDemo();
  const { showToast } = useToast();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!quiz) return null;

  const currentQ = quiz.questions[currentIdx];
  const isCorrect = selectedIdx === currentQ.correctIndex;
  const isLast = currentIdx === quiz.questions.length - 1;

  const handleSelect = (idx: number) => {
    if (revealed) return;
    playClickSound();
    setSelectedIdx(idx);
    setRevealed(true);
    if (idx === currentQ.correctIndex) {
      setCorrectCount((c) => c + 1);
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (isLast) {
      const score = correctCount / quiz.questions.length;
      const xp = Math.round(quiz.xpReward * score);
      submitQuizAttempt({
        quizId: quiz.id,
        score,
        correctCount,
        totalCount: quiz.questions.length,
        xpEarned: xp,
      });
      playGoalCelebration();
      showToast(`Quiz complete! +${xp} XP earned`, 'success');
      setFinished(true);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedIdx(null);
      setRevealed(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setRevealed(false);
    setCorrectCount(0);
    setFinished(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
    >
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur px-4 pt-4 pb-3 border-b border-slate-800 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">
              {quiz.category} · Level {quiz.level}
            </span>
            <h2 id="quiz-modal-title" className="text-base font-bold text-white mt-0.5 leading-tight">
              {quiz.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
            aria-label="Close quiz"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-4 py-4">
          {finished ? (
            // ── Completion screen ─────────────────────
            <div className="text-center space-y-4 py-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Trophy size={36} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Quiz complete!</h3>
                <p className="text-xs text-slate-400 mt-1">
                  You answered{' '}
                  <span className="font-mono font-bold text-white">
                    {correctCount} / {quiz.questions.length}
                  </span>{' '}
                  correctly.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                  XP Earned
                </span>
                <div className="text-2xl font-extrabold text-white font-mono">
                  +{Math.round(quiz.xpReward * (correctCount / quiz.questions.length))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleRestart}
                  className="flex-1 flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
                >
                  <RefreshCw size={12} /> Retry
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Progress */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-1.5 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full transition-all"
                    style={{
                      width: `${((currentIdx + (revealed ? 1 : 0)) / quiz.questions.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 tabular-nums shrink-0">
                  {currentIdx + 1} / {quiz.questions.length}
                </span>
              </div>

              {/* Question */}
              <h3 className="text-sm font-bold text-white leading-snug">{currentQ.question}</h3>

              {/* Options */}
              <div className="mt-3 space-y-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedIdx === idx;
                  const isRightAnswer = idx === currentQ.correctIndex;
                  const showCorrect = revealed && isRightAnswer;
                  const showWrong = revealed && isSelected && !isRightAnswer;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={revealed}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-colors ${
                        showCorrect
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-100'
                          : showWrong
                            ? 'bg-rose-500/15 border-rose-500 text-rose-100'
                            : isSelected
                              ? 'bg-slate-800 border-slate-600 text-white'
                              : 'bg-slate-850 border-slate-700 text-slate-200 hover:border-slate-600'
                      } ${revealed ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            showCorrect
                              ? 'bg-emerald-500 text-slate-950'
                              : showWrong
                                ? 'bg-rose-500 text-slate-950'
                                : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {showCorrect ? <Check size={12} /> : String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {revealed && (
                <div
                  className={`mt-3 p-3 rounded-xl border ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <p className="text-[11px] text-slate-200 leading-relaxed">
                    <b className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                      {isCorrect ? 'Correct.' : 'Not quite.'}
                    </b>{' '}
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Next button */}
              {revealed && (
                <button
                  onClick={handleNext}
                  className="mt-3 w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-purple-500/20 active:scale-[0.98]"
                >
                  {isLast ? 'Finish quiz' : 'Next question'}
                  <ChevronRight size={14} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
