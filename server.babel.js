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
    ["module-alias", [
      { "src": "./src/www_shared", "expose": "shared" },
      { "src": "./src/libs", "expose": "libs" },
      { "src": "./src/resources", "expose": "resources" },
      { "src": "./src/www_frontend", "expose": "frontend" }
    ]]
  ]
};
require('babel-register')(babelrc);
