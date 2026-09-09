/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f4fb',
          100: '#dbe4f5',
          200: '#b6c8eb',
          300: '#8ba7dc',
          400: '#5f83c5',
          500: '#3f63ac',
          600: '#2e4c8f',
          700: '#173B7A',
          800: '#0B2A5B',
          900: '#071c40',
          950: '#04122a',
        },
        leaf: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22C55E',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        brand: {
          50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
          400: '#4ade80', 500: '#22C55E', 600: '#16a34a', 700: '#15803d',
          800: '#166534', 900: '#14532d', 950: '#052e16',
        },
        youth: {
          purple: '#7C3AED',
          cyan: '#0EA5E9',
          blue: '#0B82D6',
          amber: '#F59E0B',
          rose: '#DC2626',
          emerald: '#22C55E',
          pink: '#DB2777',
        },
        hc: { bg: '#000000', card: '#0d0d0d', text: '#ffffff', yellow: '#ffff00', cyan: '#00ffff', border: '#ffff00' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4,0,0.6,1) infinite',
        'ping-once': 'ping 0.8s cubic-bezier(0,0,0.2,1) 1',
        'spin-slow': 'spin 12s linear infinite',
      },
      boxShadow: {
        'phone': '0 30px 60px rgba(11,42,91,0.18), 0 0 0 10px #0B2A5B, 0 0 0 12px #173B7A',
        'card-soft': '0 8px 24px rgba(11,42,91,0.08)',
        'glow-emerald': '0 0 20px -5px rgba(34,197,94,0.4)',
        'glow-rose': '0 0 25px -5px rgba(220,38,38,0.5)',
      },
    },
  },
  plugins: [],
};
