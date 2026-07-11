import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#7c3aed',
        'brand-blue': '#4f46e5',
        'brand-cyan': '#0ea5e9',
        'dark-bg': '#080b14',
        'card-bg': 'rgba(255, 255, 255, 0.03)',
        'card-border': 'rgba(255, 255, 255, 0.07)',
        'light-text': '#e2e8f0',
        'subtle-text': '#94a3b8',
      },
      keyframes: {
        floatOrb: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(40px, -30px) scale(1.05)' },
          '50%': { transform: 'translate(-20px, 40px) scale(0.95)' },
          '75%': { transform: 'translate(-40px, -20px) scale(1.02)' },
        },
        pulseRing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
            '0%': { backgroundPosition: '-200% center' },
            '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        floatOrb: 'floatOrb 20s ease-in-out infinite',
        pulseRing: 'pulseRing 4s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.8s ease forwards',
        shimmer: 'shimmer 4s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
