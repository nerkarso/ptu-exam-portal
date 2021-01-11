import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withProtectedRoute } from '@/middlewares/withProtectedRoute';
import cheerio from 'cheerio';

async function ProfileDetails(req, res) {
  return res.json(extractData(res.html));
}

export default withAllowedMethods(withProtectedRoute(ProfileDetails, '/StudentDocuments.aspx'), ['GET']);

/**
 * Extracts the data from the markup
 */
function extractData(html) {
  const $ = cheerio.load(html);
  return {
    photo: `${process.env.SOURCE_BASE_URL}/${$('#ContentPlaceHolder1_Image2').attr('src')}`,
    signature: `${process.env.SOURCE_BASE_URL}/${$('#ContentPlaceHolder1_imgFSignature').attr('src')}`,
  };
}
