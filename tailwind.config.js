/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        purple0: "#F2E7FE",
        purple1: "#DBB2FF",
        purple2: "#BB86FC",
        purple3: "#985EFF",
        purple4: "#7F39FB",
        purple5: "#6200EE",
        purple6: "#5600E8",
        purple7: "#3700B3",
        purple8: "#30009C",
        purple9: "#23036A", 
      }
    },
  },
  plugins: [],
}

