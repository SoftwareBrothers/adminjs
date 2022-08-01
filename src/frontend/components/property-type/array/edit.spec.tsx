import React from 'react'
import { expect } from 'chai'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import factory from 'factory-girl'
import sinon from 'sinon'
import 'sinon-chai'

import Edit from './edit'
import TestContextProvider from '../../spec/test-context-provider'
import '../../spec/property-json.factory'
import '../../spec/record-json.factory'
import { RecordJSON, PropertyJSON, ResourceJSON } from '../../../interfaces'
import ItemComponent from '../default-type/edit'
import * as TranslateFunctionsFactory from '../../../../utils/translate-functions.factory'

const AddNewItemText = 'Add new item'

describe('<PropertyType.Array.Edit />', function () {
  const propertyPath = 'arrayField'
  let property: PropertyJSON
  let record: RecordJSON
  // eslint-disable-next-line mocha/no-setup-in-describe
  const onChange = sinon.spy()

  const renderTestSubject = (prop: PropertyJSON, rec: RecordJSON): RenderResult => render(
    <TestContextProvider>
      <Edit
        where="edit"
        property={prop}
        record={rec}
        ItemComponent={ItemComponent as unknown as typeof React.Component}
        onChange={onChange}
        testId="some-test-id"
        filter={{}}
        resource={{} as ResourceJSON}
      />
    </TestContextProvider>,
  )

  beforeEach(function () {
    sinon.stub(TranslateFunctionsFactory, 'createFunctions').returns({
      translateProperty: sinon.stub().returns(AddNewItemText),
      translateButton: sinon.stub().returns('someButton'),
    } as unknown as TranslateFunctionsFactory.TranslateFunctions)
  })

  afterEach(function () {
    sinon.restore()
    cleanup()
  })

  context('Property with a string array', function () {
    beforeEach(async function () {
      property = await factory.build<PropertyJSON>('PropertyJSON', {
        path: propertyPath,
        isArray: true,
      })
    })

    context('no items inside', function () {
      beforeEach(async function () {
        record = await factory.build<RecordJSON>('RecordJSON', {
          params: {},
        })
      })

      xit('renders label and addItem button', async function () {
        const { findByText } = renderTestSubject(property, record)

        const label = findByText(property.label)
        const addItemBtn = findByText(AddNewItemText)

        await waitFor(() => {
          expect(label).not.to.be.null
          expect(addItemBtn).not.to.be.null
        })
      })

      xit('renders new empty input field after clicking "add"', function () {
        const { getByText } = renderTestSubject(property, record)

        fireEvent.click(getByText(AddNewItemText))

        expect(onChange).to.has.been.calledWith(property.path, [''])
      })
    })

    context('2 items inside', function () {
      const values = ['element1', 'element2']

      xit('2 <input> tags already filed with values', async function () {
        record = await factory.build<RecordJSON>('RecordJSON', { params: {
          [`${property.path}.0`]: values[0],
          [`${property.path}.1`]: values[1],
        } })

        const { findByDisplayValue } = renderTestSubject(property, record)

        await waitFor(() => {
          expect(findByDisplayValue(values[0])).not.to.be.null
          expect(findByDisplayValue(values[1])).not.to.be.null
        })
      })
    })
  })
})
