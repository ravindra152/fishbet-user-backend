export const createInovioPaymentSchema = {
  body: {
    type: 'object',
    properties: {
      amount: { type: ['number', 'string'] },
      currency: { type: 'string' },
      userId: { type: ['string', 'number'] },
      packageId: { type: 'number' },
      customerEmail: { type: 'string', format: 'email' },
      redirectUrl: { type: 'string', format: 'uri' },
      cancelUrl: { type: 'string', format: 'uri' }
    },
    required: ['amount', 'currency', 'packageId', 'customerEmail', 'redirectUrl', 'cancelUrl']
  }
}
