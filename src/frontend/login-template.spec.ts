import { expect } from 'chai'

import loginTemplate from './login-template'
import AdminBro from '../admin-bro'

describe('login-template', function () {
  const action = '/login'

  it('renders error message', function () {
    const adminBro = new AdminBro({})
    const errorMessage = 'Something went wrong'
    expect(
      loginTemplate(adminBro, { action, errorMessage }),
    ).to.contain(errorMessage)
  })
})
