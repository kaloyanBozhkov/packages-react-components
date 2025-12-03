/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        neutral: {
          550: "#737373",
        },
      },
      keyframes: {
        "scale-in": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        "move-24px": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(24px)" },
        },
      },
    },
  },
};

