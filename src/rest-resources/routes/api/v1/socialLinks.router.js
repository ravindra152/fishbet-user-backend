import SocialLinksController from '@src/rest-resources/controllers/socialLinks.controller'
import express from 'express'
import requestValidationMiddleware from '@src/rest-resources/middlewares/requestValidation.middleware'
// import { getSocialLinksSchema } from '@src/json-schemas/socialLinks/getSocialLinksSchema'

const args = { mergeParams: true }
const socialLinksRouter = express.Router(args)

socialLinksRouter.route('/').get(
  requestValidationMiddleware({}),
  SocialLinksController.getSocialLinks
)

export { socialLinksRouter }
