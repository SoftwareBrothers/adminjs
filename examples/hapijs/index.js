const server = require('./server')
const database = require('./database')
require('./user-model')
require('./article-model')

const start = async () => {
  let serverInfo
  try {
    const connection = await database.connect()
    serverInfo = await server.start(connection)
    console.log(server)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Server running at:', serverInfo.info.uri)
}

start()
