const layoutTemplate = require('./layout-template')
const AdminBro = require('../admin-bro')

describe('layoutTemplate', function () {
  context('AdminBro with default options and not logged in user', function () {
    beforeEach(function () {
      this.adminBro = new AdminBro({})
    })
    it('renders default company name', function () {
      expect(
        layoutTemplate(this.adminBro, null, '/'),
      ).to.contain(this.adminBro.options.branding.companyName)
    })
  })

  describe('from where externals like React should be fetched', function () {
    context('user didn\'t override defaults', function () {
      it('takes React and other libraries from CDN', function () {
        const template = layoutTemplate(new AdminBro({}), null, '/')
        expect(template).not.to.contain('global.bundle.js')
        expect(template).to.contain('https://unpkg.com/react@16/umd/react.development.js')
        expect(template).to.contain('https://unpkg.com/react-dom@16/umd/react-dom.development.js')
      })
    })

    context('user defines that externals should be bundled from local file', function () {
      beforeEach(function () {
        this.adminBro = new AdminBro({
          assets: {
            globalsFromCDN: false,
          },
        })
      })

      it('links to global bundle', function () {
        expect(layoutTemplate(this.adminBro, null, '/')).to.contain('global.bundle.js')
      })
    })
  })

  context('custom styles and scripts were defined in AdminBro options', function () {
    beforeEach(function () {
      this.scriptUrl = 'http://somescript.com'
      this.styleUrl = 'http://somestyle.com'
      this.adminBro = new AdminBro({
        assets: {
          styles: [this.styleUrl],
          scripts: [this.scriptUrl],
        },
      })
    })

    it('adds styles to the head section', function () {
      expect(layoutTemplate(this.adminBro, null, '/')).to.contain(this.styleUrl)
    })

    it('adds scripts to the body', function () {
      expect(layoutTemplate(this.adminBro, null, '/')).to.contain(this.scriptUrl)
    })
  })
})
