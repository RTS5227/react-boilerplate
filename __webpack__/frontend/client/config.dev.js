/**
 * Created by Tester-Ali on 31-08-2016.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('../webpackIsomorphicToolsPlugin'));

const env = process.env;
const HOST = env.GB_FRONTEND_HOST || '0.0.0.0';
const PORT = env.GB_FRONTEND_PORT || 9552;

const ROOT_DIR = path.resolve(__dirname, '../../../');
//Thư mục sẽ chứa tập tin được biên dịch
const BUILD_DIR = path.resolve(ROOT_DIR, './dist/frontend');
//Thư mục chứa dự án - các component React
const APP_DIR = path.resolve(ROOT_DIR, './src/www_frontend');
const Config = require(path.resolve(ROOT_DIR, './src/config.json'));
//process.traceDeprecation = true
const appBaseUrl = HOST + ':' + PORT;
// https://github.com/webpack/loader-utils/issues/56
process.noDeprecation = true;
const extractCSS = new ExtractTextPlugin('bundle.css');
const config = {
    context: ROOT_DIR,
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://' + appBaseUrl,
        'webpack/hot/only-dev-server',
        path.join(APP_DIR, './main')
    ],
    devServer: {
        port: PORT
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: `http://${env.GB_GRAPHQL_HOST || HOST}:${env.GB_GRAPHQL_PORT || PORT}/dist/`
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                /*loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },*/
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }, {
                test: /\.css$/, loaders: extractCSS.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.json$/, loader: "json-loader"
            }, {
                //github.com/jtangelder/sass-loader
                test: /\.scss$/,
                loader: extractCSS.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader"
                }),
                exclude: /node_modules/
            }, {
                // các file ảnh ọt và font được copy sang thư mục đích.
                test: /\.(svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[hash].[ext]'
                    }
                }
            },
            { 
                test: webpackIsomorphicToolsPlugin.regular_expression('images'), 
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
        extractCSS,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.IgnorePlugin(/webpack-stats\.json$/),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
        }),
        webpackIsomorphicToolsPlugin.development()
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;
