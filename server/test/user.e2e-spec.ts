import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from './../src/app.module'
import { createConnection } from 'mongoose'

const GRAPHQL_ENDPOINT = '/graphql'

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

  describe('createUser', () => {
    const TEST_EMAIL = 'seunghwan3@gmail.com'
    const TEST_PASSWORD = '123'

    it('should create a user', async () => {
      return await request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
          mutation {
            createUser(createUserArgs: {email: "${TEST_EMAIL}", password: "${TEST_PASSWORD}", role: delivery}) {
              ok
              error
              data {
                email
                role
                id
                verification {
                  code
                }
              }
            }
          } 
          `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser.ok).toBe(true)
        })
    })
  })

  it.todo('createUser')
  it.todo('login')
  it.todo('me')
  it.todo('profile')
  it.todo('updateProfile')
  it.todo('verifyCode')
})
