/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef1f6',
          100: '#d6deeb',
          200: '#aebcd4',
          300: '#7e93b6',
          400: '#516d99',
          500: '#33507f',
          600: '#243e68',
          700: '#1B2A4A',
          800: '#141f38',
          900: '#0c1426',
          950: '#070d18'
        },
        forest: {
          50: '#eaf5ec',
          100: '#cbe7d1',
          200: '#9ed0aa',
          300: '#6cb47e',
          400: '#469658',
          500: '#2E7D32',
          600: '#256528',
          700: '#1d4f20',
          800: '#163c19',
          900: '#0f2a12'
        },
        gold: {
          50: '#fdf6e9',
          100: '#faebc9',
          200: '#f4d495',
          300: '#edbb61',
          400: '#E8A93B',
          500: '#d4922a',
          600: '#b07620',
          700: '#8a5a18'
        },
        cream: '#F7F5F0',
        ink: '#21252B'
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 4px 24px -8px rgba(27,42,74,0.15)',
        'card-hover': '0 12px 32px -8px rgba(27,42,74,0.25)'
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      keyframes: {
        'arc-draw': {
          '0%': { strokeDashoffset: '600' },
          '100%': { strokeDashoffset: '0' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'arc-draw': 'arc-draw 1.6s ease-out forwards',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'float-slow': 'float-slow 6s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
