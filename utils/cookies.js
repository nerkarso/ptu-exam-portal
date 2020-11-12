import { serialize } from 'cookie';

export function setCookie(res, name, value, options = {}) {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  options.path = '/';
  options.maxAge = 60 * 60 * 24 * 30; // 30 days
  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
}
