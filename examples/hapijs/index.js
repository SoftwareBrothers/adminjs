/**
 * Simple example showing hapi.js integration
 *
 * @module examples/hapijs
 */

const Hapi = require('hapi')
const HapiAuthCookie = require('hapi-auth-cookie')
const mongoose = require('mongoose')
const Bcrypt = require('bcrypt')
const adminBro = require('../../admin/integrations/hapi')

// Example mongoose models used in the app
require('./user-model')
require('./article-model')
require('./comment-model')
require('./blog-post-model')
require('./category-model')
require('./page-model')

const AdminModel = require('./admin-model')

const createAdminIfNone = async () => {
  const existingAdmin = await AdminModel.findOne({ email: 'test@example.com' })
  if (!existingAdmin) {
    const password = await Bcrypt.hash('password', 10)
    const admin = new AdminModel({ email: 'test@example.com', password })
    await admin.save()
  }
}

const registerAuthRoutes = async ({ server, adminBroOptions }) => {
  const { logoutPath, loginPath } = adminBroOptions

  await server.register(HapiAuthCookie)

  server.auth.strategy('session', 'cookie', {
    password: process.env.SESSION_PASSWORD || 'ksjdcirshaoscdoasoghjklw2nsyehsk',
    cookie: 'adminBro',
    redirectTo: loginPath,
    isSecure: false,
  })
  server.auth.default('session')

  server.route({
    method: ['POST', 'GET'],
    path: loginPath,
    options: {
      auth: { mode: 'try' },
      plugins: { 'hapi-auth-cookie': { redirectTo: false } },
    },
    handler: async (request, h) => {
      try {
        let errorMessage = null
        if (request.method === 'post') {
          const admin = await AdminModel.findOne({ email: request.payload.email })
          const isValid = admin && await Bcrypt.compare(request.payload.password, admin.password)
          if (isValid) {
            request.cookieAuth.set({ admin })
            return h.redirect(adminBroOptions.rootPath)
          }
          errorMessage = 'Wrong email and/or password'
        }
        return adminBro.renderLogin({ action: loginPath, errorMessage })
      } catch (e) {
        console.log(e)
      }
    },
  })

  server.route({
    method: 'GET',
    path: logoutPath,
    handler: async (request, h) => {
      request.cookieAuth.clear()
      return h.redirect(loginPath)
    },
  })
}

/**
 * Initialization function
 */
const start = async () => {
  let serverInfo
  try {
    const server = Hapi.server({ port: process.env.PORT })

    const connection = await mongoose.connect(process.env.MONGO_URL)
    const adminBroOptions = {
      databases: [connection],
      auth: 'session',
      rootPath: '/admin',
      logoutPath: '/admin/logout',
      loginPath: '/admin/login',
    }
    await createAdminIfNone()
    await registerAuthRoutes({ server, adminBroOptions })

    await server.register({
      plugin: adminBro,
      options: adminBroOptions,
    })

    await server.start()
    serverInfo = server.info
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Server running at:', serverInfo.uri)
}

start()
