import { DynamicModule, Module } from '@nestjs/common'
import Mailgun from 'mailgun-js'
import { MailModuleOptions } from './interface/mail-module-options'
import { MAILGUN, MAIL_CONFIG_OPTIONS } from './mail.constant'
import { MailService } from './mail.service'

@Module({})
export class MailModule {
  static forRoot(options?: MailModuleOptions): DynamicModule {
    return {
      global: true,
      module: MailModule,
      providers: [
        {
          provide: MAIL_CONFIG_OPTIONS,
          useValue: options,
        },
        {
          provide: MAILGUN,
          useFactory: () => {
            return Mailgun({
              apiKey: options.apiKey,
              domain: options.domain,
            })
          },
        },
        MailService,
      ],
      exports: [MailService],
    }
  }
}
