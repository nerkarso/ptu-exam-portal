import axios from 'axios';

/**
 * This handles fetching the data source
 */
export const withDataSourceHandler = (handler, endpoint) => async (req, res) => {
  // Passes the source endpoint to the response
  if (!res.endpoint) res.endpoint = endpoint;
  // Markup does not exist, the page hasn't been fetched
  if (!res.html) {
    // Fetches the markup
    try {
      const response = await fetchMarkup(res.endpoint, res.session);
      // Source session has not expired
      if (!response.request.path.includes('ReturnUrl')) {
        // Passes the markup to the response
        res.html = response.data;
      } else {
        // Clears the session
        res.session = null;
      }
    } catch (ex) {
      return res.status(500).json({
        error: true,
        message: 'Could not fetch markup from source provider',
        details: ex.message,
      });
    }
  }
  return handler(req, res);
};

/**
 * This fetches the markup of the web page
 */
function fetchMarkup(endpoint, session) {
  return axios(process.env.SOURCE_BASE_URL + endpoint, {
    headers: { Cookie: session },
  });
}
