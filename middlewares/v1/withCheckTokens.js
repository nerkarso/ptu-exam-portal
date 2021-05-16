import { parse } from 'cookie';

/**
 * This middleware checks the tokens
 */
export const withCheckTokens = (handler) => (req, res) => {
  // Cookie does not exist
  if (!req.headers.cookie) {
    return res.status(400).json({
      error: true,
      message: 'No cookie found in headers',
    });
  }
  // Get and parse the cookie in the request header
  const cookies = parse(req.headers.cookie);
  // Check for missing tokens
  const errors = [];
  if (!cookies.userToken) {
    errors.push('Missing userToken in cookie');
  }
  if (!cookies.refreshToken) {
    errors.push('Missing refreshToken in cookie');
  }
  if (errors.length > 0) {
    return res.status(401).json({
      error: true,
      message: errors,
    });
  }
  // Pass the tokens
  res.userToken = cookies['userToken'];
  res.refreshToken = cookies['refreshToken'];
  return handler(req, res);
};
