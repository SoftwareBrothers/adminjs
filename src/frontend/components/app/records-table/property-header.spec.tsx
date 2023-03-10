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
  })

  context('render not selected but searchable field', function () {
    xit('renders a label', async function () {
      const { findAllByText } = renderSubject(property, sortBy, direction)

      const label = await findAllByText(property.label)

      expect(label).to.equal(property.label)
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
