import { ThemeConfig } from "../Types/themes";

const theme: ThemeConfig = {
  colors: {
    primary: {
      DEFAULT: "rgb(255, 215, 0)", // Gold
      light: "rgb(255, 235, 60)", // Bright Gold
      dark: "rgb(204, 172, 0)", // Deep Gold
      hover: {
        light: "rgb(255, 225, 85)", // Lighter Hover Gold
        dark: "rgb(215, 155, 0)", // Darker Hover Gold
      },
      muted: "rgba(255, 215, 0, 0.7)", // Muted Gold
    },
    secondary: {
      DEFAULT: "rgb(25, 33, 52)", // Navy Blue
      light: "rgb(40, 51, 69)", // Muted Navy
      dark: "rgb(18, 25, 40)", // Midnight Blue
      foreground: "rgb(248, 250, 252)", // Off-white
    },
    background: {
      DEFAULT: "rgb(10, 25, 41)", // Deep Navy
      light: "rgb(25, 33, 52)", // Lighter Navy
      accent: {
        DEFAULT: "rgb(30, 41, 59)", // Highlighted Background
        light: "rgb(50, 61, 79)", // Muted Highlight
        dark: "rgb(20, 30, 49)", // Deep Highlight
      },
    },
    foreground: {
      DEFAULT: "rgb(255, 255, 255)", // White
      header: "rgb(255, 215, 0)", // Gold Header
      subheader: "rgb(255, 235, 60)", // Light Gold
      muted: "rgba(255, 255, 255, 0.7)", // Muted White
      accent: "rgb(30, 41, 59)", // Navy Accent
      highlight: "rgb(74, 222, 128)", // Green Highlight
    },
    border: {
      DEFAULT: "rgb(255, 215, 0)", // Gold Border
      light: "rgba(255, 215, 0, 0.5)", // Muted Gold
      dark: "rgb(204, 172, 0)", // Deep Gold
      transparent: "rgba(0, 0, 0, 0)", // Transparent
    },
    accent: {
      DEFAULT: "rgb(255, 215, 0)", // Gold
      light: "rgb(255, 235, 60)", // Bright Accent
      hover: "rgb(230, 162, 0)", // Darker Gold Hover
      muted: "rgba(255, 215, 0, 0.5)", // Muted Accent
    },
    status: {
      success: {
        DEFAULT: "rgb(34, 197, 94)", // Success Green
        light: "rgb(74, 222, 128)", // Bright Green
        dark: "rgb(22, 145, 81)", // Dark Green
        foreground: "rgb(255, 255, 255)", // White
      },
      warning: {
        DEFAULT: "rgb(234, 179, 8)", // Warning Yellow
        light: "rgb(250, 202, 21)", // Bright Yellow
        dark: "rgb(202, 145, 7)", // Deep Yellow
        foreground: "rgb(0, 0, 0)", // Black
      },
      error: {
        DEFAULT: "rgb(239, 68, 68)", // Error Red
        light: "rgb(248, 113, 113)", // Bright Red
        dark: "rgb(185, 28, 28)", // Deep Red
        foreground: "rgb(255, 255, 255)", // White
      },
      info: {
        DEFAULT: "rgb(59, 130, 246)", // Info Blue
        light: "rgb(96, 165, 250)", // Bright Blue
        dark: "rgb(37, 99, 235)", // Deep Blue
        foreground: "rgb(255, 255, 255)", // White
      },
    },
    code: {
      background: "rgb(10, 25, 41)", // Code Background
      text: "rgb(255, 255, 255)", // Code Text
      comment: "rgb(99, 102, 241)", // Purple Comments
      keyword: "rgb(234, 179, 8)", // Yellow Keywords
      string: "rgb(34, 197, 94)", // Green Strings
      number: "rgb(59, 130, 246)", // Blue Numbers
      function: "rgb(255, 215, 0)", // Gold Functions
    },
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.1)", // Small Shadow
    DEFAULT: "0 2px 4px rgba(0, 0, 0, 0.1)", // Standard Shadow
    md: "0 4px 6px rgba(0, 0, 0, 0.15)", // Medium Shadow
    lg: "0 8px 12px rgba(0, 0, 0, 0.2)", // Large Shadow
    xl: "0 12px 16px rgba(0, 0, 0, 0.25)", // Extra Large Shadow
    glow: {
      DEFAULT: "0 0 15px rgba(255, 215, 0, 0.5)", // Gold Glow
      sm: "0 0 5px rgba(255, 215, 0, 0.3)", // Subtle Glow
      lg: "0 0 20px rgba(255, 215, 0, 0.7)", // Bright Glow
      accent: "0 0 15px rgba(34, 197, 94, 0.6)", // Green Accent Glow
      text: "0 0 10px rgba(255, 255, 255, 0.8)", // Text Glow
    },
    highlight: "0 0 15px rgba(74, 222, 128, 0.5)", // Green Highlight
    inner: "inset 0 2px 4px rgba(0, 0, 0, 0.2)", // Inner Shadow
    text: {
      sm: "0 1px 1px rgba(0, 0, 0, 0.1)", // Small Text Shadow
      DEFAULT: "0 2px 2px rgba(0, 0, 0, 0.2)", // Text Shadow
      lg: "0 4px 4px rgba(0, 0, 0, 0.3)", // Large Text Shadow
    },
  },
  transitions: {
    DEFAULT: "0.3s ease-in-out",
    fast: "0.15s ease-in-out",
    slow: "0.5s ease-in-out",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
    16: "4rem",
    32: "8rem",
  },
  blur: {
    none: "0",
    sm: "4px",
    DEFAULT: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
    "3xl": "64px",
  },
  opacity: {
    0: "0",
    50: "0.5",
    100: "1",
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Roboto", sans-serif',
    mono: '"Courier New", monospace',
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
  lineHeights: {
    normal: "1.5",
    tight: "1.25",
  },
  letterSpacings: {
    normal: "0",
    wide: "0.025em",
  },
  borderRadius: {
    sm: "4px",
    DEFAULT: "8px",
    lg: "16px",
  },
  zIndex: {
    0: "0",
    50: "50",
    100: "100",
  },
  gradients: {
    primary: "linear-gradient(90deg, rgba(255,215,0,1) 0%, rgba(234,179,8,1) 100%)",
    accent: "linear-gradient(90deg, rgba(34,197,94,1) 0%, rgba(59,130,246,1) 100%)",
    highlight: "linear-gradient(90deg, rgba(74,222,128,1) 0%, rgba(234,179,8,1) 100%)",
  },
};

export default theme;
