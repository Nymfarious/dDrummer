// packages/tokens/src/tokens.ts
// one source of truth for color, radii, shadows, spacing
export const tokens = {
  color: {
    // Cymbal Gold: warm, not neon
    gold: {
      50:  "#fff9eb",
      100: "#fdecc7",
      200: "#f8d98b",
      300: "#f0c354",
      400: "#e6aa2f",
      500: "#d99615",  // primary
      600: "#b67810",
      700: "#8d5a0e",
      800: "#6b450e",
      900: "#4f3410",
    },
    // Neutral slate for dark UIs
    neutral: {
      50:  "#f7f7f7",
      100: "#eeeeee",
      200: "#dcdcdc",
      300: "#bdbdbd",
      400: "#989898",
      500: "#7a7a7a",
      600: "#5f5f5f",
      700: "#454545",
      800: "#2d2d2d",
      900: "#171717",
      950: "#0b0b0b",
    },
    // Accents that pair with gold
    green:  { 500: "#22c55e" },
    yellow: { 500: "#f59e0b" },
    orange: { 500: "#f97316" },
    red:    { 500: "#ef4444" },
    blue:   { 500: "#3b82f6" },
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 24,     // cards/buttons default
    full: 9999,
  },
  shadow: {
    soft: "0 6px 24px rgba(0,0,0,.18)",
    lift: "0 10px 28px rgba(0,0,0,.22)",
    glowGold: "0 0 0 1px rgba(233, 185, 73, .35), 0 12px 40px rgba(217,150,21,.15)",
  },
  focus: {
    ring: "0 0 0 3px rgba(217,150,21,.45)",
  },
  gradient: {
    goldSheen:
      "linear-gradient(135deg, rgba(249, 223, 157,.30) 0%, rgba(217,150,21,.20) 42%, rgba(79,52,16,.25) 100%)",
  },
} as const;

export type Tokens = typeof tokens;
