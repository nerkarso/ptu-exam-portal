import { withAuthHandler } from '@/middlewares/withAuthHandler';
import { withAuthMobileHandler } from '@/middlewares/withAuthMobileHandler';
import { withDataSourceHandler } from '@/middlewares/withDataSourceHandler';
import { withMockHandler } from '@/middlewares/withMockHandler';
import { withSessionHandler } from '@/middlewares/withSessionHandler';
import { withTokenHandler } from '@/middlewares/withTokenHandler';

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
