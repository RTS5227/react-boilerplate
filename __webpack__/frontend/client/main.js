/**
 * Created by Tester-Ali on 09-09-2016.
 */
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const proxy = require('http-proxy-middleware');
const config = require('./config.dev');
const path = require('path');
const env = process.env;
const HOST = env.GB_FRONTEND_HOST || '0.0.0.0';
const PORT = env.GB_FRONTEND_PORT || 9552;

const app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
  	quiet: true,
  	noInfo: true,
    hot: true,
    historyApiFallback: true,
  	lazy: false,
  	inline: true,
  	headers: {'Access-Control-Allow-Origin': '*'},
    stats: {colors: true}
});

app.use('/', express.static(path.resolve(__dirname, 'dist')));
app.listen(PORT, HOST, function (err, result) {
    if (err) {
    	console.log(`Failed Listening at ${HOST}:${PORT}`);
        return console.log(err);
    }
    console.log(`Listening on port ${PORT}`);
});
