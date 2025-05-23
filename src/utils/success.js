import config from '../configs/app.config'

export const SUCCESS_MSG = {
  METHOD: 'Healthcheck',
  REDIS_SUCCESS: 'PONG',
  HEALTHCHECK_SUCCESS: 'OK',
  PASSWORD_RESET: 'Password updated',
  EMAIL_SENT: 'Email sent successfully',
  GET_SUCCESS: 'Record get successfully',
  AVAIL_BONUS: 'Bonus Availed successfully.',
  BONUS_CLAIMED: 'Bonus Claimed successfully.',
  DELETE_SUCCESS: 'Record deleted successfully',
  UPDATE_SUCCESS: 'Record updated successfully',
  CREATE_SUCCESS: 'Record created successfully',
  CANCEL_SUCCESS: 'Bonus cancelled successfully',
  ADD_FAVORITE: 'Game added to favorites successfully',
  REMOVE_SUCCESS: 'Profile image removed successfully',
  UPLOAD_SUCCESS: 'Profile image uploaded successfully',
  CASHOUT_SUCCESS: 'Cashout Availed successfully',
  STATUS_UPDATED: 'Status has been updated successfully',
  REMOVE_FAVORITE: 'Game removed from favorites successfully',
  KYC_VERIFIED: 'KYC is already verified on some other portal',
  VERIFICATION_EMAIL: 'Verification email is valid for ' + config.get('jwt.emailTokenExpiry'),
  RESET_PASSWORD_EMAIL: 'Reset password email is valid for ' + config.get('jwt.tokenExpiry'),
  WITHDRAW_REQUEST_SENT: 'Withdraw request sent successfully, the money will get transferred in sometime',
  LOGOUT_SUCESS: 'Logout successfully',
  AVAIL_FAUCET: 'Faucet Availed successfully.',
  CHAT_RAIN_EMIT: 'ChatRain Emitted successfully.',
  CHAT_RAIN_CLAIMED: 'ChatRain Claimed successfully',
  EVENT_SHARED_SUCCESS: 'Event Shared successfully',
  USER_REPORTED_SUCCESS: 'User Reported successfully',
  REPORT_UPDATE_SUCCESS: 'Report updated successfully',
  MESSAGE_SEND_SUCCESS: 'Message send successfully',
  JOINED_SUCCESS: 'Joined successfully',
  TIP_SUCCESS: 'Tip send successfully'
}
