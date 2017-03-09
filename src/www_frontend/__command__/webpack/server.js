/**
 * Created by Tester-Ali on 09-09-2016.
 */
var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config.dev');
var path = require('path')
const env = process.env;

const app = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    proxy: {'/graphql': `${env.npm_package_config_grapqlHost}:${env.npm_package_config_grapqlPort}`},
    hot: false,
    historyApiFallback: true,
    stats: {colors: true}
});

app.use('/', express.static(path.resolve(__dirname, 'dist')));

app.listen(env.npm_package_config_appFrontendPort, env.npm_package_config_appFrontendHost, function (err, result) {
    if (err) {
        return console.log(err);
    }
    console.log(`Listening at ${env.npm_package_config_appFrontendHost}:${env.npm_package_config_appFrontendPort}`);
});