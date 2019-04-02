require('@babel/polyfill')
require('@babel/register')({
  presets: ['@babel/preset-react', '@babel/preset-env'],
  extensions: ['.jsx', '.js'],
  only: [/src\/frontend/],
})

const AdminBro = require('./src/admin-bro')

module.exports = AdminBro
