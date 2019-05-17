import React from 'react'
import { render } from 'react-testing-library'
import ValueBlock from './value-block'

require('jsdom-global')()

describe('Paginate', function () {
  this.timeout(5000)

  it('renders value', async function () {
    const value = 'some value'
    const { findAllByText } = render(
      <ValueBlock value={value} />,
    )
    const el = await findAllByText(value)
    expect(el).to.have.lengthOf(1)
  })
})
