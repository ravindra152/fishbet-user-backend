export const verificationSchema = {
  body: {
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      userName: { type: 'string' },
      dateOfBirth: { type: 'string', format: 'date' },
      city: { type: 'string' },
      state: { type: 'string' },
      image: { type: 'string' } // You may add `format: 'uri'` if this is a URL
    },
    required: ['firstName', 'lastName', 'userName', 'dateOfBirth', 'city', 'state', 'image']
  }
};
