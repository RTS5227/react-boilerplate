const express = require('express');
const webpack = require('webpack');
const compression = require('compression');
const render = require('../../../src/www_frontend/SSR');
const env = process.env;
const HOST = env.GB_SSR_HOST || 'localhost';
const PORT = env.GB_SSR_PORT || 9553;

const app = express();
app.use(compression());
app.get('*', render.default);
app.listen(PORT, HOST, function (err, result) {
    if (err) {
    	console.log(`Failed Listening at ${HOST}:${PORT}`);
        return console.log(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', env.GB_GRAPHQL_HOST || HOST, env.GB_GRAPHQL_PORT || PORT);
});
