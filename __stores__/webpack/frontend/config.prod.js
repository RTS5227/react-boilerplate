/**
 * Created by Tester-Ali on 31-08-2016.
 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const ROOT_DIR = path.resolve(__dirname, '../../../');
//Thư mục sẽ chứa tập tin được biên dịch
const BUILD_DIR = process.env.BUILD_DIR || path.resolve(ROOT_DIR, './dist/frontend');
//Thư mục chứa dự án - các component React
const APP_DIR = path.join(ROOT_DIR, './src/www_frontend');
const Config = require(path.resolve(ROOT_DIR, './src/config.json'));
const global = {
    'config': JSON.stringify(Config),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
};
const extractCSS = new ExtractTextPlugin('bundle.[contenthash].css');
const config = {
    entry: {
        main: [
            'babel-polyfill',
            path.join(APP_DIR, './index')
        ],
        vendors: ['react', 'react-dom', 'redux', 'moment', 'lodash', 'react-paginate', 
            'react-loading', 'graphql', 'graphql-relay']
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].[chunkhash].js',
        chunkFilename: "[name].[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loaders: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    extends: path.join(ROOT_DIR, './.babelrc')
                },
                exclude: /node_modules/
            }, {
                test: /\.css$/, loaders: extractCSS.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            }, {
                test: /\.json$/, loader: "json-loader"
            }, {
                //github.com/jtangelder/sass-loader
                test: /\.scss$/,
                loader: extractCSS.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader"
                }),
                exclude: /node_modules/
            }, {
                // các file ảnh ọt và font được copy sang thư mục đích.
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[hash].[ext]'
                }
            }
        ]
    },

    plugins: [
        extractCSS,
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors']
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin(global),
        new HtmlWebpackPlugin({
            title: Config.serviceName,
            favicon: path.join(APP_DIR, './favicon.png'),
            template: path.join(APP_DIR, './index.html')
        }),
        // Minify assets.
        new webpack.optimize.UglifyJsPlugin({
            debug: true,
            minimize: true,
            sourceMap: false,
            drop_console: true,
            output: {
                comments: false
            },
            mangle: {
                except: ['$', 'exports', 'require', 'zE']
            },
            compressor: {
                warnings: false
            },
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            helpers: path.join(ROOT_DIR, './src/helpers'),
            resources: path.join(ROOT_DIR, './src/resources'),
            cores: path.join(ROOT_DIR, './src/www_cores'),
        }
    }
};

module.exports = config;
