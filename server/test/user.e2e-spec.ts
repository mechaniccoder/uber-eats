import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { createConnection } from 'mongoose'

describe('UserModule (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    const connection = createConnection('mongodb://localhost:27017/uber-eats-test')
    await connection.dropDatabase()
    await connection.close()

    await app.close()
  })

  it.todo('createUser')
  it.todo('login')
  it.todo('me')
  it.todo('profile')
  it.todo('updateProfile')
  it.todo('verifyCode')
})
