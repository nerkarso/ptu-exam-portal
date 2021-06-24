import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.json({
    announcements: res.announcements,
  });
}

export default withAllowedMethods(
  withProtectedEndpoint(withTransformPayload(handler), '/Student/StudentActivities/StudentAnnoucements'),
  ['GET'],
);

function withTransformPayload(handler) {
  return (req, res) => {
    res.announcements = [];
    if (res?.payload?.success) {
      res.announcements = res.payload.data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        date: item.entryDate,
        url: item.filePath,
      }));
    }
    return handler(req, res);
  };
}
