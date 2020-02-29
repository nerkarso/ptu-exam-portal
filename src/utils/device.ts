/**
 * Get the device's operating system
 *
 * @returns string
 */
export function getOS() {
  const dict = [
    ['Android', 'Android'],
    ['iPhone', 'iOS'],
    ['iPad', 'iPadOS'],
    ['Linux', 'Linux'],
    ['Mac OS', 'MacOS'],
    ['Windows', 'Windows']
  ];

  for (const keyword of dict) {
    if (navigator.userAgent.match(keyword[0])) {
      return keyword[1];
    }
  }

  return 'Unknown';
}

/**
 * Check if device is iOS
 *
 * @returns boolean
 */
export const isIos = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

/**
 * Returns a boolean indicating whether the browser is running in standalone
 * mode. Available on Apple's iOS Safari only.
 */
export const isInStandaloneMode = () => {
  const nav: any = navigator;

  if ('standalone' in nav && nav.standalone) {
    return true;
  } else {
    return false;
  }
};
