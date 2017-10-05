var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BUILD_DIR = path.resolve(__dirname, 'src/client/public'),
    APP_DIR = path.resolve(__dirname, 'src/client/app');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.js?/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]'
      },
      {
        test: /\.css$/,
        include: ['node_modules'],
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
				loader: 'file-loader?limit=100000&name=assets/[name].[hash:8].[ext]'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root',
      title: 'Currency rate'
    })]
};
