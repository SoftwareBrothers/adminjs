import { expect } from 'chai'

import loginTemplate from './login-template.js'
import AdminJS from '../adminjs.js'

describe('login-template', function () {
  const action = '/login'

  it('renders error message', async function () {
    const adminJs = new AdminJS({})
    const errorMessage = 'Something went wrong'

    const html = await loginTemplate(adminJs, { action, errorMessage })

    expect(html).to.contain(errorMessage)
  })
})
