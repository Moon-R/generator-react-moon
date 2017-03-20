var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html


var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, './src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, './index.js'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, './bundle/dist'); //发布文件所存放的目录


module.exports = {
  entry: {
    app: APP_FILE 
  },
  output: {
    publicPath: '/bundle/dist/', //编译好的文件，在服务器的路径,这是静态资源引用路径
    path: BUILD_PATH, //编译到当前目录
    filename: '[name].js', //编译后的文件名字
    chunkFilename: '[name].[chunkhash:5].min.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /^node_modules$/,
        loader: 'babel',
        query: {
          presets: ['es2015','react'],
          plugins: ['transform-decorators-legacy']
        },
        include: [APP_PATH]
      },
      {
        include: [APP_PATH],
        loader: 'babel-loader',
        query: {
          plugins: [
            [
              'react-css-modules',
              {
                generateScopedName: '[name]__[local]'
              }
            ]
          ]
        },
        test: /\.js$/
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /^node_modules$/,
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
        include: [APP_PATH]
      },
      {
        test: /\.css$/,
        exclude: [APP_PATH],
        loader: ExtractTextPlugin.extract({ fallback: 'style', use: 'css' })
      }, 
      {
        include: [APP_PATH],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&localIdentName=[name]__[local]'}),
        test: /\.css$/
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
            NODE_ENV: JSON.stringify('development') //定义编译环境
        }
    }),
    new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true })
  ],
  resolve: {
      extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
  }
};

