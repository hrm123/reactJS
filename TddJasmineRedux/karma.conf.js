var webpack = require('webpack');
var webpackConfig = require('./webpack.config')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS' ], //'Chrome',
    singleRun: true,
    frameworks: [ 'jasmine' ],
    files: [
      'tests.webpack.js', //just load this file
      'index.html'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true //don't spam console when running in karma
    }
  });
};