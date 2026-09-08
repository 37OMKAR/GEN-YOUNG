import confetti from 'canvas-confetti';

export function triggerCelebrationConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899'],
    });
  } catch (err) {
    console.warn('Confetti effect unavailable:', err);
  }
}

export function triggerGoalCompletedConfetti() {
  try {
    // Left firework
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#10b981', '#34d399', '#6ee7b7'],
    });
    // Right firework
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#10b981', '#34d399', '#6ee7b7'],
    });
  } catch (err) {
    console.warn('Goal confetti effect unavailable:', err);
  }
}
