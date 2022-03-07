"use strict";

var _chai = require("chai");

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

var _actionsToButtonGroup = require("./actions-to-button-group");

require("../../spec/action-json.factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('actionsToButtonGroup', () => {
  let actions;
  const actionsCount = 5;
  const params = {
    recordId: 'recordId',
    resourceId: 'resourceId',
    recordsId: ['recordId']
  };
  let buttonGroupProps;

  const handleClick = () => true;

  context('flat actions (no nesting)', () => {
    beforeEach(async () => {
      actions = await _factoryGirl.default.buildMany('ActionJSON', actionsCount, {
        actionType: 'record'
      });
      buttonGroupProps = (0, _actionsToButtonGroup.actionsToButtonGroup)({
        actions,
        params,
        handleClick
      });
    });
    it('returns all buttons', () => {
      (0, _chai.expect)(buttonGroupProps.length).to.eq(actionsCount);
    });
  });
  context('nested actions', () => {
    let rootActions;
    let actionsPublish;
    let actionsExport;
    beforeEach(async () => {
      rootActions = {
        normal: await _factoryGirl.default.build('ActionJSON', {
          actionType: 'record'
        }),
        publish: await _factoryGirl.default.build('ActionJSON', {
          actionType: 'record',
          name: 'publish'
        }),
        export: await _factoryGirl.default.build('ActionJSON', {
          actionType: 'record',
          name: 'publish'
        })
      };
      actionsPublish = await _factoryGirl.default.buildMany('ActionJSON', actionsCount, {
        actionType: 'record',
        parent: 'publish'
      });
      actionsExport = await _factoryGirl.default.buildMany('ActionJSON', actionsCount, {
        actionType: 'record',
        parent: 'export'
      });
      buttonGroupProps = (0, _actionsToButtonGroup.actionsToButtonGroup)({
        actions: [...Object.values(rootActions), ...actionsPublish, ...actionsExport],
        params,
        handleClick
      });
    });
    it('returns 3 root buttons', () => {
      (0, _chai.expect)(buttonGroupProps.length).to.eq(3);
    });
    it('returns 5 buttons for each nested action', () => {
      const publishButton = buttonGroupProps[1];
      const exportButton = buttonGroupProps[2];
      (0, _chai.expect)(publishButton.buttons).to.have.lengthOf(actionsCount);
      (0, _chai.expect)(exportButton.buttons).to.have.lengthOf(actionsCount);
    });
  });
  context('action with not existing parent', () => {
    const parent = 'newParent';
    beforeEach(async () => {
      actions = [await _factoryGirl.default.build('ActionJSON', {
        actionType: 'record',
        parent
      })];
      buttonGroupProps = (0, _actionsToButtonGroup.actionsToButtonGroup)({
        actions,
        params,
        handleClick
      });
    });
    it('returns just one root action', () => {
      (0, _chai.expect)(buttonGroupProps).to.have.lengthOf(1);
    });
    it('creates button for not existing parent', async () => {
      const parentButton = buttonGroupProps[0];
      (0, _chai.expect)(parentButton.label).to.equal(parent);
    });
    it('nests remaining action under parent', () => {
      const parentButton = buttonGroupProps[0];
      (0, _chai.expect)(parentButton.buttons).to.have.lengthOf(1);
    });
  });
});