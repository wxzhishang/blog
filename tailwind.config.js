/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 曼城主题色系
        'city-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#6CABDD', // 曼城天蓝主色
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#1C2C5C', // 曼城深蓝
        },
        'city-gold': '#FFD700', // 荣耀金
        'pitch-green': '#4CAF50', // 草场绿
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#6CABDD',
          400: '#38bdf8',
          500: '#6CABDD',
          600: '#0284c7',
          700: '#1C2C5C',
          800: '#075985',
          900: '#1C2C5C',
        },
      },
      backgroundImage: {
        'city-gradient': 'linear-gradient(135deg, #6CABDD 0%, #1C2C5C 100%)',
        'stadium-pattern': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236CABDD' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
      },
      animation: {
        'football-bounce': 'footballBounce 2s ease-in-out infinite',
        'sail-float': 'sailFloat 3s ease-in-out infinite',
        'trophy-glow': 'trophyGlow 1.5s ease-in-out infinite alternate',
        'stadium-pulse': 'stadiumPulse 4s ease-in-out infinite',
      },
      keyframes: {
        footballBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sailFloat: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(5px, -5px) rotate(2deg)' },
        },
        trophyGlow: {
          '0%': { boxShadow: '0 0 5px #FFD700' },
          '100%': { boxShadow: '0 0 20px #FFD700, 0 0 30px #FFD700' },
        },
        stadiumPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.1' },
        },
      },
      boxShadow: {
        'football': '0 4px 20px rgba(108, 171, 221, 0.3)',
        'trophy': '0 8px 25px rgba(255, 215, 0, 0.4)',
        'pitch': '0 2px 10px rgba(76, 175, 80, 0.2)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#6CABDD',
              '&:hover': {
                color: '#1C2C5C',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 