import { serialize } from 'cookie';

export function setCookie(res, name, value, options = {}) {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
}
