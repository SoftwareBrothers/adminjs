import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import _ from 'lodash'
import { render, RenderResult } from 'react-testing-library'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router'
import { AxiosResponse } from 'axios'

import createStore, { ReduxState } from '../../store/store'
import RecordAction from './record-action'
import ApiClient from '../../utils/api-client'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'

import TestContextProvider from '../spec/test-context-provider'
import factory from '../spec/factory'

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
    record = await factory.build<RecordJSON>('RecordJSON.total')
    resource = await factory.build<ResourceJSON>('ResourceJSON.full')

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
    it('renders all showProperties in a resource', async function () {
      const { findByTestId } = renderSubject({
        resources: [resource],
      }, `/resources/${resource.id}/records/1234/show`)

      await Promise.all(resource.showProperties.map(async (property) => {
        const propertyInShow = await findByTestId(`PropertyInShow-${property.name}`)
        expect(propertyInShow).not.to.be.undefined
        return propertyInShow
      }))
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

  describe('edit action when record and resource are given', function () {
    it('renders all editProperties in a resource', async function () {
      const { findByTestId } = renderSubject({
        resources: [resource],
      }, `/resources/${resource.id}/records/1234/edit`)

      await Promise.all(resource.editProperties.map(async (property) => {
        const propertyInEdit = await findByTestId(`PropertyInEdit-${property.name}`)
        expect(propertyInEdit).not.to.be.undefined
        return propertyInEdit
      }))
    })
  })
})
