/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(214.3 31.8% 91.4%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        primary: {
          DEFAULT: "#0052cc", // Brand Blue
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a",
        },
        success: "#22c55e", //for M-Pesa Green style
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0052cc 0%, #00a3ff 100%)',
      },
      boxShadow: {
        'hero': '0 10px 25px -5px rgba(0, 82, 204, 0.4)',
        'card': '0 2px 10px rgba(0,0,0,0.05)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}