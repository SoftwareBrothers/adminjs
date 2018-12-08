require('module-alias/register')

process.env.NODE_ENV = 'test'

const chai = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')
const chaiChange = require('chai-change')

chai.use(chaiChange)
chai.use(sinonChai)

global.expect = chai.expect

beforeEach(function() {
  this.sinon = sinon.createSandbox()
})

afterEach(function() {
  this.sinon.restore()
})

require('./backend')
