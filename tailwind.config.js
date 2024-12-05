import plugin from 'tailwindcss/plugin';
import tailwindcssAnimate from 'tailwindcss-animate';
import { theme } from './src/Themes/theme';

const tailwindConfig = {
  darkMode: ['class'], // Dark mode toggles using class
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: theme.colors, // Include custom colors
      fontFamily: theme.fonts, // Include custom fonts
      boxShadow: theme.shadows, // Include custom shadows
      spacing: theme.spacing, // Add extended spacing
      borderRadius: theme.borderRadius, // Include border-radius
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        fade: 'fade 0.3s ease-in-out',
        bounceIn: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          '.no-scrollbar': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          },
          '.no-scrollbar::-webkit-scrollbar': {
            display: 'none',
          },
        },
        ['responsive']
      );
    }),
  ],
};

export default tailwindConfig;
