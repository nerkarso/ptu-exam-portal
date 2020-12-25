import axios from 'axios';
import cheerio from 'cheerio';
import { withAllowedMethods } from '../../middlewares/withAllowedMethods';
import { normalizeText } from '../../utils';

async function Announcements(req, res) {
  try {
    // Fetch the markup from the source provider
    const response = await axios(`${process.env.SOURCE_BASE_URL}/NewLogin.aspx`);
    return res.json({
      announcements: extractData(response.data),
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: 'Could not get announcements',
      details: ex.message,
    });
  }
}

export default withAllowedMethods(Announcements, ['GET']);

/**
 * Extracts the data from the markup
 */
function extractData(html) {
  const items = [];
  const $ = cheerio.load(html);
  $('.event-list li').each((i, el) => {
    items.push({
      id: i + 1,
      message: normalizeText(
        $('.title')
          .first()
          .contents()
          .filter(function () {
            return this.type === 'text';
          })
          .text(),
      ),
      date: normalizeText($('time', el).text()),
      url: $('a', el).attr('href'),
    });
  });
  return items;
}
