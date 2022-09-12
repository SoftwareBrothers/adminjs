/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
/* eslint-disable mocha/no-top-level-hooks */
const chai = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')

process.env.NODE_ENV = 'test'

chai.use(sinonChai)

global.expect = chai.expect

beforeEach(function () {
  this.sinon = sinon.createSandbox()
})

afterEach(function () {
  this.sinon.restore()
})

// eslint-disable-next-line mocha/no-exports
module.exports = {}
