import { Test } from '@nestjs/testing'
import { UserService } from './user.service'
import { getModelToken } from '@nestjs/mongoose'
import { User, UserRole, UserWithoutPassword } from './schema/user.schema'
import { Model } from 'mongoose'
import { JwtService } from '../jwt/jwt.service'
import { ConfigService } from '@nestjs/config'
import { MailService } from '../mail/mail.service'
import { ExistException } from './user.exception'

const newUser = {
  email: 'test@test.com',
  role: UserRole.customer,
  password: '123',
  verification: {
    code: '123456',
    isVerified: false,
  },
}

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
  let mailService: MailService

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
    mailService = moduleRef.get<MailService>(MailService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create user', () => {
    const createUserArg = {
      email: 'test@test.com',
      password: '123',
      role: UserRole.customer,
    }

    it('should fail if user exists', async () => {
      model.findOne.mockResolvedValueOnce({
        id: 1,
        email: createUserArg.email,
      })

      await expect(service.create(createUserArg)).rejects.toThrow(ExistException)
    })

    it('should create a new user', async () => {
      model.findOne.mockResolvedValueOnce(undefined)
      model.create.mockResolvedValueOnce(newUser)

      await service.create(createUserArg)

      expect(model.create).toHaveBeenCalledTimes(1)
      expect(model.create).toHaveBeenCalledWith(createUserArg)

      expect(mailService.sendMail).toHaveBeenCalledTimes(1)
      expect(mailService.sendMail).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        expect.any(Array),
      )
    })
  })

  it.todo('findAll')
  it.todo('update')
  it.todo('login')
  it.todo('find')
})
