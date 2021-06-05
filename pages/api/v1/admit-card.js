import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import axios from 'axios';

function handler(req, res) {
  res.send({
    url: res.url,
  });
}

export default withAllowedMethods(withProtectedEndpoint(withTransformPayload(handler), '/web/WebmenuList'), ['GET']);

export function withTransformPayload(handler) {
  return async (req, res) => {
    res.url = null;
    if (res.payload.success) {
      const menuItem = res.payload.data.find((menu) => menu.name === 'Admit Card Download');
      if (menuItem) {
        const redirectUrl = `${process.env.SOURCE_API_BASE_URL}/Student/ValidateToken/ExternalRedirectDetails?RedirectId=${menuItem.externalRedirectId}`;
        try {
          const resp = await axios.get(redirectUrl, {
            headers: {
              Origin: process.env.SOURCE_API_ORIGIN_URL,
              Authorization: `Bearer ${res.refreshToken}`,
            },
          });
          if (resp.data.data[0].msg === 'ok') {
            res.url = resp.data.data[0].extralURL;
          } else {
            return res.status(500).json({
              error: true,
              message: 'Could not get external URL',
              details: ex.message,
            });
          }
        } catch (ex) {
          return res.status(500).json({
            error: true,
            message: 'Could not get redirect URL',
            details: ex.message,
          });
        }
      }
    }
    return handler(req, res);
  };
}
