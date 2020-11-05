module.exports = {
  purge: {
    layers: ['components', 'utilities'],
    content: ['./+(components|elements|pages)/**/*.+(js|jsx|ts|tsx)'],
  },
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
};
