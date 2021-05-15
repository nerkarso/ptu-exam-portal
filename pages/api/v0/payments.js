import { withProtectedRoute } from '@/middlewares/v0/withProtectedRoute';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { normalizeText } from '@/utils/index';
import cheerio from 'cheerio';

function handler(req, res) {
  return res.json({
    payments: extractData(res.html),
  });
}

export default withAllowedMethods(withProtectedRoute(handler, '/ASheetPaymentLedger.aspx'), ['GET']);

/**
 * Extracts the data from the markup
 */
function extractData(html) {
  const items = [];
  const $ = cheerio.load(html);
  $('#ContentPlaceHolder1_gvTransactionDetail tr').each((i, el) => {
    // Skips the first row because it's the column header
    if (i > 0) {
      items.push({
        id: i,
        examSession: $('td:nth-child(2)', el).text(),
        feeType: $('td:nth-child(3)', el).text(),
        amount: parseFloat($('td:nth-child(5)', el).text()),
        paymentStatus: $('td:nth-child(6)', el).text(),
        date: $('td:nth-child(7)', el)
          .text()
          .trim()
          .split('\n')
          .map((str) => normalizeText(str)),
        url: `${process.env.SOURCE_BASE_URL}/${$('td:nth-child(9) a', el).attr('href')}`,
      });
    }
  });
  return items;
}
