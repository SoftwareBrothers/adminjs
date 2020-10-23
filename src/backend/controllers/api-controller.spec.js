/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { expect } from 'chai'

import ApiController from './api-controller'
import { Filter } from '../utils/filter'

describe('ApiController', function () {
  beforeEach(function () {
    this.total = 0
    this.fieldName = 'title'
    this.recordJSON = { title: 'recordTitle' }
    this.recordStub = {
      toJSON: () => this.recordJSON,
      params: {},
      recordActions: [],
    }
    this.resourceName = 'Users'
    this.action = {
      name: 'actionName',
      handler: this.sinon.stub().returns({ record: this.recordStub }),
      isAccessible: this.sinon.stub().returns(true),
    }
    const property = { name: () => this.fieldName, reference: () => false }
    this.resourceStub = {
      id: this.sinon.stub().returns('someId'),
      decorate: this.sinon.stub().returns({
        actions: {
          list: this.action,
          edit: this.action,
          show: this.action,
          delete: this.action,
          new: this.action,
          [this.action.name]: this.action,
        },
        getListProperties: this.sinon.stub().returns([property]),
        titleProperty: () => ({ name: () => this.fieldName }),
        properties: { [property.name()]: property },
        resourceActions: () => [this.action],
        recordActions: () => [this.action],
        recordsDecorator: records => records,
        getFlattenProperties: this.sinon.stub().returns([property]),
        id: this.resourceName,
      }),
      find: this.sinon.stub().returns([]),
      count: this.sinon.stub().returns(this.total),
      findOne: this.sinon.stub().returns(this.recordStub),
    }
    this.recordStub.resource = this.resourceStub
    this.adminStub = {
      findResource: this.sinon.stub().returns(this.resourceStub),
      options: { rootPath: '/admin' },
      translateMessage: () => 'message',
    }
    this.currentAdmin = { email: 'john@doe.com', name: 'John' }
    this.apiController = new ApiController({ admin: this.adminStub }, this.currentAdmin)

    this.sinon.stub(Filter.prototype, 'populate').returns([this.recordStub])
  })

  describe('#resourceAction', function () {
    it('calls the handler of correct action', async function () {
      await this.apiController.resourceAction({
        params: {
          action: this.action.name,
        },
      }, {})
      expect(
        this.action.handler,
      ).to.have.been.calledWith(
        this.sinon.match.any,
        this.sinon.match.any,
        this.sinon.match.has('action', this.action),
      )
    })
  })

  describe('#recordAction', function () {
    it('calls the handler of correct action', async function () {
      await this.apiController.recordAction({
        params: {
          action: this.action.name,
          recordId: 'id',
        },
      }, {})
      expect(
        this.action.handler,
      ).to.have.been.calledWith(
        this.sinon.match.any,
        this.sinon.match.any,
        this.sinon.match.has('action', this.action).and(
          this.sinon.match.has('record', this.recordStub),
        ),
      )
    })

    it('throws an error when action do not return record', function (done) {
      this.action.handler = async () => ({
        someData: 'without an record',
      })

      this.apiController.recordAction({
        params: {
          action: this.action.name,
          recordId: 'id',
        },
      }, {}).catch((error) => {
        expect(error).property('name', 'ConfigurationError')
        done()
      })
    })
  })
})
