import React from 'react';
import { Sparkles, Shield, GraduationCap, Briefcase, Heart, ShoppingBag } from 'lucide-react';
import { usePersona } from '../context/PersonaContext';

export const BenefitsView: React.FC = () => {
  const { activePersona } = usePersona();

  const categories = [
    { name: 'Government Schemes', icon: Shield, count: '6 Available', color: 'text-emerald-400' },
    { name: 'AI & Productivity', icon: Sparkles, count: '4 Free Perks', color: 'text-purple-400' },
    { name: 'Education & Certs', icon: GraduationCap, count: '8 Courses', color: 'text-teal-400' },
    { name: 'Career & Internships', icon: Briefcase, count: '5 Tracks', color: 'text-amber-400' },
    { name: 'Health & Wellness', icon: Heart, count: '3 Covers', color: 'text-rose-400' },
    { name: 'Youth Lifestyle', icon: ShoppingBag, count: '12 Offers', color: 'text-cyan-400' },
  ];

  return (
    <main className="max-w-md mx-auto px-4 pt-4 pb-24 space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="text-emerald-400" size={20} />
          <h1 className="text-lg font-bold text-white tracking-tight">Benefits Marketplace</h1>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Curated opportunities matched for {activePersona.name} ({activePersona.roleLabel})
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-850 border border-slate-700/60 shadow-md flex flex-col justify-between hover:border-slate-600 transition-all"
            >
              <div className="flex items-center justify-between">
                <Icon size={18} className={cat.color} />
                <span className="text-[10px] text-slate-400 font-mono">{cat.count}</span>
              </div>
              <span className="text-xs font-bold text-white mt-3 block">{cat.name}</span>
            </div>
          );
        })}
      </div>

      {/* Milestone 2 Staging Notice */}
      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center">
        <span className="text-xs font-bold text-emerald-400 block">
          Benefits Marketplace & 4-State Wallet
        </span>
        <span className="text-[11px] text-slate-300 mt-1 block">
          Full 16-scheme repository, &ldquo;Why am I seeing this?&rdquo; attribution modal, and claim wallet will be activated in Milestone 2.
        </span>
      </div>
    </main>
  );
};
