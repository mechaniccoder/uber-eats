import { DynamicModule, Module } from '@nestjs/common'
import { MAIL_CONFIG_OPTIONS } from './mail.constant'
import { MailModuleOptions } from './interface/mail-module-options'

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
      ],
    }
  }
}
