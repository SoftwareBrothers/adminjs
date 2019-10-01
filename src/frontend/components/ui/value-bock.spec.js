import React from 'react'
import { render } from 'react-testing-library'
import ValueBlock from './value-block'
import TestContextProvider from '../spec/test-context-provider'

describe('ValueBlock', function () {
  this.timeout(5000)

  it('renders value', async function () {
    const value = 'some value'
    const { findAllByText } = render(
      <TestContextProvider>
        <ValueBlock value={value} />
      </TestContextProvider>,
    )
    const el = await findAllByText(value)
    expect(el).to.have.lengthOf(1)
  })
})
