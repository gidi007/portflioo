export const theme = {
  colors: {
    primary: {
      DEFAULT: "#FFA500", // Main amber/yellow
      50: "#FFFBF0", // Very light yellow for light mode
      100: "#FFF3D6", // Light yellow
      200: "#FFE4A3", // Lighter yellow
      300: "#FFD670", // Medium light yellow
      400: "#FFC83D", // Medium yellow
      500: "#FFA500", // Main amber
      600: "#E6940A", // Darker yellow
      700: "#CC8400", // Dark yellow for dark mode
      800: "#B37300", // Darker yellow
      900: "#996300", // Very dark yellow
    },
    secondary: {
      DEFAULT: "#FFD700", // Gold
      50: "#FFFEF7",
      100: "#FFFAEB",
      200: "#FFF5D6",
      300: "#FFEFB8",
      400: "#FFE999",
      500: "#FFD700",
      600: "#E6C200",
      700: "#CCAC00",
      800: "#B39700",
      900: "#998100",
    },
    background: {
      DEFAULT: "#FFFFFF", // Pure white for light mode
      light: "#FAFAFA", // Very light gray
      lighter: "#F8F9FA", // Slightly off-white
      dark: "#0A0A0A", // Very dark black for dark mode
      darker: "#000000", // Pure black
    },
    foreground: {
      DEFAULT: "#2D2D2D", // Dark gray for light mode text
      light: "#6B7280", // Light gray for secondary text
      lighter: "#9CA3AF", // Very light gray
      dark: "#FFFFFF", // Pure white for dark mode text
      darker: "#F9FAFB", // Slightly off-white
    },
    muted: {
      DEFAULT: "#6B7280", // Medium gray
      light: "#9CA3AF", // Light gray for light mode
      lighter: "#D1D5DB", // Very light gray
      dark: "#4B5563", // Dark gray for dark mode
      darker: "#374151", // Darker gray
    },
    border: {
      DEFAULT: "#E5E7EB", // Light border for light mode
      light: "#F3F4F6", // Very light border
      dark: "#1F2937", // Dark border for dark mode
      darker: "#111827", // Darker border
    },
    accent: {
      DEFAULT: "#F59E0B", // Accent yellow
      light: "#FEF3C7", // Light accent for light mode
      lighter: "#FFFBEB", // Very light accent
      dark: "#D97706", // Dark accent for dark mode
      darker: "#92400E", // Darker accent
    },
  },
  gradients: {
    primary: "linear-gradient(135deg, #FFA500 0%, #FFD700 100%)",
    accent: "linear-gradient(135deg, #F59E0B 0%, #FFA500 100%)",
    background: {
      light: "linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)",
      dark: "linear-gradient(135deg, #0A0A0A 0%, #000000 100%)",
    },
  },
  fonts: {
    sans: ["Poppins", "sans-serif"],
    serif: ["Merriweather", "serif"],
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
    "7xl": "5rem",
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  spacing: {
    px: "1px",
    0: "0",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    glow: "0 0 20px rgba(255, 165, 0, 0.3)",
  },
}
