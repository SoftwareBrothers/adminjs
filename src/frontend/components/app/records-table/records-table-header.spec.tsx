import React from 'react'
import { render } from 'react-testing-library'
import factory from 'factory-girl'
import { expect } from 'chai'

import TestContextProvider from '../../spec/test-context-provider'
import RecordsTableHeader from './records-table-header'
import { PropertyJSON } from '../../../interfaces'

require('../../spec/property-json.factory')

describe('<RecordsTableHeader />', function () {
  it('renders columns for selected properties and actions', async function () {
    const property = await factory.build<PropertyJSON>('PropertyJSON', { isSortable: true })
    const { container } = render(
      <TestContextProvider>
        <table>
          <RecordsTableHeader
            properties={[property]}
            titleProperty={property}
            sortBy={this.sortBy}
            direction={this.direction}
          />
        </table>
      </TestContextProvider>,
    )
    expect(container.getElementsByTagName('td')).to.have.lengthOf(3)
  })
})
