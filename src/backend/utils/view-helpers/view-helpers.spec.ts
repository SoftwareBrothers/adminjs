import { expect } from 'chai'

import ViewHelpers from './view-helpers.js'

describe('ViewHelpers', function () {
  describe('#urlBuilder', function () {
    it('returns joined path for default rootUrl', function () {
      const h = new ViewHelpers({})
      expect(h.urlBuilder(['my', 'path'])).to.equal('/admin/my/path')
    })

    it('returns correct url when user gives admin root path not starting with /', function () {
      const h = new ViewHelpers({ options: { rootPath: 'admin' } })
      expect(h.urlBuilder(['my', 'path'])).to.equal('/admin/my/path')
    })

    it('returns correct url for rootPath set to /', function () {
      const h = new ViewHelpers({ options: { rootPath: '/' } })
      expect(h.urlBuilder(['my', 'path'])).to.equal('/my/path')
    })
  })
})
