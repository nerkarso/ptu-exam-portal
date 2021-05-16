import axios from 'axios';

/**
 * This middleware retrieves the payload from the source provider
 */
export const withDataSource = (handler, endpoint) => async (req, res) => {
  // Check if the payload exists, then go to the next middleware
  if (res.payload) return handler(req, res);
  // Payload hasn't been retrieved
  try {
    const resp = await fetchData(req, res, endpoint);
    // Pass the payload
    if (resp.data.success) {
      res.payload = resp.data;
    }
  } catch (ex) {
    if (ex.response.status !== 401) {
      return res.status(500).json({
        error: true,
        message: 'Could not retrieve payload from source provider',
        details: ex.message,
      });
    } else {
      // Delete the old refreshToken so we can get a new one
      delete res.refreshToken;
    }
  }
  return handler(req, res);
};

export function fetchData(req, res, endpoint) {
  return axios.get(`${process.env.SOURCE_API_BASE_URL}${endpoint}`, {
    headers: {
      Origin: process.env.SOURCE_API_ORIGIN_URL,
      Authorization: `Bearer ${res.refreshToken}`,
    },
  });
}
