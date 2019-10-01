import { factory } from 'factory-girl'

process.env.MONGO_URL = 'mongodb://mongo/admin-server-test'

global.factory = factory

require('./adapters/base-record.spec')
require('./bundler/generate-user-component-entry.spec')
require('./decorators/property-decorator.spec')
require('./decorators/resource-decorator.spec')
require('./utils/populator.spec')
require('./utils/resources-factory.spec')
