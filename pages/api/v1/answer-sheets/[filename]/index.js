import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.setHeader('Content-Type', ['text/plain']);
  res.send(res.fileContents);
}

export default withAllowedMethods(withSetEndpoint(withProtectedEndpoint(withTransformPayload(handler))), ['GET']);

export function withTransformPayload(handler) {
  return (req, res) => {
    res.fileContents = null;
    if (res.payload.success) {
      res.fileContents = res.payload.data;
    }
    return handler(req, res);
  };
}

export function withSetEndpoint(handler) {
  return (req, res) => {
    if (req.query.filename) {
      res.endpoint = `/Student/VerifyAnswerSheets/getPdfData?fileName=${req.query.filename}`;
    }
    return handler(req, res);
  };
}
