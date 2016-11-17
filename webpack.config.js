var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin') // 自动生成html文件的插件
var openBrowserPlugin = require('open-browser-webpack-plugin') // 自动打开浏览器插件
var extractTextPlugin = require('extract-text-webpack-plugin') // 单独样式文件style插入
var webpack = require('webpack')

// 定义一些文件夹路径
var ROOT_PATH = path.resolve(__dirname) // path.resolve解析为绝对路径, __dirname其实就是绝对路径
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')
var NODE_MODULES = path.resolve(ROOT_PATH, 'node_modules')


module.exports = {
  // 多入口，分离第三方库和自身文件
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
    vendors: ['jquery', 'moment']
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader', // load处理顺序从右往左
        indlude: APP_PATH // 限定文件
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192' // 小于8k的图片，会自动启用base64编码图片
      },
      {
        test: /\.jsx?$/, // babel配置较多的话可配置在.babelirc
        loader: 'babel',
        exclude: NODE_MODULES,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'hello webpack'
    }),
    new openBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')//把入口文件里面的数组打包成verdors.js
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:5000',
        secure: false
      }
    }
  },
  devtool: 'source-map',
  resolve: {
    extension: ['', '.jsx', '.js', '.json'], // 省略后缀
    // 提高搜索速度
    alias: {}
  }
}
