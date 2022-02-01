import { DynamicModule, Module } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { JwtModuleOptions } from './interface/jwt-module-options'
import { CONFIG_OPTIONS } from './jwt.constant'

@Module({})
export class JwtModule {
  static forRoot(options?: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
      global: options.isGlobal || true,
    }
  }
}
