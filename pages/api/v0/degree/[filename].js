import { withGetFileContents } from '@/middlewares/v0/withGetFileContents';
import { withMockHandler } from '@/middlewares/v0/withMockHandler';
import { withSessionHandler } from '@/middlewares/v0/withSessionHandler';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.send(res.fileContents);
}

export default withAllowedMethods(
  withMockHandler(withSessionHandler(withGetFileContents(handler, '/FrmDegreePDC.aspx'), 'sessionMobile')),
  ['GET'],
);
