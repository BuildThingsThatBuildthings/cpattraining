/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Sage System
        sage: {
          50: '#F9FCFA',
          100: '#F1F8F3', 
          200: '#E4F1E8',
          300: '#D8E9DE',
          400: '#D1E6D8',
          500: '#A1C7B1',
          600: '#9FC6AF',
          700: '#5D8E75',
          800: '#2F4A2F',
          900: '#1E301E',
          950: '#1A2B1A',
        },
        // Premium Champagne System
        champagne: {
          50: '#FFFEFD',
          100: '#FEFCFA',
          200: '#FDFBF8',
          300: '#F6F2E4',
          400: '#ECE5CC',
          500: '#E1D5B4',
          600: '#D6C29B',
          700: '#B8941C',
          800: '#8B6914',
          900: '#6B4F0F',
        },
        // Enhanced Slate System
        slate: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E6EA',
          300: '#D1D4DA',
          400: '#9CA2AE',
          500: '#6B727F',
          600: '#374150',
          700: '#242A33',
          800: '#1A2028',
          900: '#0E1317',
          950: '#0A0D10',
        },
      },
      fontFamily: {
        'heading': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem', 
        'base': '1.125rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '1.75rem',
        '3xl': '2.25rem',
        '4xl': '3rem',
        '5xl': '4rem',
        '6xl': '5rem',
        '7xl': '6rem',
        '8xl': '8rem',
      },
      spacing: {
        '18': '4.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sage': '0 12px 24px -8px rgb(93 142 117 / 0.15), 0 4px 8px -4px rgb(93 142 117 / 0.1)',
        'champagne': '0 12px 24px -8px rgb(214 194 155 / 0.2), 0 4px 8px -4px rgb(214 194 155 / 0.15)',
        'glow': '0 0 20px rgb(93 142 117 / 0.3), 0 0 40px rgb(93 142 117 / 0.15)',
        'luxury-lift': '0 32px 64px -16px rgb(0 0 0 / 0.25), 0 16px 40px -12px rgb(93 142 117 / 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) scale(1)',
            opacity: '0.9'
          },
          '50%': { 
            transform: 'translateY(-12px) scale(1.02)',
            opacity: '1'
          },
        }
      }
    },
  },
  plugins: [],
}