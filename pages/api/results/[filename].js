import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withSessionHandler } from '@/middlewares/withSessionHandler';
import axios from 'axios';

async function handler(req, res) {
  const {
    query: { filename },
  } = req;

  try {
    const response = await getFileContents(filename, res.sessionMobile);
    res.send(response.data.d);
  } catch (ex) {
    res.status(500).json({
      error: true,
      message: 'Could not get result file contents',
      details: ex.message,
    });
  }
}

export default withAllowedMethods(withSessionHandler(handler, 'sessionMobile'), ['GET']);

/**
 * Gets the file contents from source provider
 */
function getFileContents(filename, session) {
  return axios.post(
    `${process.env.SOURCE_MOBILE_BASE_URL}/frmResultTabulation.aspx/DownloadPDFLink`,
    JSON.stringify({
      PDFLink: filename,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Cookie: session,
      },
    },
  );
}
