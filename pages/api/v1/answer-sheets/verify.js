import { withProtectedEndpoint } from '@/middlewares/v1/withProtectedEndpoint';
import { withAllowedMethods } from '@/middlewares/withAllowedMethods';
import axios from 'axios';

function handler(req, res) {
  res.json({
    verified: res.verified,
  });
}

export default withAllowedMethods(withProtectedEndpoint(withTransformPayload(handler), '/web/WebmenuList'), ['POST']);

export function withTransformPayload(handler) {
  return async (req, res) => {
    const errors = [];
    if (!req.body) {
      errors.push('Missing body in request');
    }
    if (!req.body.subjectId) {
      errors.push('Missing subjectId field in body');
    }
    if (!req.body.remarks) {
      errors.push('Missing remarks field in body');
    }
    if (errors.length > 0) {
      res.status(400).json({
        error: true,
        message: errors,
      });
    }
    res.verified = false;
    try {
      const resp = await axios.post(
        `${process.env.SOURCE_API_BASE_URL}/Student/VerifyAnswerSheets/OnlineEvaluationUploadedPapersForStudentRemarks`,
        {
          SubId: req.body.subjectId,
          Remarks: req.body.remarks,
        },
        {
          headers: {
            Origin: process.env.SOURCE_API_ORIGIN_URL,
            Authorization: `Bearer ${res.refreshToken}`,
          },
        },
      );
      if (resp.data.success) {
        res.verified = true;
      }
    } catch (ex) {
      return res.status(500).json({
        error: true,
        message: 'Could not verify answer sheet',
        details: ex.message,
      });
    }
    return handler(req, res);
  };
}
