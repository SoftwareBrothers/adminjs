import { render, RenderResult } from '@testing-library/react'
import { expect } from 'chai'
import { factory } from 'factory-girl'
import React from 'react'

import TestContextProvider from '../../spec/test-context-provider.js'
import PropertyHeader from './property-header.js'
import { PropertyJSON } from '../../../interfaces/index.js'

import '../../spec/initialize-translations.js'
import '../../spec/property-json.factory.js'

const renderSubject = (
  property: PropertyJSON,
  sortBy: string,
  sortDirection: 'desc' | 'asc',
): RenderResult => render(
  <TestContextProvider>
    <table>
      <tbody>
        <tr>
          <PropertyHeader
            property={property}
            titleProperty={property}
            sortBy={sortBy}
            direction={sortDirection}
          />
        </tr>
      </tbody>
    </table>
  </TestContextProvider>,
)

describe('<PropertyHeader />', function () {
  const direction = 'desc'
  const sortBy = 'otherProperty'
  let property: PropertyJSON

  beforeEach(async function () {
    property = await factory.build<PropertyJSON>('PropertyJSON', { isSortable: true })
    factory.resetSequence('property.label')
  })

  afterEach(function () {
    factory.resetSequence('property.label')
  })

  context('render not selected but searchable field', function () {
    it('renders a client side translated label', async function () {
      const { findByText } = renderSubject(property, sortBy, direction)
      const translatedLabel = 'Some Property 2'

      const label = await findByText(translatedLabel)
      expect(label).to.exist
    })

    it('wraps it within a link with an opposite direction', function () {
      const { container } = renderSubject(property, sortBy, direction)

      const a = container.querySelector('a')
      const href = (a && a.getAttribute('href')) || ''
      const query = new URLSearchParams(href.replace('/?', ''))

      expect(query.get('direction')).to.equal('asc')
      expect(query.get('sortBy')).to.equal(property.path)
    })

    it('doesn\'t render a sort indicator', function () {
      const { container } = renderSubject(property, sortBy, direction)

      expect(container.querySelector('svg')).to.be.null
    })
  })
})
