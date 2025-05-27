import express from 'express'
import AssureCardController from '@src/rest-resources/controllers/assureCard.controller'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'
// import requestValidationMiddleware from '@src/rest-resources/middlewares/requestValidation.middleware'
// import { sendAssureCardSchema } from '@src/json-schemas/assureCard/sendAssureCard.schema'
// import { isUserAuthenticated } from '@src/rest-resources/middlewares/isUserAuthenticated'

const args = { mergeParams: true }
const assureCardRouter = express.Router(args)

assureCardRouter
  .route('/assure-card')
  .post(
    // isUserAuthenticated,
    contextMiddleware(false),
    // requestValidationMiddleware(sendAssureCardSchema),
    // console.log("Developer---------y---------->"),
    AssureCardController.sendAssureCard
  )

assureCardRouter
  .route('/verification-webhook')
  .post(
    // isUserAuthenticated,
    contextMiddleware(false),
    // requestValidationMiddleware(sendAssureCardSchema),
    AssureCardController.verificationWebhook
  )

export { assureCardRouter }
