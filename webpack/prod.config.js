require('babel-polyfill');
process.env.BROWSER = true;
// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  // devtool: 'source-map',
  // context: path.resolve(__dirname, '..'),
  // entry: {
  //   'main': [
  //     'bootstrap-sass!./src/theme/bootstrap.config.prod.js',
  //     'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
  //     './src/client.js'
  //   ]
  // },
  entry: ['babel-polyfill','whatwg-fetch','./src/index'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    // loaders: [
    //   { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
    //   { test: /\.json$/, loader: 'json-loader' },
    //   { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
    //   { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
    //   { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
    //   { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
    //   { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
    //   { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    //   { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    //   { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    // ]
    loaders: [
        { test: /\.js?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {
        test: /(\.css|\.scss)$/,
        // include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    // new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BROWSER: true
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-tw/),
    new ExtractTextPlugin('styles.css'),
    webpackIsomorphicToolsPlugin
  ]
};
