/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        amaranth: ["Amaranth", "sans-serif"],
      },
      animation: {
        flow: 'flow 2s linear infinite',
      },
      keyframes: {
        flow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};
