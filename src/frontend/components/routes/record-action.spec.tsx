import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import merge from 'lodash/merge.js'
import i18n from 'i18next'
import { render, RenderResult } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router'
import { AxiosResponse } from 'axios'

import createStore, { ReduxState } from '../../store/store.js'
import RecordAction from './record-action.js'
import ApiClient from '../../utils/api-client.js'
import { RecordJSON } from '../../interfaces/index.js'
import TestContextProvider from '../spec/test-context-provider.js'
import factory from '../spec/factory.js'
import { TranslateFunctions, __testExports } from '../../../utils/translate-functions.factory.js'

const defaultStore = {
  paths: {},
}

const renderSubject = (store: Partial<ReduxState> = {}, location?: string): RenderResult => {
  const path = '/resources/:resourceId/records/:recordId/:actionName'
  const storeWithDefault = merge(defaultStore, store)

  const renderResult = render(
    <TestContextProvider location={location}>
      <Provider store={createStore(storeWithDefault)}>
        <Routes>
          <Route path={path} element={<RecordAction />} />
        </Routes>
      </Provider>
    </TestContextProvider>,
  )

  return renderResult
}

describe('<RecordAction />', function () {
  let record: RecordJSON

  beforeEach(async function () {
    record = await factory.build<RecordJSON>('RecordJSON.total')
    sinon.stub(__testExports, 'createFunctions').returns({
      translateMessage: sinon.stub().returns('someMessage'),
    } as unknown as TranslateFunctions)
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
