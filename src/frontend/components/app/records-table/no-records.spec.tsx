import React from 'react'
import { render, RenderResult } from 'react-testing-library'
import factory from 'factory-girl'
import { expect } from 'chai'

import TestContextProvider from '../../spec/test-context-provider'
import NoRecords from './no-records'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import ActionJSON from '../../../../backend/decorators/action-json.interface'

require('../../spec/resource-json.factory')

const renderComponent = (resource: ResourceJSON): RenderResult => render(
  <TestContextProvider>
    <NoRecords resource={resource} />
  </TestContextProvider>,
)

describe('<NoRecords />', function () {
  let resource: ResourceJSON

  beforeEach(async function () {
    const newAction = await factory.build<ActionJSON>('ActionJSON', { name: 'new' })
    resource = await factory.build<ResourceJSON>('ResourceJSON', {
      resourceActions: [newAction],
    })
  })

  context('resource can be created', function () {
    beforeEach(function () {
      const { findAllByText, container } = renderComponent(resource)
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
    it('does not have a link to create a new resource', function () {
      resource.resourceActions = []
      const { container } = renderComponent(resource)

      const a = container.querySelector('a')
      expect(a).to.be.null
    })
  })
})
