import { normalizeText } from '@/utils/index';
import cheerio from 'cheerio';

/**
 * Extracts the list items from the markup
 */
export const withExtractListItems = (handler) => async (req, res) => {
  const items = [];
  const $ = cheerio.load(res.html);
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
  res.listItems = items;
  return handler(req, res);
};
