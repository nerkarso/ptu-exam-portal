import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withAuthHandler } from '@/middlewares/withAuthHandler';
import { withMockHandler } from '@/middlewares/withMockHandler';
import jwt from 'jsonwebtoken';

async function Login(req, res) {
  res.json({
    auth: true,
    userToken: generateUserToken({
      username: res.user.username,
      password: res.user.password,
    }),
  });
}

export default withAllowedMethods(withPreAuthCheck(withMockHandler(withAuthHandler(Login))), ['POST']);

/**
 * Checks for the necessary details before authenticating the user
 */
function withPreAuthCheck(handler) {
  return (req, res) => {
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
      return res.status(400).json({
        error: true,
        message: errors,
      });
    }
    // Passes the user credentials
    res.user = {
      username: req.body.username,
      password: req.body.password,
    };
    return handler(req, res);
  };
}

/**
 * Signs and generates a user token
 */
function generateUserToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}
