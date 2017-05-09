require('babel-polyfill');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html


var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'index.js'); //根目录文件app.jsx地址
var BUILD_PATH = './dist/app'; //发布文件所存放的目录

module.exports = {
  entry: {
    app: ['babel-polyfill', APP_FILE],
    common: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-router-redux',
      'redux',
      'react-redux',
      'redux-thunk',
      'reselect',
      'jquery',
      'react-router',
      'isomorphic-fetch'
    ],
    UI: [
      'antd'
    ]
  },
  output: {
    publicPath: '/app/', //编译好的文件，在服务器的路径,这是静态资源引用路径
    path: BUILD_PATH, //编译到当前目录
    filename: '[name].js', //编译后的文件名字
    chunkFilename: '[name].[chunkhash:5].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /^node_modules$/,
        loader: ['es3ify-loader'],
        query: {
          presets: ['es2015','react'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        include: [APP_PATH],
        loader: 'babel-loader',
        query: {
          plugins: [
            [
              'react-css-modules',
              {
                // APP_PATH,
                generateScopedName: '[name]__[local]'
              }
            ]
          ]
        },
        test: /\.js$/
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        exclude: /^node_modules$/,
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      },
      {
        test: /\.css$/,
        include: [APP_PATH],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&localIdentName=[name]__[local]')
      },
      {
        test: /\.css$/,
        exclude: [APP_PATH],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(ttf|eot|svg|woff)\??.*$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production') //定义编译环境
        }
    }),
    new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
        filename: '../index.html', //生成的html存放路径，相对于 path
        template: './src/template/index.html', //html模板路径
        inject: 'body',
        hash: true,
        favicon:'./src/template/favicon.ico',
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin("common", "common.bundle.js"),
    new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          properties: false,
          warnings: false
        }
    })
  ],
  resolve: {
      extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
  }
};
