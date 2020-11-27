const mockAnnouncements = (handler) => (req, res) => {
  if (!JSON.parse(process.env.MOCK_ENV)) return handler(req, res);

  return res.json({
    announcements: [
      {
        id: 1,
        message: 'Notice 1',
        date: '1 Jan 2020',
        url: 'http://localhost',
      },
      {
        id: 2,
        message: 'Notice 2',
        date: '2 Jan 2020',
        url: 'http://localhost',
      },
    ],
  });
};

export default mockAnnouncements;
