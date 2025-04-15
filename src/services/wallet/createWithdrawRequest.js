import db from '@src/db/models'
import { BaseHandler } from '@src/libs/logicBase'
import { PAYMENT_PROVIDER } from '@src/utils/constant'
import { COINS, LEDGER_DIRECTIONS, LEDGER_TRANSACTION_TYPES, TRANSACTION_PURPOSE, WITHDRAWAL_STATUS } from '@src/utils/constants/public.constants'
import { SUCCESS_MSG } from '@src/utils/success'
import { CreateLedgerHandlerHandler } from './createLedgerHandler'

export class CreateWithdrawRequestHandler extends BaseHandler {
  async run() {
    let { amount, userId, currency, address } = this.args
    const transaction = this.dbTransaction


    // Create Withdrawal Request with Transaction ID
    const withdrawalRequest = await db.WithdrawalRequest.create(
      { userId, amount, status: WITHDRAWAL_STATUS.PENDING, currency, withdrawalAddress: address },
      { transaction })
    // Create Withdrawal Request with Transaction ID
    const withdrawTransaction = await db.Transaction.create(
      { userId, purpose: TRANSACTION_PURPOSE.REDEEM, paymentProvider: PAYMENT_PROVIDER.NOWPAYMENT, withdrawalId: withdrawalRequest.id },
      { transaction })

    // Use Transaction Ledger Handler
    const ledgerEntry = await CreateLedgerHandlerHandler.execute({
      transactionId: withdrawTransaction.transactionId,
      transactionType: LEDGER_TRANSACTION_TYPES.WITHDRAW,
      userId,
      direction: LEDGER_DIRECTIONS[TRANSACTION_PURPOSE.REDEEM],
      amount,
      currencyCode: COINS.SWEEP_COIN.REDEEMABLE_SWEEP_COIN,
    }, this.context)
    return {
      success: true,
      message: SUCCESS_MSG.CREATE_SUCCESS,
      withdrawalRequest,
      updatedBalance: ledgerEntry.updatedBalance
    }
  }
}
