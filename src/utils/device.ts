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
