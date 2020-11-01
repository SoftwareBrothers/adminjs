import { buildAuthenticatedRouter } from '@admin-bro/express'

import AdminBro from 'admin-bro'
import express from 'express'

const PORT = 3000

export const listen = (
  admin: AdminBro,
  sessionStore,
  authenticate,
  port = PORT,
): void => {
  const router = buildAuthenticatedRouter(admin, {
    cookieName: process.env.COOKIE_NAME,
    cookiePassword: process.env.COOKIE_PASSWORD,
    authenticate,
  }, null, {
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })

  const app = express()

  app.use(admin.options.rootPath, router)

  app.use((error, req, res, next) => {
    if (error) {
      console.error(error)
    }
    next(error)
  })

  app.listen(port, () => console.log('app is listening on http://localhost:3000/admin'))
}
