/**
 * This middleware checks for the necessary credentials before authenticating the user
 */
export const withPreAuthCheck = (handler) => (req, res) => {
  const errors = [];
  if (!req.body) {
    errors.push('Missing body in request');
  }
  if (!req.body.username) {
    errors.push('Missing `username` in body');
  }
  if (!req.body.password) {
    errors.push('Missing `password` in body');
  }
  if (errors.length > 0) {
    res.status(400).json({
      error: true,
      message: errors,
    });
  }
  // Pass the user credentials
  res.user = {
    username: req.body.username,
    password: req.body.password,
  };
  return handler(req, res);
};
