import type { Config } from "tailwindcss";

// Brand tokens & design system. See docs/06-DESIGN-SYSTEM.md and
// docs/11-DESIGN-AUDIT-AND-REDESIGN.md (§8 — the system).
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#0E3B2E", // primary brand surface (dark sections, footer)
          green700: "#155943", // raised surfaces on green
          orange: "#E8743B", // ACTION — primary buttons & links only
          amber: "#F2A03D", // highlight — sparing accents, not a 2nd button
          cream: "#F5EFE2", // page base
          charcoal: "#1A1A1A", // ink
        },
        success: "#2E7D32",
        warning: "#F2A03D",
        error: "#C0392B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      // Fixed type scale — use these everywhere instead of ad-hoc text-* sizes.
      fontSize: {
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.14em" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        h3: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h2: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h1: ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        display: ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      // Named section rhythm (varied on purpose) + container gutter.
      spacing: {
        "section-sm": "3rem",
        section: "5rem",
        "section-lg": "7rem",
      },
      maxWidth: {
        content: "72rem", // single content max width (~1152px)
        prose: "42rem", // comfortable measure for body copy
      },
      borderRadius: {
        card: "1.25rem", // media & cards
        // controls keep the default `xl` (0.75rem)
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 12px 28px -16px rgba(14,59,46,0.22)",
        overlay: "0 24px 60px -20px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
