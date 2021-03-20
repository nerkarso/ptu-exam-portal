import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withAuthMobileHandler } from '@/middlewares/withAuthMobileHandler';
import { withMockHandler } from '@/middlewares/withMockHandler';
import { withPreAuthCheck } from '@/middlewares/withPreAuthCheck';

async function LoginMobile(req, res) {
  res.json({
    auth: true,
  });
}

export default withAllowedMethods(withPreAuthCheck(withMockHandler(withAuthMobileHandler(LoginMobile))), ['POST']);
