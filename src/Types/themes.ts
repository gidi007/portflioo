export interface HoverColorSet {
  light: string;
  dark: string;
}

export interface ColorSet {
  DEFAULT: string;
  light: string;
  dark: string;
  lighter?: string;
  darker?: string;
  foreground?: string;
  hover?: HoverColorSet; // Define hover property explicitly
  muted?: string;
}

export interface ThemeConfig {
  colors: {
    primary: ColorSet;
    secondary: ColorSet;
    background: ColorSet & {
      accent: ColorSet;
    };
    foreground: ColorSet & {
      header: string;
      subheader: string;
      accent: string;
      highlight: string;
    };
    border: ColorSet & {
      transparent: string;
    };
    accent: ColorSet;
    status: {
      success: ColorSet & { foreground: string };
      warning: ColorSet & { foreground: string };
      error: ColorSet & { foreground: string };
      info: ColorSet & { foreground: string };
    };
    code: {
      background: string;
      text: string;
      comment: string;
      keyword: string;
      string: string;
      number: string;
      function: string;
    };
  };
  shadows: {
    sm: string;
    DEFAULT: string;
    md: string;
    lg: string;
    xl: string;
    glow: {
      DEFAULT: string;
      sm: string;
      lg: string;
      accent: string;
      text: string;
    };
    highlight: string;
    inner: string;
    text: {
      sm: string;
      DEFAULT: string;
      lg: string;
    };
  };
  transitions: {
    DEFAULT: string;
    fast: string;
    slow: string;
    bounce: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };
  spacing: Record<number | string, string>;
  blur: Record<string, string>;
  opacity: Record<number | string, string>;
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSizes: Record<string, string>;
  fontWeights: {
    normal: string;
    bold: string;
  };
  lineHeights: {
    normal: string;
    tight: string;
  };
  letterSpacings: {       
    normal: string;
    wide: string;
  };
  borderRadius: {
    sm: string;
    DEFAULT: string;
    lg: string;
  };
  zIndex: Record<number | string, string>;
  gradients: {
    primary: string;
    accent: string;
    highlight: string;
  };
}
