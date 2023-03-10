import { render } from '@testing-library/react'
import { expect } from 'chai'
import { factory } from 'factory-girl'
import React from 'react'

import TestContextProvider from '../../spec/test-context-provider.js'
import RecordsTableHeader from './records-table-header.js'
import { PropertyJSON } from '../../../interfaces/index.js'

import '../../spec/initialize-translations.js'
import '../../spec/property-json.factory.js'

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
