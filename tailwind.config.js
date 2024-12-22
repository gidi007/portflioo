import plugin from 'tailwindcss/plugin';
import tailwindcssAnimate from 'tailwindcss-animate';
import { theme } from './src/Themes/theme';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: ['class'],
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
      colors: theme.colors,
      fontFamily: {
        ...theme.fonts,
        body: ['Poppins', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      fontSize: theme.fontSizes,
      fontWeight: theme.fontWeights,
      lineHeight: theme.lineHeights,
      boxShadow: theme.shadows,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        '0': '0ms',
        '250': '250ms',
        '350': '350ms',
        '500': '500ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOutToTop: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-10px)', opacity: '0' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOutToBottom: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(10px)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
          '100%': { transform: 'scale(0.3)', opacity: '0' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        fadeOut: 'fadeOut 0.3s ease-in-out',
        scaleIn: 'scaleIn 0.3s ease-in-out',
        scaleOut: 'scaleOut 0.3s ease-in-out',
        slideInFromTop: 'slideInFromTop 0.3s ease-in-out',
        slideOutToTop: 'slideOutToTop 0.3s ease-in-out',
        slideInFromBottom: 'slideInFromBottom 0.3s ease-in-out',
        slideOutToBottom: 'slideOutToBottom 0.3s ease-in-out',
        bounceIn: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        bounceOut: 'bounceOut 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backgroundImage: theme.gradients,
      blur: theme.blur,
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(function ({ addUtilities, addVariant }) {
      addUtilities(
        {
          '.no-scrollbar': {
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
          '.gradient-text': {
            'background-clip': 'text',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          },
          '.transition-smooth': {
            'transition-property': 'all',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
            'transition-duration': '150ms',
          },
        },
        ['responsive']
      );
      addVariant('hocus', ['&:hover', '&:focus']);
      addVariant('group-hocus', ['.group:hover &', '.group:focus &']);
    }),
    plugin(function({ addBase, theme }) {
      addBase({
        'html': { fontSize: '16px' },
        'body': {
          fontFamily: theme('fontFamily.body'),
          backgroundColor: theme('colors.background.DEFAULT'),
          color: theme('colors.foreground.DEFAULT'),
        },
        'h1, h2, h3, h4, h5, h6': {
          fontFamily: theme('fontFamily.heading'),
          fontWeight: theme('fontWeight.bold'),
        },
        '.dark': {
          'body': {
            backgroundColor: theme('colors.background.dark'),
            color: theme('colors.foreground.dark'),
          },
        },
      });
    }),
  ],
};

export default tailwindConfig;

