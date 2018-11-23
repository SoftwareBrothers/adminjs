/**
 * @fileOverview cofiguratin for /code route serving jsdoc documentation
 */

const admin = require('../../admin')

module.exports.register = async (server, connection) => {
  const adminOptions = { databases: [connection] }

  await server.register({
    plugin: admin,
    options: adminOptions,
  })
}
