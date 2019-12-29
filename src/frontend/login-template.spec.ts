import { expect } from 'chai'

import loginTemplate from './login-template'

describe('login-template', function () {
  const action = '/login'

  it('renders error message', function () {
    const errorMessage = 'Something went wrong'
    expect(
      loginTemplate({ action, errorMessage }),
    ).to.contain(errorMessage)
  })
})
