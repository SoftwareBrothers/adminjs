import React from 'react'
import { expect } from 'chai'
import { render, RenderResult, fireEvent } from 'react-testing-library'
import factory from 'factory-girl'
import sinon from 'sinon'
import 'sinon-chai'

import Edit from './edit'
import TestContextProvider from '../../spec/test-context-provider'
import '../../spec/property-json.factory'
import '../../spec/record-json.factory'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import ItemComponent from '../default-type/edit'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import * as TranslateFunctionsFactory from '../../../../utils/translate-functions.factory'

const AddNewItemText = 'Add new item'

describe('<PropertyType.Array.Edit />', function () {
  const propertyName = 'arrayField'
  let property: PropertyJSON
  let record: RecordJSON
  // eslint-disable-next-line mocha/no-setup-in-describe
  const onChange = sinon.spy()

  const renderTestSubject = (prop: PropertyJSON, rec: RecordJSON): RenderResult => render(
    <TestContextProvider>
      <Edit
        property={prop}
        record={rec}
        ItemComponent={ItemComponent as unknown as typeof React.Component}
        onChange={onChange}
        testId="some-test-id"
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
  })

  context('Property with a string array', function () {
    beforeEach(async function () {
      property = await factory.build<PropertyJSON>('PropertyJSON', {
        name: propertyName,
        isArray: true,
      })
    })

    context('no items inside', function () {
      beforeEach(async function () {
        record = await factory.build<RecordJSON>('RecordJSON', {
          params: {},
        })
      })

      it('renders label and addItem button', async function () {
        const { findByText } = renderTestSubject(property, record)

        const label = await findByText(property.label)
        const addItemBtn = await findByText(AddNewItemText)

        expect(label).not.to.be.null
        expect(addItemBtn).not.to.be.null
      })

      it('renders new empty input field after clicking "add"', async function () {
        const { getByText } = renderTestSubject(property, record)

        fireEvent.click(getByText(AddNewItemText))

        expect(onChange).to.has.been.calledWith(
          sinon.match.has('params', sinon.match.has(`${property.name}.0`, '')),
        )
      })
    })

    context('2 items inside', function () {
      const values = ['element1', 'element2']

      it('2 <input> tags already filed with values', async function () {
        record = await factory.build<RecordJSON>('RecordJSON', { params: {
          [`${property.name}.0`]: values[0],
          [`${property.name}.1`]: values[1],
        } })

        const { findByDisplayValue } = renderTestSubject(property, record)

        expect(findByDisplayValue(values[0])).not.to.be.null
        expect(findByDisplayValue(values[1])).not.to.be.null
      })
    })
  })
})
