import { Test } from '@nestjs/testing'
import { UserService } from './user.service'
import { getModelToken } from '@nestjs/mongoose'
import { User, UserModel, UserRole } from './schema/user.schema'
import { Model } from 'mongoose'
import { JwtService } from '../jwt/jwt.service'
import { ConfigService } from '@nestjs/config'
import { MailService } from '../mail/mail.service'
import { ExistException } from './user.exception'
import { LoginDto } from './dto/login.dto'
import { BadRequestException, NotFoundException } from '@nestjs/common'

const testUser = {
  id: '1',
  email: 'test@test.com',
  role: UserRole.customer,
  password: '123',
  verification: {
    code: '123456',
    isVerified: false,
  },
}

const mockedUserModel: Partial<UserModel> = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  comparePassword: jest.fn(),
}

const mockedJwtService: Partial<JwtService> = {
  sign: jest.fn(),
  verify: jest.fn(),
}

const mockedMailService: Partial<MailService> = {
  sendMail: jest.fn(),
}

type MockedModel<T = any> = Partial<Record<keyof (Model<T> & UserModel), jest.Mock>>

describe('UserService', () => {
  let service: UserService
  let model: MockedModel<User>
  let mailService: MailService
  let jwtService: JwtService

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

    model = moduleRef.get<MockedModel<User>>(getModelToken(User.name))
    service = moduleRef.get<UserService>(UserService)
    mailService = moduleRef.get<MailService>(MailService)
    jwtService = moduleRef.get<JwtService>(JwtService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    const createUserArg = {
      email: testUser.email,
      password: testUser.password,
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
      model.create.mockResolvedValueOnce(testUser)

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

  describe('login', () => {
    const loginArgs: LoginDto = {
      email: testUser.email,
      password: testUser.password,
    }
    it('should fail if user not exist', async () => {
      model.findOne.mockResolvedValueOnce(null)

      await expect(service.login(loginArgs)).rejects.toThrow(NotFoundException)
    })

    it('should fail if password not matched', async () => {
      model.findOne.mockResolvedValueOnce(testUser)
      model.comparePassword.mockResolvedValueOnce(false)

      await expect(service.login(loginArgs)).rejects.toThrow(BadRequestException)
    })

    it('should return token on success', async () => {
      model.findOne.mockResolvedValueOnce(testUser)
      model.comparePassword.mockResolvedValueOnce(true)

      await service.login(loginArgs)

      expect(jwtService.sign).toHaveBeenCalledTimes(1)
      expect(jwtService.sign).toHaveBeenCalledWith({ id: testUser.id })
    })
  })

  describe('find', () => {
    it('should fail if user not found', async () => {
      model.findOne.mockResolvedValueOnce(null)

      await expect(service.find({})).rejects.toThrow(NotFoundException)
    })

    it('should return a user', async () => {
      model.findOne.mockResolvedValueOnce(testUser)

      const aUser = await service.find({})

      expect(aUser).toMatchObject(testUser)
    })
  })

  it.todo('update')
})
