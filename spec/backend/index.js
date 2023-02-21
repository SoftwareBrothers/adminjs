/* eslint-disable import/first */
import { factory } from 'factory-girl'

process.env.MONGO_URL = 'mongodb://mongo/admin-server-test'

global.factory = factory

import './adapters/base-record.spec.js'
import './bundler/generate-user-component-entry.spec.js'
import './decorators/property-decorator.spec.js'
import './decorators/resource-decorator.spec.js'
import './utils/populator.spec.js'
import './utils/resources-factory.spec.js'
