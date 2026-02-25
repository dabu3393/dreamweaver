// /constants/theme.ts
// DreamWeaver Design Tokens
// Drop this file into your Expo project at /constants/theme.ts

export const colors = {
  // ── Background Scale ──────────────────────────────────
  midnight: '#0D0B14',   // Root background
  dusk:     '#141020',   // Card surfaces
  twilight: '#1C1830',   // Elevated surfaces, inputs
  moonmist: '#2A2545',   // Borders, dividers

  // ── Text Scale ────────────────────────────────────────
  stardust: '#4A4470',   // Disabled / muted text
  nebula:   '#7B72A8',   // Secondary text
  silver:   '#C4BFD8',   // Body text
  pearl:    '#EDE9F6',   // Primary text

  // ── Brand Accents ─────────────────────────────────────
  gold:       '#F5C842', // Primary CTA, star moments
  goldSoft:   'rgba(245,200,66,0.12)',
  goldDim:    'rgba(245,200,66,0.25)',

  aurora:     '#9B7FFF', // Purple accent, focus rings
  auroraSoft: 'rgba(155,127,255,0.1)',

  rose:  '#FF8FAB',      // Warm accent
  mint:  '#6FDAB8',      // Success, positive states
  coral: '#FF6B6B',      // Errors, warnings

  // ── Semantic ──────────────────────────────────────────
  success: '#6FDAB8',
  error:   '#FF6B6B',
  warning: '#F5C842',
} as const;

export const fonts = {
  display: 'Lora',       // Headings, story titles (serif)
  body:    'Figtree',    // UI text, labels, body
  mono:    'GeistMono',  // Code, technical labels
} as const;

export const fontSizes = {
  xs:   10.9,   // 0.68rem
  sm:   12.8,   // 0.8rem
  base: 14.4,   // 0.9rem
  md:   16,     // 1rem
  lg:   18,     // 1.125rem
  xl:   22,     // 1.375rem
  '2xl': 28,    // 1.75rem
  '3xl': 36,    // 2.25rem
  '4xl': 48,    // 3rem
} as const;

export const fontWeights = {
  light:    '300',
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
} as const;

export const spacing = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radii = {
  sm:   6,
  md:   10,
  lg:   16,
  xl:   24,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 12,
  },
  gold: {
    shadowColor: '#F5C842',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;
