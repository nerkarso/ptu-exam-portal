import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.send({
    url: res.url,
  });
}

export default withAllowedMethods(withSetEndpoint(withProtectedEndpoint(withTransformPayload(handler))), ['GET']);

export function withTransformPayload(handler) {
  return (req, res) => {
    res.url = null;
    if (res?.payload?.success) {
      res.url = res.payload.data;
    }
    return handler(req, res);
  };
}

export function withSetEndpoint(handler) {
  return (req, res) => {
    if (req?.query?.id) {
      res.endpoint = `/Student/OnlineQPDownload/TokenInsertByStudentForASheetr?SubId=${req.query.id}`;
    } else {
      return res.status(400).json({
        error: true,
        message: 'Missing id parameter in path',
      });
    }
    return handler(req, res);
  };
}
