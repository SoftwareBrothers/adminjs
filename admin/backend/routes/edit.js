const Renderer = require('../utils/renderer')

module.exports = {
  method: 'GET',
  path: '/{databaseName}/{modelName}/{instanceId}/edit',
  handler: async (adminBro, { params }) => {
    const { databaseName, modelName, instanceId } = params
    const viewData = adminBro.toViewData({ databaseName, modelName })
    viewData.instance = await viewData.model.findOne(instanceId)
    return new Renderer('pages/edit', viewData).render()
  },
}
