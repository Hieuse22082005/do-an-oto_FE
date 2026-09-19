import type { Config } from "tailwindcss";

const config: Config = {
  // Đã nâng cấp: Nhận diện chế độ tối cho CẢ Mặt trăng (dark) và Quả cầu pha lê (mystic)
  darkMode: ['class', ':is([data-theme="dark"], [data-theme="mystic"])'],

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      keyframes: {
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        scanVertical: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' }
        },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseNeon: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 2px #22c55e)' },
          '50%': { opacity: '0.7', filter: 'drop-shadow(0 0 10px #22c55e)' }
        }

      },
      animation: {
        'fadeInLeft': 'fadeInLeft 0.6s ease-out forwards',
        'fadeInRight': 'fadeInRight 0.6s ease-out forwards',
                  'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
          'scan': 'scan 2.5s ease-in-out infinite',
        
        'shimmer': 'shimmer 1.5s infinite',
        'scan-vertical': 'scanVertical 3s linear infinite',
        'glitch': 'glitch 0.2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',

      }
    },
  },
  plugins: [],
};
export default config;