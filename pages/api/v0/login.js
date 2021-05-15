import { withAuthHandler } from '@/middlewares/v0/withAuthHandler';
import { withMockHandler } from '@/middlewares/v0/withMockHandler';
import { withPreAuthCheck } from '@/middlewares/v0/withPreAuthCheck';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { createCookie } from '@/utils/index';
import jwt from 'jsonwebtoken';

function handler(req, res) {
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

export default withAllowedMethods(withPreAuthCheck(withMockHandler(withAuthHandler(handler))), ['POST']);

/**
 * Signs and generates a user token
 */
function generateUserToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}
