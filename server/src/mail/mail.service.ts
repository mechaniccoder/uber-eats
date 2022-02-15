import { Inject, Injectable } from '@nestjs/common'
import { MAIL_CONFIG_OPTIONS, MAILGUN } from './mail.constant'
import { MailModuleOptions, TemplateVariables } from './interface/mail-module-options'
import Mailgun from 'mailgun.js'

type MailgunClient = ReturnType<InstanceType<typeof Mailgun>['client']>

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_CONFIG_OPTIONS) private readonly mailOptions: MailModuleOptions,
    @Inject(MAILGUN) private readonly mailgun: MailgunClient,
  ) {}

  public async sendMail(subject: string, template: string, variables?: TemplateVariables[]) {
    let templateVars
    if (variables) {
      templateVars = this.parseTemplateVariables(variables)
    }

    const messageData = {
      from: `Excited User <me@${this.mailOptions.domain}>`,
      to: 'yuseunghwan94@gmail.com',
      subject,
      template,
      ...templateVars,
    }
    const res = await this.mailgun.messages.create(this.mailOptions.domain, messageData)
  }

  private parseTemplateVariables(variables: TemplateVariables[]) {
    const result = {}

    variables.forEach(({ name, value }) => {
      result[`v:${name}`] = value
    })

    return result
  }
}
