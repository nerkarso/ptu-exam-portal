import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withExtractListItems } from '@/middlewares/withExtractListItems';
import { withProtectedRouteMobile } from '@/middlewares/withProtectedRoute';

async function handler(req, res) {
  return res.json({
    results: res.listItems,
  });
}

export default withAllowedMethods(
  withProtectedRouteMobile(withExtractListItems(handler), '/frmResultTabulation.aspx'),
  ['GET'],
);
