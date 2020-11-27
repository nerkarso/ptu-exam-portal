const mockLogin = (handler) => (req, res) => {
  if (!JSON.parse(process.env.MOCK_ENV)) return handler(req, res);

  const { body } = req;
  if (body.username === '2020' && body.password === '2020') {
    return res.json({ token: 'foo' });
  } else {
    return res.json({ error: true, message: 'Your username or password is incorrect' });
  }
};

export default mockLogin;
