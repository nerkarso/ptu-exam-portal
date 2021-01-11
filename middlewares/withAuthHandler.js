import { setCookie } from '@/utils/index';
import axios from 'axios';
import { parse } from 'cookie';

/**
 * This handles automatically authenticating the user
 */
export const withAuthHandler = (handler) => async (req, res) => {
  // Token exists, we want to re-authenticate ther user
  if (res.token) {
    // Passes the user credentials
    res.user = {
      username: res.token.username,
      password: res.token.password,
    };
  }
  // Session does not exist, the user is not authenticated
  if (!res.session) {
    // Mimicks the steps for authenticating the user
    try {
      // Gets the captcha
      let response = await getCaptcha();
      let cookies = parse(response.headers['set-cookie'][0]);
      // Solves the captcha
      const answer = solveCaptcha(response.data.d);
      // Authenticates the user at the source provider
      response = await handleAuthSource(res.user.username, res.user.password, cookies['ASP.NET_SessionId'], answer);
      // Authentication is successful
      if (response.data.d === true) {
        // Combines the cookies
        cookies = { ...cookies, ...parse(response.headers['set-cookie'][0]) };
        // Constructs the new session and passes it to the response
        res.session = constructSession(cookies['ASP.NET_SessionId'], cookies['.ASPXAUTH']);
        // Sets the new session in the cookie header
        setCookie(res, 'session', res.session);
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
 * Gets a new captcha
 */
function getCaptcha() {
  return axios.post(`${process.env.SOURCE_BASE_URL}/NewLogin.aspx/GetCapctha`, null, {
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Parses and solves the captcha
 */
function solveCaptcha(captcha) {
  // Extracts the operands
  const operands = captcha.match(/\d+/g);
  // Returns the sum
  return +operands[0] + +operands[1];
}

/**
 * Authenticates the user at the source provider
 */
function handleAuthSource(username, password, sessionId, answer) {
  return axios.post(
    `${process.env.SOURCE_BASE_URL}/NewLogin.aspx/LoginMe`,
    JSON.stringify({
      Userid: username,
      Password: password,
      Question: answer,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `ASP.NET_SessionId=${sessionId}`,
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
