const Renderer = require('../utils/renderer')

module.exports = {
  method: 'GET',
  path: '/{databaseName}/{modelName}/new',
  handler: async (adminBro, { params }) => {
    const { databaseName, modelName } = params
    const viewData = adminBro.toViewData({ databaseName, modelName })
    return new Renderer('pages/new', viewData).render()
  },
}
