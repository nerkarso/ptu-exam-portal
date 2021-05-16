import { withCheckTokens } from '@/middlewares/v1/withCheckTokens';
import { withDataSource } from '@/middlewares/v1/withDataSource';
import { withUserAuth } from '@/middlewares/v1/withUserAuth';
import { withVerifyUserToken } from '@/middlewares/v1/withVerifyUserToken';

/**
 * This middleware combines multiple middlewares
 * to create a pipeline for a protected endpoint
 */
export const withProtectedEndpoint = (handler, endpoint) => {
  /**
   * Pipeline:
   * 1. Check if the user token and refreshToken exists
   * 2. First attempt to retrieve the payload from the remote source provider
   * 3. If no payload is retrieved, then verify the user token
   * 4. Authenticate the user and get a fresh refreshToken
   * 5. Second attempt to retrieve the payload with a fresh refreshToken
   */
  return withCheckTokens(
    withDataSource(withVerifyUserToken(withUserAuth(withDataSource(handler, endpoint))), endpoint),
  );
};
