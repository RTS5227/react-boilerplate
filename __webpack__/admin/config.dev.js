/**
 * Created by Tester-Ali on 31-08-2016.
 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Config = require('../../src/config.json');

const ROOT_DIR = path.resolve(__dirname, '../../');
//Thư mục sẽ chứa tập tin được biên dịch
const BUILD_DIR = path.resolve(ROOT_DIR, './dist/admin');
//Thư mục chứa dự án - các component React
const APP_DIR = path.join(ROOT_DIR, './src/www_admin');
const global = {
    'config': JSON.stringify(Config),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
};
const extractCSS = new ExtractTextPlugin('bundle.css');
const config = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'babel-polyfill',
        path.join(APP_DIR, './index')
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    devtool: 'source-map',
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
                    loader: [
                        {loader: 'css-loader?sourceMap'},
                        {loader: 'sass-loader?sourceMap'}
                    ]
                }),
                exclude: /node_modules/
            }, {
                // các file ảnh ọt và font được copy sang thư mục đích.
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp3)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[hash].[ext]'
                }
            }
        ]
    },

    plugins: [
        extractCSS,
        new webpack.LoaderOptionsPlugin({
            options: {
                sassLoader: {
                    includePaths: [APP_DIR, path.join(APP_DIR, './styles')]
                },
                context: '/'
            }
        }),
        new webpack.DefinePlugin(global),
        new HtmlWebpackPlugin({
            title: Config.serviceName,
            favicon: path.join(APP_DIR, './favicon.png'),
            template: path.join(APP_DIR, './index.html')
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
