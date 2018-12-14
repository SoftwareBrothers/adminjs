const PageBuilder = require('@backend/utils/page-builder')

describe('PageBuilder', function () {
  beforeEach(function () {
    this.stubbedAdmin = { options: {} }
    this.args = { admin: this.stubbedAdmin }
    this.pageContent = []
    this.PageBuilder = new PageBuilder(this.args)
  })

  const options = {
    title: 'title',
    value: 2,
    icon: 'icon',
    columns: 3,
  }

  describe('#convertedPageContent', function () {
    it('returns null when this.pageContent is not declared', function () {
      expect(this.PageBuilder.convertedPageContent()).to.equal(null)
    })

    it('returns string of a HTML elements', function () {
      this.PageBuilder.addInfoBlock(options)
      expect(this.PageBuilder.convertedPageContent()).to.be.a('string')
    })
  })

  describe('#addBlock', function () {
    it('adds html element to the pageContent', function () {
      this.PageBuilder.addBlock(options, { color: '#ffffff' })
      expect(this.PageBuilder.pageContent).to.have.lengthOf(1)
    })
  })
})
