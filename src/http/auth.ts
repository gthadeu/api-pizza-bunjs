import { Elysia, Static, t } from 'elysia'
import jwt from '@elysiajs/jwt'
import { env } from '../env'
import cookie from '@elysiajs/cookie'

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia()
  .use(
    jwt({
      secret: env.JWT_SECRET_KEY,
      schema: t.Object({
        sub: t.String(),
        restaurantId: t.Optional(t.String()),
      }),
    }),
  )
  .use(cookie())
  .derive(({ jwt, setCookie, removeCookie }) => {
    return {
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign(payload)

        setCookie('auth', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days,
          path: '/',
        })
      },

      signOut: () => {
        removeCookie('auth')
      },
    }
  })
