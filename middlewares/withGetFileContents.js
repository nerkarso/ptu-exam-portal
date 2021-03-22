import axios from 'axios';

/**
 * Gets the file contents from the source provider
 */
export const withGetFileContents = (handler, endpoint) => async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.SOURCE_MOBILE_BASE_URL}${endpoint}/DownloadPDFLink`,
      JSON.stringify({
        PDFLink: req.query.filename,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: res.sessionMobile,
        },
      },
    );
    if (response.data.d) {
      res.fileContents = response.data.d;
    } else {
      return res.status(404).json({
        error: true,
        message: 'File not found',
      });
    }
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not get file contents',
      details: ex.message,
    });
  }
  return handler(req, res);
};
