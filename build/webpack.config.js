const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html文件处理插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 文件清除插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css文件拆分插件
module.exports = {
  mode: 'development', // 开发模式
  // entry: { // 入口文件
  //   index: path.resolve(__dirname, '../src/main.js'),
  //   header: path.resolve(__dirname, '../src/header.js')
  // },
  entry: { // 入口文件
    index: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')],
    header: ['@babel/polyfill', path.resolve(__dirname, '../src/header.js')]
  },
  output: { // 输入文件
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: { // 模块
    // noParse:忽略大型library提高构建性能
    rules: [ // 匹配规则数组
      {
        test: /\.(jp?g|png|gif)$/i,  //图片文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?/, // 多媒体文件
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.js$/, // js文件
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析原则
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析原则
      }
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', {
      //     loader: 'postcss-loader',
      //     options: {
      //       plugins: [require('autoprefixer')]
      //     } 
      //   }, 'less-loader'] // 从右向左解析原则
      // }
    ]
  },
  plugins: [ // 插件
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/header.html'),
      filename: 'header.html',
      chunks: ['header']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    })
  ]
}