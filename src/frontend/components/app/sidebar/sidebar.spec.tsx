import sinon from 'sinon'
import React from 'react'
import { RenderResult, render } from 'react-testing-library'
import { Provider } from 'react-redux'
import factory from 'factory-girl'
import { expect } from 'chai'

import createStore from '../../../store/store'
import Sidebar from './sidebar'
import TestContextProvider from '../../spec/test-context-provider'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import { BrandingOptions } from '../../../../admin-bro-options.interface'
import PageJSON from '../../../../backend/decorators/page-json.interface'
import * as TranslateFunctionsFactory from '../../../../utils/translate-functions.factory'

import '../../spec/resource-json.factory'
import '../../spec/page-json.factory'
import ActionJSON from '../../../../backend/decorators/action-json.interface'

describe('<Sidebar />', function () {
  const renderTestSubject = (
    resources: Array<ResourceJSON> = [],
    branding: BrandingOptions = {},
    pages: Array<PageJSON> = [],
  ): RenderResult => {
    const store = createStore({ resources, branding, pages })
    return render(
      <Provider store={store}>
        <TestContextProvider>
          <Sidebar isVisible />
        </TestContextProvider>
      </Provider>,
    )
  }

  beforeEach(async function () {
    sinon.stub(TranslateFunctionsFactory, 'createFunctions').returns({
      translateMessage: sinon.stub().returns('someMessage'),
      translateButton: sinon.stub().returns('translated message'),
      translateLabel: sinon.stub().returns('translated label'),
    } as unknown as TranslateFunctionsFactory.TranslateFunctions)
  })

  afterEach(function () {
    sinon.restore()
  })

  context('Only 4 resources were set in a store, all having list action', function () {
    let resources: Array<ResourceJSON>

    beforeEach(async function () {
      resources = await factory.buildMany<ResourceJSON>('ResourceJSON', 4, {
        resourceActions: [
          await factory.build<ActionJSON>('ActionJSON', {
            name: 'list',
          }),
        ],
      })
    })

    it('renders links to all resources', async function () {
      const { container } = await renderTestSubject(resources)

      const sidebarLinks = container.querySelectorAll('[data-testid="sidebar-resource-link"]')
      expect(sidebarLinks).to.have.lengthOf(4)
    })

    it('does not show any pages', async function () {
      const { container } = await renderTestSubject(resources)

      const pageLinks = container.querySelectorAll('[data-testid="sidebar-page-link"]')
      expect(pageLinks).to.have.lengthOf(0)
    })
  })

  context('one resource without href has been set in a store', function () {
    it('does not show any resources in the sidebar', async function () {
      const resources = await factory.buildMany<ResourceJSON>('ResourceJSON', 1, {
        href: null,
      })

      const { container } = await renderTestSubject(resources)

      const sidebarLinks = container.querySelectorAll('[data-testid="sidebar-resource-link"]')
      expect(sidebarLinks).to.have.lengthOf(0)
    })
  })

  context('2 pages were set in a store', function () {
    it('shows links to all given pages', async function () {
      const pages = await factory.buildMany<PageJSON>('PageJSON', 2)

      const { container } = await renderTestSubject([], {}, pages)

      const sidebarLinks = container.querySelectorAll('[data-testid="sidebar-page-link"]')
      expect(sidebarLinks).to.have.lengthOf(2)
    })
  })
})
