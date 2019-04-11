require('@babel/polyfill')
require('@babel/register')({
  presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-env')],
  extensions: ['.jsx', '.js'],
  only: [/src\/frontend/],
})

const AdminBro = require('./src/admin-bro')

module.exports = AdminBro
