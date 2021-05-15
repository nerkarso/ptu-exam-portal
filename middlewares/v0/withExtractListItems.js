import { normalizeText } from '@/utils/index';
import cheerio from 'cheerio';

/**
 * Extracts the list items from the markup
 */
export const withExtractListItems = (handler) => async (req, res) => {
  const items = [];
  if (res.html) {
    const $ = cheerio.load(res.html);
    let id = 1;
    $('div[data-role="content"] ul[data-role="listview"] li').each((i, el) => {
      // Since in the original markup the info and date are seperate list items,
      // we will iterate only over the even items
      if (i % 2) {
        items.push({
          id: id++,
          examSession: normalizeText($('a h2', el).text()),
          examDetails: normalizeText($('a p', el).text()),
          date: $(el)
            .prev()
            .first()
            .contents()
            .filter(function () {
              return this.type === 'text';
            })
            .text()
            .trim(),
          filename: $('a', el).attr('href'),
        });
      }
    });
  }
  res.listItems = items;
  return handler(req, res);
};
