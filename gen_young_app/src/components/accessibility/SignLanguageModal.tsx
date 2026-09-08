import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, ExternalLink, Sparkles, Hand, ShieldAlert, BookOpen, CreditCard } from 'lucide-react';
import { textToIslGloss, ISL_DICTIONARY, IslSign } from '../../utils/signLanguageGloss';

interface SignLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText?: string;
}

const PRESET_PHRASES = [
  { label: 'Check Balance', text: 'Check my bank account balance and money', icon: CreditCard },
  { label: 'Emergency 112 SOS', text: 'Emergency SOS call police for help immediately', icon: ShieldAlert },
  { label: 'Student Scholarship', text: 'Apply for college student scholarship and courses', icon: BookOpen },
  { label: 'Freeze Debit Card', text: 'Freeze and lock my virtual debit card', icon: CreditCard },
];

export const SignLanguageModal: React.FC<SignLanguageModalProps> = ({
  isOpen,
  onClose,
  initialText = 'Check account balance and transfer money',
}) => {
  const [inputText, setInputText] = useState(initialText);
  const [activeSignIndex, setActiveSignIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { glossSequence, matchingSigns } = textToIslGloss(inputText);

  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
      setActiveSignIndex(0);
    }
  }, [initialText]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && matchingSigns.length > 0) {
      timer = setInterval(() => {
        setActiveSignIndex((prev) => {
          if (prev + 1 >= matchingSigns.length) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isPlaying, matchingSigns.length]);

  if (!isOpen) return null;

  const currentSign: IslSign | undefined = matchingSigns[activeSignIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="isl-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Hand size={18} />
            </div>
            <div>
              <h2 id="isl-modal-title" className="text-sm font-bold text-white tracking-tight">
                Indian Sign Language (ISL) Assistant
              </h2>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <span>Quoted from</span>
                <a
                  href="https://github.com/37OMKAR/text-to-signlanguage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline inline-flex items-center gap-0.5 font-medium"
                >
                  37OMKAR/text-to-signlanguage
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-200">
          {/* Preset Buttons */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Quick Actions (Click to Translate)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_PHRASES.map((preset, idx) => {
                const Icon = preset.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(preset.text);
                      setActiveSignIndex(0);
                      setIsPlaying(true);
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700/60 text-left transition-all text-xs font-medium text-slate-300 hover:text-white"
                  >
                    <Icon size={14} className="text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Input */}
          <div>
            <label htmlFor="isl-input" className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Translate English / Hindi Text to ISL
            </label>
            <input
              id="isl-input"
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setActiveSignIndex(0);
              }}
              placeholder="e.g. Check account balance and claim student scholarship"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
            />
          </div>

          {/* Generated ISL Gloss Badge */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1">
              <Sparkles size={12} />
              Generated ISL NLP Gloss Sequence
            </span>
            <div className="mt-1 font-mono text-xs font-bold text-white bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-800 overflow-x-auto">
              {glossSequence}
            </div>
          </div>

          {/* Sign Visualizer & Gesture Demonstration Card */}
          {currentSign && (
            <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Sign {activeSignIndex + 1} of {matchingSigns.length}
                  </span>
                  <h3 className="text-sm font-extrabold text-white tracking-wide">
                    {currentSign.gloss}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    {isPlaying ? (
                      <>Pause</>
                    ) : (
                      <>
                        <Play size={12} fill="currentColor" /> Play
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setActiveSignIndex(0);
                      setIsPlaying(true);
                    }}
                    title="Restart animation sequence"
                    className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>

              {/* Visual Gesture Display Box */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="w-14 h-14 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Hand size={28} className="text-emerald-400" />
                </div>
                <div className="space-y-0.5 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-semibold">Handshape:</span>
                    <span className="text-emerald-300 font-medium">{currentSign.handshape}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-semibold">Location:</span>
                    <span className="text-slate-200">{currentSign.location}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 italic mt-1 leading-snug">
                    {currentSign.description}
                  </p>
                </div>
              </div>

              {/* Movement Instructions */}
              <div className="text-[11px] text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-750">
                <strong className="text-white">Motion Dynamics:</strong> {currentSign.movement}
              </div>

              {/* Sign Step Navigator */}
              <div className="flex items-center gap-1.5 pt-1">
                {matchingSigns.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveSignIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`flex-1 py-1 text-[10px] font-bold rounded transition-all truncate px-1 ${
                      idx === activeSignIndex
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.gloss}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Academic & Concept Paper Citation Footer */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[10px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Gen-Young Concept Paper (Chapter 23):</strong> &ldquo;Your existing text-to-sign-language work becomes a major differentiator. Important Government-benefit info, banking instructions, and educational material are made accessible through an Indian Sign Language (ISL) interface.&rdquo;
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-850 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Zero-video gesture animation</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
