/**
 * Gen-Young Insurance Hub
 * Path: src/components/hubs/InsuranceHub.tsx
 *
 * Reflects docs/assets/09-insurance-hub.png — Health / Life / Travel / Device
 * insurance plans with activation flow and Protection Wallet.
 */

import React from 'react';
import { Shield, Heart, Users, Plane, Laptop, Check } from 'lucide-react';
import { HubModal } from './HubModal';
import { useDemo, mockInsurancePlans } from '../../context/DemoContext';
import { useToast } from '../../context/ToastContext';
import type { LucideIcon } from 'lucide-react';

const categoryIcon: Record<string, LucideIcon> = {
  health: Heart,
  life: Users,
  travel: Plane,
  device: Laptop,
};

const categoryAccent: Record<string, string> = {
  health: 'text-rose-300',
  life: 'text-emerald-300',
  travel: 'text-cyan-300',
  device: 'text-amber-300',
};

interface InsuranceHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InsuranceHub: React.FC<InsuranceHubProps> = ({ isOpen, onClose }) => {
  const { activateInsurance, isPlanActive, insuranceActivations } = useDemo();
  const { showToast } = useToast();

  const totalMonthly = insuranceActivations.reduce((sum, a) => sum + a.premiumInr, 0);

  const handleActivate = (planId: string, planName: string) => {
    const result = activateInsurance(planId);
    if (result.success) {
      showToast(`${planName} activated · Protection Wallet updated`, 'success');
    } else {
      showToast(result.error || 'Could not activate', 'error');
    }
  };

  return (
    <HubModal
      isOpen={isOpen}
      onClose={onClose}
      title="Insurance & Protection"
      subtitle="Insure today. Go further tomorrow."
      headerAccent="from-teal-500 to-cyan-500"
    >
      {/* Protection Wallet summary */}
      {insuranceActivations.length > 0 && (
        <section
          className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-950/40 to-slate-900 border border-teal-500/30 shadow-lg"
          aria-label="Protection Wallet"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-teal-300">
                Protection Wallet
              </span>
              <div className="text-xl font-extrabold text-white mt-0.5 font-mono">
                ₹{totalMonthly.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-400">/mo</span>
              </div>
              <span className="text-[10px] text-slate-400">
                {insuranceActivations.length} plan{insuranceActivations.length === 1 ? '' : 's'}{' '}
                active
              </span>
            </div>
            <Shield size={30} className="text-teal-400" />
          </div>
        </section>
      )}

      {/* Plans */}
      <section className="mt-4 space-y-2.5" aria-label="Available plans">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Plans that match your life stage
        </h3>
        {mockInsurancePlans.map((plan) => {
          const Icon = categoryIcon[plan.category] ?? Shield;
          const accent = categoryAccent[plan.category] ?? 'text-emerald-300';
          const active = isPlanActive(plan.id);
          return (
            <div
              key={plan.id}
              className={`p-3.5 rounded-xl border shadow-sm ${
                active
                  ? 'bg-emerald-500/10 border-emerald-500/40'
                  : 'bg-slate-850 border-slate-700/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                      active
                        ? 'bg-emerald-500/20 border-emerald-500/40'
                        : 'bg-slate-800 border-slate-700'
                    } ${accent}`}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-white">{plan.name}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300`}
                      >
                        {plan.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{plan.tagline}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Cover ₹{plan.coverInr.toLocaleString('en-IN')}
                      {plan.hospitalsCount > 0 &&
                        ` · ${plan.hospitalsCount.toLocaleString('en-IN')}+ hospitals`}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-extrabold text-white block">
                    ₹{plan.monthlyInr}
                    <span className="text-[10px] font-normal text-slate-400">/mo</span>
                  </span>
                  {active ? (
                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300">
                      <Check size={10} /> Active
                    </span>
                  ) : (
                    <button
                      onClick={() => handleActivate(plan.id, plan.name)}
                      className="mt-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 transition-colors"
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Govt-backed callout */}
      <section
        className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800"
        aria-label="Government-backed protection"
      >
        <h3 className="text-xs font-bold text-white mb-1.5">
          🇮🇳 Government-backed protection
        </h3>
        <ul className="text-[11px] text-slate-300 space-y-1 leading-relaxed">
          <li>
            <b className="text-emerald-300">PMJJBY</b> · ₹2 L life cover · ₹436/yr (age 18–50)
          </li>
          <li>
            <b className="text-emerald-300">PMSBY</b> · ₹2 L accidental cover · ₹20/yr (18–70)
          </li>
          <li>
            <b className="text-emerald-300">Ayushman Bharat PM-JAY</b> · up to ₹5 L/family/yr
          </li>
        </ul>
        <p className="text-[10px] text-slate-500 mt-1.5">
          Available in the Benefits Marketplace under Government Schemes.
        </p>
      </section>
    </HubModal>
  );
};
