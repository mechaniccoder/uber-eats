import { Test } from '@nestjs/testing'
import { UserService } from './user.service'
import { getModelToken } from '@nestjs/mongoose'
import { User, UserRole } from './schema/user.schema'
import { Model } from 'mongoose'
import { JwtService } from '../jwt/jwt.service'
import { ConfigService } from '@nestjs/config'
import { MailService } from '../mail/mail.service'
import { ExistException } from './user.exception'

const mockedUserModel = {
  new: jest.fn(),
  constructor: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}

const mockedJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
}

const mockedMailService = {
  sendMail: jest.fn(),
}

type MockedModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>

describe('UserService', () => {
  let service: UserService
  let model: MockedModel<User>

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        ConfigService,
        {
          provide: getModelToken(User.name),
          useValue: mockedUserModel,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: MailService,
          useValue: mockedMailService,
        },
      ],
    }).compile()

    service = moduleRef.get<UserService>(UserService)
    model = moduleRef.get<MockedModel<User>>(getModelToken(User.name))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create user', () => {
    it('should fail if user exists', async () => {
      const testEmail = 'test@test.com'
      const testPassword = '123'

      model.findOne.mockResolvedValueOnce({
        id: 1,
        email: testEmail,
      })

      await expect(
        service.create({
          email: testEmail,
          password: testPassword,
          role: UserRole.customer,
        }),
      ).rejects.toThrow(ExistException)
    })
  })

  it.todo('findAll')
  it.todo('update')
  it.todo('login')
  it.todo('find')
})
