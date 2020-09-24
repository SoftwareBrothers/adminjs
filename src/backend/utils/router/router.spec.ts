import { expect } from 'chai'

import Router from './router'

describe('Router', function () {
  it('has both assets and routes', function () {
    expect(Router.assets).not.to.be.undefined
    expect(Router.routes).not.to.be.undefined
  })

  it('returns development bundle by default', function () {
    const asset = Router.assets.find(a => a.path === '/frontend/assets/app.bundle.js')

    expect(asset && asset.src).to.contain('scripts/app-bundle.development.js')
  })
})
