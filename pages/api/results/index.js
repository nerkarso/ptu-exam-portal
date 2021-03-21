import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withProtectedRouteMobile } from '@/middlewares/withProtectedRoute';
import { normalizeText } from '@/utils/index';
import cheerio from 'cheerio';

async function handler(req, res) {
  return res.json({
    results: extractData(res.html),
  });
}

export default withAllowedMethods(withProtectedRouteMobile(handler, '/frmResultTabulation.aspx'), ['GET']);

/**
 * Extracts the data from the markup
 */
function extractData(html) {
  const items = [];
  const $ = cheerio.load(html);
  let id = 1;
  $('div[data-role="content"] ul[data-role="listview"] li').each((i, el) => {
    // Since in the original markup the info and date are seperate list items,
    // we will iterate only over the even items
    if (i % 2) {
      items.push({
        id: id++,
        examSession: normalizeText($('.info_link h2', el).text()),
        examDetails: normalizeText($('.info_link p', el).text()),
        date: $(el)
          .prev()
          .first()
          .contents()
          .filter(function () {
            return this.type === 'text';
          })
          .text()
          .trim(),
        filename: $('.info_link', el).attr('gsm'),
      });
    }
  });
  return items;
}
