/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#229e48',
        secondary: '#0f2f48',
        accent: '#FACC15',
        background: '	#FFFFFF',
        grayText: '#6B7280',
      },
    },
  },
  plugins: [],
}

