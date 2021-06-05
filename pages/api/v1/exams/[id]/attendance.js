import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.json({
    attendanceMarked: res.attendanceMarked,
  });
}

export default withAllowedMethods(withSetEndpoint(withProtectedEndpoint(withTransformPayload(handler))), ['GET']);

export function withTransformPayload(handler) {
  return (req, res) => {
    res.attendanceMarked = false;
    if (res.payload.success) {
      res.attendanceMarked = true;
    }
    return handler(req, res);
  };
}

export function withSetEndpoint(handler) {
  return (req, res) => {
    if (req.query.id) {
      res.endpoint = `/Student/OnlineQPDownload/ExamMarkPresent?SubId=${req.query.id}`;
    }
    return handler(req, res);
  };
}
