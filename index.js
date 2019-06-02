let AdminBro

if (process.env.ADMIN_BRO_DEV_ENV) {
  require('@babel/polyfill')
  require('@babel/register')({
    presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-env')],
    plugins: [require.resolve('babel-plugin-styled-components')],
    extensions: ['.jsx', '.js'],
    only: [/src\/frontend/],
  })
  AdminBro = require('./src/admin-bro')
} else {
  AdminBro = require('./lib/admin-bro')
}

module.exports = AdminBro
