var path = require("path");
var webpack = require("webpack");

module.exports = [{
    entry: {
      'bundle': './src/index.ts',
    },
    output: {
        path: __dirname,
        filename: './dist/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        },
        {test: /\.css?$/, loaders: ['style-loader', 'css-loader']}, 
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue', '.ts' ,'.tsx'],
      alias: {'vue$': 'vue/dist/vue.esm.js'},
    },
    devtool: 'inline-source-map'
}];