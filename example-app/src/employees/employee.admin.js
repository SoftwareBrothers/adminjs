const { Employee } = require('./employee.entity')

/** @type {import('@admin-bro/core').ResourceOptions} */
const options = {

}

module.exports = {
  options,
  resource: Employee,
}
