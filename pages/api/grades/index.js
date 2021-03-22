import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withProtectedRouteMobile } from '@/middlewares/withProtectedRoute';

async function handler(req, res) {
  return res.json({
    grades: res.listItems,
  });
}

export default withAllowedMethods(withProtectedRouteMobile(handler, '/frmStudentDMC.aspx'), ['GET']);
