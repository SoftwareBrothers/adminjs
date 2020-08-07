const AdminBro = require('admin-bro')
const { Company } = require('./company.entity')
const passwordFeature = require('../features/password/password.feature')

/** @type {AdminBro.ResourceOptions} */
const options = {
  listProperties: ['companyName', 'email', 'address'],
  properties: {
    profilePhotoLocation: {
      isVisible: false,
    },
    isAdmin: {
      isDisabled: true,
    },
    disabledAt: {
      isDisabled: true,
    },
  },
  actions: {
    search: {
      handler: async (request, response, data) => {
        const { currentAdmin, resource } = data

        const currentCompany = await Company.findById(currentAdmin._id)
        const companyJSON = resource.build(currentCompany.toJSON()).toJSON(currentAdmin)
        companyJSON.title = `${companyJSON.title} [me]`

        return {
          records: [
            companyJSON,
          ],
        }
      },
    },
  },
}

/** @type {import('admin-bro').ResourceWithOptions} */
module.exports = {
  options,
  resource: Company,
  features: [passwordFeature],
}
