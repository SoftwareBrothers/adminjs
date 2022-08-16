import ViewHelpers from './view-helpers'

describe('ViewHelpers', () => {
  describe('#urlBuilder', () => {
    it('returns joined path for default rootUrl', () => {
      const h = new ViewHelpers({})
      expect(h.urlBuilder(['my', 'path'])).toBe('/admin/my/path')
    })

    it(
      'returns correct url when user gives admin root path not starting with /',
      () => {
        const h = new ViewHelpers({ options: { rootPath: 'admin' } })
        expect(h.urlBuilder(['my', 'path'])).toBe('/admin/my/path')
      }
    )

    it('returns correct url for rootPath set to /', () => {
      const h = new ViewHelpers({ options: { rootPath: '/' } })
      expect(h.urlBuilder(['my', 'path'])).toBe('/my/path')
    })
  })
})
