import { expect } from 'chai'
import { RenderResult, render } from '@testing-library/react'
import { factory } from 'factory-girl'
import React from 'react'

import Show from './show.js'
import TestContextProvider from '../../spec/test-context-provider.js'
import '../../spec/initialize-translations.js'
import '../../spec/resource-json.factory.js'
import '../../spec/record-json.factory.js'
import { RecordJSON, PropertyJSON, ResourceJSON } from '../../../interfaces/index.js'

const renderTestSubject = (property, record, resource): RenderResult => render(
  <TestContextProvider>
    <Show
      property={property}
      record={record}
      resource={resource}
    />
  </TestContextProvider>,
)

describe('<PropertyType.Default.Show />', function () {
  let resource: ResourceJSON
  let property: PropertyJSON
  let record: RecordJSON

  beforeEach(async function () {
    property = await factory.build<PropertyJSON>('PropertyJSON')
    resource = await factory.build<ResourceJSON>('ResourceJSON')
  })

  it('renders regular value when it is just a string', async function () {
    record = await factory.build<RecordJSON>('RecordJSON', {
      params: {
        [property.path]: 'some Value',
      },
    })
    const { findByText } = await renderTestSubject(property, record, resource)
    const value = await findByText(record.params[property.path])
    expect(value).not.to.be.null
  })

  it('renders 0 when value is a 0', async function () {
    record = await factory.build<RecordJSON>('RecordJSON', {
      params: {
        [property.path]: 0,
      },
    })
    const { findByText } = await renderTestSubject(property, record, resource)
    const value = await findByText(record.params[property.path].toString())
    expect(value).not.to.be.null
  })
})
