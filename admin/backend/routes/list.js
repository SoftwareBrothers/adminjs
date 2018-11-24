const Renderer = require('../utils/renderer')

module.exports = {
  method: 'GET',
  path: '/{databaseName}/{modelName}',
  handler: async (adminBro, params) => {
    const { databaseName, modelName } = params
    const viewData = adminBro.toViewData({ databaseName, modelName })
    const instances = viewData.model.find({}, { limit: 20, offset: 0 })
    return new Renderer('pages/list', { instances, ...viewData }).render()
  },
}
