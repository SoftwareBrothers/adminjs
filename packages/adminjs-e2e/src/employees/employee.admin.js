const { Employee } = require('./employee.entity')

/** @type {import('adminjs').ResourceOptions} */
const options = {

}

module.exports = {
  options,
  resource: Employee,
}
