const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  purge: {
    layers: ['components', 'utilities'],
    content: ['./+(components|elements|pages)/**/*.+(js|jsx|ts|tsx)'],
  },
  theme: {
    extend: {
      colors: {
        base: colors.blueGray,
        invert: colors.gray,
        primary: colors.indigo,
        secondary: colors.cyan,
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {};
      [100, 200, 300, 400, 500, 600, 700, 800, 900].forEach((i) => {
        newUtilities[`.animation-delay-${i}`] = {
          'animation-delay': `${i}ms`,
        };
      });
      addUtilities(newUtilities);
    }),
  ],
};
