"use strict";

var _chai = require("chai");

var _appendForceRefresh = require("./append-force-refresh");

describe('appendForceRefresh', () => {
  it('should add ?refresh=true to url if url has no search params', () => {
    const oldUrl = '/resources/Test';
    const newUrl = (0, _appendForceRefresh.appendForceRefresh)(oldUrl);
    (0, _chai.expect)(newUrl).to.equal('/resources/Test?refresh=true');
  });
  it('should add &refresh=true to url if url already has search params', () => {
    const oldUrl = '/resources/Test?param=test';
    const newUrl = (0, _appendForceRefresh.appendForceRefresh)(oldUrl);
    (0, _chai.expect)(newUrl).to.equal('/resources/Test?param=test&refresh=true');
  });
  it('should add &refresh=true to url if url already has search params but custom search is passed', () => {
    const oldUrl = '/resources/Test?param=test';
    const newUrl = (0, _appendForceRefresh.appendForceRefresh)(oldUrl, 'other_param=test2');
    (0, _chai.expect)(newUrl).to.equal('/resources/Test?other_param=test2&refresh=true');
  });
  it('should add ?refresh=true to url if url is a full url with no search params', () => {
    const oldUrl = 'http://example.com/resources/Test';
    const newUrl = (0, _appendForceRefresh.appendForceRefresh)(oldUrl);
    (0, _chai.expect)(newUrl).to.equal('http://example.com/resources/Test?refresh=true');
  });
  it('should add &refresh=true to url if url is a full url with search params', () => {
    const oldUrl = 'http://example.com/resources/Test?param=test';
    const newUrl = (0, _appendForceRefresh.appendForceRefresh)(oldUrl);
    (0, _chai.expect)(newUrl).to.equal('http://example.com/resources/Test?param=test&refresh=true');
  });
  it('should add &refresh=true to url if url is a full url with search params but custom search is passed', () => {
    const oldUrl = 'http://example.com/resources/Test?param=test';
    const newUrl = (0, _appendForceRefresh.appendForceRefresh)(oldUrl, 'other_param=test2');
    (0, _chai.expect)(newUrl).to.equal('http://example.com/resources/Test?other_param=test2&refresh=true');
  });
  it('should ignore old search params if `ignore_params=true` is contained in the new url', () => {
    const oldUrl = 'http://example.com/resources/Test?ignore_params=true';
    const newUrl = (0, _appendForceRefresh.appendForceRefresh)(oldUrl, 'old_param=test2');
    (0, _chai.expect)(newUrl).to.equal('http://example.com/resources/Test?refresh=true');
  });
});