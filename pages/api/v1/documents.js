import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { normalizeText } from '@/utils/index';

function handler(req, res) {
  res.json({
    results: res.results,
    marks: res.marks,
    grades: res.grades,
    degree: res.degree,
  });
}

export default withAllowedMethods(
  withProtectedEndpoint(withTransformPayload(handler), '/Student/StudentActivities/StudentDocumentList'),
  ['GET'],
);

function withTransformPayload(handler) {
  return (req, res) => {
    res.results = [];
    res.marks = [];
    res.grades = [];
    res.degree = [];
    const groupItem = (item, index, array, type) => {
      if (item.documentType === type) {
        array.push({
          id: item.notiNum || index,
          title: item.scheme ? normalizeText(item.scheme) : item.documentType,
          examSession: item.examSession,
          examType: item.rType,
          date: item.resultDate,
          url: item.fileName,
        });
      }
    };
    if (res.payload.success) {
      if (res.payload.data && res.payload.data.length > 0) {
        res.payload.data.forEach((item, index) => {
          groupItem(item, index, res.results, 'Result Tabulation');
          groupItem(item, index, res.marks, 'Detailed Marks Card');
          groupItem(item, index, res.grades, 'DMC');
          groupItem(item, index, res.degree, 'Degree');
        });
      }
    }
    return handler(req, res);
  };
}
