import React from 'react'
import factory from 'factory-girl'
import { expect } from 'chai'

import { RenderResult, render } from 'react-testing-library'
import Show from './show'
import TestContextProvider from '../../spec/test-context-provider'
import '../../spec/resource-json.factory'
import '../../spec/record-json.factory'

import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'

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
        [property.name]: 'some value',
      },
    })
    const { findByText } = await renderTestSubject(property, record, resource)
    const value = await findByText(record.params[property.name])
    expect(value).not.to.be.null
  })

  it('renders 0 when value is a 0', async function () {
    record = await factory.build<RecordJSON>('RecordJSON', {
      params: {
        [property.name]: 0,
      },
    })
    const { findByText } = await renderTestSubject(property, record, resource)
    const value = await findByText(record.params[property.name].toString())
    expect(value).not.to.be.null
  })
})
