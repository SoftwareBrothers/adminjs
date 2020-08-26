const { Nested } = require('./nested.entity')

/** @type {import('admin-bro').ResourceOptions} */
const options = {

}

module.exports = {
  options,
  resource: Nested,
}
