import { Inject, Injectable } from '@nestjs/common'
import Mailgun from 'mailgun-js'
import { MailModuleOptions } from './interface/mail-module-options'
import { MAILGUN, MAIL_CONFIG_OPTIONS } from './mail.constant'

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_CONFIG_OPTIONS) private readonly mailOptions: MailModuleOptions,
    @Inject(MAILGUN) private readonly mailgun: Mailgun,
  ) {}

  public async sendMail(subject: string, text: string) {
    const messageData = {
      from: `Excited User <me@${this.mailOptions.domain}>`,
      to: 'yuseunghwan94@gmail.com',
      subject,
      text,
    }

    this.mailgun.messages().send(messageData, (error, body) => {
      console.log(body)
    })
  }
}
