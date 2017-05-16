//  enable runtime transpilation to use ES6/7 in node

var fs = require('fs');

var babelrc = {
  "presets": [
    "react",
    "es2015",
    "stage-0"
  ],
  "plugins": [
    ["relay", {"compat": true, "schema": "./data/schema.graphql"}],
    ["transform-runtime", {
      "polyfill": false,
      "regenerator": true
    }],
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "libs": "./src/libs",
        "resources": "./src/resources",
        "frontend": "./src/www_frontend",
        "backend": "./src/www_backend",
        "shared": "./src/www_shared"
      }
    }]
  ]
};
require('babel-register')(babelrc);
