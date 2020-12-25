import jwt from 'jsonwebtoken';

/**
 * This handles the token verification
 */
export const withTokenHandler = (handler) => async (req, res) => {
  // Markup does not exist, we need the token for the AuthHandler middleware
  if (!res.html) {
    // Bearer token does not exist
    if (!req.headers.authorization) {
      return res.status(400).json({
        error: true,
        message: 'No bearer token in authorization header',
      });
    }
    // Gets the bearer token from request authorization header
    const token = req.headers.authorization.slice(7).trim();
    // Verifies the token
    try {
      // Passes the token to the response
      res.token = jwt.verify(token, process.env.JWT_SECRET);
    } catch (ex) {
      return res.status(401).json({
        error: true,
        message: 'Could not verify token',
        details: ex.message,
      });
    }
  }
  return handler(req, res);
};
