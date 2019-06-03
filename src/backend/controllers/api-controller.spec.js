const ApiController = require('./api-controller')
const Filter = require('../utils/filter')

describe('ApiController', function () {
  beforeEach(function () {
    this.total = 0
    this.fieldName = 'title'
    this.recordJSON = { title: 'recordTitle' }
    this.recordStub = {
      toJSON: () => this.recordJSON,
    }
    this.action = {
      name: 'actionName',
      handler: this.sinon.stub(),
    }
    const property = { name: () => this.fieldName, reference: () => false }
    this.resourceStub = {
      decorate: this.sinon.stub().returns({
        getListProperties: this.sinon.stub().returns([property]),
        titleProperty: () => ({ name: () => this.fieldName }),
        properties: { [property.name()]: property },
        resourceActions: () => [this.action],
        recordActions: () => [this.action],
        recordsDecorator: records => records,
      }),
      find: this.sinon.stub().returns([]),
      count: this.sinon.stub().returns(this.total),
      findOne: this.sinon.stub().returns(this.recordStub),
    }
    this.recordStub.resource = this.resourceStub
    this.adminStub = {
      findResource: this.sinon.stub().returns(this.resourceStub),
      options: { rootPath: '/admin' },
    }
    this.apiController = new ApiController({ admin: this.adminStub })

    this.sinon.stub(Filter.prototype, 'populate').returns([this.recordStub])
  })

  describe('#index', function () {
    beforeEach(async function () {
      this.response = await this.apiController.index({}, {})
    })

    it('returns default meta data when no were given', function () {
      expect(this.response.meta).to.deep.equal({
        total: this.total,
        perPage: 10,
        page: 1,
        direction: 'asc',
        sortBy: this.fieldName,
      })
    })

    it('returns an empty array of records', function () {
      expect(this.response.records).to.have.lengthOf(0)
    })
  })

  describe('#search', function () {
    it('returns records taken from the find method for given resource', async function () {
      const response = await this.apiController.search({ params: {} }, {})
      expect(response.records).to.have.lengthOf(0)
    })
  })

  describe('#get', function () {
    it('returns record', async function () {
      const response = await this.apiController.get({}, {})
      expect(response.record).to.deep.equal(this.recordJSON)
    })
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
  })
})
