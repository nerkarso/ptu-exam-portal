import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withExtractListItems } from '@/middlewares/withExtractListItems';
import { withProtectedRouteMobile } from '@/middlewares/withProtectedRoute';

async function handler(req, res) {
  return res.json({
    grades: res.listItems,
  });
}

export default withAllowedMethods(withProtectedRouteMobile(withExtractListItems(handler), '/frmStudentDMC.aspx'), [
  'GET',
]);
