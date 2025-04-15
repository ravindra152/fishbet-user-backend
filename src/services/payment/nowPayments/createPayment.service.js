import config from '@src/configs/app.config'
import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { dayjs } from '@src/libs/dayjs'
import { Logger } from '@src/libs/logger'
import { BaseHandler } from '@src/libs/logicBase'
import axios from 'axios'
import { GetCurrencyConversionService } from './getConversion.service'


export class CreatePaymentService extends BaseHandler {
  async run () {
    try {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      const { packageId, currency, userId } = this.args
      const packageDetails = await db.Package.findOne({
        where: { id: packageId, isActive: true },
        attributes: ['id', 'amount']
      })
      if (!packageDetails) throw new AppError(Errors.PACKAGE_NOT_FOUND)

      const orderId = 'ORION-' + userId + '-' + packageDetails.id + '-' + dayjs().valueOf() + '-' + Math.random().toString().substring(2, 8)
      const options = {
        price_amount: packageDetails.amount,
        price_currency: 'usd',
        pay_currency: currency,
        ipn_callback_url: config.get('app.userBackendUrl') + '/api/v1/payment/get-payment-status',
        order_id: orderId,
        order_description: 'Deposit Request',
        is_fixed_rate: true,
        is_fee_paid_by_user: true
        // payin_extra_id: userId
      }

      console.log('config nowPayment URL:>>>>>>>>>>>', config.get('nowPayment.url'))
      console.log('config apiKey:>>>>>>>>>>>', config.get('nowPayment.apiKey'))


      const response = await axios({
        method: 'POST',
        url: config.get('nowPayment.url') + '/v1/payment',
        headers: {
          'x-api-key': config.get('nowPayment.apiKey'),
          'Content-Type': 'application/json'
        },
        data: options
      })
      if (!response) throw new AppError(Errors.PAYMENT_PROVIDER_INACTIVE)
      const data = response.data
      // await db.UserDepositAddress.create({
      //   userId: userId,
      //   address: data.pay_address,
      //   currencyCode: currency
      // })
      const estimatedAmount = await GetCurrencyConversionService.execute({ amount: packageDetails.amount, convertFrom: 'usd', convertTo: currency })
      return { estimatedAmount, address: data.pay_address }
    } catch (error) {
      Logger.info('Error in payment', { exception: error })
      throw new AppError(Errors.INTERNAL_ERROR)
    }
  }
}
