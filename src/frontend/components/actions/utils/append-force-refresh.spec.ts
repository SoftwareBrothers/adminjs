import { expect } from 'chai'

import { appendForceRefresh } from './append-force-refresh'

describe('appendForceRefresh', () => {
  it('should add ?refresh=true to url if url has no search params', () => {
    const oldUrl = '/resources/Test'

    const newUrl = appendForceRefresh(oldUrl)

    expect(newUrl).to.equal('/resources/Test?refresh=true')
  })

  it('should add &refresh=true to url if url already has search params', () => {
    const oldUrl = '/resources/Test?param=test'

    const newUrl = appendForceRefresh(oldUrl)

    expect(newUrl).to.equal('/resources/Test?param=test&refresh=true')
  })

  it('should add &refresh=true to url if url already has search params but custom search is passed', () => {
    const oldUrl = '/resources/Test?param=test'

    const newUrl = appendForceRefresh(oldUrl, 'other_param=test2')

    expect(newUrl).to.equal('/resources/Test?other_param=test2&refresh=true')
  })

  it('should add ?refresh=true to url if url is a full url with no search params', () => {
    const oldUrl = 'http://example.com/resources/Test'

    const newUrl = appendForceRefresh(oldUrl)

    expect(newUrl).to.equal('http://example.com/resources/Test?refresh=true')
  })

  it('should add &refresh=true to url if url is a full url with search params', () => {
    const oldUrl = 'http://example.com/resources/Test?param=test'

    const newUrl = appendForceRefresh(oldUrl)

    expect(newUrl).to.equal('http://example.com/resources/Test?param=test&refresh=true')
  })

  it('should add &refresh=true to url if url is a full url with search params but custom search is passed', () => {
    const oldUrl = 'http://example.com/resources/Test?param=test'

    const newUrl = appendForceRefresh(oldUrl, 'other_param=test2')

    expect(newUrl).to.equal('http://example.com/resources/Test?other_param=test2&refresh=true')
  })

  it('should ignore old search params if `ignore_params=true` is contained in the new url', () => {
    const oldUrl = 'http://example.com/resources/Test?ignore_params=true'

    const newUrl = appendForceRefresh(oldUrl, 'old_param=test2')

    expect(newUrl).to.equal('http://example.com/resources/Test?refresh=true')
  })
})
