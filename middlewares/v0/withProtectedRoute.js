import { withAuthHandler } from '@/middlewares/v0/withAuthHandler';
import { withAuthMobileHandler } from '@/middlewares/v0/withAuthMobileHandler';
import { withDataSourceHandler } from '@/middlewares/v0/withDataSourceHandler';
import { withMockHandler } from '@/middlewares/v0/withMockHandler';
import { withSessionHandler } from '@/middlewares/v0/withSessionHandler';
import { withTokenHandler } from '@/middlewares/v0/withTokenHandler';

/**
 * This is a combination of middlewares for protected routes
 */
export const withProtectedRoute = (handler, endpoint) => {
  return withMockHandler(
    withSessionHandler(
      withDataSourceHandler(
        withTokenHandler(withAuthHandler(withDataSourceHandler(handler))),
        process.env.SOURCE_BASE_URL + endpoint,
      ),
      'session',
    ),
  );
};

/**
 * This is a combination of middlewares for protected routes for the mobile source provider
 */
export const withProtectedRouteMobile = (handler, endpoint) => {
  return withMockHandler(
    withSessionHandler(
      withDataSourceHandler(
        withTokenHandler(withAuthMobileHandler(withDataSourceHandler(handler))),
        process.env.SOURCE_MOBILE_BASE_URL + endpoint,
      ),
      'sessionMobile',
    ),
  );
};
