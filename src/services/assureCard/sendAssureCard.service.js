import axios from 'axios'
import { BaseHandler } from '@src/libs/logicBase'
import { GLOBAL_SETTING } from '@src/utils/constants/constants'
import db from '@src/db/models'
export default class SendAssureCardHandler extends BaseHandler {
  async run () {
    const payload = this.args
    const transaction = this.dbTransaction
    try {
      console.log(">>>>>>>>>>>>>>>>>>>>>>", payload)
      const userId = payload.userId;
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
          "meta": {
            "credentials": {
              "username": "E28030-AD4BB857-370E-472B-A29A-B692411A1301",
              "password": "Tri5M%1MPL8Qdym"
            },
            "customerReference": userId
          },
          "data": {
            "scanMode": "DeferredRequestLink",
            "requireConsumerPortrait": true,
            "documentType": "DriversLicense",
            // "ssn": null,
            "phoneNumber": "+919974952370"
            // "emailAddress": null,
            // "ipAddress": null,
            // "similarityThreshold": null
          }
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      return response.data
    } catch (error) {
      // Optional: Add more sophisticated error handling/logging here
      return { error: 'Failed to send AssureCard request.', details: error?.response?.data || error.message }
    }
  }
}
