import { withAuthMobileHandler } from '@/middlewares/v0/withAuthMobileHandler';
import { withMockHandler } from '@/middlewares/v0/withMockHandler';
import { withPreAuthCheck } from '@/middlewares/v0/withPreAuthCheck';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.json({
    auth: true,
  });
}

export default withAllowedMethods(withPreAuthCheck(withMockHandler(withAuthMobileHandler(handler))), ['POST']);
