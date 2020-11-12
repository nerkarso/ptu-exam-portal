import axios from 'axios';
import cheerio from 'cheerio';
import useMockAnnouncements from '../../middlewares/useMockAnnouncements';
import { withSession } from '../../middlewares/withSession';

async function Announcements(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await handleRemoteFetch(res.session);
        if (response.request.path.includes('NewLogin.aspx')) {
          res.status(401).json({ error: true, message: 'Remote session has expired' });
        } else {
          const announcements = getList(response.data);
          res.json({ announcements });
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

export default withSession(useMockAnnouncements(Announcements));

/**
 * Handles remote operation
 *
 * @param {string} cookie
 *
 * @returns {Promise<any>} AxiosResponse
 */
function handleRemoteFetch(cookie) {
  return axios(`http://www.ptuexam.com/frmStudentPanel.aspx`, {
    headers: { Cookie: cookie },
  });
}

/**
 * Parses the HTML and returns a list of announcements
 *
 * @param {string} html
 *
 * @returns {Announcement[]} Array of announcements
 */
function getList(html) {
  const $ = cheerio.load(html);
  let list = [];
  $('#AnnoucementModal ol li').each((i, el) => {
    const message = $('div > div:nth-child(2) > b', el).text();
    const date = $('div > div:nth-child(1) > div', el).text();
    const url = $('div > div:nth-child(3) a', el).attr('href');
    list.push({
      id: i,
      message: message === '' ? 'None' : message.trim(),
      date: date.trim(),
      url: url,
    });
  });
  return list;
}

/**
 * @typedef Announcement
 * @property {number} id
 * @property {string} message
 * @property {Date} date
 * @property {string} url
 */
