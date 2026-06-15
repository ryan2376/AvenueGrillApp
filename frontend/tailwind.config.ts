import type { Config } from "tailwindcss";

// Brand tokens mirror docs/06-DESIGN-SYSTEM.md.
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#0E3B2E",
          green700: "#155943",
          orange: "#E8743B",
          amber: "#F2A03D",
          cream: "#F5EFE2",
          charcoal: "#1A1A1A",
        },
        success: "#2E7D32",
        warning: "#F2A03D",
        error: "#C0392B",
      },
    },
  },
  plugins: [],
};

export default config;
