import { buildRouter } from '@admin-bro/express'

import AdminBro from 'admin-bro'
import express from 'express'

const PORT = 3000

export const listen = (admin: AdminBro, port = PORT) => {
  const router = buildRouter(admin)
  const app = express()

  app.use(admin.options.rootPath, router)

  app.use((error, req, res, next) => {
    if (error) {
      console.error(error)
    }
    next(error)
  })

  app.listen(PORT, () => console.log('app is listening on http://localhost:3000/admin'))
}
