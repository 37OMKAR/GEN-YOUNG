/**
 * Gen-Young Emergency SOS 3-Second Hold Trigger
 * Path: src/components/sos/SosHoldTrigger.tsx
 *
 * Press-and-hold interaction with an animated SVG progress ring, per-second
 * countdown beep, haptic-style visual pulse, and a 10-second false-alarm
 * cancel window before dispatch is committed.
 *
 * Reflects docs/assets/07-emergency-sos.png and concept paper §20.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Phone, X } from 'lucide-react';
import { playCountdownTick, playEmergencyAlert, playClickSound } from '../../utils/soundEffects';

interface SosHoldTriggerProps {
  onTriggered: () => void;
  disabled?: boolean;
}

const HOLD_DURATION_MS = 3000;
const TICK_INTERVAL_MS = 50;

export const SosHoldTrigger: React.FC<SosHoldTriggerProps> = ({ onTriggered, disabled }) => {
  const [progress, setProgress] = useState(0); // 0 → 1
  const [isHolding, setIsHolding] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const lastBeepSecondRef = useRef<number>(0);

  const stopHold = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    startedAtRef.current = null;
    lastBeepSecondRef.current = 0;
    setProgress(0);
    setCountdown(0);
    setIsHolding(false);
  }, []);

  const startHold = useCallback(() => {
    if (disabled) return;
    playClickSound();
    setIsHolding(true);
    startedAtRef.current = performance.now();
    lastBeepSecondRef.current = 0;

    timerRef.current = window.setInterval(() => {
      const elapsed = performance.now() - (startedAtRef.current ?? performance.now());
      const p = Math.min(1, elapsed / HOLD_DURATION_MS);
      setProgress(p);

      const currentSecond = Math.ceil((HOLD_DURATION_MS - elapsed) / 1000);
      setCountdown(Math.max(0, currentSecond));

      // Beep once per second countdown (pitch rises as we get closer)
      if (currentSecond > 0 && currentSecond !== lastBeepSecondRef.current) {
        lastBeepSecondRef.current = currentSecond;
        playCountdownTick(1.0 + (3 - currentSecond) * 0.15);
      }

      if (p >= 1) {
        stopHold();
        playEmergencyAlert();
        onTriggered();
      }
    }, TICK_INTERVAL_MS);
  }, [disabled, onTriggered, stopHold]);

  // Global mouseup/touchend release safety net
  useEffect(() => {
    const onRelease = () => {
      if (isHolding) stopHold();
    };
    window.addEventListener('mouseup', onRelease);
    window.addEventListener('touchend', onRelease);
    window.addEventListener('touchcancel', onRelease);
    return () => {
      window.removeEventListener('mouseup', onRelease);
      window.removeEventListener('touchend', onRelease);
      window.removeEventListener('touchcancel', onRelease);
    };
  }, [isHolding, stopHold]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, []);

  // SVG progress ring math
  const size = 220;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div
        className="relative"
        style={{ width: size, height: size }}
        onMouseDown={startHold}
        onTouchStart={startHold}
        onMouseLeave={() => isHolding && stopHold()}
        role="button"
        aria-label={
          isHolding
            ? `Emergency SOS ${countdown} seconds until dispatch`
            : 'Press and hold 3 seconds to call 112 Emergency Response System'
        }
        aria-pressed={isHolding}
      >
        {/* Outer pulse when idle */}
        {!isHolding && !disabled && (
          <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping" />
        )}
        {/* SVG ring */}
        <svg width={size} height={size} className="absolute inset-0 -rotate-90 pointer-events-none">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(244, 63, 94, 0.25)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={progress > 0.66 ? '#f43f5e' : progress > 0.33 ? '#fb7185' : '#e11d48'}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        {/* Center */}
        <button
          type="button"
          disabled={disabled}
          className={`absolute inset-4 rounded-full flex flex-col items-center justify-center text-white font-black transition-transform ${
            isHolding
              ? 'bg-gradient-to-br from-rose-500 to-red-700 scale-95'
              : 'bg-gradient-to-br from-rose-600 to-red-800 hover:from-rose-500 active:scale-95'
          } shadow-2xl shadow-rose-500/40`}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Phone size={40} strokeWidth={2.5} />
          <span className="text-2xl mt-1 tracking-widest">SOS</span>
          {isHolding && countdown > 0 && (
            <span className="text-xs font-mono mt-1 tabular-nums">Dispatching in {countdown}…</span>
          )}
        </button>
      </div>
      <p className="text-xs text-slate-400 text-center max-w-[220px] leading-snug">
        {isHolding
          ? 'Keep holding — release to cancel'
          : 'Press and hold for 3 seconds to call India\'s 112 emergency response'}
      </p>
    </div>
  );
};

// ── Companion: Post-dispatch banner with 10s cancel window ──
interface DispatchBannerProps {
  ticketId: string;
  secondsLeft: number;
  onCancel: () => void;
}

export const DispatchCancelBanner: React.FC<DispatchBannerProps> = ({
  ticketId,
  secondsLeft,
  onCancel,
}) => {
  return (
    <div className="rounded-2xl border-2 border-rose-500 bg-rose-950/40 p-4 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shrink-0 animate-pulse">
          <Phone size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white">SOS dispatched to 112 ERSS</h3>
          <p className="text-[11px] text-rose-200 mt-0.5">
            Ticket <span className="font-mono font-bold">{ticketId}</span> · Location and trusted
            contacts notified.
          </p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-[10px] text-rose-300 font-mono">
              False-alarm cancel window: <b>{secondsLeft}s</b>
            </span>
            <button
              onClick={onCancel}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              <X size={12} /> Cancel dispatch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
