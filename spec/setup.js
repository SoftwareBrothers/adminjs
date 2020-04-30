/* eslint-disable func-names */
/* eslint-disable mocha/no-top-level-hooks */
import { URLSearchParams } from 'url'

import chai from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import jsdom from 'jsdom-global'

process.env.NODE_ENV = 'test'

chai.use(sinonChai)

global.expect = chai.expect
global.URLSearchParams = URLSearchParams

beforeEach(function () {
  this.sinon = sinon.createSandbox()
  this.jsdom = jsdom()
})

afterEach(function () {
  this.sinon.restore()
  this.jsdom()
})
