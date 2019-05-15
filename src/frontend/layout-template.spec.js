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
