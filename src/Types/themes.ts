//types/themes.ts
export interface ThemeConfig {
    colors: {
      primary: ColorSet & {
        hover: {
          light: string;
          dark: string;
        };
        muted: string;
      };
      secondary: ColorSet;
      background: ColorSet & {
        accent: ColorSet;
      };
      foreground: ColorSet & {
        header: string;
        subheader: string;
        muted: string;
        accent: string;
        highlight: string;
      };
      border: ColorSet & {
        transparent: string;
      };
      accent: ColorSet & {
        hover: string;
        muted: string;
      };
      status: {
        success: StatusColorSet;
        warning: StatusColorSet;
        error: StatusColorSet;
        info: StatusColorSet;
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
      '2xl': string;
    };
    spacing: Record<number | string, string>;
    blur: {
      none: string;
      sm: string;
      DEFAULT: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    opacity: Record<number | string, string>;
    fonts: {
      heading: string;
      body: string;
      mono: string;
    };
    fontSizes: Record<string, string>;
    fontWeights: Record<string, string>;
    lineHeights: Record<string, string>;
    letterSpacings: Record<string, string>;
    borderRadius: Record<string, string>;
    zIndex: Record<number | string, string>;
    gradients: {
      primary: string;
      accent: string;
      highlight: string;
    };
  }
  
  interface ColorSet {
    DEFAULT: string;
    light: string;
    lighter?: string;
    dark: string;
    darker?: string;
    foreground?: string;
  }
  
  interface StatusColorSet extends ColorSet {
    foreground: string;
  }
  
  