// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {

    extend: {
      fontFamily: {

        sans: [
          "var(--font-dm-sans)",
          "sans-serif",
        ],
      },
      // keyframes: {
      //   fadeUp: {
      //     '0%': {
      //       opacity: '0',
      //       transform: 'translateY(20px)',
      //     },
      //     '100%': {
      //       opacity: '1',
      //       transform: 'translateY(0)',
      //     },
      //   },

      //   fadeRight: {
      //     '0%': {
      //       opacity: '0',
      //       transform: 'translateX(20px)',
      //     },
      //     '100%': {
      //       opacity: '1',
      //       transform: 'translateX(0)',
      //     },
      //   },
      // },
      // animation: {
      //   'fade-up': 'fadeUp 0.6s ease-out forwards',
      //   'fade-right': 'fadeRight 0.6s ease-out forwards',
      // },
    },
  },

  plugins: [],
};

export default config;