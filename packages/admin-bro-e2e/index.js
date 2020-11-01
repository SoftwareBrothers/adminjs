require('dotenv-json')({ path: 'cypress.env.json' })
const express = require('express')
const { default: AdminBro } = require('admin-bro')
const mongoose = require('mongoose')
const options = require('./src/admin.options')
const buildAdminRouter = require('./src/admin.router')

const { APP_PORT, MONGO_URL, APP_ROOT } = process.env

const app = express()

/**
 * @return {Promise<void>}
 */
const run = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const admin = new AdminBro({
    ...options,
    rootPath: APP_ROOT,
  })
  const router = await buildAdminRouter(admin)

  app.use(admin.options.rootPath, router)

  app.use('/uploads', express.static('uploads'))

  app.listen(+APP_PORT, () => console.log(
    `Example app listening at http://localhost:${APP_PORT}${APP_ROOT}`,
  ))
}


run()
