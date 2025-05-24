export const NOWPAYMENT_WEBHOOK_STATUS = {
  WAITING: 'waiting',
  CONFIRMING: 'confirming',
  CONFIRMED: 'confirmed',
  SENDING: 'sending',
  PARTIALLY_PAID: 'partially_paid',
  FINISHED: 'finished',
  FAILED: 'failed',
  EXPIRED: 'expired'
}

// export const NOWPAYMENT_WEBHOOK_MAPPING = {
//   'waiting': 0,
//   'confirming': 0,
//   'confirmed': 1,
//   'sending': 0,
//   'partially_paid': 1,
//   'finished': 1,
//   'failed': 3,
//   'expired': 7
// };

export const NOWPAYMENT_WEBHOOK_MAPPING = {
  waiting: 'pending',
  confirming: 'pending',
  confirmed: 'successful',
  sending: 'pending',
  partially_paid: 'successful',
  finished: 'successful',
  failed: 'failed',
  expired: 'pending'
}

export const NOWPAYMENT_WEBHOOK_REDEEM_STATUS = {
  WAITING: 'WAITING',
  CONFIRMING: 'CONFIRMING',
  CONFIRMED: 'CONFIRMED',
  SENDING: 'SENDING',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  FINISHED: 'FINISHED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED',
  PROCESSING: 'PROCESSING',
  REJECTED: 'REJECTED',
  CREATING: 'CREATING'
}
