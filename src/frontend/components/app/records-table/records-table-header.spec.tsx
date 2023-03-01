import { render } from '@testing-library/react'
import { expect } from 'chai'
import factory from 'factory-girl'
import React from 'react'
import { PropertyJSON } from '../../../interfaces'
import TestContextProvider from '../../spec/test-context-provider'
import RecordsTableHeader from './records-table-header'

import '../../spec/initialize-translations'
import '../../spec/property-json.factory'

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
