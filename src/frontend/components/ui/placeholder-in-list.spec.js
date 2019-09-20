import React from 'react'
import { render } from 'react-testing-library'
import TestContextProvider from '../spec/test-context-provider'
import PlaceholderInList from './placeholder-in-list'

require('jsdom-global')()

describe('PlaceholderInList', function () {
  this.timeout(5000)

  it('renders 4 rows with placeholders when 4 columns are provided', async function () {
    const columns = 4
    const { container } = render(
      <TestContextProvider>
        <PlaceholderInList columns={columns} />
      </TestContextProvider>,
    )
    const el = await container.getElementsByTagName('td')
    expect(el).to.have.lengthOf(columns)
  })
})
