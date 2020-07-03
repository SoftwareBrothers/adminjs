const { ValidationError } = require('admin-bro')
const { Taggable } = require('../../models/index')

/** @type {import('admin-bro').ResourceOptions} */
const options = {
  actions: {
    show: {
      isAccessible: false,
    },
    new: {
      showInDrawer: true,
      before: async (request) => {
        const { method, payload } = request
        if (method === 'post' && payload.name === 'forbidden') {
          throw new ValidationError({
            name: {
              message: 'cannot be "forbidden"',
            },
          }, {
            message: 'something wrong happened',
          })
        }
        return request
      },
    },
  },
}

module.exports = {
  options,
  resource: Taggable,
}
