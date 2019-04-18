{
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "targets": {
        "browsers": ["ie >= 9"]
      }
    }]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-external-helpers",
    ["@babel/plugin-proposal-decorators", {
      "legacy": true
    }],
    ["@babel/plugin-proposal-class-properties", {
      "loose": true
    }]
  ]
}