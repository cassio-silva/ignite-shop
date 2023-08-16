/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#fff',

      'gray-300': '#E1E1E6',
      'gray-400': '#C4C4CC',
      'gray-500': '#202024',
      'gray-600': '#121214',

      'green-300': '#00B37E',
      'green-400': '#00875F',
    },
    fontSize: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-green-to-purple': 'linear-gradient(180deg, #00875F 0%, #7465d4 100%)'
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-in-out forwards',
        slideOut: 'slideOut 0.2s ease-in-out forwards'
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)', display: 'none' },
        },
      }
    },
  },
  plugins: [],
}
