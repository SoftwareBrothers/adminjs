const PageBuilder = require('@backend/utils/page-builder')

describe('PageBuilder', function () {
  beforeEach(function () {
    this.stubbedAdmin = { options: {} }
    this.args = { admin: this.stubbedAdmin }
    this._pageContent = []
    this.pageBuilder = new PageBuilder(this.args)
  })

  const options = {
    title: 'title',
    value: 2,
    icon: 'icon',
    columns: 3,
  }

  describe('#addBlock', function () {
    it('adds html element to the pageContent', async function () {
      await this.pageBuilder.addBlock(options, PageBuilder.COLOR.WARNING)
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
          }, PageBuilder.COLOR.INFO)
        }
      }

      this.pageExample = new PageExample(this.args)
    })

    it('throws an error when build method is not overriden', function () {
      expect(() => {
        this.pageBuilder.render().to.throw('You have to implement this')
      })
    })
    it('returns object with page settings', async function () {
      expect(await this.pageExample.render()).to.have.keys('title', 'content', 'subtitle')
    })
  })
})
