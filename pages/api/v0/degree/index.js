import { withProtectedRouteMobile } from '@/middlewares/v0/withProtectedRoute';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { normalizeText } from '@/utils/index';
import cheerio from 'cheerio';

function handler(req, res) {
  return res.json({
    degree: extractListItems(res.html),
  });
}

export default withAllowedMethods(withProtectedRouteMobile(handler, '/FrmDegreePDC.aspx'), ['GET']);

/**
 * Extracts the list items from the markup
 */
function extractListItems(html) {
  const items = [];
  if (!html.includes('There is no  Certificate')) {
    const $ = cheerio.load(html);
    let id = 1;
    $('div[data-role="content"] ul[data-role="listview"] li').each((i, el) => {
      // Since in the original markup the info and date are seperate list items,
      // we will iterate only over the even items
      if (i % 2) {
        items.push({
          id: id++,
          title: normalizeText($('.info_link h2', el).text()),
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
  }
  return items;
}
