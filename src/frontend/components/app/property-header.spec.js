import React from 'react'
import { render } from 'react-testing-library'
import { factory } from 'factory-girl'
import TestContextProvider from '../spec/test-context-provider'
import PropertyHeader from './property-header'

require('../../../../spec/fixtures/resource.factory')

describe('PropertyHeader', function () {
  this.timeout(5000)
  const location = { search: '' }

  beforeEach(async function () {
    this.property = await factory.build('property', { isSortable: true })
    this.titleProperty = this.property
  })

  context('render not selected but searchable field', function () {
    beforeEach(async function () {
      this.sortBy = 'otherProperty'
      this.direction = 'desc'

      const { findAllByText, container } = render(
        <TestContextProvider>
          <PropertyHeader
            property={this.property}
            titleProperty={this.titleProperty}
            location={location}
            sortBy={this.sortBy}
            direction={this.direction}
          />
        </TestContextProvider>,
      )
      this.findAllByText = findAllByText
      this.container = container
    })

    it('renders a label', async function () {
      const label = await this.findAllByText(this.property.label)
      expect(label).to.have.lengthOf(1)
    })

    it('wraps it within a link with an opposite direction', function () {
      const href = this.container.querySelector('a').getAttribute('href')
      const query = new URLSearchParams(href.replace('/?', ''))
      expect(query.get('direction')).to.equal('asc')
      expect(query.get('sortBy')).to.equal(this.property.name)
    })

    it('doesn\t render a sort indicator', function () {
      expect(this.container.querySelector('i')).to.be.null
    })
  })

  context('selected and searchable field', function () {
    beforeEach(async function () {
      this.sortBy = this.property.name
      this.direction = 'asc'

      const { findAllByText, container } = render(
        <TestContextProvider>
          <PropertyHeader
            property={this.property}
            titleProperty={this.titleProperty}
            location={location}
            sortBy={this.sortBy}
            direction={this.direction}
          />
        </TestContextProvider>,
      )
      this.findAllByText = findAllByText
      this.container = container
    })

    it('renders a sort indicator', function () {
      const icon = this.container.querySelector('i')
      expect(icon).not.to.be.null
      expect(icon.classList['0']).to.equal('icomoon-dropdown-open')
    })
  })
})
