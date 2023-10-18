import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        board: "350px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      //   themes: {
      //     light: {
      //       colors: {
      //         background: "#0E793C", // or DEFAULT
      //         foreground: "#0E793C ", // or 50 to 900 DEFAULT
      //         secondary: {
      //           //... 50 to 900
      //           foreground: "#fff",
      //           DEFAULT: "#000",
      //         },
      //         danger: {
      //           foreground: "#fff",
      //           DEFAULT: "red",
      //         },
      //         focus: "#000",
      //         // ... rest of the colors
      //       },
      //     },
      //     dark: {
      //       colors: {
      //         background: "#000000", // or DEFAULT
      //         foreground: "#f31260", // or 50 to 900 DEFAULT
      //         primary: {
      //           //... 50 to 900
      //           foreground: "#FFFFFF",
      //           DEFAULT: "#006FEE",
      //         },
      //       },
      //       // ... rest of the colors
      //     },
      //   },
    }),
  ],
};

export default config;
