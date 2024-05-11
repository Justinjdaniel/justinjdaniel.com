// const defaultTheme = require("tailwindcss/defaultTheme");
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
      fontFamily: {
        // sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        // display: ["var(--font-calsans)"],
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fade-in 3s ease-in-out forwards',
        title: 'title 3s ease-out forwards',
        'fade-left': 'fade-left 3s ease-in-out forwards',
        'fade-right': 'fade-right 3s ease-in-out forwards',
        orbit: 'orbit 2s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0%',
          },
          '75%': {
            opacity: '0%',
          },
          '100%': {
            opacity: '100%',
          },
        },
        'fade-left': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0%',
          },

          '30%': {
            transform: 'translateX(0%)',
            opacity: '100%',
          },
          '100%': {
            opacity: '0%',
          },
        },
        'fade-right': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0%',
          },

          '30%': {
            transform: 'translateX(0%)',
            opacity: '100%',
          },
          '100%': {
            opacity: '0%',
          },
        },
        orbit: {
          '0%': {
            transform:
              'translateX(calc(var(--uib-size) * 0.25)) scale(0.73684)',
            opacity: 0.65,
          },
          '10%': {
            transform:
              'translateX(calc(var(--uib-size) * 0.182)) scale(0.631576)',
            opacity: 0.51,
          },
          '20%': {
            transform:
              'translateX(calc(var(--uib-size) * 0.076)) scale(0.526312)',
            opacity: 0.37,
          },
          '30%': {
            transform:
              'translateX(calc(var(--uib-size) * -0.076)) scale(0.526312)',
            opacity: 0.37,
          },
          '40%': {
            transform:
              'translateX(calc(var(--uib-size) * -0.182)) scale(0.631576)',
            opacity: 0.51,
          },
          '50%': {
            transform:
              'translateX(calc(var(--uib-size) * -0.25)) scale(0.73684)',
            opacity: 0.65,
          },
          '60%': {
            transform:
              'translateX(calc(var(--uib-size) * -0.182)) scale(0.842104)',
            opacity: 0.79,
          },
          '70%': {
            transform:
              'translateX(calc(var(--uib-size) * -0.076)) scale(0.947368)',
            opacity: 0.93,
          },
          '80%': {
            transform:
              'translateX(calc(var(--uib-size) * 0.076)) scale(0.947368)',
            opacity: 0.93,
          },
          '90%': {
            transform:
              'translateX(calc(var(--uib-size) * 0.182)) scale(0.842104)',
            opacity: 0.79,
          },
          '100%': {
            transform:
              'translateX(calc(var(--uib-size) * 0.25)) scale(0.73684)',
            opacity: 0.65,
          },
        },
        title: {
          '0%': {
            'line-height': '0%',
            'letter-spacing': '0.25em',
            opacity: '0',
          },
          '25%': {
            'line-height': '0%',
            opacity: '0%',
          },
          '80%': {
            opacity: '100%',
          },

          '100%': {
            'line-height': '100%',
            opacity: '100%',
          },
        },
      },
    },
  },
  plugins: [
    typography,
    // require("@tailwindcss/typography"),
    // require("tailwindcss-debug-screens"),
  ],
};
