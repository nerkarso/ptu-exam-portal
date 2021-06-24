import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  const buffer = Buffer.from(res.fileContents, 'base64');
  if (buffer.length > 0) {
    res.setHeader('Content-Disposition', `attachment; filename=${req.query.id}.pdf`);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Content-Type', ['application/pdf']);
    res.send(buffer);
  } else {
    res.status(500).json({
      error: true,
      message: 'Could not download file',
    });
  }
}

export default withAllowedMethods(withSetEndpoint(withProtectedEndpoint(withTransformPayload(handler))), ['GET']);

export function withTransformPayload(handler) {
  return (req, res) => {
    res.fileContents = null;
    if (res?.payload?.success) {
      res.fileContents = res.payload.data;
    }
    return handler(req, res);
  };
}

export function withSetEndpoint(handler) {
  return (req, res) => {
    if (req?.query?.id) {
      res.endpoint = `/Student/OnlineQPDownload/QPDownloadDetail?SubId=${req.query.id}&Location=${req.query.location}`;
    } else {
      return res.status(400).json({
        error: true,
        message: 'Missing id parameter in path',
      });
    }
    return handler(req, res);
  };
}
