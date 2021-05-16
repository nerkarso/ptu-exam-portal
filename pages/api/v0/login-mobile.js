import { withAuthMobileHandler } from '@/middlewares/v0/withAuthMobileHandler';
import { withMockHandler } from '@/middlewares/v0/withMockHandler';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withPreAuthCheck } from '@/middlewares/withPreAuthCheck';

function handler(req, res) {
  res.json({
    auth: true,
  });
}

export default withAllowedMethods(withPreAuthCheck(withMockHandler(withAuthMobileHandler(handler))), ['POST']);
