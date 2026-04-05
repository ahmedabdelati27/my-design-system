/**
 * Design Tokens — TypeScript
 * Source: Figma — منصة الصيانة (Copy)
 * Auto-generated from src/tokens/tokens.json
 * Do not edit manually.
 */

// ─── Typography ───────────────────────────────────────────────────────────────

export const fontFamily = {
  primary: '"IBM Plex Sans Arabic", sans-serif',
} as const;

export const fontSize = {
  h1:    "3.75rem",   // 60px
  h2:    "3rem",      // 48px
  h3:    "2.5rem",    // 40px
  h4:    "2rem",      // 32px
  h5:    "1.5rem",    // 24px
  h6:    "1.125rem",  // 18px
  body1: "1rem",      // 16px
  body2: "0.875rem",  // 14px
  body3: "0.75rem",   // 12px
  body4: "0.625rem",  // 10px
} as const;

export const lineHeight = {
  h1:    "4.5rem",     // 72px
  h2:    "3.5rem",     // 56px
  h3:    "3rem",       // 48px
  h4:    "2.25rem",    // 36px
  h5:    "1.75rem",    // 28px
  h6:    "1.25rem",    // 20px
  body1: "1.5rem",     // 24px
  body2: "1.3125rem",  // 21px
  body3: "1.125rem",   // 18px
  body4: "0.75rem",    // 12px
} as const;

export const fontWeight = {
  regular:  400,
  medium:   500,
  semiBold: 600,
  bold:     700,
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  0:    "0px",
  25:   "0.0625rem",  // 1px
  50:   "0.125rem",   // 2px
  100:  "0.25rem",    // 4px
  200:  "0.5rem",     // 8px
  300:  "0.75rem",    // 12px
  400:  "1rem",       // 16px
  500:  "1.25rem",    // 20px
  600:  "1.5rem",     // 24px
  700:  "1.75rem",    // 28px
  800:  "2rem",       // 32px
  900:  "2.25rem",    // 36px
  1000: "2.5rem",     // 40px
  1100: "2.75rem",    // 44px
  1200: "3rem",       // 48px
  1300: "3.25rem",    // 52px
  1400: "3.5rem",     // 56px
  1500: "3.75rem",    // 60px
  1600: "4rem",       // 64px
  1700: "4.25rem",    // 68px
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

export const borderRadius = {
  none: "0px",
  xsm:  "0.0625rem",  // 1px
  sm:   "0.125rem",   // 2px
  md:   "0.25rem",    // 4px
  lg:   "0.5rem",     // 8px
} as const;

// ─── Border Width ─────────────────────────────────────────────────────────────

export const borderWidth = {
  none: "0px",
  sm:   "1px",
  md:   "2px",
  lg:   "4px",
} as const;

// ─── Color Palette ────────────────────────────────────────────────────────────

export const palette = {
  primary: {
    50:  "#e6f2ff",
    100: "#b0d6ff",
    200: "#8ac2ff",
    300: "#54a6ff",
    400: "#3395ff",
    500: "#007aff",
    600: "#006fe8",
    700: "#0057b5",
    800: "#00438c",
    900: "#00336b",
  },
  error: {
    50:  "#ffedf0",
    100: "#ffe4e8",
    200: "#ffc8cf",
    300: "#ff4e64",
    400: "#cc3e50",
    500: "#bf3b4b",
    600: "#992f3c",
    700: "#73232d",
    800: "#591b23",
    900: "#330000",
  },
  success: {
    50:  "#e6fbf0",
    100: "#d9f8e8",
    200: "#b1f1d0",
    300: "#04d268",
    400: "#04bd5e",
    500: "#03a853",
    600: "#039e4e",
    700: "#027e3e",
    800: "#025e2f",
    900: "#014a24",
  },
  warning: {
    50:  "#fff1e6",
    100: "#ffe1cc",
    200: "#ffc499",
    300: "#ffa666",
    400: "#ff8933",
    500: "#ff6b00",
    600: "#cc5600",
    700: "#994000",
    800: "#662b00",
    900: "#331500",
  },
  info: {
    50:  "#e6e7ff",
    100: "#ccceff",
    200: "#999dff",
    300: "#666cff",
    400: "#333bff",
    500: "#000aff",
    600: "#0008cc",
    700: "#000699",
    800: "#000466",
    900: "#000233",
  },
  neutrals: {
    50:    "#fafafa",
    100:   "#e5e5e5",
    200:   "#cccccc",
    300:   "#b3b3b3",
    400:   "#999999",
    500:   "#808080",
    600:   "#666666",
    700:   "#4d4d4d",
    800:   "#333333",
    900:   "#191919",
    white: "#ffffff",
    black: "#000000",
  },
} as const;

// ─── Semantic Colors ──────────────────────────────────────────────────────────

export const colors = {
  text: {
    headings:    "#333333",
    body1:       "#666666",
    body2:       "#808080",
    body3:       "#999999",
    body4:       "#b3b3b3",
    action:      "#007aff",
    actionHover: "#006fe8",
    disabled:    "#999999",
    info:        "#000aff",
    warning:     "#ff6b00",
    success:     "#04d268",
    error:       "#ff4e64",
    onAction:    "#ffffff",
  },
  icon: {
    default:     "#666666",
    action:      "#007aff",
    actionHover: "#006fe8",
    disabled:    "#999999",
    info:        "#000aff",
    warning:     "#ff6b00",
    success:     "#04d268",
    error:       "#ff4e64",
    onAction:    "#ffffff",
  },
  surface: {
    page:           "#ffffff",
    shade1:         "#fafafa",
    shade2:         "#e5e5e5",
    shade3:         "#cccccc",
    actionLight:    "#e6f2ff",
    actionDefault:  "#007aff",
    actionHover:    "#006fe8",
    disabled:       "#e5e5e5",
    successLight:   "#e6fbf0",
    successDefault: "#03a853",
    errorLight:     "#ffedf0",
    errorDefault:   "#ff4e64",
    warningLight:   "#fff1e6",
    warningDefault: "#ff6b00",
  },
  border: {
    default:       "#e5e5e5",
    white:         "#ffffff",
    success:       "#d9f8e8",
    error:         "#ffe4e8",
    warning:       "#ffe1cc",
    info:          "#ccceff",
    actionLight:   "#e6f2ff",
    actionDefault: "#007aff",
    actionHover:   "#006fe8",
    focus:         "#007aff",
    disabled:      "#b3b3b3",
  },
} as const;

// ─── Convenience CSS-var helpers ──────────────────────────────────────────────

/** Returns a var(--spacing-{key}) string for inline styles */
export const sp = (key: keyof typeof spacing) =>
  `var(--spacing-${key})` as const;

/** Returns a var(--color-*) string for inline styles */
export const cssVar = (name: string) => `var(${name})` as const;

// ─── Aggregate default export ─────────────────────────────────────────────────

const tokens = {
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  spacing,
  borderRadius,
  borderWidth,
  palette,
  colors,
} as const;

export type Tokens = typeof tokens;
export default tokens;
