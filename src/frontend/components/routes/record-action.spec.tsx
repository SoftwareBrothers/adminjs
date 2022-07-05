import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import _ from 'lodash'
import i18n from 'i18next'
import { render, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router'
import { AxiosResponse } from 'axios'

import createStore, { ReduxState } from '../../store/store'
import RecordAction from './record-action'
import ApiClient from '../../utils/api-client'
import { RecordJSON } from '../../interfaces'

import TestContextProvider from '../spec/test-context-provider'
import factory from '../spec/factory'
import * as TranslateFunctionsFactory from '../../../utils/translate-functions.factory'

const defaultStore = {
  paths: {},
}

const renderSubject = (store: Partial<ReduxState> = {}, location?: string): RenderResult => {
  const path = '/resources/:resourceId/records/:recordId/:actionName'
  const storeWithDefault = _.merge(defaultStore, store)
  // TODO: fix children props
  const StoreProvider = Provider as any
  const renderResult = render(
    <TestContextProvider location={location}>
      <StoreProvider store={createStore(storeWithDefault)}>
        <Switch>
          <Route path={path} exact component={RecordAction} />
        </Switch>
      </StoreProvider>
    </TestContextProvider>,
  )

  return renderResult
}

describe('<RecordAction />', function () {
  let record: RecordJSON

  beforeEach(async function () {
    record = await factory.build<RecordJSON>('RecordJSON.total')
    sinon.stub(TranslateFunctionsFactory, 'createFunctions').returns({
      translateMessage: sinon.stub().returns('someMessage'),
    } as unknown as TranslateFunctionsFactory.TranslateFunctions)
    sinon.stub(ApiClient, 'getBaseUrl').returns('/admin')
    sinon.stub(i18n, 'exists').returns(false)
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
})
