import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import _ from 'lodash'
import { render, RenderResult, wait } from 'react-testing-library'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router'
import { AxiosResponse } from 'axios'

import createStore, { ReduxState } from '../../store/store'
import RecordAction from './record-action'
import ApiClient from '../../utils/api-client'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import PropertyJSON from '../../../backend/decorators/property-json.interface'

import TestContextProvider from '../spec/test-context-provider'
import factory from '../spec/factory'
import ActionJSON from '../../../backend/decorators/action-json.interface'

const defaultStore = {
  paths: {},
}

const renderSubject = (store: Partial<ReduxState> = {}, location?: string): RenderResult => {
  const path = '/resources/:resourceId/records/:recordId/:actionName'
  const storeWithDefault = _.merge(defaultStore, store)
  const renderResult = render(
    <TestContextProvider location={location}>
      <Provider store={createStore(storeWithDefault)}>
        <Switch>
          <Route path={path} exact component={RecordAction} />
        </Switch>
      </Provider>
    </TestContextProvider>,
  )

  return renderResult
}

describe('<RecordAction />', function () {
  let record: RecordJSON
  let resource: ResourceJSON

  beforeEach(async function () {
    const action = await factory.build<ActionJSON>('ActionJSON', {
      name: 'show',
    })
    record = await factory.build<RecordJSON>('RecordJSON', {
      params: {
        name: 'John',
        surname: 'Doe',
        gender: 'MALE',
      },
      recordActions: [action],
    })
    sinon.stub(ApiClient, 'getBaseUrl').returns('/admin')
    sinon.stub(ApiClient.prototype, 'recordAction').resolves({ data: { record } } as AxiosResponse)
  })

  afterEach(function () {
    sinon.restore()
  })

  it('renders 404 when there is no resource', async function () {
    const { findByTestId } = renderSubject({}, '/resources/someResource/records/1234/show')

    const errorBox = await findByTestId('NoResourceError')

    expect(errorBox).not.to.be.undefined
  })

  describe('show action when record and resource are given', function () {
    let properties: Array<PropertyJSON>

    beforeEach(async function () {
      properties = [
        await factory.build<PropertyJSON>('PropertyJSON', { name: 'name', isTitle: true }),
        await factory.build<PropertyJSON>('PropertyJSON', { name: 'surname' }),
        await factory.build<PropertyJSON>('PropertyJSON', { name: 'gender',
          availableValues: [{
            label: 'male', value: 'MALE',
          }, {
            label: 'female', value: 'FEMALE',
          }] }),
      ]
      resource = await factory.build<ResourceJSON>('ResourceJSON', {
        showProperties: properties,
      })
    })

    it('renders all PropertyInShow components', async function () {
      const { findByTestId } = renderSubject({
        resources: [resource],
      }, `/resources/${resource.id}/records/1234/show`)

      const name = await findByTestId('PropertyInShow-name')
      const surname = await findByTestId('PropertyInShow-surname')
      const gender = await findByTestId('PropertyInShow-gender')

      expect(name).not.to.be.undefined
      expect(surname).not.to.be.undefined
      expect(gender).not.to.be.undefined
    })

    it('calls the API', function () {
      const recordId = '12312312'
      renderSubject({ resources: [resource] }, `/resources/${resource.id}/records/${recordId}/show`)

      expect(ApiClient.prototype.recordAction).to.have.been.calledWith({
        resourceId: resource.id,
        recordId,
        actionName: 'show',
      })
    })
  })
})
