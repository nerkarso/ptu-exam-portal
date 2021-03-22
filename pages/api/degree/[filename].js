import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withGetFileContents } from '@/middlewares/withGetFileContents';
import { withSessionHandler } from '@/middlewares/withSessionHandler';

async function handler(req, res) {
  res.send(res.fileContents);
}

export default withAllowedMethods(
  withSessionHandler(withGetFileContents(handler, '/FrmDegreePDC.aspx'), 'sessionMobile'),
  ['GET'],
);
