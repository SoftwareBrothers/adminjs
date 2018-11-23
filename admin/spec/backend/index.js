process.env.MONGO_URL = 'mongodb://mongo/admin-server-test'

const { factory } = require('factory-girl')

global.factory = factory

require('require.all')({ dir: './factories' })
require('require.all')({ dir: './adapters' })
