require('@babel/polyfill')
require('@babel/register')({
  presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-env')],
  plugins: [require.resolve('babel-plugin-styled-components')],
  extensions: ['.jsx', '.js'],
  only: [/src\/frontend/],
})

const AdminBro = require('./src/admin-bro')

module.exports = AdminBro
