import { expect } from 'chai'

import Router from './router'

describe('Router', function () {
  it('has routes', function () {
    expect(Router.routes).not.to.be.undefined
  })
})
