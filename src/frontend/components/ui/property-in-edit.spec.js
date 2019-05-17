import React from 'react'
import { render } from 'react-testing-library'
import PropertyInEdit from './property-in-edit'

require('jsdom-global')()

describe('PropertyInEdit', function () {
  this.timeout(5000)
  beforeEach(function () {
    this.property = {
      name: 'name',
      label: 'someLabel',
    }
  })

  it('renders label', async function () {
    const { findByText } = render(
      <PropertyInEdit property={this.property} />,
    )
    const label = await findByText(this.property.label)
    expect(label).not.to.be.null
  })

  it('renders error when it was given', async function () {
    const error = { message: 'some message' }
    const { findByText } = render(
      <PropertyInEdit property={this.property} error={error} />,
    )
    const errorObject = await findByText(error.message)
    expect(errorObject).not.to.be.null
  })
})
