import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import { expect } from 'chai'
import { factory } from 'factory-girl'
import React from 'react'
import sinon from 'sinon'
import 'sinon-chai'

import Edit from './edit.js'
import TestContextProvider from '../../spec/test-context-provider.js'
import '../../spec/initialize-translations.js'
import '../../spec/property-json.factory.js'
import '../../spec/record-json.factory.js'
import { RecordJSON, PropertyJSON, ResourceJSON } from '../../../interfaces/index.js'
import ItemComponent from '../default-type/edit.js'
import { TranslateFunctions, __testExports } from '../../../../utils/translate-functions.factory.js'

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
    sinon.stub(__testExports, 'createFunctions').returns({
      translateProperty: sinon.stub().returns(AddNewItemText),
      translateButton: sinon.stub().returns('someButton'),
    } as unknown as TranslateFunctions)
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

      it('renders label and addItem button', async function () {
        const { findByText } = renderTestSubject(property, record)

        const label = findByText(property.label)
        const addItemBtn = findByText(AddNewItemText)

        await waitFor(() => {
          expect(label).not.to.be.null
          expect(addItemBtn).not.to.be.null
        })
      })

      it('renders new empty input field after clicking "add"', function () {
        const { getByTestId } = renderTestSubject(property, record)

        fireEvent.click(getByTestId(`${property.path}-add`))

        expect(onChange).to.has.been.calledWith(property.path, [''])
      })
    })

    context('2 items inside', function () {
      const values = ['element1', 'element2']

      it('2 <input> tags already filed with values', async function () {
        record = await factory.build<RecordJSON>('RecordJSON', {
          params: {
            [`${property.path}.0`]: values[0],
            [`${property.path}.1`]: values[1],
          },
        })

        const { findByDisplayValue } = renderTestSubject(property, record)

        await waitFor(() => {
          expect(findByDisplayValue(values[0])).not.to.be.null
          expect(findByDisplayValue(values[1])).not.to.be.null
        })
      })
    })
  })
})
