const AdminJS = require('adminjs')
const { Company } = require('./company.entity')
const passwordFeature = require('../features/password/password.feature')

const layout = currentAdmin => ([
  ['@MessageBox', {
    message: `Welcome ${currentAdmin.email}`,
    children: 'On this page yo can do whatever you like',
    variant: 'info',
    mb: 'xxl',
  }],
  [
    'companyName',
    'companySize',
    'email',
    'address',
  ],
])

/** @type {AdminJS.ResourceOptions} */
const options = {
  listProperties: ['companyName', 'email', 'address', 'companySize', 'isAdmin', 'isBig'],
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
  parent: {
    name: null,
    icon: 'Enterprise',
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
    show: { layout },
  },
}

/** @type {import('adminjs').ResourceWithOptions} */
module.exports = {
  options,
  resource: Company,
  features: [passwordFeature],
}
