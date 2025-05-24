import db from '@src/db/models'
import { AppError } from '@src/errors/app.error'
import { Errors } from '@src/errors/errorCodes'
import { BaseHandler } from '@src/libs/logicBase'
import { SUCCESS_MSG } from '@src/utils/success'

export class GetSocialLinksHandler extends BaseHandler {
  async run () {
    const { platform } = this.args
    console.log('platform------------', platform)

    let query = {}
    if (platform) query = { platform }

    const socialLinks = await db.SocialLinks.findAll({
      where: query
    })

    if (!socialLinks || socialLinks.length === 0) throw new AppError(Errors.SOCIAL_LINKS_NOT_FOUND)

    return { socialLinks, message: SUCCESS_MSG.GET_SUCCESS }
  }
}
