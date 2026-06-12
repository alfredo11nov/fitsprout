import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        duo: {
          green: "#58CC02",
          greenDark: "#58A700",
          blue: "#1CB0F6",
          yellow: "#FFC800",
          red: "#FF4B4B",
          purple: "#CE82FF",
          ink: "#3C3C3C",
          cream: "#FFF9EC",
        },
      },
      fontFamily: { display: ["system-ui", "ui-rounded", "Nunito", "sans-serif"] },
      boxShadow: {
        chunk: "0 4px 0 0 rgba(0,0,0,0.15)",
        chunkGreen: "0 4px 0 0 #58A700",
      },
      borderRadius: { chunk: "1rem" },
    },
  },
} satisfies Config;
