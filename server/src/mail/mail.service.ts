import { Inject, Injectable } from '@nestjs/common'
import { MAIL_CONFIG_OPTIONS, MAILGUN } from './mail.constant'
import { MailModuleOptions } from './interface/mail-module-options'
import Mailgun from 'mailgun.js'

type MailgunClient = ReturnType<InstanceType<typeof Mailgun>['client']>

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_CONFIG_OPTIONS) private readonly mailOptions: MailModuleOptions,
    @Inject(MAILGUN) private readonly mailgun: MailgunClient,
  ) {
    // this.sendMail('test mail', 'hi seunghwan')
  }

  public async sendMail(subject: string, text: string) {
    const messageData = {
      from: `Excited User <me@${this.mailOptions.domain}>`,
      to: 'yuseunghwan94@gmail.com',
      subject,
      text,
    }
    const res = await this.mailgun.messages.create(this.mailOptions.domain, messageData)
    console.log(res)
  }
}
