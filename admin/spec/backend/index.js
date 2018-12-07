process.env.MONGO_URL = 'mongodb://mongo/admin-server-test'

const { factory } = require('factory-girl')

global.factory = factory

require('require.all')({ dir: './fixtures' })
require('require.all')({ dir: './adapters' })
require('require.all')({ dir: './utils' })
