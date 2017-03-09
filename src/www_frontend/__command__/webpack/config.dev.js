/**
 * Created by Tester-Ali on 31-08-2016.
 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env;

const ROOT_DIR = path.resolve(__dirname, '../../../../');
//Thư mục sẽ chứa tập tin được biên dịch
const BUILD_DIR = path.resolve(ROOT_DIR, './dist/frontend');
//Thư mục chứa dự án - các component React
const APP_DIR = path.resolve(__dirname, '../../');
const Config = require(path.resolve(ROOT_DIR, './src/config.json'));
const global = {
    'config': JSON.stringify(Config),
    'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || 'development')
};
//process.traceDeprecation = true
const appBaseUrl = env.npm_package_config_appFrontendHost + ':' + env.npm_package_config_appFrontendPort;
const config = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://' + appBaseUrl,
        'babel-polyfill',
        path.join(APP_DIR, './index')
    ],
    devServer: {
        port: process.env.PORT || env.npm_package_config_appFrontendPort
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }
                ]
            }, {
                test: /\.json$/, use: "json-loader"
            }, {
                //github.com/jtangelder/sass-loader
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }, {
                // các file ảnh ọt và font được copy sang thư mục đích.
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[hash].[ext]'
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin(global),
        new HtmlWebpackPlugin({
            title: Config.serviceName,
            favicon: path.join(APP_DIR, './favicon.png'),
            template: path.join(APP_DIR, './index.html')
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;
