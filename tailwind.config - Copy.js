/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          glow: "var(--color-primary-glow)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          glow: "var(--color-secondary-glow)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          glow: "var(--color-accent-glow)",
        },
        cyber: {
          purple: "var(--color-cyber-purple)",
          blue: "var(--color-cyber-blue)",
          pink: "var(--color-cyber-pink)",
          green: "var(--color-cyber-green)",
        },
        card: "rgba(255, 255, 255, 0.03)",
        glass: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      screens: {
        'mobile': '0px',
        'tablet': '641px',
        'laptop': '1025px',
        'desktop': '1281px',
        'large': '1537px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          tablet: '1.5rem',
          laptop: '2rem',
          desktop: '2rem',
        },
        screens: {
          tablet: '100%',
          laptop: '1024px',
          desktop: '1280px',
          large: '1536px',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'bounce-slight': 'bounceSlight 2s infinite',
        'neon-pulse': 'neonPulse 1.5s ease-in-out infinite alternate',
        'glitch': 'glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' },
          '50%': { opacity: '.8', boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)' },
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
        },
        neonPulse: {
          'from': { textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #bc13fe, 0 0 20px #bc13fe' },
          'to': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #bc13fe, 0 0 40px #bc13fe' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        }
      }
    },
  },
  plugins: [],
}
