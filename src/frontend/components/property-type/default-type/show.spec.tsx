import React from 'react'
import factory from 'factory-girl'
import { expect } from 'chai'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import { RenderResult, render } from '@testing-library/react'
import Show from './show'
import TestContextProvider from '../../spec/test-context-provider'
import '../../spec/resource-json.factory'
import '../../spec/record-json.factory'

import { RecordJSON, PropertyJSON, ResourceJSON } from '../../../interfaces'

const renderTestSubject = (property, record, resource): RenderResult => render(
  <TestContextProvider>
    <I18nextProvider i18n={i18n}>
      <Show
        property={property}
        record={record}
        resource={resource}
      />
    </I18nextProvider>
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
