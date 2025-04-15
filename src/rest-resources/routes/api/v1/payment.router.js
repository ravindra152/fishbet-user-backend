import express from 'express'
import PaymentController from '@src/rest-resources/controllers/payment.controller'
import { isUserAuthenticated } from '@src/rest-resources/middlewares/isUserAuthenticated'
import requestValidationMiddleware from '@src/rest-resources/middlewares/requestValidation.middleware'
// import responseValidationMiddleware from '@src/rest-resources/middlewares/responseValidation.middleware'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
import { validateNowPaymentIPN } from '@src/rest-resources/middlewares/validateIPN.middleware'
import { createPaymentSchema } from '@src/json-schemas/payment/createPayment.schema'
import { currencyConversionSchema } from '@src/json-schemas/payment/currencyConversion.schema'
import { getIPNPaymentStatusSchema } from '@src/json-schemas/payment/getIPNPaymentStatus.schema'
import { withdrawAmountsSchema } from '@src/json-schemas/payment/withdrawAmount.schema'

const paymentRouter = express.Router()

//Nowpayments
paymentRouter.route('/create-payment').post(requestValidationMiddleware(), requestValidationMiddleware(createPaymentSchema), isUserAuthenticated, contextMiddleware(true), PaymentController.createPayment)
paymentRouter.route('/get-payment-status').post(contextMiddleware(true), validateNowPaymentIPN, PaymentController.getIPNPaymentStatus)
paymentRouter.route('/withdraw-amount').post(contextMiddleware(true), requestValidationMiddleware(withdrawAmountsSchema), isUserAuthenticated, PaymentController.createWithdrawalRequest)

paymentRouter.route('/get-currencies').get(isUserAuthenticated, contextMiddleware(true), PaymentController.getCurrencies)
paymentRouter.route('/get-conversion').get(isUserAuthenticated, contextMiddleware(false), requestValidationMiddleware(currencyConversionSchema), PaymentController.getConversion)


export { paymentRouter }
