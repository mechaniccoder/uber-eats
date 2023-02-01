import { graphql } from 'msw'

export const handlers = [
  graphql.mutation('CreateUser', (req, res, ctx) => {
    return res(
      ctx.data({
        createUser: {
          ok: true,
          error: null,
          data: null,
        },
      }),
    )
  }),
]
