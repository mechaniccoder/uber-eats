import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, NotFoundException, ForbiddenException } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from './../src/app.module'
import { createConnection } from 'mongoose'
import { ExistException } from 'src/user/user.exception'
import { Response } from 'src/shared/factory/response.factory'
import { User, UserModel } from 'src/user/schema/user.schema'
import { getModelToken } from '@nestjs/mongoose'
import {
  CodeAlreadyVerifiedException,
  CodeNotMatchException,
} from 'src/user/verification.exception'

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
  let userModel: UserModel
  let jwtToken: string
  let verificationCode: string

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    userModel = moduleRef.get<UserModel>(getModelToken(User.name))

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
          const { createUser } = extractRes(res)

          expect(createUser.ok).toBe(true)
          expect(createUser.error).toBeNull()
          expect(createUser.data).toBe(null)
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

          jwtToken = login.data
        })
    })

    it('should not login with wrong correct credentials', () => {
      return request(app.getHttpServer())
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

  describe('profile', () => {
    let userId: string

    beforeAll(async () => {
      const [user] = await userModel.find()
      userId = user.id
    })

    it("should find a user's profile", async () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('authorization', jwtToken)
        .send({
          query: `
        query {
          profile(id: "${userId}") {
            ok
            error
            data {
              id
              email
              role
              verification {
                code
                isVerified
              }
            }
          }
        }`,
        })
        .expect((res) => {
          const { profile } = extractRes(res)

          expect(profile.ok).toBe(true)
          expect(profile.data.id).toBe(userId)
          expect(profile.error).toBeNull()

          verificationCode = profile.data.verification.code
        })
    })

    it('should fail if token is invalid', async () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('authorization', 'testFailedJWT')
        .send({
          query: `
        query {
          profile(id: "${userId}") {
            ok
            error
            data {
              id
              email
              role
              verification {
                code
                isVerified
              }
            }
          }
        }`,
        })
        .expect((res) => {
          const { profile } = extractRes(res)

          expect(profile.ok).toBe(false)
          expect(profile.data).toBeNull()
          expect(profile.error).toBe(ForbiddenException.name)
        })
    })

    it('should fail if user id not valid', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('authorization', jwtToken)
        .send({
          query: `
        query {
          profile(id: "66") {
            ok
            error
            data {
              id
              email
              role
              verification {
                code
                isVerified
              }
            }
          }
        }`,
        })
        .expect((res) => {
          const { profile } = extractRes(res)

          expect(profile.ok).toBe(false)
          expect(profile.data).toBeNull()
          expect(profile.error).toBe('CastError')
        })
    })
  })

  describe('me', () => {
    it('should return me info', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('authorization', jwtToken)
        .send({
          query: `
        query {
          me {
            ok
            error
            data {
              id
              email
              role
            }
          }
        } 
        `,
        })
        .expect((res) => {
          const { me } = extractRes(res)

          expect(me.ok).toBe(true)
          expect(me.data).not.toBeNull()
          expect(me.data.email).toBe(TEST_EMAIL)
          expect(me.error).toBeNull()
        })
    })

    it('should fail if token is invalid', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('authorization', 'failedJWT')
        .send({
          query: `
        query {
          me {
            ok
            error
            data {
              id
              email
              role
            }
          }
        } 
        `,
        })
        .expect((res) => {
          const { me } = extractRes(res)

          expect(me.ok).toBe(false)
          expect(me.data).toBeNull()
          expect(me.error).toBe(ForbiddenException.name)
        })
    })
  })

  describe('updateProfile', () => {
    const updatedEmail = 'update@update.com'
    it('should update user', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('authorization', jwtToken)
        .send({
          query: `
          mutation {
            updateProfile(updateProfileArgs: {email: "${updatedEmail}"}) {
              ok
              error
              data {
                email
              }
            }
          }
      `,
        })
        .expect((res) => {
          const { updateProfile } = extractRes(res)

          expect(updateProfile.ok).toBe(true)
          expect(updateProfile.data.email).toBe(updatedEmail)
          expect(updateProfile.error).toBeNull()
        })
    })

    it('should fail if token is invalid', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('authorization', 'failToken')
        .send({
          query: `
          mutation {
            updateProfile(updateProfileArgs: {email: "${updatedEmail}"}) {
              ok
              error
              data {
                email
              }
            }
          }
      `,
        })
        .expect((res) => {
          const { updateProfile } = extractRes(res)

          expect(updateProfile.ok).toBe(false)
          expect(updateProfile.data).toBeNull()
          expect(updateProfile.error).toBe(ForbiddenException.name)
        })
    })
  })

  describe('verifyCode', () => {
    it('should fail if code not match', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('authorization', jwtToken)
        .send({
          query: `
          mutation {
            verifyCode(verifyCodeArgs: {code: "000000"}) {
              ok
              error
              data
            }
          }
      `,
        })
        .expect((res) => {
          const { verifyCode } = extractRes(res)

          expect(verifyCode.ok).toBe(false)
          expect(verifyCode.error).toBe(CodeNotMatchException.name)
          expect(verifyCode.data).toBeNull()
        })
    })

    it('should verify code', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('authorization', jwtToken)
        .send({
          query: `
          mutation {
            verifyCode(verifyCodeArgs: {code: "${verificationCode}"}) {
              ok
              error
              data
            }
          }
      `,
        })
        .expect((res) => {
          const { verifyCode } = extractRes(res)

          expect(verifyCode.ok).toBe(true)
          expect(verifyCode.error).toBeNull()
          expect(verifyCode.data).toBeNull()
        })
    })

    it('should fail if code not match', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('authorization', jwtToken)
        .send({
          query: `
          mutation {
            verifyCode(verifyCodeArgs: {code: "${verificationCode}"}) {
              ok
              error
              data
            }
          }
      `,
        })
        .expect((res) => {
          const { verifyCode } = extractRes(res)

          expect(verifyCode.ok).toBe(false)
          expect(verifyCode.error).toBe(CodeAlreadyVerifiedException.name)
          expect(verifyCode.data).toBeNull()
        })
    })
  })
})

function extractRes(res: request.Response): Record<string, Response> {
  const {
    body: { data },
  } = res

  return data
}
