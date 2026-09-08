/**
 * Gen-Young Procedural Sound Effects Engine
 * Native Web Audio API synthesis for zero-dependency audio feedback:
 * UPI payment chimes, button clicks, card flips, countdown beeps, and celebrations.
 * Path: src/utils/soundEffects.ts
 */

let globalAudioContext: AudioContext | null = null;
let isSoundMuted = false;

/**
 * Lazily retrieves or creates a single AudioContext instance.
 * Automatically handles browser autoplay suspension policy on user gestures.
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  try {
    if (!globalAudioContext) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (AudioContextClass) {
        globalAudioContext = new AudioContextClass();
      }
    }

    if (globalAudioContext && globalAudioContext.state === 'suspended') {
      globalAudioContext.resume().catch(() => {
        // Silently catch autoplay restriction until user interaction
      });
    }

    return globalAudioContext;
  } catch (err) {
    console.warn('Web Audio API not supported or accessible:', err);
    return null;
  }
}

/**
 * Toggle audio mute globally across the application.
 */
export function setSoundMuted(muted: boolean): void {
  isSoundMuted = muted;
}

export function isSoundMutedState(): boolean {
  return isSoundMuted;
}

/**
 * 1. UPI Payment Success Chime
 * An elegant, melodious 4-note ascending chord (E5 -> G5 -> B5 -> E6)
 * with soft attack and warm bell-like exponential decay envelope.
 */
export function playUpiSuccessChime(): void {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 659.25, time: 0.0, dur: 0.12 },  // E5
    { freq: 783.99, time: 0.08, dur: 0.12 }, // G5
    { freq: 987.77, time: 0.16, dur: 0.14 }, // B5
    { freq: 1318.51, time: 0.24, dur: 0.45 }, // E6 (Sustained bell chime)
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + time);

    // Smooth envelope: fast attack, exponential decay
    gain.gain.setValueAtTime(0.0001, now + time);
    gain.gain.linearRampToValueAtTime(0.18, now + time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur + 0.05);
  });
}

/** Alias for UPI payment chime */
export const playPaymentSuccessChime = playUpiSuccessChime;

/**
 * 2. Subtle Button Tap / Click Sound
 * Fast, crisp UI feedback tick (900 Hz decaying to 200 Hz over 0.035s).
 */
export function playClickSound(): void {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(900, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.035);

  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
}

/**
 * 3. Card Flip Sound
 * Simulates a subtle swoosh for card flips using filtered frequency sweep.
 */
export function playCardFlipSound(): void {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.13);
}

/**
 * 4. Procedural Countdown Tick
 * Pure sine tick (1000 Hz) used for 3s SOS button hold and 30s CVV timer.
 */
export function playCountdownTick(pitchMultiplier: number = 1.0): void {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  const freq = Math.min(Math.max(1000 * pitchMultiplier, 400), 3000);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}

/**
 * 5. Emergency Siren / High-Alert Tone
 * Alternating high-stress dual tone siren (750 Hz / 1050 Hz).
 */
export function playEmergencyAlert(): void {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  // Fast frequency modulation for emergency siren
  for (let i = 0; i < 4; i++) {
    osc.frequency.setValueAtTime(750, now + i * 0.15);
    osc.frequency.setValueAtTime(1050, now + i * 0.15 + 0.075);
  }

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.65);
}

/**
 * 6. Savings Goal & Level Up Victory Celebration
 * Uplifting 5-note fanfare arpeggio (C5 -> E5 -> G5 -> B5 -> C6).
 */
export function playGoalCelebration(): void {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 523.25, time: 0.0, dur: 0.1 },  // C5
    { freq: 659.25, time: 0.08, dur: 0.1 }, // E5
    { freq: 783.99, time: 0.16, dur: 0.1 }, // G5
    { freq: 987.77, time: 0.24, dur: 0.12 },// B5
    { freq: 1046.50, time: 0.32, dur: 0.5 }, // C6 (Grand finish)
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.0001, now + time);
    gain.gain.linearRampToValueAtTime(0.16, now + time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur + 0.05);
  });
}

/**
 * 7. Low Rejection / Error Buzz
 * 180 Hz sawtooth wave for invalid inputs or insufficient balance.
 */
export function playErrorSound(): void {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.linearRampToValueAtTime(110, now + 0.15);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.16);
}
