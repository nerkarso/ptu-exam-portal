const fs = require('fs');
const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild
    .injectManifest({
      swSrc: 'src/sw/template.js',
      swDest: 'build/sw.js',
      globDirectory: 'build',
      globPatterns: [
        '**/!(service-worker|precache-manifest.*).{css,html,js,png}'
      ]
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details
      warnings.forEach(console.warn);
      console.log(
        `\n${count} files will be precached, totaling ${size} bytes.\n`
      );
    });
};

// Clean CRA service worker
const cleanSW = () => {
  const path = './build/';
  const regex = /(service-worker|precache-manifest.*)/g;

  console.log('\n');

  fs.readdirSync(path)
    .filter(file => regex.test(file))
    .map(file => {
      console.log(`Removing ${file}`);
      return fs.unlinkSync(path + file);
    });
};

buildSW();
cleanSW();
