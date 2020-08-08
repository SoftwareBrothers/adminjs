import { expect } from 'chai'

import loginTemplate from './login-template'
import AdminBro from '../admin-bro'

describe('login-template', function () {
  const action = '/login'

  it('renders error message', async function () {
    const adminBro = new AdminBro({})
    const errorMessage = 'Something went wrong'

    const html = await loginTemplate(adminBro, { action, errorMessage })

    expect(html).to.contain(errorMessage)
  })
})
