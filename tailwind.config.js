/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
    content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
colors: {
  primary: "#2E7D32",        // Deep green (main brand color)
  secondary: "#66BB6A",      // Light green (accents and highlights)
  third: "#A5D6A7",          // Pale green (backgrounds or cards)
  darkTheme: "#1B5E20",      // Dark green (for dark mode or footers)
  red: {
    custom1: '#C62828',     
    custom2: '#EF5350',
    custom3: '#E53935',
    custom4: '#B71C1C',
  },
},
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'amiri': ['Amiri', 'serif'],
        'noto': ['Noto Sans Arabic', 'sans-serif'],
        'outfit':['Outfit','sans-serif']
      },
      screens:{
        xs:{max:"450px"},
        img:{max:"900px"}
      }
    }
  },
  plugins: [],
}

