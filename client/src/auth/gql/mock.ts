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
