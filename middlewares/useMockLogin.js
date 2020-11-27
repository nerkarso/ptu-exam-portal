const mockLogin = (handler) => (req, res) => {
  if (!JSON.parse(process.env.MOCK_ENV)) return handler(req, res);

  const { body } = req;
  if (body.username === '2020' && body.password === '2020') {
    return res.json({
      auth: true,
      userToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIwMjAiLCJwYXNzd29yZCI6IjIwMjAiLCJpYXQiOjE2MDY0ODk1MTR9.sZ_Ci0uEYNd5a8RntJwJaHkbyZAEvM0kD28zYz4LIc0',
    });
  } else {
    return res.json({ auth: false, message: 'Your username or password is incorrect' });
  }
};

export default mockLogin;
