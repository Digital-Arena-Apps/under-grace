/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        ivory: '#F9F6EF',
        ink: '#1F2524',
        cedar: '#4E5E56',
        sage: '#84977E',
        shell: '#EFE7DA',
        pearl: '#FCFAF6',
        ember: '#B9835C',
        dusk: '#252C2D',
      },
      boxShadow: {
        calm: '0 24px 70px -42px rgba(56, 62, 58, 0.55)',
        innerCalm: 'inset 0 1px 0 rgba(255,255,255,0.42)',
      },
    },
  },
  plugins: [],
}
