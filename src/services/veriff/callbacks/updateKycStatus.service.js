import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { createSignature } from '@src/helpers/veriff.helpers'
import { VeriffAxios } from '@src/libs/axios/veriff.axios'
import { BaseHandler } from '@src/libs/logicBase'
import { sendMailjetEmail } from '@src/services/helper/email'
import { DOCUMENT_STATUS_TYPES, DOCUMENT_TYPES, EMAIL_SUBJECTS, EMAIL_TEMPLATE_TYPES, VERIFF_STATUS } from '@src/utils/constant'

// const constraints = ajv.compile({ type: 'object' })

export class UpdateKycStatusService extends BaseHandler {
  async run () {
    const transaction = this.dbTransaction

    const { ...payload } = this.args
    let newDocumentsList, query
    const veriffId = payload?.verification?.id || payload?.id || payload?.sessionId
    const userId = payload?.userId;
    try {
      const userOtherDetails = await db.UserDetails.findOne({
        where: { userId: userId },
        attributes: ['userId', 'veriffApplicantId'],
        transaction
      })
      const userDetails = await db.User.findOne({
        where: { userId: userOtherDetails.userId },
        attributes: ['userId', 'veriffStatus', 'email', 'username', 'firstName', 'lastName', 'other'],
        transaction
      })
      /* if (payload?.action === 'submitted') { // condition of event webhook
          const data = await VeriffAxios.getVeriffDocuments(veriffId)
          newDocumentsList = data?.result?.images
      } */
      /* if (newDocumentsList && userOtherDetails?.veriffApplicantId) {
        const uniqueDocs = {}

        for (const document of newDocumentsList) {
          const keyValue = document.name
          if (!uniqueDocs[keyValue]) {
            uniqueDocs[keyValue] = true
            await db.UserDocument.create({
              userId: userDetails.userId,
              documentName: document.name.toUpperCase(),
              documentUrl: document.url,
              signature: createSignature({ payload: document.id }),
              documentType: DOCUMENT_TYPES.VERIFF,
              veriffApplicantId: veriffId
            }, { transaction })
          }
        }
        query = { veriffApplicantId: veriffId, veriffStatus: DOCUMENT_STATUS_TYPES.REQUESTED }
      } */
      if (veriffId && payload.status) { // condition of decision webhook

        let veriffStatus
        if (userOtherDetails?.veriffApplicantId) {
          veriffStatus = payload?.verification?.decision || payload?.verification?.status
        }
        query = { veriffStatus: veriffStatus }
        if (veriffStatus === VERIFF_STATUS.APPROVED) {
          await db.UserDocument.update({
            status: DOCUMENT_STATUS_TYPES.APPROVED
          }, { // how it is possible to add whee on veriffApplicantId if data is not created previously
            where: { userId: userDetails?.userId, veriffApplicantId: veriffId },
            transaction
          })
          await db.User.update({
            veriffStatus: VERIFF_STATUS.APPROVED
            // other : {
            //   ...userDetails.other ,
            //   additionalVerification: ADDITIONAL_VERIFICATION_LEVELS.NOT_REQUIRED
            // }
          }, {
            where: { id: userDetails?.userId },
            transaction
          })

          // const mailPayload = {
          //   email: userDetails.email,
          //   userName: userDetails.username,
          //   // customerIoTransactionId: CUSTOMER_IO_TRANSACTION_ID.KYC_L2_VERIFICATION_ID,
          //   userId: userDetails.userId
          // }

          // sending success mail
          // await sendMailjetEmail({
          //   userDetails,
          //   emailTemplate: EMAIL_TEMPLATE_TYPES.KYC_VERIFIED,
          //   data: {
          //     subject: EMAIL_SUBJECTS.EN.kycVerified,
          //     body: EMAIL_TEMPLATE_TYPES.KYC_VERIFIED
          //   },
          //   // message: SUCCESS_MSG.EMAIL_SENT
          // })
        } else if (veriffStatus === VERIFF_STATUS.DECLINED || veriffStatus ==='rejected') {
          /* await db.UserDocument.update({
            status: DOCUMENT_STATUS_TYPES.REJECTED,
            reason: payload?.verification?.reason,
          }, {
            where: { userId: userDetails.userId, },
            transaction
          }) */
          await db.User.update({
            veriffStatus: VERIFF_STATUS.DECLINED
          }, {
            where: { userId: userDetails?.userId },
            transaction
          })
          // sending rejection mail
          // await sendMailjetEmail({
          //   userDetails,
          //   emailTemplate: EMAIL_TEMPLATE_TYPES.KYC_REJECTED,
          //   data: {
          //     subject: EMAIL_SUBJECTS.EN.kycRejected,
          //     body: EMAIL_TEMPLATE_TYPES.KYC_REJECTED
          //   },
          //   // message: SUCCESS_MSG.EMAIL_SENT
          // })
        }else{
          console.log("Not match")
        }
      }

      if (query) {
        await db.User.update({
          ...query,
          other: {
            ...userDetails?.other,
            veriffReason: payload?.verification?.reason
          }
        }, {
          where: { userId: userId },
          transaction
        })
      }
      return { success: true }
    } catch (error) {
      throw new AppError(error)
    }
  }
}
