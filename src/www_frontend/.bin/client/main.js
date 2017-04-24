/**
 * Created by Tester-Ali on 09-09-2016.
 */
var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var proxy = require('http-proxy-middleware');
var config = require('./config.dev');
var path = require('path');
const env = process.env;
const HOST = env.GB_FRONTEND_HOST || '0.0.0.0';
const PORT = env.GB_FRONTEND_PORT || 9551;

const app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: false,
    historyApiFallback: true,
    stats: {colors: true}
});

app.use('/', express.static(path.resolve(__dirname, 'dist')));
app.listen(PORT, HOST, function (err, result) {
    if (err) {
    	console.log(`Failed Listening at ${HOST}:${PORT}`);
        return console.log(err);
    }
    console.log(`Listening at ${HOST}:${PORT}`);
});
