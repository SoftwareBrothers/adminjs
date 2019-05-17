module.exports = {
    'env': {
        'es6': true,
        'node': true,
        'mocha': true
    },
    'extends': 'airbnb',
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'import/no-unresolved': 'off',
        'no-underscore-dangle': 'off',
        'guard-for-in': 'off',
        'no-restricted-syntax': 'off',
        'no-await-in-loop': 'off',
        'object-curly-newline': 'off'
    },
    overrides: [
        {
          files: ['*-test.js', '*.spec.js'],
          rules: {
            'no-unused-expressions': 'off',
            'func-names': 'off',
            'prefer-arrow-callback': 'off',
            "react/jsx-filename-extension": 'off'
          }
        }
    ],
    globals: {
        'expect': true,
        'factory': true,
        'sandbox': true,
        'server': true,
        'window': true,
        'AdminBro': true,
        'flatpickr': true,
        'Quill': true,
    }
}