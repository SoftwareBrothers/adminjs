const shared = {
  "presets": [
    "@babel/preset-react",
    ["@babel/preset-env", {
      "targets": {
        "node": "18"
      },
      "loose": true,
      "modules": false
    }],
    ["@babel/preset-typescript"]
  ],
  "plugins": ["babel-plugin-styled-components"],
  "only": ["src/", "spec/"],
  "ignore": [
    "src/frontend/assets/scripts/app-bundle.development.js",
    "src/frontend/assets/scripts/app-bundle.production.js",
    "src/frontend/assets/scripts/global-bundle.development.js",
    "src/frontend/assets/scripts/global-bundle.production.js"
  ]
}

module.exports = {
  env: {
    esm: shared,
    cjs: {
      ...shared,
      presets: [
        "@babel/preset-react",
        ["@babel/preset-env", {
          "useBuiltIns": "usage",
          "corejs": 3,
          "targets": {
            "node": "18"
          },
          "loose": true,
          "modules": 'commonjs'
        }],
        ["@babel/preset-typescript"]
      ],
      plugins: [
        ...shared.plugins,
        ["module-extension-resolver", {
          "srcExtensions": [".js", ".cjs", ".mjs", ".es", ".es6", ".ts", ".node", ".json"],
          "dstExtension": ".cjs",
          "extensionsToKeep": [".json"]
        }]
      ]
    },
  }
}