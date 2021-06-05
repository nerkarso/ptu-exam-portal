import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withSetEndpoint, withTransformPayload } from './index';

function handler(req, res) {
  const buffer = Buffer.from(res.fileContents, 'base64');
  if (buffer.length > 0) {
    res.setHeader('Content-Disposition', `attachment; filename=${req.query.filename}`);
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
