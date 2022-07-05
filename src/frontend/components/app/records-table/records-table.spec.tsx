import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import sinon from 'sinon'
import { expect } from 'chai'
import factory from 'factory-girl'

import { Provider } from 'react-redux'
import { RecordsTable, RecordsTableProps } from './records-table'
import TestContextProvider from '../../spec/test-context-provider'
import { ActionJSON, ResourceJSON, RecordJSON, PropertyJSON } from '../../../interfaces'
import createStore from '../../../store/store'

import '../../spec/resource-json.factory'
import '../../spec/record-json.factory'
import '../../spec/property-json.factory'


type StubsType = {
  onSelect: sinon.SinonStub<any[], any>;
  onSelectAll: sinon.SinonStub<any[], any>;
}

const renderSubject = (props: Omit<RecordsTableProps, 'onSelect' | 'onSelectAll'>): RenderResult & StubsType => {
  const onSelect = sinon.stub()
  const onSelectAll = sinon.stub()
  // TODO: fix children props
  const StoreProvider = Provider as any
  const renderResult = render(
    <TestContextProvider>
      <StoreProvider store={createStore({})}>
        <RecordsTable
          {...props}
          onSelect={onSelect}
          onSelectAll={onSelectAll}
        />
      </StoreProvider>
    </TestContextProvider>,
  )

  return {
    ...renderResult,
    onSelect,
    onSelectAll }
}

describe('<RecordsTable />', function () {
  let properties: Array<PropertyJSON>
  let resource: ResourceJSON
  let records: Array<RecordJSON>
  let container: RenderResult['container']

  beforeEach(async function () {
    const name = await factory.build<PropertyJSON>('PropertyJSON', { path: 'path', isTitle: true })
    properties = [
      await factory.build<PropertyJSON>('PropertyJSON', { path: 'id', isId: true }),
      name,
      await factory.build<PropertyJSON>('PropertyJSON', { path: 'surname' }),
    ]
    resource = await factory.build<ResourceJSON>('ResourceJSON', {
      listProperties: properties,
      titleProperty: name,
    })
  })

  afterEach(function () {
    sinon.restore()
  })

  context('10 records are given without bulk and list actions', function () {
    beforeEach(async function () {
      records = await factory.buildMany<RecordJSON>('RecordJSON', 10, {
        params: {
          id: factory.sequence('record.id'),
          name: factory.sequence('record.name', n => `name ${n}`),
          surname: factory.sequence('record.surname', n => `surname ${n}`),
        },
      });

      ({ container } = renderSubject({ resource, records, selectedRecords: [] }))
    })

    it('renders each record as a separate <tr> tag', function () {
      expect(container.querySelectorAll('tbody > tr')).to.have.lengthOf(10)
    })

    it('does not render any link in the record rows', function () {
      expect(container.querySelectorAll('tbody > tr a')).to.have.lengthOf(0)
    })

    it('does not render checkbox for selecting particular record', function () {
      expect(container.querySelectorAll('tbody > tr input')).to.have.lengthOf(0)
    })
  })

  context('10 records are given with bulk delete and show actions', function () {
    beforeEach(async function () {
      records = await factory.buildMany<RecordJSON>('RecordJSON', 10, {
        params: {
          id: factory.sequence('record.id'),
          name: factory.sequence('record.name', n => `name ${n}`),
          surname: factory.sequence('record.surname', n => `surname ${n}`),
        },
        recordActions: [await factory.build<ActionJSON>('ActionJSON', {
          name: 'show', actionType: 'record',
        })],
        bulkActions: [await factory.build<ActionJSON>('ActionJSON', {
          name: 'bulkDelete', actionType: 'bulk',
        })],
      });

      ({ container } = renderSubject({ resource, records, selectedRecords: [] }))
    })

    it('renders input checkbox for selecting many records', function () {
      expect(container.querySelectorAll('tbody td:first-child input')).to.have.lengthOf(10)
    })
  })
})
