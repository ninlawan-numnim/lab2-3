export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'sp': '0 3px 12px 0 rgba(0, 0, 0, 0.2)',
      },
      scale: {
        '101': '1.01',
      },
      fontFamily: {
        sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        fade: 'yellowFade 3s ease-in-out',
      },
    },
    keyframes: {  // ย้ายออกมาจาก extend
      yellowFade: {
        '0%': { backgroundColor: 'yellow' },
        '100%': { backgroundColor: 'transparent' },
      },
    },
  },
  plugins: [],
}