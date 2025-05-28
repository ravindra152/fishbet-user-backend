import axios from 'axios'
import { BaseHandler } from '@src/libs/logicBase'
// import { GLOBAL_SETTING } from '@src/utils/constants/constants'
import db from '@src/db/models'
import { getRequestIP } from '@src/utils/common'
export default class SendAssureCardHandler extends BaseHandler {
  async run () {
    const payload = this.args
    const transaction = this.dbTransaction
    try {
      const userId = payload.userId

      const user = await db.User.findOne({
        where: { user_id: userId },
        transaction
      })
      if (!user) {
        return { error: 'User not found' }
      }

      const phoneNumber = user.phone || '+91000000000'

      const userDetails = await db.UserDetails.findOne({
        where: { userId },
        transaction
      })

      if (!userDetails) {
        const dataUserDetails = {
          userId,
          vipTierId: 1,
          nextVipTierId: 2,
          ipAddress: getRequestIP(this.context.req)
        }
        await db.UserDetails.create(dataUserDetails, { transaction })
      } else {
        await userDetails.update(
          { veriffApplicantId: userId },
          { transaction }
        )
      }

      const response = await axios.post(
        'https://blueassure.evssolutions.com/WebServices/Integrated/Main/V300/AssureCard',
        {
          customerReference: userId, // ✅ Moved to root level
          meta: {
            credentials: {
              username: 'E28030-AD4BB857-370E-472B-A29A-B692411A1301',
              password: 'Tri5M%1MPL8Qdym'
            }
          },
          data: {
            scanMode: 'DeferredRequestLink',
            requireConsumerPortrait: true,
            documentType: 'DriversLicense',
            phoneNumber: `${phoneNumber}`
            // ipAddress: getRequestIP(this.context.req)
          }
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      console.log(response, 'response-------------------------')

      return response.data
    } catch (error) {
      console.log(error)
      // Optional: Add more sophisticated error handling/logging here
      return { error: 'Failed to send AssureCard request.', details: error?.response?.data || error.message }
    }
  }
}
