/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#09090b", // Zinc 950 - Deep Premium Black
        accent: "#14b8a6",  // Teal 500 - Slightly Darker for better contrast
        glass: "rgba(255, 255, 255, 0.05)", // More subtle glass
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
