"use strict";

var _chai = require("chai");

var _resourcesFactory = require("./resources-factory");

var _adapters = require("../../adapters");

describe('ResourcesFactory', function () {
  describe('._convertDatabases', function () {
    context('no adapter defined', function () {
      it('throws an error when there are no adapters and database is given', function () {
        (0, _chai.expect)(() => {
          new _resourcesFactory.ResourcesFactory()._convertDatabases(['one']);
        }).to.throw().property('name', 'NoDatabaseAdapterError');
      });
      it('returns empty array when none databases were given', function () {
        (0, _chai.expect)(new _resourcesFactory.ResourcesFactory()._convertDatabases([])).to.have.lengthOf(0);
      });
    });
    context('one adapter defined', function () {
      beforeEach(function () {
        this.resourcesInDatabase = 5;

        class Database extends _adapters.BaseDatabase {
          static isAdapterFor(database) {
            return database === 'supported';
          }

          resources() {
            return new Array(5);
          } // eslint-disable-line class-methods-use-this


        }

        class Resource extends _adapters.BaseResource {}

        this.resourcesFactory = new _resourcesFactory.ResourcesFactory({}, [{
          Database,
          Resource
        }]);
      });
      it('takes resources from databases', function () {
        (0, _chai.expect)(this.resourcesFactory._convertDatabases(['supported'])).to.have.lengthOf(this.resourcesInDatabase);
      });
      it('throws an error when there are no adapters supporting given database', function () {
        (0, _chai.expect)(() => {
          this.resourcesFactory._convertDatabases(['not supported']);
        }).to.throw().property('name', 'NoDatabaseAdapterError');
      });
    });
  });
  describe('._convertResources', function () {
    context('there are no adapters', function () {
      it('throws an error when resource is not subclass from BaseResource', function () {
        (0, _chai.expect)(() => {
          new _resourcesFactory.ResourcesFactory({})._convertResources(['one']);
        }).to.throw().property('name', 'NoResourceAdapterError');
      });
      it('returns given resource when it is subclass from BaseResource', function () {
        class MyResource extends _adapters.BaseResource {}

        (0, _chai.expect)(new _resourcesFactory.ResourcesFactory({})._convertResources([new MyResource()])).to.have.lengthOf(1);
      });
    });
    context('there is one adapter', function () {
      beforeEach(function () {
        class Database extends _adapters.BaseDatabase {}

        class Resource extends _adapters.BaseResource {
          static isAdapterFor(resource) {
            return resource === 'supported';
          }

        }

        this.resourcesFactory = new _resourcesFactory.ResourcesFactory({}, [{
          Database,
          Resource
        }]);
        this.Resource = Resource;
      });
      it('throws an error when resource is not handled by the adapter', function () {
        (0, _chai.expect)(() => {
          this.resourcesFactory._convertResources(['not supported']);
        }).to.throw().property('name', 'NoResourceAdapterError');
      });
      it('throws an error when resource is not handled by the adapter and its provided with a decorator', function () {
        (0, _chai.expect)(() => {
          this.resourcesFactory._convertResources([{
            resource: 'not supported',
            decorator: 'sth'
          }]);
        }).to.throw().property('name', 'NoResourceAdapterError');
      });
      it('converts given resource to Resource class provided in the adapter', function () {
        const resources = this.resourcesFactory._convertResources(['supported']);

        (0, _chai.expect)(resources).to.have.lengthOf(1);
        (0, _chai.expect)(resources[0].resource).to.be.an.instanceOf(this.Resource);
      });
      it('converts to Resource class when resource is provided with options', function () {
        const options = {};

        const resources = this.resourcesFactory._convertResources([{
          resource: 'supported',
          options
        }]);

        (0, _chai.expect)(resources).to.have.lengthOf(1);
        (0, _chai.expect)(resources[0].resource).to.be.an.instanceOf(this.Resource);
        (0, _chai.expect)(resources[0].options).to.deep.equal(options);
      });
    });
  });
  describe('_decorateResources', function () {
    beforeEach(function () {
      this.resourcesFactory = new _resourcesFactory.ResourcesFactory({
        options: {}
      }, []);
      this.assignDecoratorStub = this.sinon.stub(_adapters.BaseResource.prototype, 'assignDecorator');
    });
    it('assigns ResourceDecorator when no options were given', function () {
      this.resourcesFactory._decorateResources([{
        resource: new _adapters.BaseResource()
      }]);

      (0, _chai.expect)(this.assignDecoratorStub).to.have.been.calledWith(this.sinon.match.any, this.sinon.match({}));
    });
    it('assigns ResourceDecorator with options when there were given', function () {
      const options = {
        id: 'someId'
      };
      const resource = new _adapters.BaseResource();

      this.resourcesFactory._decorateResources([{
        resource,
        options
      }]);

      (0, _chai.expect)(this.assignDecoratorStub).to.have.been.calledWith(this.sinon.match.any, this.sinon.match(options));
    });
  });
});