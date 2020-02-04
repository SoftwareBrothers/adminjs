const path = require('path')

module.exports = {
  stories: ['../**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', {
    name: '@storybook/preset-typescript',
  }],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
