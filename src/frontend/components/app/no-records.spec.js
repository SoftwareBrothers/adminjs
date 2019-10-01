import React from 'react'
import { render } from 'react-testing-library'
import { factory } from 'factory-girl'
import TestContextProvider from '../spec/test-context-provider'
import NoRecords from './no-records'

require('../../../../spec/fixtures/resource.factory')

const renderComponent = resource => render(
  <TestContextProvider>
    <NoRecords resource={resource} />
  </TestContextProvider>,
)

describe('NoRecords', function () {
  this.timeout(5000)

  beforeEach(async function () {
    this.resource = await factory.build('resource')
  })

  context('resource can be created', function () {
    beforeEach(function () {
      const { findAllByText, container } = renderComponent(this.resource)
      this.findAllByText = findAllByText
      this.container = container
    })

    it('shows notification that there are no records', async function () {
      const info = await this.findAllByText('No records')
      expect(info).to.have.lengthOf(1)
    })

    it('has a link to create a new resource', function () {
      const a = this.container.querySelector('a')
      expect(a).not.to.be.null
    })
  })

  context('resource can not be created', function () {
    beforeEach(function () {
      this.resource.resourceActions = []
      const { findAllByText, container } = renderComponent(this.resource)
      this.findAllByText = findAllByText
      this.container = container
    })

    it('does not have a link to create a new resource', function () {
      const a = this.container.querySelector('a')
      expect(a).to.be.null
    })
  })
})
