"use strict";

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _ = require("..");

var _adminjs = _interopRequireDefault(require("../../../../adminjs"));

var _adapters = require("../../../adapters");

var _decorateProperties = require("./decorate-properties");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('decorateProperties', () => {
  const path = 'propertyPath';
  let admin;
  let resource;
  let decorator;
  let property;
  let decoratedProperties;
  beforeEach(() => {
    admin = _sinon.default.createStubInstance(_adminjs.default);
    resource = _sinon.default.createStubInstance(_adapters.BaseResource);
    decorator = _sinon.default.createStubInstance(_.ResourceDecorator);
  });
  afterEach(() => {
    _sinon.default.restore();
  });
  context('One property with options', () => {
    const isSortable = true;
    const newIsSortable = false;
    const type = 'boolean';
    beforeEach(() => {
      property = new _adapters.BaseProperty({
        path,
        type,
        isSortable
      });
      resource.properties.returns([property]);
      decorator.options = {
        properties: {
          [path]: {
            isSortable: newIsSortable
          }
        }
      };
      decoratedProperties = (0, _decorateProperties.decorateProperties)(resource, admin, decorator);
    });
    it('returns just this one property', () => {
      (0, _chai.expect)(Object.keys(decoratedProperties)).to.have.lengthOf(1);
      (0, _chai.expect)(decoratedProperties[path]).not.to.be.undefined;
    });
    it('decorates it that the isSortable is updated', () => {
      const decorated = decoratedProperties[path];
      (0, _chai.expect)(decorated.isSortable()).to.eq(newIsSortable);
    });
    it('leaves all other fields like type unchanged', () => {
      const decorated = decoratedProperties[path];
      (0, _chai.expect)(decorated.type()).to.eq(type);
    });
    it('does not set `isVirtual` property', () => {
      const decorated = decoratedProperties[path];
      (0, _chai.expect)(decorated.isVirtual).to.eq(false);
    });
  });
  context('just options without any properties', () => {
    const newType = 'string';
    const availableValues = [{
      value: 'male',
      label: 'male'
    }, {
      value: 'female',
      label: 'female'
    }];
    beforeEach(() => {
      resource.properties.returns([]);
      decorator.options = {
        properties: {
          [path]: {
            type: newType,
            availableValues
          }
        }
      };
      decoratedProperties = (0, _decorateProperties.decorateProperties)(resource, admin, decorator);
    });
    it('returns just this one property', () => {
      (0, _chai.expect)(Object.keys(decoratedProperties)).to.have.lengthOf(1);
      (0, _chai.expect)(decoratedProperties[path]).not.to.be.undefined;
    });
    it('decorates it that it has type and availableValues', () => {
      const decorated = decoratedProperties[path];
      (0, _chai.expect)(decorated.type()).to.eq(newType);
      (0, _chai.expect)(decorated.availableValues()).to.deep.eq(availableValues);
    });
    it('sets `isVirtual` property to true', () => {
      const decorated = decoratedProperties[path];
      (0, _chai.expect)(decorated.isVirtual).to.eq(true);
    });
  });
  context('nested properties in the database', () => {
    let subPropertyLevel1;
    let subPropertyLevel2;
    const newIsVisible = false;
    const nestedPath = 'root.level1.level2';
    beforeEach(() => {
      property = new _adapters.BaseProperty({
        path: nestedPath.split('.')[0],
        type: 'mixed'
      });
      subPropertyLevel1 = new _adapters.BaseProperty({
        path: nestedPath.split('.')[1],
        type: 'mixed'
      });
      subPropertyLevel2 = new _adapters.BaseProperty({
        path: nestedPath.split('.')[2],
        type: 'mixed'
      });

      _sinon.default.stub(property, 'subProperties').returns([subPropertyLevel1]);

      _sinon.default.stub(subPropertyLevel1, 'subProperties').returns([subPropertyLevel2]);

      resource.properties.returns([property]);
    });
    context('options were not set', () => {
      beforeEach(() => {
        decorator.options = {
          properties: {}
        };
        decoratedProperties = (0, _decorateProperties.decorateProperties)(resource, admin, decorator);
      });
      it('returns one property', () => {
        (0, _chai.expect)(Object.keys(decoratedProperties)).to.have.lengthOf(1);
      });
      it('returns only root property which is not virtual', () => {
        (0, _chai.expect)(decoratedProperties[nestedPath.split('.')[0]]).to.have.property('isVirtual', false);
      });
    });
    context('options were set for root property', () => {
      beforeEach(() => {
        decorator.options = {
          properties: {
            [nestedPath.split('.')[0]]: {
              isVisible: newIsVisible
            }
          }
        };
        decoratedProperties = (0, _decorateProperties.decorateProperties)(resource, admin, decorator);
      });
      it('returns one property', () => {
        (0, _chai.expect)(Object.keys(decoratedProperties)).to.have.lengthOf(1);
      });
      it('changes its param', () => {
        (0, _chai.expect)(decoratedProperties[nestedPath.split('.')[0]].isVisible('show')).to.eq(newIsVisible);
      });
    });
    context('options were set for nested property', () => {
      beforeEach(() => {
        decorator.options = {
          properties: {
            [nestedPath]: {
              isVisible: newIsVisible
            }
          }
        };
        decoratedProperties = (0, _decorateProperties.decorateProperties)(resource, admin, decorator);
      });
      it('returns one property', () => {
        (0, _chai.expect)(Object.keys(decoratedProperties)).to.have.lengthOf(1);
      });
      it('does not change the root property', () => {
        (0, _chai.expect)(decoratedProperties[nestedPath.split('.')[0]].isVisible('show')).not.to.eq(newIsVisible);
      });
    });
  });
  context('virtual nested properties and one db property', () => {
    beforeEach(() => {
      property = new _adapters.BaseProperty({
        path: 'otherProperty',
        type: 'mixed'
      });
      decorator.options = {
        properties: {
          root: {
            type: 'mixed'
          },
          'root.nested1': {
            type: 'string'
          },
          'root.nested2': {
            type: 'string'
          },
          'root.nested3': {
            type: 'string'
          },
          'root.nestedArray': {
            type: 'mixed',
            isArray: true
          },
          'root.nestedArray.name': {
            type: 'string'
          },
          'root.nestedArray.surName': {
            type: 'string'
          },
          'otherProperty.name': {
            type: 'string'
          }
        }
      };
      resource.properties.returns([property]);
      decoratedProperties = (0, _decorateProperties.decorateProperties)(resource, admin, decorator);
    });
    it('returns root properties: one db property and 1 virtual', () => {
      (0, _chai.expect)(Object.keys(decoratedProperties)).to.have.lengthOf(2);
    });
    it('nests 3 nested properties under the root mixed type', () => {
      const subProperties = decoratedProperties.root.subProperties();
      (0, _chai.expect)(subProperties).to.have.lengthOf(4);
    });
    it('nests 2 properties under the root.nestedArray mixed type', () => {
      const subProperties = decoratedProperties.root.subProperties()[3].subProperties();
      (0, _chai.expect)(subProperties).to.have.lengthOf(2);
    });
    it('nests 1 property under the `otherProperty` mixed dbProperty', () => {
      const subProperties = decoratedProperties.otherProperty.subProperties();
      (0, _chai.expect)(subProperties).to.have.lengthOf(1);
    });
  });
});