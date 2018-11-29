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

require('./user-model')
require('./article-model')
require('./comment-model')
require('./blog-post-model')
require('./category-model')
require('./page-model')

const AdminModel = require('./admin-model')

/**
 * Initialization function
 */
const start = async () => {
  let serverInfo
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL)
    const adminOptions = {
      databases: [connection],
    }
    const existingAdmin = await AdminModel.findOne({ email: 'test@example.com' })
    if (!existingAdmin) {
      const password = await Bcrypt.hash('password', 10)
      const admin = new AdminModel({ email: 'test@example.com', password })
      await admin.save()
    }
    const server = Hapi.server({ port: process.env.PORT })
    await server.register(HapiAuthCookie)
    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 })

    server.auth.strategy('session', 'cookie', {
      password: process.env.SESSION_PASSWORD || 'ksjdcirshaoscdoasoghjklw2nsyehsk',
      cookie: 'admin',
      redirectTo: '/admin/login',
      isSecure: false,
      validateFunc: async (request, session) => {
        let out = null
        try {
          console.log('session.sid', session)
          const cached = await cache.get(session)
          out = { valid: !!cached }

          if (out.valid) {
            out.credentials = cached
          }
        } catch (e) {
          console.log(e)
          throw e
        }

        return out
      },
    })

    server.auth.default('session')

    server.route({
      method: ['POST', 'GET'],
      path: '/admin/login',
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
              // const sid = mongoose.Types.ObjectId().toString()
              // await request.server.app.cache.set(sid, { admin }, 0)
              request.cookieAuth.set(admin)
              return h.redirect('/admin')
            }
            errorMessage = 'Wrong email and/or password'
          }
          return adminBro.renderLogin({ action: '/admin/login', errorMessage })
        }catch(e) {
          console.log(e)
        }
      },
    })

    await server.register({
      plugin: adminBro,
      options: adminOptions,
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
