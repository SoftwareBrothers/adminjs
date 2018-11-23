/**
 * @fileOverview Hapi server main configuration file
 */

const Hapi = require('hapi')
const admin = require('./admin')

module.exports.start = async (connection) => {
  const server = Hapi.server({ port: process.env.PORT })

  await admin.register(server, connection)

  await server.start()
  console.log('started')
  return server
}
