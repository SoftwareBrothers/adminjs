const AdminBro = require('@admin-bro/core')
const { Company } = require('./company.entity')

const {
  after: passwordAfterHook,
  before: passwordBeforeHook,
} = require('./actions/password.hook')

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    encryptedPassword: {
      isVisible: false,
    },
    profilePhotoLocation: {
      isVisible: false,
    },
    password: {
      type: 'password',
    },
    isAdmin: {
      isDisabled: true,
    },
    disabledAt: {
      isDisabled: true,
    },
  },
  actions: {
    new: {
      after: passwordAfterHook,
      before: passwordBeforeHook,
    },
    edit: {
      after: passwordAfterHook,
      before: passwordBeforeHook,
    },
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

module.exports = {
  options,
  resource: Company,
}
