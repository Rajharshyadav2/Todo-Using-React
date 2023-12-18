/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        textColor: '#4C934C',
        rootBg: '  hsl(240, 18%, 92%)',
        formBg: 'hsl(140, 23%, 45%)',
        todoBg: 'hsl(0, 0.2%, 97.05%)',
        todoBorder: 'hsl(36, 53%, 73%)',
        btnBg: 'hsl(65, 43%, 85%);',
        modalBg: ' hsl(0, 24%, 84%)',
      },
      fontFamily: {
        primaryFont: "Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        todoDesc: 'serif monospace',
      },
      boxShadow: {
        bottom: 'box-shadow: 0 100px 0px',
      },
    },
  },
  plugins: [],
};
