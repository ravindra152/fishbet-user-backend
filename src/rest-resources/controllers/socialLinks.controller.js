import { sendResponse } from '@src/helpers/response.helpers'
import { GetSocialLinksHandler } from '@src/services/socialLinks'

export default class SocialLinksController {
  static async getSocialLinks (req, res, next) {
    console.log("...req.body-------")
    try {
      const data = await GetSocialLinksHandler.execute({ ...req.body, ...req.query })
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
}
