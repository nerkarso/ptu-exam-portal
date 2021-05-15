import { withProtectedRoute } from '@/middlewares/v0/withProtectedRoute';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import cheerio from 'cheerio';

function handler(req, res) {
  return res.json(extractData(res.html));
}

export default withAllowedMethods(withProtectedRoute(handler, '/StudentDocuments.aspx'), ['GET']);

/**
 * Extracts the data from the markup
 */
function extractData(html) {
  const $ = cheerio.load(html);
  return {
    photo: $('#ContentPlaceHolder1_Image2').attr('src'),
    signature: $('#ContentPlaceHolder1_imgFSignature').attr('src'),
  };
}
