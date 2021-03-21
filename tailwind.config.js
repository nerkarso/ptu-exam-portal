const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
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
};
