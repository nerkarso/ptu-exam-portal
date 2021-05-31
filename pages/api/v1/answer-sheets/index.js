import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.json({
    answerSheets: res.answerSheets,
  });
}

export default withAllowedMethods(
  withProtectedEndpoint(
    withTransformPayload(handler),
    '/Student/VerifyAnswerSheets/OnlineEvaluationUploadedPapersForStudent',
  ),
  ['GET'],
);

function withTransformPayload(handler) {
  return (req, res) => {
    res.answerSheets = [];
    if (res.payload.success) {
      res.answerSheets = res.payload.data.map((item) => ({
        id: item.ED_SubID,
        subjectId: item.ED_SubID,
        subjectCode: item.SUB_CODE,
        subjectTitle: item.SUB_TITLE,
        examDate: item.SUB_ExamTime,
        filename: item.Ed_OLASheetFileName,
        remarks: item.Ed_StudentRemarksDuringCrossChecking,
        remarksIsUpdated: item.IsRemarksUpdated,
      }));
    }
    return handler(req, res);
  };
}
