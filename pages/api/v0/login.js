import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withAuthHandler } from '@/middlewares/withAuthHandler';
import { withMockHandler } from '@/middlewares/withMockHandler';
import { withPreAuthCheck } from '@/middlewares/withPreAuthCheck';
import { createCookie } from '@/utils/index';
import jwt from 'jsonwebtoken';

async function Login(req, res) {
  const userToken = generateUserToken({
    username: res.user.username,
    password: res.user.password,
  });
  res.setHeader('Set-Cookie', [createCookie('userToken', userToken), createCookie('session', res.session)]);
  res.json({
    auth: true,
    userToken: userToken,
  });
}

export default withAllowedMethods(withPreAuthCheck(withMockHandler(withAuthHandler(Login))), ['POST']);

/**
 * Signs and generates a user token
 */
function generateUserToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}
