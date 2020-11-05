const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    layers: ['components', 'utilities'],
    content: ['./+(components|elements|pages)/**/*.+(js|jsx|ts|tsx)'],
  },
  theme: {
    extend: {
      colors: {
        base: colors.gray,
      },
      screens: {
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
    },
    container: {
      center: true,
    },
  },
};
