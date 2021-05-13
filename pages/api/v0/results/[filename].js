import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import { withGetFileContents } from '@/middlewares/withGetFileContents';
import { withMockHandler } from '@/middlewares/withMockHandler';
import { withSessionHandler } from '@/middlewares/withSessionHandler';

async function handler(req, res) {
  res.send(res.fileContents);
}

export default withAllowedMethods(
  withMockHandler(withSessionHandler(withGetFileContents(handler, '/frmResultTabulation.aspx'), 'sessionMobile')),
  ['GET'],
);
