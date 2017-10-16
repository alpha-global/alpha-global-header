var webpack = require('webpack');
var helpers = require('../common/helpers');

var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var autoprefixer = require('autoprefixer');
var angularExternals = require('webpack-angular-externals');
var rxjsExternals = require('webpack-rxjs-externals');


module.exports = {
  context : helpers.root("src/angular"),
  entry: './index.ts',
  output: {
    path: helpers.root('dist/angular/umd'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'alphaGlobalHeader'
  },
  externals: [
    angularExternals(),
    rxjsExternals(),
  ],

  module: {
    rules: [

    {
      test: /\.ts$/,
      exclude: /node_modules/,
      loaders : [
        {
          loader : 'ts-loader',

          options: {
            compilerOptions: {
              module: 'esnext'
            }
          }
        },
        'angular2-template-loader',
      ]
    },


     {
      test: /\.less/,
      loaders : [
          'raw-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: [
                    'last 2 versions'
                  ]
                })
              ]
            }
          },
          'less-loader'
      ],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [

    new UglifyJSPlugin({
      uglifyOptions: {
        comments : false,

      }
    }),

    new webpack.SourceMapDevToolPlugin({
      filename: 'index.js.map',
      test: /\.js($|\?)/i
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

  ]
};
