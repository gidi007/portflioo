export const theme = {
  colors: {
    primary: {
      DEFAULT: '#FFD700', // Gold
      light: '#FFEB3C', // Bright Gold
      dark: '#CCAC00', // Deep Gold
    },
    secondary: {
      DEFAULT: '#192134', // Navy Blue
      light: '#283345', // Muted Navy
      dark: '#121928', // Midnight Blue
    },
    background: {
      DEFAULT: '#0A1929', // Deep Navy
      light: '#192134', // Lighter Navy
      dark: '#050F1E', // Deep Background
    },
    foreground: {
      DEFAULT: '#FFFFFF', // White
      muted: 'rgba(255, 255, 255, 0.7)', // Muted White
      accent: '#4ADE80', // Green Highlight
    },
    border: {
      DEFAULT: '#FFD700', // Gold Border
      light: 'rgba(255, 215, 0, 0.5)', // Muted Gold
    },
    accent: {
      DEFAULT: '#FFD700',
      muted: 'rgba(255, 215, 0, 0.5)',
    },
    status: {
      success: '#22C55E',
      warning: '#EAB308',
      error: '#EF4444',
      info: '#3B82F6',
    },
    code: {
      background: '#0A1929',
      text: '#FFFFFF',
      keyword: '#EAB308',
      string: '#22C55E',
      number: '#3B82F6',
    },
  },
  fonts: {
    heading: ['Poppins', 'sans-serif'], // Font for headings
    body: ['Roboto', 'sans-serif'], // Font for body
    mono: ['Fira Code', 'monospace'], // Monospace font
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)', // Small shadow
    md: '0 4px 6px rgba(0, 0, 0, 0.15)', // Medium shadow
    lg: '0 8px 12px rgba(0, 0, 0, 0.2)', // Large shadow
    glow: '0 0 15px rgba(255, 215, 0, 0.5)', // Glow effect
  },
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
};
