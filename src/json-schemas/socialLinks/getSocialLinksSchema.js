export const getSocialLinksSchema = {
  query: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      platform: { type: 'string', enum: ['facebook', 'twitter', 'instagram', 'linkedin'] }
    },
    required: ['userId']
  }
}
