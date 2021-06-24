import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.json({
    exams: res.exams,
  });
}

export default withAllowedMethods(
  withProtectedEndpoint(withTransformPayload(handler), '/Student/OnlineQPDownload/GetFilledSubjects'),
  ['GET'],
);

function withTransformPayload(handler) {
  return (req, res) => {
    res.exams = [];
    if (res?.payload?.success) {
      res.exams = res.payload.data.map((item) => ({
        id: item.SUB_ID,
        subjectId: item.SUB_ID,
        subjectCode: item.SUB_CODE,
        subjectTitle: item.SUB_TITLE,
        examDate: item.Sub_Date,
        examTime: item.ExamTime,
        location: item.Location,
        allowDownload: item.AllowToDownload,
        allowUpload: item.ShowUploadButton,
        answerSheetUploaded: item.IsASheetUploaded,
        attendanceMarked: item.isMarkAttendance,
      }));
    }
    return handler(req, res);
  };
}
