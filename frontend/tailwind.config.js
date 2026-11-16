/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ez: {
          bg: "#0C1214",
          panel: "#162126",
          panelHover: "#1B282E",
          panelActive: "#213138",
          border: "#2B3A3F",
          borderGlow: "rgba(166, 242, 15, 0.25)",
          neon: "#A6F20F",
          neonGlow: "rgba(166, 242, 15, 0.4)",
          text: "#F4F7F5",
          muted: "#B8C4BF",
          dark: "#080C0D",
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 25px -5px rgba(166, 242, 15, 0.35)',
        'neon-strong': '0 0 35px 0px rgba(166, 242, 15, 0.55)',
        'panel': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

