import { parse } from 'cookie';

/**
 * This will handle the session
 */
export const withSessionHandler = (handler) => (req, res) => {
  // Cookie does not exist
  if (!req.headers.cookie) {
    return res.status(400).json({
      error: true,
      message: 'No cookie in headers',
    });
  }
  // Gets and parses the cookies from the request header
  const cookies = parse(req.headers.cookie);
  // Session does not exist
  if (!cookies.session) {
    return res.status(401).json({
      error: true,
      message: 'No session in cookie',
    });
  }
  // Passes the session to the response
  res.session = cookies.session;
  return handler(req, res);
};
