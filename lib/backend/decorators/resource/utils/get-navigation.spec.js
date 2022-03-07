"use strict";

var _chai = require("chai");

var _getNavigation = require("./get-navigation");

const databaseName = 'mysql-database';
const databaseType = 'MySQL';
const defaultDatabase = {
  databaseName: () => databaseName,
  databaseType: () => databaseType
};
const mappedIcon = (0, _getNavigation.getIcon)(databaseType);
describe('.getNavigation', () => {
  let resourceOptions;
  beforeEach(() => {
    resourceOptions = {};
  });
  it('returns parent with icon when no options are given', () => {
    resourceOptions.navigation = undefined;
    (0, _chai.expect)((0, _getNavigation.getNavigation)(resourceOptions, defaultDatabase)).to.deep.eq({
      icon: mappedIcon,
      name: databaseName,
      show: true
    });
  });
  it('returns null when options are set to null', () => {
    resourceOptions.navigation = null;
    (0, _chai.expect)((0, _getNavigation.getNavigation)(resourceOptions, defaultDatabase)).to.be.null;
  });
  it('returns show false when options are set to false', () => {
    resourceOptions.navigation = false;
    (0, _chai.expect)((0, _getNavigation.getNavigation)(resourceOptions, defaultDatabase)).to.deep.eq({
      name: null,
      icon: '',
      show: false
    });
  });
  it('returns parent with a default icon when options was set as a string', () => {
    const parentName = 'my navigation name';
    resourceOptions.navigation = parentName;
    (0, _chai.expect)((0, _getNavigation.getNavigation)(resourceOptions, defaultDatabase)).to.deep.eq({
      icon: mappedIcon,
      name: parentName,
      show: true
    });
  });
  it('returns empty parent with an icon when this was set in options', () => {
    const icon = 'Car';
    resourceOptions.navigation = {
      icon,
      name: null
    };
    (0, _chai.expect)((0, _getNavigation.getNavigation)(resourceOptions, defaultDatabase)).to.deep.eq({
      icon,
      name: null,
      show: true
    });
  });
  it('works the same with old parent option', () => {
    const icon = 'Car';
    resourceOptions.parent = {
      icon,
      name: null
    };
    (0, _chai.expect)((0, _getNavigation.getNavigation)(resourceOptions, defaultDatabase)).to.deep.eq({
      icon,
      name: null,
      show: true
    });
  });
});