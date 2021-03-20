import axios from 'axios';

/**
 * This handles fetching the data source
 */
export const withDataSourceHandler = (handler, endpoint) => async (req, res) => {
  // Passes the source endpoint to the response
  if (!res.endpoint) res.endpoint = endpoint;
  // Markup does not exist, the page hasn't been fetched
  if (!res.html) {
    // Session for desktop source provider
    if (res.sessionKey === 'session') {
      // Fetches the markup
      try {
        const response = await fetchMarkup(res.endpoint, res.session);
        // Source session has not expired
        if (!response.request.path.includes('ReturnUrl')) {
          // Passes the markup to the response
          res.html = response.data;
        } else {
          // Clears the session and will try re-authenticate the user once again
          res.session = null;
        }
      } catch (ex) {
        return res.status(500).json({
          error: true,
          message: 'Could not fetch markup from source provider',
          details: ex.message,
        });
      }
    } else {
      // Fetches the markup
      try {
        const response = await fetchMarkup(res.endpoint, res.sessionMobile);
        // Passes the markup to the response
        res.html = response.data;
      } catch (ex) {
        // Session has expired or is invalid
        if (ex.response.status === 404) {
          // Clears the session and will try re-authenticate the user once again
          res.sessionMobile = null;
        } else {
          return res.status(500).json({
            error: true,
            message: 'Could not fetch markup from mobile source provider',
            details: ex.message,
          });
        }
      }
    }
  }
  return handler(req, res);
};

/**
 * This fetches the markup of the web page
 */
function fetchMarkup(endpoint, session) {
  return axios(endpoint, {
    headers: { Cookie: session },
  });
}
