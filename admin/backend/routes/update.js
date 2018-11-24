const Renderer = require('../utils/renderer')

module.exports = {
  method: 'POST',
  path: '/{databaseName}/{modelName}/{instanceId}',
  handler: async (adminBro, { params, payload }, response) => {
    const { databaseName, modelName, instanceId } = params
    const viewData = adminBro.toViewData({ databaseName, modelName })
    viewData.instance = await viewData.model.update(instanceId, payload)
    return response.redirect(adminBro.viewHelpers().showInstanceUrl(
      viewData.database,
      viewData.model,
      viewData.instance,
    ))
  },
}
