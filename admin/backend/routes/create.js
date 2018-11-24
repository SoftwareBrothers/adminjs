const Renderer = require('../utils/renderer')

module.exports = {
  method: 'POST',
  path: '/{databaseName}/{modelName}',
  handler: async (adminBro, { params, payload }, response) => {
    const { databaseName, modelName } = params
    const viewData = adminBro.toViewData({ databaseName, modelName })

    viewData.instance = await viewData.model.create(payload)

    return response.redirect(adminBro.viewHelpers().showInstanceUrl(
      viewData.database,
      viewData.model,
      viewData.instance,
    ))
  },
}
