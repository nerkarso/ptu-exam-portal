import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.json({
    sgpa: res.sgpa,
  });
}

export default withAllowedMethods(
  withProtectedEndpoint(withTransformPayload(handler), '/Student/StudentActivities/StudentProgressCalculator'),
  ['GET'],
);

function withTransformPayload(handler) {
  return (req, res) => {
    res.sgpa = {};
    if (res.payload.success) {
      res.sgpa = res.payload.data;
    }
    return handler(req, res);
  };
}
