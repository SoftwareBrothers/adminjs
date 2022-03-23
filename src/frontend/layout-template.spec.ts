import { expect } from 'chai'
import layoutTemplate from './layout-template'
import AdminJS from '../adminjs'
import { BrandingOptions } from '../adminjs-options.interface'

describe('layoutTemplate', function () {
  context('AdminJS with branding options set as a function', function () {
    const companyName = 'Dynamic Company'
    let html: string

    beforeEach(async function () {
      const adminJs = new AdminJS({
        branding: async () => ({ companyName }),
      })

      html = await layoutTemplate(adminJs, undefined, '/')
    })

    it('renders default company name', function () {
      expect(html).to.contain(companyName)
    })

    it('links to global bundle', async function () {
      expect(html).to.contain('global.bundle.js')
    })
  })

  describe('AdminJS with branding options given', function () {
    const branding = {
      withMadeWithLove: false,
      companyName: 'Other name',
      favicon: '/someImage.png',
    } as BrandingOptions
    let html: string

    beforeEach(async function () {
      const adminJs = new AdminJS({ branding })

      html = await layoutTemplate(adminJs, undefined, '/')
    })

    it('renders company name', function () {
      expect(html).to.contain(branding.companyName)
    })

    it('renders favicon', function () {
      expect(html).to.contain(
        `<link rel="shortcut icon" type="image/png" href="${branding.favicon}" />`,
      )
    })
  })

  context('custom styles and scripts were defined in AdminJS options', function () {
    let html: string
    const scriptUrl = 'http://somescript.com'
    const styleUrl = 'http://somestyle.com'

    beforeEach(async function () {
      const adminJs = new AdminJS({
        assets: {
          styles: [styleUrl],
          scripts: [scriptUrl],
        },
      })

      html = await layoutTemplate(adminJs, undefined, '/')
    })

    it('adds styles to the head section', function () {
      expect(html).to.contain(styleUrl)
    })

    it('adds scripts to the body', function () {
      expect(html).to.contain(scriptUrl)
    })
  })
})
