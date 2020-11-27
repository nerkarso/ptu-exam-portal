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
        base: colors.trueGray,
      },
    },
    container: {
      center: true,
    },
  },
};
