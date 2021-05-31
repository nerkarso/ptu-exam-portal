import { fetchData } from '@/middlewares/v1/withDataSource';
import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.json({
    profile: res.profile,
  });
}

export default withAllowedMethods(
  withProtectedEndpoint(
    withTransformPayload(withGetPhotoAndSignature(handler)),
    '/Student/StudentActivities/StudentProfile',
  ),
  ['GET'],
);

function withTransformPayload(handler) {
  return (req, res) => {
    res.profile = {};
    if (res.payload.success) {
      const item = res.payload.data[0];
      res.profile = {
        admissionStatus: item.admissionStatus,
        batch: item.batch,
        branch: item.branch,
        course: item.course,
        currentSemester: item.currentSemStatus,
        degreeStatus: item.degreeStatus,
        fatherName: item.fatherName,
        instituteName: item.instituteName,
        motherName: item.motherName,
        rollNo: item.rollNo,
        studentName: item.studentName,
        mobile: item.mobile,
        email: item.email,
        photo: null,
        signature: null,
      };
    }
    return handler(req, res);
  };
}

function withGetPhotoAndSignature(handler) {
  return async (req, res) => {
    res.endpoint = '/Student/UploadPhotoAndSign/StudentDocumentsData';
    try {
      const resp = await fetchData(req, res);
      if (resp.data.success) {
        res.profile.photo = resp.data.data.photo;
        res.profile.signature = resp.data.data.sign;
      }
    } catch (ex) {
      return res.status(500).json({
        error: true,
        message: 'Could not retrieve photo and signature',
        details: ex.message,
      });
    }
    return handler(req, res);
  };
}
