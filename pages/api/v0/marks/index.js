import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withExtractListItems } from '@/middlewares/withExtractListItems';
import { withProtectedRouteMobile } from '@/middlewares/withProtectedRoute';

async function handler(req, res) {
  return res.json({
    marks: res.listItems,
  });
}

export default withAllowedMethods(
  withProtectedRouteMobile(withExtractListItems(handler), '/frmStudentGradeMarks.aspx'),
  ['GET'],
);
