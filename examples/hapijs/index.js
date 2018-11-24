/**
 * Simple example showing hapi.js integration
 *
 * @module examples/hapijs
 */

const Hapi = require('hapi')
const mongoose = require('mongoose')
const adminBro = require('../../admin/integrations/hapi')
require('./user-model')
require('./article-model')

/**
 * Initialization function
 */
const start = async () => {
  let serverInfo
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL)
    const adminOptions = { databases: [connection] }

    const server = Hapi.server({ port: process.env.PORT })

    await server.register({
      plugin: adminBro,
      options: adminOptions,
    })
    await server.start()
    serverInfo = await server.start(connection)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Server running at:', serverInfo.info.uri)
}

start()
