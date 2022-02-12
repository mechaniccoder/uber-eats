import { Test } from '@nestjs/testing'
import { UserService } from './user.service'
import { getModelToken } from '@nestjs/mongoose'
import { User } from './schema/user.schema'
import { Model } from 'mongoose'
import { JwtService } from '../jwt/jwt.service'
import { ConfigService } from '@nestjs/config'
import { MailService } from '../mail/mail.service'

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

describe('UserService', () => {
  let service: UserService
  let model: Model<User>

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
    model = moduleRef.get<Model<User>>(getModelToken(User.name))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it.todo('findAll')
  it.todo('create')
  it.todo('update')
  it.todo('login')
  it.todo('find')
})
