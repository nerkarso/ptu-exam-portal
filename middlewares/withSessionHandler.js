import { parse } from 'cookie';

/**
 * This will handle the session
 */
export const withSessionHandler = (handler, sessionKey) => (req, res) => {
  // Cookie does not exist
  if (!req.headers.cookie) {
    return res.status(400).json({
      error: true,
      message: 'No cookie in headers',
    });
  }
  // Passes the session key
  res.sessionKey = sessionKey;
  // Gets and parses the cookies from the request header
  const cookies = parse(req.headers.cookie);
  if (cookies[sessionKey]) {
    // Passes the session to the response
    res[sessionKey] = cookies[sessionKey];
  } else {
    // Session does not exist
    return res.status(401).json({
      error: true,
      message: `No ${sessionKey} in cookie`,
    });
  }
  return handler(req, res);
};
