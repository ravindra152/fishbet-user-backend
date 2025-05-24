import express from 'express'
import PaymentController from '@src/rest-resources/controllers/payment.controller'
import { isUserAuthenticated } from '@src/rest-resources/middlewares/isUserAuthenticated'
import requestValidationMiddleware from '@src/rest-resources/middlewares/requestValidation.middleware'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
// import { validateNowPaymentIPN } from '@src/rest-resources/middlewares/validateIPN.middleware'
import { createInovioPaymentSchema } from '@src/json-schemas/inovioPayment/createInovioPayment.schema'
// import { withdrawAmountsSchema } from '@src/json-schemas/payment/withdrawAmount.schema'

const inovioPaymentRouter = express.Router()

// Nowpayments
inovioPaymentRouter.route('/create-payment').post(requestValidationMiddleware(), requestValidationMiddleware(createInovioPaymentSchema), isUserAuthenticated, contextMiddleware(true), PaymentController.createPayment)

export { inovioPaymentRouter }
