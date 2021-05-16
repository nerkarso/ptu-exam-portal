import jwt from 'jsonwebtoken';

/**
 * This middleware verifies the user token
 */
export const withVerifyUserToken = (handler) => (req, res) => {
  // Check if the payload exists, then go to the next middleware
  if (res.payload) return handler(req, res);
  try {
    // Verify the user token
    const userToken = jwt.verify(res.userToken, process.env.JWT_SECRET);
    // Pass the user credentials
    res.user = {
      username: userToken.username,
      password: userToken.password,
    };
  } catch (ex) {
    return res.status(401).json({
      error: true,
      message: 'Could not verify user token',
      details: ex.message,
    });
  }
  return handler(req, res);
};
