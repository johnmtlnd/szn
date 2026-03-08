export type ColorToken = { light: string; dark: string };

// ─── Primitives ──────────────────────────────────────────────────────────────

export const color = {
  forest: {
    100: { light: '#E9F1EA', dark: '#141F15' } as ColorToken,
    200: { light: '#C5DCCA', dark: '#1C2E1F' } as ColorToken,
    300: { light: '#7DB880', dark: '#4A7A4D' } as ColorToken,
    400: { light: '#4E9B54', dark: '#6AAD6E' } as ColorToken,
    500: { light: '#2E7A34', dark: '#8AC28D' } as ColorToken,
    600: { light: '#1E5A22', dark: '#B0D4B2' } as ColorToken,
  },
  soil: {
    100: { light: '#F2ECE0', dark: '#1C1812' } as ColorToken,
    200: { light: '#DDD0B5', dark: '#2C2318' } as ColorToken,
    300: { light: '#B8A075', dark: '#7A6445' } as ColorToken,
    400: { light: '#9A8058', dark: '#9A8058' } as ColorToken,
    500: { light: '#7A5E38', dark: '#B8A075' } as ColorToken,
    600: { light: '#5A3E1C', dark: '#DDD0B5' } as ColorToken,
  },
  cream: {
    100: { light: '#FDFCF8', dark: '#111110' } as ColorToken,
    200: { light: '#F5F1E8', dark: '#191816' } as ColorToken,
    300: { light: '#EAE5D5', dark: '#232118' } as ColorToken,
    400: { light: '#D5CEBC', dark: '#32302A' } as ColorToken,
    500: { light: '#B5AE98', dark: '#4E4C42' } as ColorToken,
    600: { light: '#928B75', dark: '#6E6B5E' } as ColorToken,
  },
  gray: {
    100: { light: '#F9F9F9', dark: '#191919' } as ColorToken,
    200: { light: '#EBEBEB', dark: '#242424' } as ColorToken,
    300: { light: '#C8C8C8', dark: '#3D3D3D' } as ColorToken,
    400: { light: '#A0A0A0', dark: '#636363' } as ColorToken,
    500: { light: '#6E6E6E', dark: '#8F8F8F' } as ColorToken,
    600: { light: '#484848', dark: '#B8B8B8' } as ColorToken,
    700: { light: '#282828', dark: '#D4D4D4' } as ColorToken,
    900: { light: '#111111', dark: '#F2F2F2' } as ColorToken,
  },
  red: {
    100: { light: '#FEECEC', dark: '#250D0D' } as ColorToken,
    300: { light: '#F87171', dark: '#C05050' } as ColorToken,
    500: { light: '#DC2626', dark: '#EF6060' } as ColorToken,
  },
  amber: {
    100: { light: '#FEF3CD', dark: '#251C05' } as ColorToken,
    300: { light: '#F59E0B', dark: '#C07818' } as ColorToken,
    500: { light: '#D97706', dark: '#FBBF24' } as ColorToken,
  },
  blue: {
    100: { light: '#EFF6FF', dark: '#0D1829' } as ColorToken,
    300: { light: '#93C5FD', dark: '#3B60B0' } as ColorToken,
    500: { light: '#3B82F6', dark: '#60A5FA' } as ColorToken,
  },
  white: { light: '#FFFFFF', dark: '#FFFFFF' } as ColorToken,
  black: { light: '#000000', dark: '#000000' } as ColorToken,
} as const;

// ─── Semantic tokens ──────────────────────────────────────────────────────────

export const semantic = {
  bg: {
    primary: color.cream[100],
    secondary: color.cream[200],
    elevated: color.cream[300],
  },
  fills: {
    primary: color.cream[300],
    secondary: color.cream[200],
    tertiary: color.cream[100],
    elevated: { light: 'rgba(255,255,255,0.80)', dark: 'rgba(255,255,255,0.08)' } as ColorToken,
    liquidGlass: { light: 'rgba(255,255,255,0.60)', dark: 'rgba(255,255,255,0.05)' } as ColorToken,
  },
  text: {
    // D-011: text tokens stay on gray scale
    primary: color.gray[900],
    secondary: color.gray[600],
    tertiary: color.gray[500],
    quaternary: color.gray[400],
    inverse: color.cream[100],
    alwaysLight: { light: '#FFFFFF', dark: '#FFFFFF' } as ColorToken,
    alwaysDark: { light: '#000000', dark: '#000000' } as ColorToken,
  },
  border: {
    // D-012: dark mode uses cream-derived warm tone, not gray
    primary: { light: color.gray[300].light, dark: color.cream[300].dark } as ColorToken,
    bold: color.gray[500],
    disabled: color.gray[200],
  },
  brand: {
    primary: color.forest[400],
    subtle: color.forest[100],
  },
  // D-xxx: dark mode emphasis states use -300 primitives (lighter, readable on dark bg)
  error: {
    subtle: color.red[100],
    primary: color.red[500],
    dark: color.red[300],
  },
  warning: {
    subtle: color.amber[100],
    primary: color.amber[500],
    dark: color.amber[300],
  },
  // Success aliases forest scale
  success: {
    subtle: color.forest[100],
    primary: color.forest[400],
    dark: color.forest[300],
  },
  info: {
    subtle: color.blue[100],
    primary: color.blue[500],
    dark: color.blue[300],
  },
} as const;
