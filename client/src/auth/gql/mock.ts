import { LogInMutation, LogInMutationVariables } from '@/gql/graphql'
import { graphql } from 'msw'

export const createUserSuccess = graphql.mutation('CreateUser', (req, res, ctx) => {
  return res(
    ctx.data({
      createUser: {
        ok: true,
        error: null,
        data: null,
      },
    }),
  )
})

export const createUserAlreadyExistError = (delay?: number) =>
  graphql.mutation('CreateUser', (req, res, ctx) => {
    return res(
      ctx.delay(delay || 0),
      ctx.data({
        createUser: {
          ok: false,
          error: 'ExistException',
          data: null,
        },
      }),
    )
  })

export const loginNotFoundError = () =>
  graphql.mutation('LogIn', (req, res, ctx) => {
    return res(
      ctx.data({
        login: {
          ok: false,
          error: 'NotFoundException',
          data: null,
        },
      }),
    )
  })

export const loginNetworkError = () =>
  graphql.mutation<LogInMutation, LogInMutationVariables>('LogIn', (req, res, ctx) =>
    res.networkError('Network error'),
  )
