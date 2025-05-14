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
    console.log("...req.body------------------------", req.body)
    try {
      const result = await CreateVerificationModalService.execute({ ...req.body }, req.context)
      sendResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }
  static async checkVerification (req, res, next) {
    console.log("...req.body------------------------", req.body)
    var {phone_number} = req.body
    try {
      const response = await axios.post('https://api.bluassure.com/verify/phone', {
        phone: phone_number,
      });
      console.log(response,">>>>>>>>>>>>>>>>>>>>>>>");

    } catch (error) {
      next(error)
    }
  }

}
