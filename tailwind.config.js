/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9CC4B2',
        secondary: '#426B69',
        danger: '#991E66',
        light: '#D5BBB1',
        dark: '#C98CA7',
      
      }
    },
  },
  plugins: [],
}

