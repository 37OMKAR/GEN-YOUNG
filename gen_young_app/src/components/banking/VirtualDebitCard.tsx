import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, RotateCcw, Snowflake, Wifi, Sliders } from 'lucide-react';
import { useBanking } from '../../context/BankingContext';
import { useToast } from '../../context/ToastContext';

export const VirtualDebitCard: React.FC = () => {
  const {
    account,
    updateCardLimit,
    toggleCardFreeze,
    isCvvRevealed,
    cvvSecondsLeft,
    revealCvv,
    hideCvv,
  } = useBanking();
  const { showToast } = useToast();

  const card = account.virtualCard;
  const [isFlipped, setIsFlipped] = useState(false);
  const [isNumberRevealed, setIsNumberRevealed] = useState(false);

  // Notify when CVV auto-masks
  useEffect(() => {
    if (!isCvvRevealed && cvvSecondsLeft === 0) {
      // closed/masked
    }
  }, [isCvvRevealed, cvvSecondsLeft]);

  const handleRevealCvv = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCvvRevealed) {
      revealCvv();
      showToast('CVV visible for 30 seconds', 'info');
    } else {
      hideCvv();
    }
  };

  const handleLimitSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const limit = Number(e.target.value);
    updateCardLimit(limit);
  };

  const handleFreezeToggle = () => {
    const nextState = !card.isFrozen;
    toggleCardFreeze(nextState);
    showToast(
      nextState ? 'Card frozen. All transactions blocked.' : 'Card un-frozen and active!',
      nextState ? 'error' : 'success'
    );
  };

  return (
    <div className="mt-5 space-y-4">
      {/* Header & Flip Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
          Virtual Debit Card
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700/60 font-medium">
            {card.network}
          </span>
        </h3>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors font-semibold"
        >
          <RotateCcw size={13} />
          {isFlipped ? 'View Front' : 'Flip to Back'}
        </button>
      </div>

      {/* 3D Card Container */}
      <div
        className="w-full h-52 cursor-pointer perspective-1000 select-none"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px' }}
      >
        <div
          className={`relative w-full h-full rounded-2xl shadow-2xl transition-transform duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* FRONT OF CARD */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col justify-between overflow-hidden backface-hidden bg-gradient-to-tr from-emerald-700 via-teal-800 to-slate-900 border border-emerald-400/30 text-white shadow-xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Frozen Overlay */}
            {card.isFrozen && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-cyan-300 font-bold">
                <Snowflake size={36} className="animate-spin-slow mb-1 text-cyan-400" />
                <span className="text-sm tracking-widest uppercase">CARD FROZEN</span>
                <span className="text-[10px] text-cyan-400/80 font-normal mt-0.5">
                  Unfreeze in controls below to authorize spends
                </span>
              </div>
            )}

            {/* Top row: Brand and RuPay mark */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-black tracking-wider text-emerald-300">GEN-YOUNG</span>
                <span className="text-[9px] bg-white/20 px-1 rounded text-white font-semibold">YOUTH</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi size={18} className="text-slate-300 rotate-90" />
                <span className="font-extrabold italic text-sm tracking-wider text-white">RuPay</span>
              </div>
            </div>

            {/* EMV Chip */}
            <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-500 border border-amber-600/40 shadow-inner flex items-center justify-center">
              <div className="w-8 h-5 border border-amber-800/30 rounded-sm opacity-60" />
            </div>

            {/* 16-digit Card Number */}
            <div className="flex items-center justify-between">
              <div className="font-mono text-lg tracking-widest text-white drop-shadow">
                {isNumberRevealed
                  ? card.cardNumber
                  : `•••• •••• •••• ${card.cardNumber.slice(-4)}`}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNumberRevealed(!isNumberRevealed);
                }}
                aria-label={isNumberRevealed ? 'Hide card number' : 'Reveal card number'}
                className="p-1 text-slate-300 hover:text-white"
              >
                {isNumberRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Bottom row: Cardholder Name & Expiry */}
            <div className="flex items-end justify-between text-xs">
              <div>
                <span className="text-[9px] text-emerald-200/80 uppercase tracking-wider block">Cardholder</span>
                <span className="font-bold tracking-wide uppercase text-white">{card.cardHolder}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-emerald-200/80 uppercase tracking-wider block">Expires</span>
                <span className="font-mono font-bold text-white">{card.expiryFormatted || `${card.expiryMonth}/${card.expiryYear}`}</span>
              </div>
            </div>
          </div>

          {/* BACK OF CARD */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl flex flex-col justify-between overflow-hidden backface-hidden bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-950 border border-slate-700 text-white shadow-xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Magnetic Stripe */}
            <div className="w-full h-10 bg-slate-950 mt-4 shadow-inner" />

            {/* CVV Panel */}
            <div className="px-5 py-2">
              <div className="bg-slate-200 h-8 rounded flex items-center justify-end px-3 text-slate-900 font-mono">
                <span className="text-[10px] text-slate-500 mr-2 font-sans">CVV / CVC</span>
                <span className="font-bold tracking-widest text-sm">
                  {isCvvRevealed ? card.cvv : '•••'}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[9px] text-slate-400">
                  {isCvvRevealed ? `Auto-hides in ${cvvSecondsLeft}s` : 'Keep CVV confidential'}
                </span>
                <button
                  onClick={handleRevealCvv}
                  className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider"
                >
                  {isCvvRevealed ? 'Hide CVV' : 'Reveal CVV (30s)'}
                </button>
              </div>
            </div>

            {/* Microtext & Help */}
            <div className="px-5 pb-4 text-[9px] text-slate-400 leading-tight">
              <p>For youth digital transactions only. 24x7 Helpline: 1800-GEN-YOUNG. Powered by NPCI RuPay.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Card Controls Bar */}
      <div className="bg-slate-850/80 border border-slate-700/60 rounded-xl p-3.5 space-y-3.5">
        {/* Card Freeze Switch */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${card.isFrozen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
              <Snowflake size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Instant Card Freeze</span>
              <span className="text-[10px] text-slate-400">
                {card.isFrozen ? 'Transactions blocked' : 'Card is active & secure'}
              </span>
            </div>
          </div>
          <button
            onClick={handleFreezeToggle}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              card.isFrozen
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {card.isFrozen ? 'Frozen ❄️' : 'Active'}
          </button>
        </div>

        {/* Online Transaction Limit Slider */}
        <div className="pt-2 border-t border-slate-700/40">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-semibold flex items-center gap-1">
              <Sliders size={13} className="text-emerald-400" />
              Daily Online Limit
            </span>
            <span className="font-mono font-bold text-emerald-400">
              ₹{card.onlineLimit.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min={500}
            max={25000}
            step={500}
            value={card.onlineLimit}
            onChange={handleLimitSlider}
            aria-label="Daily online transaction limit slider"
            className="w-full mt-2 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-mono">
            <span>₹500</span>
            <span>Max ₹25,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
