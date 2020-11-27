const mockDocuments = (handler) => (req, res) => {
  // return handler(req, res);

  // TODO: Temporary disable fetching documents, remote page unavailable
  if (!JSON.parse(process.env.MOCK_ENV)) return res.json({ documents: [] });

  return res.json({
    documents: [
      {
        id: 1,
        name: 'Grade sheet 1',
        date: '1 Jan 2020',
        url: 'http://localhost',
      },
      {
        id: 2,
        name: 'Grade sheet 2',
        date: '2 Jan 2020',
        url: 'http://localhost',
      },
    ],
  });
};

export default mockDocuments;
