/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-10": "#DED3F7",
        "main-100": "#5B25D9",
        "main-200": "rgb(91,37,217)",
        "main-300": "#2E136D",
        "main-400": "#1B0947",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },

      backgroundImage: {
        program: "url('./assets/image/bg-program.png')",
      },

      borderRadius: { unimate: "32px" },
    },
  },
  plugins: [],
};
