import { serialize } from 'cookie';

/**
 * Creates a cookie
 */
export function createCookie(name, value, options = {}) {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  options.path = '/';
  options.maxAge = 60 * 60 * 24 * 30; // 30 days
  return serialize(name, stringValue, options);
}

/**
 * Removes extra whitespaces in text
 */
export function normalizeText(str) {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Capitalizes the first letter of a word
 */
export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
