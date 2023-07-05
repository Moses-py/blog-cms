/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./features/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
  "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  fontFamily: {
    sans: ["var(--plus_jakarta_sans)"],
    serif: ["var(--cormorant_garamond)"],
  },

  extend: {
    screens: {
      // exs: "375px",
      xs: "375px",
    },
    colors: {
      primary: "#6246EA",
    },
  },
};
export const plugins = [require("flowbite/plugin")];
