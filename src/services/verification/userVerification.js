import db from "@src/db/models"
import { AppError } from "@src/errors/app.error"
// import { Errors } from "@src/errors/errorCodes"
import { BaseHandler } from "@src/libs/logicBase"

export class CreateVerificationModalService extends BaseHandler {
  async run() {
    const transaction = this.dbTransaction
    const {
      firstName,
      lastName,
      userName,
      dateOfBirth,
      city,
      state,
      image
    } = this.args

    // ✅ Pehle check karo ki username duplicate to nahi
    const existingRecord = await db.VerificationModals.findOne({ where: { userName }, transaction })
    if (existingRecord) {
      throw new AppError("Verification record already exists for this username")
    }

    // ✅ Record create karo
    const newRecord = await db.VerificationModals.create({
      firstName,
      lastName,
      userName,
      dateOfBirth,
      city,
      state,
      image
    }, { transaction })

    return newRecord
  }
}
