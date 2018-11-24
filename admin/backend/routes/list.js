const Renderer = require('../utils/renderer')

module.exports = {
  method: 'GET',
  path: '/{databaseName}/{modelName}',
  handler: async (adminBro, { params, query }) => {
    const { databaseName, modelName } = params
    const viewData = adminBro.toViewData({ databaseName, modelName })
    viewData.perPage = 5
    viewData.total = await viewData.model.count() 
    viewData.page = query.page || 1
    const instances = await viewData.model.find({}, {
      limit: viewData.perPage,
      offset: (viewData.page - 1) * viewData.perPage,
    })
    return new Renderer('pages/list', { instances, ...viewData }).render()
  },
}
