#!/usr/bin/env node
if (process.env.ADMIN_BRO_DEV_ENV) {
  require('@babel/polyfill')
  require('@babel/register')({
    presets: [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-typescript'),
    ],
    plugins: [require.resolve('babel-plugin-styled-components')],
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  })
  require('./src/cli').default
} else {
  require('./lib/cli').default
}
