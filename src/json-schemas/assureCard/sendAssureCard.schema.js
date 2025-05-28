export const sendAssureCardSchema = {
  body: {
    type: 'object',
    required: ['meta', 'data'],
    properties: {
      meta: {
        type: 'object',
        required: ['credentials', 'customerReference'],
        properties: {
          credentials: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: { type: 'string' },
              password: { type: 'string' }
            }
          },
          customerReference: { type: 'string' }
        }
      },
      data: {
        type: 'object',
        required: ['scanMode', 'requireConsumerPortrait', 'documentType', 'phoneNumber'],
        properties: {
          scanMode: {
            type: 'string',
            enum: ['DeferredRequestLink'] // Add more options if needed
          },
          requireConsumerPortrait: { type: 'boolean' },
          documentType: {
            type: 'string',
            enum: ['DriversLicense', 'Passport', 'IDCard'] // Add as per supported types
          },
          ssn: {
            type: ['string', 'null']
          },
          phoneNumber: {
            type: 'string',
            pattern: '^[0-9]{10}$'
          },
          emailAddress: {
            type: ['string', 'null'],
            format: 'email'
          },
          ipAddress: {
            type: ['string', 'null'],
            pattern:
              '^(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)){3}$'
          },
          similarityThreshold: {
            type: ['number', 'null'],
            minimum: 0,
            maximum: 100
          }
        }
      }
    }
  }
}
