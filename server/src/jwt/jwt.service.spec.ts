import * as jwt from 'jsonwebtoken'
import { JwtService } from './jwt.service'
import { Test } from '@nestjs/testing'
import { CONFIG_OPTIONS } from './jwt.constant'
import { JwtModuleOptions } from './interface/jwt-module-options'

const TEST_PAYLOAD = 'testPayload'
const TEST_TOKEN = 'testToken'
const TEST_KEY = 'testKey'

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => TEST_TOKEN),
  verify: jest.fn(() => TEST_PAYLOAD),
}))

describe('JwtService', () => {
  let service: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: CONFIG_OPTIONS,
          useValue: { privateKey: TEST_KEY, isGlobal: true } as JwtModuleOptions,
        },
      ],
    }).compile()

    service = moduleRef.get<JwtService>(JwtService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  describe('sign', () => {
    it('should return signed token', () => {
      const token = service.sign(TEST_PAYLOAD)

      expect(jwt.sign).toHaveBeenCalledTimes(1)
      expect(jwt.sign).toHaveBeenCalledWith(TEST_PAYLOAD, TEST_KEY, { expiresIn: '1h' })
      expect(token).toEqual(TEST_TOKEN)
    })
  })

  describe('verify', () => {
    it('should return decoded token', () => {
      const decodedPayload = service.verify(TEST_TOKEN)

      expect(jwt.verify).toHaveBeenCalledTimes(1)
      expect(jwt.verify).toHaveBeenCalledWith(TEST_TOKEN, TEST_KEY)
      expect(decodedPayload).toEqual(TEST_PAYLOAD)
    })
  })
})
