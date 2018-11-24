const Renderer = require('../utils/renderer')

module.exports = {
  method: 'GET',
  path: '',
  handler: async (adminBro, params) => {
    return new Renderer('pages/dashboard', adminBro.toViewData()).render()
  },
}
