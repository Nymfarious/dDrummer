/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0a0a0a",
          card: "rgba(24,24,27,0.4)"
        },
        border: {
          subtle: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.16)"
        },
        text: {
          primary: "#fafafa",
          secondary: "rgba(250,250,250,0.7)",
          muted: "rgba(250,250,250,0.5)"
        },
        accent: {
          green: "#22c55e",
          yellow: "#f59e0b",
          orange: "#fb923c",
          red: "#ef4444",
          blue: "#3b82f6"
        }
      },
      borderRadius: {
        card: "14px"
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.06), 0 1px 10px rgba(0,0,0,0.35)"
      }
    }
  }
};
