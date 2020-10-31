import jwt from 'jsonwebtoken';

const useVerifyToken = (handler) => (req, res) => {
  // Gets the token from request header authorization
  const cookie = req.headers.cookie;
  const token = cookie.split('=')[1];

  // Token verification
  try {
    res.cookie = jwt.verify(token, 'ptu');
    return handler(req, res);
  } catch (ex) {
    return res.status(401).json({ error: true, message: ex.message });
  }
};

export default useVerifyToken;
