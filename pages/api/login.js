import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withAuthHandler } from '@/middlewares/withAuthHandler';
import { withMockHandler } from '@/middlewares/withMockHandler';
import { withPreAuthCheck } from '@/middlewares/withPreAuthCheck';
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
 * Signs and generates a user token
 */
function generateUserToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}
