require('module-alias/register')

process.env.NODE_ENV = 'test'

const chai = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')
const chaiChange = require('chai-change')

chai.use(chaiChange)
chai.use(sinonChai)

global.sinon = sinon
global.expect = chai.expect

beforeEach(async () => {
  this.sinon = global.sinon.createSandbox()
})

afterEach(async () => {
  this.sinon.restore()
})

require('./backend')
