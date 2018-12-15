const PageBuilder = require('@backend/utils/page-builder')

describe('PageBuilder', function () {
  beforeEach(function () {
    this.stubbedAdmin = { options: {} }
    this.args = { admin: this.stubbedAdmin }
    this.pageContent = []
    this.types = {
      warning: '#ff9f89',
      danger: '#f0616f',
      succes: '#21c197',
      info: '#718af4',
    }
    this.pageBuilder = new PageBuilder(this.args)
  })

  const options = {
    title: 'title',
    value: 2,
    icon: 'icon',
    columns: 3,
  }

  describe('#convertedPageContent', function () {
    it('returns null when this.pageContent is not declared', function () {
      expect(this.pageBuilder.convertedPageContent()).to.equal(null)
    })

    it('returns string of a HTML elements', function () {
      this.pageBuilder.addBlock(options, this.type.succes)
      expect(this.pageBuilder.convertedPageContent()).to.be.a('string')
    })
  })

  describe('#addBlock', function () {
    it('adds html element to the pageContent', function () {
      this.pageBuilder.addBlock(options, this.types.warning)
      expect(this.pageBuilder.pageContent).to.have.lengthOf(1)
    })
  })
})
