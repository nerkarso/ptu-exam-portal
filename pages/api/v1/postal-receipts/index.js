import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.json({
    postalReceipts: res.postalReceipts,
  });
}

export default withAllowedMethods(
  withProtectedEndpoint(withTransformPayload(handler), '/Student/PostalReceiptUpload/StudentPostalRecieptSelect'),
  ['GET'],
);

function withTransformPayload(handler) {
  return (req, res) => {
    res.postalReceipts = [];
    if (res.payload.success) {
      res.postalReceipts = res.payload.data.map((item) => ({
        id: item.MyId,
        description: item.Remarks,
        date: item.InsertDate,
        filename: item.RecieptFileName,
        confirmed: item.IsConfirm,
      }));
    }
    return handler(req, res);
  };
}
