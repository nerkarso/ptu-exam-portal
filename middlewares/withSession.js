import { parse } from 'cookie';

export const withSession = (handler) => (req, res) => {
  // Gets and parses the cookies from the request header
  const cookies = parse(req.headers.cookie);
  // Passes the session to the response
  res.session = cookies.session;

  return handler(req, res);
};
