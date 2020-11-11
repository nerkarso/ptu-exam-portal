import axios from 'axios';
import jwt from 'jsonwebtoken';
import useMockLogin from '../../middlewares/useMockLogin';
import { setCookie } from '../../utils/cookies';

async function Login(req, res) {
  const { body, method } = req;

  switch (method) {
    case 'POST':
      let errors = [];
      if (!body) {
        errors.push('Body is missing');
      }
      if (!body['username']) {
        errors.push('Username field in body is missing');
      }
      if (!body['password']) {
        errors.push('Password field in body is missing');
      }
      if (errors.length > 0) {
        res.status(400).json({ error: true, message: errors });
        break;
      }

      try {
        /**
         * Gets the session ID and solves the captcha
         */
        const sessionRes = await handleRemoteSession();
        const sessionId = getCookieValue(sessionRes.headers['set-cookie']);
        const answer = getSolvedCaptcha(sessionRes.data['d']);
        /**
         * Authenticates the user and gets the session cookie
         */
        const authRes = await handleRemoteAuth(body['username'], body['password'], sessionId, answer);
        /**
         * Checks if { d: true }
         */
        if (authRes.data['d'] === true) {
          /**
           * Sets the cookies in the header
           */
          const sessionAuth = getCookieValue(authRes.headers['set-cookie']);
          setCookie(res, 'session', { id: sessionId, auth: sessionAuth });
          res.json({ auth: true, userToken: generateUserToken(body['username'], body['password']) });
        } else {
          res.json({ auth: false, message: 'Your username or password is incorrect' });
        }
      } catch (ex) {
        res.status(ex.status || 500).json({ error: true, message: ex.message });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ error: true, message: `Method ${method} Not Allowed` });
  }
}

/**
 * Handles the remote session
 *
 * @returns {Promise<any>} AxiosResponse
 */
function handleRemoteSession() {
  return axios.post(`http://www.ptuexam.com/NewLogin.aspx/GetCapctha`, null, {
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Handles the remote authentication
 *
 * @param {string} username
 * @param {string} password
 * @param {string} sessionId
 * @param {string} answer - Answer of the captcha
 *
 * @returns {Promise<any>} AxiosResponse
 */
function handleRemoteAuth(username, password, sessionId, answer) {
  const body = {
    Userid: username,
    Password: password,
    Question: answer,
  };
  return axios.post(`http://www.ptuexam.com/NewLogin.aspx/LoginMe`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `ASP.NET_SessionId=${sessionId}`,
    },
  });
}

/**
 * Parses the cookie and extracts the value
 *
 * @param {string[]} cookies
 *
 * @returns {string} Cookie value
 */
function getCookieValue(cookies) {
  /**
   * Extracts between `=` and `; = path` from `foo=bar; path=/`
   */
  const values = cookies[0].match(/(?<=\=)(.*)(?=;\spath)/gi);
  return values.length > 0 ? values[0] : null;
}

/**
 * Parses and solves the captcha
 *
 * @param {string} captcha
 *
 * @returns {number} Answer of the captcha
 */
function getSolvedCaptcha(captcha) {
  /**
   * Extracts the operands from `1+2 = `
   */
  const operands = captcha.match(/\d+/g);
  return +operands[0] + +operands[1];
}

/**
 * Signs and generates a user token
 *
 * @param {string} username
 * @param {string} password
 *
 * @returns {string} JWT token
 */
function generateUserToken(username, password) {
  return jwt.sign({ username, password }, process.env.JWT_SECRET);
}

export default useMockLogin(Login);
