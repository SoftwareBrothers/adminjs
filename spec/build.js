/* eslint-disable func-names */
process.env.NODE_ENV = 'test'

const chai = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')

chai.use(sinonChai)

global.expect = chai.expect

beforeEach(function () {
  this.sinon = sinon.createSandbox()
})

afterEach(function () {
  this.sinon.restore()
})

require('require.all')({
  dir: '../build/',
  match: /spec\.js$/i,
  recursive: true,
})
