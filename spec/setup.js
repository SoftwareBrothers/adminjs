process.env.NODE_ENV = 'test'

const { URLSearchParams } = require('url')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')

chai.use(sinonChai)

global.expect = chai.expect
global.URLSearchParams = URLSearchParams

beforeEach(function () {
  this.sinon = sinon.createSandbox()
})

afterEach(function () {
  this.sinon.restore()
})
