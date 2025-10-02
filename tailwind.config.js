/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    colors: {
      border: "hsl(var(--border))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--secondary))",
      tertiary: "hsl(var(--tertiary))",
      accent: "hsl(var(--accent))",
    }
  } },
  plugins: [],
};
