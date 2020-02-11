import { expect } from 'chai'
import layoutTemplate from './layout-template'
import AdminBro from '../admin-bro'
import AdminBroOptions from '../admin-bro-options.interface'

describe('layoutTemplate', function () {
  context('AdminBro with default options and not logged in user', function () {
    beforeEach(function () {
      this.adminBro = new AdminBro({})
    })

    it('renders default company name', function () {
      expect(
        layoutTemplate(this.adminBro, undefined, '/'),
      ).to.contain(this.adminBro.options.branding.companyName)
    })

    it('links to global bundle', function () {
      expect(layoutTemplate(this.adminBro, undefined, '/')).to.contain('global.bundle.js')
    })
  })

  describe('AdminBro with branding options given', function () {
    beforeEach(function () {
      this.branding = {
        softwareBrothers: false,
        companyName: 'Other name',
        favicon: '/someImage.png',
      } as AdminBroOptions['branding']

      this.adminBro = new AdminBro({ branding: this.branding })
      this.renderedContent = layoutTemplate(this.adminBro, undefined, '/')
    })

    it('renders company name', function () {
      expect(this.renderedContent).to.contain(this.branding.companyName)
    })

    it('renders favicon', function () {
      expect(this.renderedContent).to.contain(
        `<link rel="shortcut icon" type="image/png" href="${this.branding.favicon}" />`,
      )
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
      expect(layoutTemplate(this.adminBro, undefined, '/')).to.contain(this.styleUrl)
    })

    it('adds scripts to the body', function () {
      expect(layoutTemplate(this.adminBro, undefined, '/')).to.contain(this.scriptUrl)
    })
  })
})
