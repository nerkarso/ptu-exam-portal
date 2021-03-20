import { setCookie } from '@/utils/index';
import axios from 'axios';
import { parse } from 'cookie';

/**
 * This handles automatically authenticating the user for the mobile source provider
 */
export const withAuthMobileHandler = (handler) => async (req, res) => {
  // Token exists, we want to re-authenticate ther user
  if (res.token) {
    // Passes the user credentials
    res.user = {
      username: res.token.username,
      password: res.token.password,
    };
  }
  // Session does not exist, the user is not authenticated
  if (!res.sessionMobile) {
    // Mimicks the steps for authenticating the user
    try {
      // Authenticates the user at the source provider
      const response = await handleAuthSource(res.user.username, res.user.password);
      // Authentication is successful
      if (response.data.d === true) {
        // Merges the cookies
        const cookies = parse(response.headers['set-cookie'][0]);
        Object.assign(cookies, parse(response.headers['set-cookie'][1]));
        // Constructs the new session and passes it to the response
        res.sessionMobile = constructSession(cookies['ASP.NET_SessionId'], cookies['.ASPXAUTH']);
        // Sets the new session in the cookie header
        setCookie(res, 'sessionMobile', res.sessionMobile);
      } else {
        return res.json({ auth: false });
      }
    } catch (ex) {
      return res.status(500).json({
        error: true,
        message: 'Could not automatically authenticate the user',
        details: ex.message,
      });
    }
  }
  return handler(req, res);
};

/**
 * Authenticates the user at the source provider
 */
function handleAuthSource(username, password) {
  return axios.post(
    `${process.env.SOURCE_MOBILE_BASE_URL}/LoginMe.aspx/LoginMe`,
    JSON.stringify({
      Userid: username,
      Password: password,
      UserAgent: '',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

/**
 * Constructs the session
 */
export function constructSession(sessionId, sessionAuth) {
  return `ASP.NET_SessionId=${sessionId}; .ASPXAUTH=${sessionAuth}`;
}
