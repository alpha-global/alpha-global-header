var webpack = require('webpack');
var helpers = require('../common/helpers');

var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var autoprefixer = require('autoprefixer');

module.exports = {
  context : helpers.root("src/polymer"),
  entry: './index.bundle.js',
  output: {
    path: helpers.root('dist/polymer'),
	  filename: 'alpha-global-header.bundle.js',
  },
  module: {
    rules: [

		{
        // If you see a file that ends in .html, send it to these loaders.
        test: /\.html$/,
        // This is an example of chained loaders in Webpack.
        // Chained loaders run last to first. So it will run
        // polymer-webpack-loader, and hand the output to
        // babel-loader. This let's us transpile JS in our `<script>` elements.
        use: [
          { loader: 'babel-loader', options : { presets: ['es2015'] } },
          { loader: 'polymer-webpack-loader', options : { processStyleLinks : true } }
        ]
      },
      {
        // If you see a file that ends in .js, just send it to the babel-loader.
        test: /\.js$/,
        use: [
          { 'loader' : 'babel-loader', options : { presets: ['es2015'] } }
        ],
        // Optionally exclude node_modules from transpilation except for polymer-webpack-loader:
        exclude: /node_modules\/(?!polymer-webpack-loader\/).*/
      },


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
    extensions: ['.html', '.js', '.ts']
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        comments : false,

      }
    }),
  ]
};
