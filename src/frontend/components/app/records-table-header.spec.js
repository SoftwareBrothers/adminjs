import React from 'react'
import { render } from 'react-testing-library'
import { factory } from 'factory-girl'
import TestContextProvider from '../spec/test-context-provider'
import RecordsTableHeader from './records-table-header'

require('../../../../spec/fixtures/resource.factory')

describe('RecordsTableHeader', function () {
  beforeEach(async function () {
    this.property = await factory.build('property', { isSortable: true })
  })

  it('renders columns for selected properties and actions', function () {
    const { container } = render(
      <TestContextProvider>
        <RecordsTableHeader
          properties={[this.property]}
          titleProperty={this.property}
          sortBy={this.sortBy}
          direction={this.direction}
        />
      </TestContextProvider>,
    )
    expect(container.getElementsByTagName('th')).to.have.lengthOf(2)
  })
})
