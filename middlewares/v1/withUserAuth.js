import { createCookie } from '@/utils/index';
import axios from 'axios';

/**
 * This middleware authenticates the user and returns a refreshToken
 */
export const withUserAuth = (handler) => async (req, res) => {
  // Check if the refreshToken exists, then go to the next middleware
  if (res.refreshToken) return handler(req, res);
  // The refreshToken does not exist, so get a new refreshToken
  try {
    const resp = await axios.post(
      `${process.env.SOURCE_API_BASE_URL}/ValidateUser/CredentialValidation`,
      {
        UserId: res.user.username,
        Password: res.user.password,
        Source: 'prod',
      },
      { headers: { Origin: process.env.SOURCE_API_ORIGIN_URL } },
    );
    // Check if the user credentials are correct
    if (resp.data.response.success) {
      // Pass the new refreshToken
      res.refreshToken = resp.data.jsonToken;
      // Set the new refreshToken in the cookie header
      res.setHeader('Set-Cookie', [createCookie('refreshToken', res.refreshToken)]);
    } else {
      // User credentials are incorrect
      return res.json({
        auth: false,
      });
    }
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not authenticate the user',
      details: ex.message,
    });
  }
  return handler(req, res);
};
