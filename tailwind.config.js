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
        obsidian: '#0D0E15',
        'obsidian-light': '#13141F',
        'obsidian-card': '#161826',
        'slate-dark': '#1F2232',
        crimson: {
          DEFAULT: '#EF4444',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          glow: 'rgba(239, 68, 68, 0.45)',
        },
        cyber: {
          DEFAULT: '#EF4444',
          orange: '#F59E0B',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          glow: 'rgba(239, 68, 68, 0.45)',
        },
        'electric-purple': {
          DEFAULT: '#8B5CF6',
          400: '#A855F7',
          500: '#8B5CF6',
          glow: 'rgba(139, 92, 246, 0.45)',
        },
        silver: {
          DEFAULT: '#8F94A6',
          light: '#E5E7EB',
          muted: '#8F94A6',
        },

        background: '#0D0E15',
        'background-alt': '#13141F',
        'background-card': 'rgba(22, 24, 38, 0.75)',
        'background-glass': 'rgba(13, 14, 21, 0.85)',
        foreground: '#FFFFFF',
        'foreground-muted': '#8F94A6',
        'foreground-subtle': '#6B7280',
        border: 'rgba(239, 68, 68, 0.15)',
        'border-hover': 'rgba(239, 68, 68, 0.5)',

        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          DEFAULT: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', '"Inter"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse': 'spin-reverse 22s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'radar-sweep': 'radar-sweep 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      },
      boxShadow: {
        'glow-crimson': '0 0 30px -4px rgba(239, 68, 68, 0.45)',
        'glow-orange': '0 0 30px -4px rgba(245, 158, 11, 0.45)',
        'glow-purple': '0 0 30px -4px rgba(139, 92, 246, 0.45)',
        'glow-cyber': '0 0 30px -4px rgba(239, 68, 68, 0.45)',
        'glow-sm': '0 0 15px -3px rgba(239, 68, 68, 0.35)',
        'glow-md': '0 0 30px -5px rgba(239, 68, 68, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}
