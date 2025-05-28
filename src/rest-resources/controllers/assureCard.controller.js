
import sendAssureCardHandler from '@src/services/assureCard/sendAssureCard.service'
import { sendAssureCardSuccessResponse, sendAssureCardErrorResponse } from '@src/helpers/assureCardResponse.helper'
import { UpdateKycStatusService } from '@src/services/veriff/callbacks/updateKycStatus.service'
export default class AssureCardController {

  static async sendAssureCard (req, res, next) {
    try {
      const data = await sendAssureCardHandler.execute({ ...req.body, ...req.query })
      sendAssureCardSuccessResponse({ req, res, next }, data)
    } catch (error) {
      sendAssureCardErrorResponse({ req, res, next }, error)
    }
  }

  static async verificationWebhook (req, res, next) {
    try {
      const body = {
        id: req.body.meta?.transactionId,
        userId: req.body.meta?.customerReference,
        sessionId: '', // Fill this if you have session context
        verification: {
          id: req.body.meta?.transactionId,
          status: req.body.data?.assureCard?.validationResult?.code === "0" ? "verified" : "failed",
          decision: req.body.data?.assureCard?.validationResult?.code === "0" ? "approved" : "rejected",
          reason: req.body.data?.workflowOutcome?.description || ''
        },
        status: req.body.data?.assureCard?.validationResult?.code === "0" ? "completed" : "incomplete",
        data: {
          verification: {
            decision: req.body.data?.assureCard?.validationResult?.code === "0" ? "approved" : "rejected",
            reason: req.body.data?.workflowOutcome?.description || '',
            status: req.body.data?.assureCard?.validationResult?.description
          }
        }
      };
      const result = await UpdateKycStatusService.execute({ ...body, ...req.query }, req.context)

      return sendAssureCardSuccessResponse({ req, res, next }, result)
    } catch (error) {
      return sendAssureCardErrorResponse({ req, res, next }, error)
    }

  }

}
