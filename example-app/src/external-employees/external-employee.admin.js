const { ExternalEmployees } = require('../../models/index')

/** @type {import('admin-bro').ResourceOptions} */
const options = {

}

module.exports = {
  options,
  resource: ExternalEmployees,
}
