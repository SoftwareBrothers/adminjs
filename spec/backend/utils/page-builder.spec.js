const PageBuilder = require('@backend/utils/page-builder')
const NotImplementedError = require('@backend/utils/not-implemented-error')

describe('PageBuilder', function () {
  beforeEach(function () {
    this.stubbedAdmin = { options: {} }
    this.args = { admin: this.stubbedAdmin }
    this._pageContent = []
    this.colorTypes = {
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

    it('returns string of a HTML elements', async function () {
      await this.pageBuilder.addBlock(options, this.colorTypes.succes)
      expect(this.pageBuilder.convertedPageContent()).to.be.a('string')
    })
  })

  describe('#addBlock', function () {
    it('adds html element to the pageContent', async function () {
      await this.pageBuilder.addBlock(options, this.colorTypes.warning)
      expect(this.pageBuilder._pageContent).to.have.lengthOf(1)
    })
  })

  describe('#render', function () {
    beforeEach(function () {
      class PageExample extends PageBuilder {
        constructor(params) {
          super(params)
          this.title = 'example page'
        }
        
        build() {
          this.addBlock({
            title: 'The number of all articles',
            value: 5,
            icon: 'fas fa-arrow-alt-circle-up fa-2x',
            columns: 3,
          }, this.colorTypes.info)
        }
      }

      this.pageExample = new PageExample(this.args)
    })

    it('throws an error when build method is not overriden', function () {
      expect(() => { 
        this.pageBuilder.render().to.throw('You have to overwrite this method')
      })
    })
    it('returns object with page settings', async function () {
      expect(await this.pageExample.render()).to.have.keys('title', 'header', 'content', 'charts')
    })
  })
})