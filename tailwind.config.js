/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          background: '#0f111a',
          sidebar: '#161922',
          navbar: '#1c1f2b',
          card: 'rgba(30, 35, 45, 0.4)',
          accent: '#f6921e',
          active: '#ff9d2e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px rgba(246, 146, 30, 0.3)',
        'inner-glow': 'inset 0 0 10px rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
