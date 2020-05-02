const { Employee } = require('./employee.entity')

/** @type {import('admin-bro').ResourceOptions} */
const options = {

}

module.exports = {
  options,
  resource: Employee,
}
