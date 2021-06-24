import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';

function handler(req, res) {
  res.json({
    payments: res.payments,
  });
}

export default withAllowedMethods(
  withProtectedEndpoint(withTransformPayload(handler), '/Student/BankTransactionLedgder/StudentPaymentLedger'),
  ['GET'],
);

function withTransformPayload(handler) {
  return (req, res) => {
    res.payments = [];
    if (res?.payload?.success) {
      res.payments = res.payload.data.map((item) => ({
        id: item.Edp_Id,
        examSession: item.Edp_SessionName,
        feeType: item.EFT_Title,
        amount: item.Edp_Amount,
        paymentStatus: item.PaymentStatus,
        color: item.PaymentColor,
        date: [item.Edp_InsertDate, item.Edp_BankResponseDate],
        url: `http://pages.ptuexam.com/ASheetConfirmedPaymentSlip/?Guid=${item.Edp_Guid}`,
      }));
    }
    return handler(req, res);
  };
}
