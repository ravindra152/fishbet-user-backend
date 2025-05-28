// import { sendResponse } from '@src/helpers/response.helpers'
// import { CreateVerificationModalSessionService } from '@src/services/verification/userVerification'

// export default class VerificationController {

//   static async createVerificationSession(req, res, next) {
//     try {
//       const result = await CreateVerificationModalSessionService.execute({ ...req.query, ...req.body }, req.context)
//       sendResponse({ req, res, next }, result)
//     } catch (error) {
//       next(error)
//     }
//   }

// }

import { sendResponse } from '@src/helpers/response.helpers'
import { CreateVerificationModalService } from '@src/services/verification/userVerification'
import axios from 'axios'

export default class VerificationController {
  static async createVerificationRecord (req, res, next) {
    try {
      const result = await CreateVerificationModalService.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async checkVerification (req, res, next) {
    const { phone_number } = req.body
    try {
      const response = await axios.post('https://api.bluassure.com/verify/phone', {
        phone: phone_number
      })
    } catch (error) {
      next(error)
    }
  }
}
