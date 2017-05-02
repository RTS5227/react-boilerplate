/**
 * Created by Tester-Ali on 09-09-2016.
 */
var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config.dev');
var path = require('path')
const env = process.env;
const HOST = env.GB_GRAPHIQL_HOST || '0.0.0.0';
const PORT = env.GB_GRAPHIQL_PORT || 9552;

const app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: false,
    historyApiFallback: true,
    stats: {colors: true}
});

app.use('/', express.static(path.resolve(__dirname, 'dist')));

app.listen(PORT, HOST, function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log(`Graphiql-Server run on ${HOST}:${PORT}`);
});
