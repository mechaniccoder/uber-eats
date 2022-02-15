import { Test } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { User, UserModel, UserRole, UserWithoutPassword } from './schema/user.schema'
import { Model } from 'mongoose'
import { MockedUserModel } from './user.service.spec'
import { VerificationService } from './verification.service'
import { CodeAlreadyVerifiedException, CodeNotMatchException } from './verification.exception'

const mockedUserModel: Partial<UserModel> = {
  findByIdAndUpdate: jest.fn(),
}

describe('VerificationService', () => {
  let userModel: MockedUserModel
  let service: VerificationService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        VerificationService,
        {
          provide: getModelToken(User.name),
          useValue: mockedUserModel,
        },
      ],
    }).compile()

    service = moduleRef.get<VerificationService>(VerificationService)
    userModel = moduleRef.get<MockedUserModel>(getModelToken(User.name))
  })

  describe('verify', () => {
    const testUser = {
      id: '1',
      email: 'test@test.com',
      role: UserRole.customer,
      verification: {
        code: '123456',
        isVerified: false,
      },
    }

    it('should fail if code already verified', async () => {
      const verifiedUser = {
        email: 'test@test.com',
        role: UserRole.customer,
        verification: {
          code: '123456',
          isVerified: true,
        },
      }

      await expect(
        service.verify(verifiedUser as UserWithoutPassword, { code: '123456' }),
      ).rejects.toThrow(CodeAlreadyVerifiedException)
    })

    it('should fail if code not match', async () => {
      await expect(service.verify(testUser as any, { code: '123476' })).rejects.toThrow(
        CodeNotMatchException,
      )
    })

    it('should update isVerified field', async () => {
      const result = await service.verify(testUser as any, { code: '123456' })

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledTimes(1)
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(testUser.id, {
        'verification.isVerified': true,
      })
      expect(result).toEqual(true)
    })
  })
})
