import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aetrax-black': '#0A0A0F',
        'aetrax-surface': '#0F0F1A',
        'aetrax-card': '#141420',
        'aetrax-border': '#1E1E30',
        'aetrax-text': '#F0F0F5',
        'aetrax-muted': '#6B7080',
        'aetrax-cyan': '#00D4FF',
        'aetrax-violet': '#7C3AED',
        'aetrax-cyan-dim': '#00A3C4',
      },
      fontFamily: {
        geist: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow-pulse 3s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'data-flow': 'data-flow 2s linear infinite',
        'connection-draw': 'connection-draw 1.5s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
            opacity: '1',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)',
            opacity: '0.8',
          },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'data-flow': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        'connection-draw': {
          '0%': { strokeDashoffset: '1000', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { strokeDashoffset: '0', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern':
          'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '60px 60px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-cyan-lg': '0 0 40px rgba(0, 212, 255, 0.5)',
        'glow-violet': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-violet-lg': '0 0 40px rgba(124, 58, 237, 0.5)',
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 48px rgba(0, 0, 0, 0.6)',
      },
      borderColor: {
        DEFAULT: '#1E1E30',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}

export default config
