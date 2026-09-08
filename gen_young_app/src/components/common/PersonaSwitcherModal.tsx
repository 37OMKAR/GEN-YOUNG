import React, { useEffect } from 'react';
import { X, Check, Laptop, BookOpen, Briefcase, Sparkles, ShieldCheck } from 'lucide-react';
import { usePersona } from '../../context/PersonaContext';
import { useToast } from '../../context/ToastContext';

export interface PersonaSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonaSwitcherModal: React.FC<PersonaSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { activePersona, switchPersona, availablePersonas } = usePersona();
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (personaId: string, name: string) => {
    switchPersona(personaId);
    showToast(`Switched profile to ${name}`, 'success');
    onClose();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <Laptop size={14} className="text-teal-400" />;
      case 'aspirant':
        return <BookOpen size={14} className="text-amber-400" />;
      case 'professional':
        return <Briefcase size={14} className="text-purple-400" />;
      default:
        return <Sparkles size={14} className="text-emerald-400" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="persona-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 id="persona-modal-title" className="text-lg font-bold text-white tracking-tight">
              Switch Persona
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Experience Gen-Young through different youth life stages
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close persona modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Persona Cards List */}
        <div className="mt-4 space-y-3">
          {availablePersonas.map((persona) => {
            const isSelected = activePersona.id === persona.id;
            const balance = persona.initialBankAccount?.balance ?? persona.bankAccount?.balance ?? 0;
            const goalTitle =
              persona.initialBankAccount?.savingsGoals?.[0]?.title ??
              persona.bankAccount?.savingsGoals?.[0]?.title ??
              'None';

            return (
              <div
                key={persona.id}
                onClick={() => handleSelect(persona.id, persona.name)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-emerald-950/30 border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-md'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                {/* Active Checkmark Pill */}
                {isSelected && (
                  <span className="absolute top-3 right-3 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Check size={12} className="stroke-[3px]" />
                    Active
                  </span>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                    {persona.avatarInitials || persona.name.charAt(0)}
                  </div>
                  <div className="flex-1 pr-14">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {persona.name}
                      <span className="text-xs font-normal text-slate-400">({persona.age} yrs)</span>
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                      {getRoleIcon(persona.role)}
                      <span>{persona.tagline}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      📍 {persona.location.locality}, {persona.location.city}
                    </p>

                    {/* Stats & Highlights Row */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-slate-700/40 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Youth Balance</span>
                        <span className="font-bold text-emerald-400">
                          ₹{balance.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Active Goal</span>
                        <span className="font-semibold text-slate-200 truncate block">
                          {goalTitle}
                        </span>
                      </div>
                    </div>

                    {/* Guardian link badge if minor */}
                    {persona.isMinor && (
                      <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded-md">
                        <ShieldCheck size={11} />
                        Guardian Linked ({persona.guardian?.name || persona.guardianName || 'Parent'})
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer Note */}
        <p className="text-[11px] text-slate-400 text-center mt-4">
          Switching persona updates balance, eligibility, discounts, and quizzes across all tabs instantly.
        </p>
      </div>
    </div>
  );
};
