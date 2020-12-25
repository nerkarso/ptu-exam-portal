import { withAuthHandler } from './withAuthHandler';
import { withDataSourceHandler } from './withDataSourceHandler';
import { withMockHandler } from './withMockHandler';
import { withSessionHandler } from './withSessionHandler';
import { withTokenHandler } from './withTokenHandler';

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
