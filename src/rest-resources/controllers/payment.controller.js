import { sendResponse } from '@src/helpers/response.helpers'
import Logger from '@src/libs/logger'
import { CreatePaymentService, GetPaymentIPNService, GetPaymentCurrencyService, GetCurrencyConversionService } from '@src/services/payment'
import { CreateWithdrawalRequestService } from '@src/services/payment/createWithdrawalRequest.service'
import { CreateWithdrawalRequestHandler } from '@src/services/wallet'

export default class PaymentController {
  /**
   * Controller method to handle the request for /hello path
   *
   * @static
   * @param {object} req - object contains all the request params sent from the client
   * @param {object} res - object contains all the response params sent to the client
   * @param {function} next - function to execute next middleware
   * @memberof PaymentController
   */
  static async createPayment (req, res, next) {
    try {
      const data = await CreatePaymentService.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getIPNPaymentStatus (req, res, next) {
    try {
      // Logger.info("===getIPNPaymentStatus===== ", { message: JSON.stringify(req.body) })
      const data = await GetPaymentIPNService.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
      // res.json(result.result)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getCurrencies (req, res, next) {
    try {
      const data = await GetPaymentCurrencyService.execute(req.query, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  static async getConversion (req, res, next) {
    try {
      const data = await GetCurrencyConversionService.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Controller method to handle the withdraw request
   *
   * @static
   * @param {object} req - object contains all the request params sent from the client
   * @param {object} res - object contains all the response params sent to the client
   * @param {function} next - function to execute next middleware
   * @memberof PaymentController
   */
  static async createWithdrawalRequest (req, res, next) {
    try {
      const data = await CreateWithdrawalRequestService.execute(req.body, req.context)
      sendResponse({ req, res, next }, data)
    } catch (error) {
      next(error)
    }
  }

}
