import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withProtectedRoute } from '@/middlewares/withProtectedRoute';
import cheerio from 'cheerio';

async function Profile(req, res) {
  return res.json(extractData(res.html));
}

export default withAllowedMethods(withProtectedRoute(Profile, '/frmStudentPanel.aspx'), ['GET']);

/**
 * Extracts the data from the markup
 */
function extractData(html) {
  const $ = cheerio.load(html);
  const parent = '#UserProfile .modal-body';
  return {
    rollNo: $(`${parent} #ContentPlaceHolder1_lblRollNo`).text().trim(),
    collegeName: $(`${parent} #ContentPlaceHolder1_lblCollegeName`).text().trim(),
    programme: $(`${parent} #ContentPlaceHolder1_lblBranch`).text().trim(),
    admissionStatus: $(`${parent} #ContentPlaceHolder1_lblLeet`).text().trim(),
    studentName: $(`${parent} #ContentPlaceHolder1_lblStudentName`).text().trim(),
    fatherName: $(`${parent} #ContentPlaceHolder1_lblFatherName`).text().trim(),
    motherName: $(`${parent} #ContentPlaceHolder1_lblMotherName`).text().trim(),
    currentSemester: $(`${parent} #ContentPlaceHolder1_lblCurrenetStatus`).text().trim(),
    branchId: $(`${parent} #ContentPlaceHolder1_lblBrId`).text().trim(),
  };
}
