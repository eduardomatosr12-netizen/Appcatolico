export const typography = {
  fontFamily: {
    serif: "'Cinzel', 'Cormorant Garamond', Georgia, serif",
    sans: "'Inter', 'Segoe UI', -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSize: {
    xs: '0.6875rem',
    sm: '0.8125rem',
    base: '0.9375rem',
    lg: '1.0625rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.75,
  },
} as const;
