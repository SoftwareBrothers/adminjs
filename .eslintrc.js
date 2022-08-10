module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'mocha'],
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'plugin:mocha/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'no-underscore-dangle': 'off',
    'import/extensions': ['off', { json: 'always' }],
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'no-restricted-exports': 'off',
    'max-classes-per-file': 'off',
    'max-len': ['error', 120],
    '@typescript-eslint/no-extra-semi': 'off',
  },
  ignorePatterns: [
    '*/build/**/*',
    '*.json',
    '*.txt',
    '*.md',
    '*.lock',
    '*.log',
    '*.yaml',
    '**/*/frontend/assets/**/*',
    '*.d.ts',
    '*.config.js',
  ],
  overrides: [
    {
      files: ['*-test.js', '*.spec.js', '*-test.ts', '*.spec.ts', '*.spec.tsx', '*.factory.ts', '*.factory.js'],
      rules: {
        'no-unused-expressions': 'off',
        'func-names': 'off',
        'prefer-arrow-callback': 'off',
        'import/no-extraneous-dependencies': 'off',
        'mocha/no-mocha-arrows': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['*.jsx', '*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
      },
    },
    {
      files: ['**/*/cypress/integration/**/*.spec.js', './cy/**/*.js'],
      rules: {
        'mocha/no-mocha-arrows': 'off',
        'spaced-comment': 'off',
      },
    },
    {
      files: ['src/locale/*.ts'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  globals: {
    expect: true,
    factory: true,
    sandbox: true,
    server: true,
    window: true,
    AdminJS: true,
    flatpickr: true,
    FormData: true,
    File: true,
    cy: true,
    Cypress: true,
  },
};
