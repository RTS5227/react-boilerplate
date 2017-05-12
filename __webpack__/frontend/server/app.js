const express = require('express');
const webpack = require('webpack');
const compression = require('compression');
//const webpackConfig = require('./webpack.config');
const render = require('../../../src/www_frontend/SSR');
const app = express();
app.use(compression());
const env = process.env;
const HOST = env.GB_SSR_HOST || 'localhost';
const PORT = env.GB_SSR_PORT || 9553;

/*const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));*/

app.get('*', render.default);

app.listen(PORT);
console.log(`Listening on port ${PORT}`);
