import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { CreateWithdrawRequestHandler } from '@src/services/wallet'
import { GLOBAL_SETTING, PAYMENT_PROVIDER } from '@src/utils/constant'
import { COINS } from '@src/utils/constants/public.constants'
import { ValidateWalletAddress } from './nowPayments/validateAddress.service'

export class CreateWithdrawalRequestService extends BaseHandler {
  async run () {
    const { address, currency, userId, amount } = this.args
    const transaction = this.context.sequelizeTransaction

    const wallet = await db.Wallet.findOne({
      where: {
        userId,
        currencyCode: COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN
      },
      transaction
    })
    if (wallet.balance < amount) throw new AppError(Errors.INSUFFICIENT_REDEEMABLE_FUNDS)
    const validAddress = await ValidateWalletAddress.execute({
      address,
      currency
    })

    if (!validAddress) throw new AppError(Errors.INVALID_CRYPTO_ADDRESS)

    const redeemSetting = await db.GlobalSetting.findOne({
      where: { key: GLOBAL_SETTING.WITHDRAWAL_LIMITS },
      transaction
    })

    if (!redeemSetting) throw new AppError(Errors.INTERNAL_ERROR)
    const redeemLimits = redeemSetting.value
    // if (amount < redeemLimits.minAmount) throw new AppError(Errors.INVALID_AMOUNT)

    const withdrawal = await CreateWithdrawRequestHandler.execute({
      amount,
      userId,
      address,
      currency,
      paymentProvider: PAYMENT_PROVIDER.NOWPAYMENT
    }, this.context)

    return { success: true, message: 'Redeem request successfully created' }
  }

  catch (error) {
    throw new AppError(Errors.INTERNAL_SERVER_ERROR)
  }
}
