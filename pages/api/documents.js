import axios from 'axios';
import cheerio from 'cheerio';
import useMockDocuments from '../../middlewares/useMockDocuments';
import { withSession } from '../../middlewares/withSession';

async function Documents(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await handleRemoteFetch(res.session);
        if (response.request.path.includes('NewLogin.aspx')) {
          res.status(401).json({ error: true, message: 'Remote session has expired' });
        } else {
          const documents = getList(response.data);
          res.json({ documents });
        }
      } catch (ex) {
        return res.status(ex.status || 500).json({ error: true, message: ex.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: true, message: `Method ${method} Not Allowed` });
  }
}

export default withSession(useMockDocuments(Documents));

/**
 * Handles remote operation
 *
 * @param {string} cookie
 *
 * @returns {Promise<any>} AxiosResponse
 */
function handleRemoteFetch(cookie) {
  return axios(`http://www.ptuexam.com/frmStudentAllDocuments.aspx`, {
    headers: { Cookie: cookie },
  });
}

/**
 * Parses the HTML and returns a list of documents
 *
 * @param {string} html
 *
 * @returns {Document[]} Array of documents
 */
function getList(html) {
  const $ = cheerio.load(html);
  let list = [];
  $('#ContentPlaceHolder1_gvStudentDocuments tr').each((i, el) => {
    const name = $('td:nth-child(2) h3', el).text();
    const date = $('td:nth-child(1) h3', el).text();
    const url = $('td:nth-child(4) a', el).attr('href');
    // Skips the first row because it's the column header
    if (i > 0) {
      list.push({
        id: i,
        name: name === '' ? 'Untitled' : name.trim(),
        date: date.trim(),
        url: url,
      });
    }
  });
  return list;
}

/**
 * @typedef Document
 * @property {number} id
 * @property {string} name
 * @property {Date} date
 * @property {string} url
 */