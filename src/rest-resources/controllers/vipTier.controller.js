import { sendResponse } from '@src/helpers/response.helpers'
import { GetVipTiersHandler } from '@src/services/vipTier'

export default class VipTierController {
  static async getVipTiers (req, res, next) {
    try {
      const data = await GetVipTiersHandler.execute(req.query)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }
}
