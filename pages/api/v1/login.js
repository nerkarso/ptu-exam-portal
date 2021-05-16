import { withUserAuth } from '@/middlewares/v1/withUserAuth';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withPreAuthCheck } from '@/middlewares/withPreAuthCheck';
import { createCookie } from '@/utils/index';
import jwt from 'jsonwebtoken';

function handler(req, res) {
  const userToken = jwt.sign(
    {
      username: res.user.username,
      password: res.user.password,
    },
    process.env.JWT_SECRET,
  );
  res.setHeader('Set-Cookie', [createCookie('userToken', userToken), createCookie('refreshToken', res.refreshToken)]);
  res.json({
    auth: true,
  });
}

export default withAllowedMethods(withPreAuthCheck(withUserAuth(handler)), ['POST']);
