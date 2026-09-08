/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefbf5',
          100: '#d7f6e8',
          200: '#b0eed3',
          300: '#77e0b6',
          400: '#38cb93',
          500: '#10b981', // Gen-Young Primary Emerald
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        youth: {
          purple: '#8b5cf6', // Learning, quizzes & level XP
          cyan: '#06b6d4',   // Digital UPI, tech perks & instant QR
          blue: '#3b82f6',   // Core savings & account management
          amber: '#f59e0b',  // Friday drops, countdown timers, streaks
          rose: '#f43f5e',   // Emergency SOS & high-priority alerts
          emerald: '#10b981',// Green passport & verified eco-actions
        },
        slate: {
          850: '#172033',
          900: '#0f172a',
          950: '#080d1a',
        },
        // WCAG AAA High-Contrast Palette
        hc: {
          bg: '#000000',
          card: '#0d0d0d',
          text: '#ffffff',
          yellow: '#ffff00',
          cyan: '#00ffff',
          border: '#ffff00',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-once': 'ping 0.8s cubic-bezier(0, 0, 0.2, 1) 1',
        'spin-slow': 'spin 12s linear infinite',
      },
      boxShadow: {
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.4)',
        'glow-rose': '0 0 25px -5px rgba(244, 63, 94, 0.5)',
        'glow-amber': '0 0 20px -5px rgba(245, 158, 11, 0.4)',
        'glow-cyan': '0 0 20px -5px rgba(6, 182, 212, 0.4)',
        'card-3d': '0 20px 35px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
