import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, NotFoundException } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from './../src/app.module'
import { createConnection } from 'mongoose'
import { ExistException } from 'src/user/user.exception'
import { Response } from 'src/shared/factory/response.factory'

const GRAPHQL_ENDPOINT = '/graphql'

jest.mock('mailgun.js', () =>
  jest.fn(() => ({
    client: () => ({
      messages: {
        create: jest.fn(),
      },
    }),
  })),
)

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

  const TEST_EMAIL = 'seunghwan3@gmail.com'
  const TEST_PASSWORD = '123'

  describe('createUser', () => {
    it('should create a user', () => {
      return request(app.getHttpServer())
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
          expect(extractRes(res).createUser.ok).toBe(true)
        })
    })

    it('should fail if user already exists', () => {
      return request(app.getHttpServer())
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
        .expect((res) => {
          const { createUser } = extractRes(res)
          expect(createUser.ok).toBe(false)
          expect(createUser.error).toBe(ExistException.name)
        })
    })
  })

  describe('login', () => {
    it('should login with correct credentials', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
        mutation {
          login(loginArgs: {email: "${TEST_EMAIL}", password: "${TEST_PASSWORD}"}) {
            ok
            data
            error
          }
        }`,
        })
        .expect((res) => {
          const { login } = extractRes(res)
          expect(login.ok).toBe(true)
          expect(login.data).toEqual(expect.any(String))
          expect(login.error).toBe(null)
        })
    })
    it('should not login with wrong correct credentials', () => {
      request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
      mutation {
        login(loginArgs: {email: "wrong@email.com", password: "${TEST_PASSWORD}"}) {
          ok
          data
          error
        }
      }`,
        })
        .expect((res) => {
          expect(extractRes(res).login).toEqual({
            ok: false,
            data: null,
            error: NotFoundException.name,
          })
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

function extractRes(res: request.Response): Record<string, Response> {
  const {
    body: { data },
  } = res

  return data
}
