const { buildFeature } = require('@admin-bro/core')
const argon2 = require('argon2')

/** @type {import('@admin-bro/core').After<import('@admin-bro/core').ActionResponse>} */
const after = async (response) => {
  if (response.record && response.record.errors && response.record.errors.encryptedPassword) {
    response.record.errors.password = response.record.errors.encryptedPassword
  }
  return response
}

/** @type {import('@admin-bro/core').Before} */
const before = async (request) => {
  if (request.method === 'post') {
    const { password, ...otherParams } = request.payload

    if (password) {
      const encryptedPassword = await argon2.hash(password)

      return {
        ...request,
        payload: {
          ...otherParams,
          encryptedPassword,
        },
      }
    }
  }
  return request
}

module.exports = buildFeature({
  properties: {
    password: {
      type: 'password',
    },
    encryptedPassword: {
      isVisible: false,
    },
  },
  actions: {
    new: { after, before },
    edit: { after, before },
  },
})
