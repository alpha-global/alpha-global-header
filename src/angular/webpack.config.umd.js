var webpack = require('webpack');
var helpers = require('../common/helpers');

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
    {
    /*
    'alpha-global-header': {
      root: ['alphaGlobalHeader'],
      commonjs: 'alpha-global-header',
      commonjs2: 'alpha-global-header',
      amd: 'alpha-global-header'
    },*/

  }],

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
                    '> 1%',
                    'last 4 versions',
                    'last 20 Chrome versions',
                    'last 20 Firefox versions'
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

    new webpack.SourceMapDevToolPlugin({
      filename: 'index.js.map',
      test: /\.js($|\?)/i
    }),

    new webpack.optimize.ModuleConcatenationPlugin(),

  ]
};
