/**
 * Simple example showing hapi.js integration
 *
 * @module examples/hapijs
 */

const Hapi = require('hapi')
const HapiAuthCookie = require('hapi-auth-cookie')
const mongoose = require('mongoose')

// We use Bcrypt to hash password
const Bcrypt = require('bcrypt')
const adminBro = require('../../admin/integrations/hapi')

require('../mongoose/user-model')
const Article = require('../mongoose/article-model')
const Page = require('../mongoose/page-model')
require('../mongoose/comment-model')
require('../mongoose/blog-post-model')
require('../mongoose/category-model')


const ArticleDecorator = require('./article-decorator')

/**
 * Model which will store all admins
 * @type {Mongoose.model}
 */
const AdminModel = require('../mongoose/admin-model')

/**
 * Creates first admin test@example.com:password when there are no
 * admins in the database
 */
const createAdminIfNone = async () => {
  const existingAdmin = await AdminModel.countDocuments() > 0
  if (!existingAdmin) {
    const password = await Bcrypt.hash('password', 10)
    const admin = new AdminModel({ email: 'test@example.com', password })
    await admin.save()
  }
}

/**
 * Creates authentication logic for admin users
 * @param  {Hapi} options.server            Hapi.js server instance
 * @param  {Object} options.adminBroOptions Configiration options passed to admin bro
 * @param  {String} options.adminBroOptions.logoutPath
 * @param  {String} options.adminBroOptions.loginPath
 */
const registerAuthRoutes = async ({ server, adminBroOptions }) => {
  const { logoutPath, loginPath } = adminBroOptions

  // example authentication is based on the cookie store
  await server.register(HapiAuthCookie)

  server.auth.strategy('session', 'cookie', {
    // Make sure you change password used to secure content in cookies
    password: process.env.SESSION_PASSWORD || 'ksjdcirshaoscdoasoghjklw2nsyehsk',
    cookie: 'adminBro',
    redirectTo: loginPath,
    isSecure: false,
  })

  // Warning - in the example we set default auth to session.
  // It means that when you create another routes they will be using
  // this type, unless you override this in route options.
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
            request.cookieAuth.set(admin)
            return h.redirect(adminBroOptions.rootPath)
          }
          errorMessage = 'Wrong email and/or password'
        }

        // AdminBro exposes function which renders login form for us.
        // It takes 2 arguments:
        // - options.action (with login path)
        // - [errorMessage] optional error message - visible when user
        //                  gives wrong credentials
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
 * Initialization function for the application with the adminBro setup
 */
const start = async () => {
  let serverInfo
  try {
    const server = Hapi.server({ port: process.env.PORT })

    // We use MongoDB database
    const connection = await mongoose.connect(process.env.MONGO_URL)

    const adminBroOptions = {
      databases: [],
      models: [
        { model: Article, decorator: ArticleDecorator },
      ],
      auth: 'session',
      rootPath: '/admin',
      logoutPath: '/admin/logout',
      loginPath: '/admin/login',
    }

    // invoke previousely defined functions
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
