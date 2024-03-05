/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./ index.html", "./ src/**/ *.{ js, ts, jsx, tsx }"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    daisyui: {
      themes: [
        {
          light: {
            ...require("daisyui/src/theming/themes")[
            "[data-theme=light]"
            ],
            primary: "#0d89ec",
            secondary: "#f6d860",
            accent: "#37cdbe",
            neutral: "#3d4451",
            "base-100": "#ffffff",
          },
        },
      ],
      extend: {
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("tailwindcss-animate"), require("daisyui")],
  }
};