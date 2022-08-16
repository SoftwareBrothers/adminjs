import Router from './router'

describe('Router', () => {
  it('has both assets and routes', () => {
    expect(Router.assets).toBeDefined()
    expect(Router.routes).toBeDefined()
  })

  it('returns development bundle by default', () => {
    const asset = Router.assets.find((a) => a.path === '/frontend/assets/app.bundle.js')

    expect(asset && asset.src).toEqual(expect.arrayContaining(['scripts/app-bundle.development.js']))
  })
})
