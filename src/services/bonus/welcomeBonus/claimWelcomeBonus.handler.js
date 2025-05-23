import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { TransactionScGcHandler } from '@src/services/wallet'
import { BONUS_STATUS, BONUS_TYPE } from '@src/utils/constants/bonus.constants'
import { COINS, TRANSACTION_PURPOSE } from '@src/utils/constants/public.constants'
import { SUCCESS_MSG } from '@src/utils/success'

export class ClaimWelcomeBonusHandler extends BaseHandler {
  get constraints () {
    return constraints
  }

  async run () {
    const userId = this.args.userId
    const transaction = this.context.sequelizeTransaction

    const activeBonus = await db.Bonus.findOne({
      where: { status: BONUS_STATUS.ACTIVE, bonusType: BONUS_TYPE.WELCOME },
      attributes: ['id', 'status', 'gcAmount', 'scAmount'],
      transaction
    })
    if (!activeBonus) throw new AppError(Errors.BONUS_NOT_FOUND)

    const userBonus = await db.UserBonus.findOne({
      where: { userId, bonusId: activeBonus.id },
      attributes: ['id', 'gcAmount', 'scAmount'],
      transaction
    })
    if (userBonus) throw new AppError(Errors.BONUS_ALREADY_CLAIMED)

    const gcBonusCoins = activeBonus.gcAmount
    const scBonusCoins = activeBonus.scAmount

    await TransactionScGcHandler.execute({
      transaction_id: null,
      userId: userId,
      coinData: [
        { amount: gcBonusCoins, currencyCode: COINS.GOLD_COIN },
        { amount: scBonusCoins, currencyCode: COINS.SWEEP_COIN.BONUS_SWEEP_COIN }
      ],
      purpose: TRANSACTION_PURPOSE.WELCOME_BONUS
    }, this.context)

    await db.UserBonus.create({
      userId,
      bonusId: activeBonus.id,
      gcAmount: gcBonusCoins,
      scAmount: scBonusCoins
    }, { transaction })

    return { success: true, message: SUCCESS_MSG.BONUS_CLAIMED }
  }
}
