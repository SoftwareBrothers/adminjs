module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['babel-plugin-styled-components'],
  only: ['src/', 'spec/'],
  ignore: [
    'src/frontend/assets/scripts/app-bundle.development.js',
    'src/frontend/assets/scripts/app-bundle.production.js',
    'src/frontend/assets/scripts/global-bundle.development.js',
    'src/frontend/assets/scripts/global-bundle.production.js',
  ],
};
