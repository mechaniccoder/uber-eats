import { DynamicModule, Module } from '@nestjs/common'
import { MAIL_CONFIG_OPTIONS, MAILGUN } from './mail.constant'
import { MailModuleOptions } from './interface/mail-module-options'
import { MailService } from './mail.service'
import Mailgun from 'mailgun.js'
import formData from 'form-data'

@Module({})
export class MailModule {
  static forRoot(options?: MailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: MAIL_CONFIG_OPTIONS,
          useValue: options,
        },
        {
          provide: MAILGUN,
          useFactory: () => {
            const mailgun = new Mailgun(formData)
            return mailgun.client({ username: options.from, key: options.apiKey })
          },
        },
        MailService,
      ],
      exports: [MailService],
    }
  }
}
