export const theme = {
  colors: {
    primary: {
      DEFAULT: 'rgb(255, 215, 0)',
      light: 'rgb(255, 235, 60)',
      dark: 'rgb(204, 172, 0)',
      100: 'rgb(255, 248, 204)',
      200: 'rgb(255, 240, 153)',
      300: 'rgb(255, 233, 102)',
      400: 'rgb(255, 225, 51)',
      500: 'rgb(255, 215, 0)',
      600: 'rgb(230, 194, 0)',
      700: 'rgb(204, 172, 0)',
      800: 'rgb(179, 151, 0)',
      900: 'rgb(153, 129, 0)',
    },
    secondary: {
      DEFAULT: 'rgb(25, 33, 52)',
      light: 'rgb(40, 51, 69)',
      dark: 'rgb(18, 25, 40)',
      100: 'rgb(235, 238, 245)',
      200: 'rgb(197, 205, 224)',
      300: 'rgb(159, 172, 203)',
      400: 'rgb(121, 139, 182)',
      500: 'rgb(83, 106, 161)',
      600: 'rgb(61, 81, 131)',
      700: 'rgb(46, 61, 98)',
      800: 'rgb(31, 41, 65)',
      900: 'rgb(25, 33, 52)',
    },
    background: {
      DEFAULT: 'rgb(10, 25, 41)',
      light: 'rgb(25, 33, 52)',
      dark: 'rgb(5, 15, 30)',
      100: 'rgb(242, 244, 247)',
      200: 'rgb(203, 213, 225)',
      300: 'rgb(156, 175, 195)',
      400: 'rgb(109, 136, 165)',
      500: 'rgb(71, 97, 127)',
      600: 'rgb(45, 66, 91)',
      700: 'rgb(27, 42, 61)',
      800: 'rgb(15, 27, 44)',
      900: 'rgb(10, 25, 41)',
    },
    foreground: {
      DEFAULT: 'rgb(255, 255, 255)',
      muted: 'rgba(255, 255, 255, 0.7)',
      accent: 'rgb(74, 222, 128)',
    },
    border: {
      DEFAULT: 'rgb(255, 215, 0)',
      light: 'rgba(255, 215, 0, 0.5)',
    },
    accent: {
      DEFAULT: 'rgb(255, 215, 0)',
      muted: 'rgba(255, 215, 0, 0.5)',
    },
    status: {
      success: 'rgb(34, 197, 94)',
      warning: 'rgb(234, 179, 8)',
      error: 'rgb(239, 68, 68)',
      info: 'rgb(59, 130, 246)',
    },
    code: {
      background: 'rgb(10, 25, 41)',
      text: 'rgb(255, 255, 255)',
      keyword: 'rgb(234, 179, 8)',
      string: 'rgb(34, 197, 94)',
      number: 'rgb(59, 130, 246)',
      comment: 'rgb(148, 163, 184)',
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Roboto, sans-serif',
    mono: 'Fira Code, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glow: '0 0 15px rgba(255, 215, 0, 0.5)',
  },
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  transitions: {
    DEFAULT: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  gradients: {
    primary: 'linear-gradient(135deg, rgb(255, 215, 0) 0%, rgb(255, 165, 0) 100%)',
    secondary: 'linear-gradient(135deg, rgb(25, 33, 52) 0%, rgb(40, 51, 69) 100%)',
    accent: 'linear-gradient(135deg, rgb(74, 222, 128) 0%, rgb(59, 130, 246) 100%)',
    background: 'linear-gradient(135deg, rgb(10, 25, 41) 0%, rgb(25, 33, 52) 100%)',
  },
  blur: {
    none: '0',
    sm: '4px',
    DEFAULT: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },
};

export default theme;

