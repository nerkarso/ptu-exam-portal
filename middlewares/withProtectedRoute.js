import { withAuthHandler } from '@/middlewares/withAuthHandler';
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
      withDataSourceHandler(withTokenHandler(withAuthHandler(withDataSourceHandler(handler))), endpoint),
    ),
  );
};
