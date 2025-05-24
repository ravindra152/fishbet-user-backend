// import express from 'express'
// import VerificationController from '@src/rest-resources/controllers/verification.controller'

// const router = express.Router()

// router.post('/verification/session', VerificationController.createVerificationSession)

// export default router

// import express from 'express'
// import VerificationController from '@src/rest-resources/controllers/verification.controller'

// const router = express.Router()

// // Use correct controller method name: `createVerificationRecord`
// router.post('/verification/session', VerificationController.createVerificationRecord)

// export default router

import VerificationController from '@src/rest-resources/controllers/verification.controller'
import express from 'express'
import requestValidationMiddleware from '@src/rest-resources/middlewares/requestValidation.middleware'
import { verificationSchema } from '@src/json-schemas/verification/verificationSchema'
import { isUserAuthenticated } from '@src/rest-resources/middlewares/isUserAuthenticated'
import contextMiddleware from '@src/rest-resources/middlewares/context.middleware'

const args = { mergeParams: true }
const verificationRouter = express.Router(args)

verificationRouter.route('/verification/session').post(requestValidationMiddleware(), requestValidationMiddleware(verificationSchema), isUserAuthenticated, contextMiddleware(true), VerificationController.createVerificationRecord)
verificationRouter.route('/verification/check').post(requestValidationMiddleware(), requestValidationMiddleware(verificationSchema), isUserAuthenticated, contextMiddleware(true), VerificationController.checkVerification)

export { verificationRouter }
