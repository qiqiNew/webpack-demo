var path = require('path')
var webpack = require('webpack')

// 插件
var htmlWebpackPlugin = require('html-webpack-plugin') // 自动生成html文件的插件
var openBrowserPlugin = require('open-browser-webpack-plugin') // 自动打开浏览器插件
var extractTextPlugin = require('extract-text-webpack-plugin') // 单独样式文件style插入(extract-text-webpack-plugin运用了css-loader和style-loader将所有的css统一处理并根据结果生成一个单独的css文件（style.css），将文件链接插入到html文件中)


// 定义一些文件夹路径
var ROOT_PATH = path.resolve(__dirname) // path.resolve解析为绝对路径, __dirname其实就是绝对路径
var APP_PATH = path.resolve(ROOT_PATH, 'app')
var BUILD_PATH = path.resolve(ROOT_PATH, 'build')
var NODE_MODULES = path.resolve(ROOT_PATH, 'node_modules')
var TEM_PATH = path.resolve(APP_PATH, 'templates')


module.exports = {
  // 多入口，分离第三方库和自身文件
  entry: {
    // 一共三个入口文件，一个页面引用app.js vendors.js 另一个页面引用 mobile.js vendors.js
    'js/mobile': path.resolve(APP_PATH, 'js/mobile.js'),
    'js/app': path.resolve(APP_PATH, 'js/index.js'),
    'js/vendors': ['jquery', 'moment']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].js' // hash名称的script防止缓存
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: extractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap')
        //loader: 'style-loader!css-loader!sass-loader?sourceMap' // css启用sourcemap
      },
      {
        test: /\.css$/,
        loader: extractTextPlugin.extract('style-loader', 'css-loader'),
        //loader: 'style-loader!css-loader??sourceMap', // load处理顺序从右往左
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
    // 创建两个htmlWebpackPlugin实例，生成两个页面
    new htmlWebpackPlugin({
      title: 'hello webpack --- index页面',
      template: path.resolve(TEM_PATH, 'index.html'), // 模板地址
      filename: 'index.html', // 编译生成的页面名称
      chunks: ['js/app', 'js/vendors'] // 指定页面入口
    }),
    new htmlWebpackPlugin({
      title: 'hello webpack --- mobile页面',
      template: path.resolve(TEM_PATH, 'index.html'), // 模板地址
      filename: 'mobile.html', // 编译生成的页面名称
      chunks: ['js/mobile', 'js/vendors'] // 指定页面入口
    }),
    new openBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new webpack.optimize.CommonsChunkPlugin('js/vendors', 'js/vendors.js'),//把入口文件里面的数组打包成verdors.js
    new extractTextPlugin("style.css") //获取所有的css文件，并将其内容整合，生成一个单独的css文件'style.css'
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
