/* eslint-disable func-names */
require('@babel/polyfill')
require('@babel/register')({
  presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-env')],
  extensions: ['.jsx', '.js'],
  only: [/src\/frontend/],
})

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

require('./admin-bro.spec')
require('./backend')
