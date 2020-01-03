const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html文件处理插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 文件清除插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css文件拆分插件
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const devMode = process.argv.indexOf('--mode=production') === -1;
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
module.exports = {
  entry: { // 入口文件
    index: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')]
  },
  output: { // 输入文件
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].[hash:8].js'
  },
  module: { // 模块
    // noParse:手动忽略已知大型没有依赖其他库的library用以提高构建性能
    rules: [ // 匹配规则数组
      // {
      //   test: /\.ext$/,
      //   use: [
      //     'cache-loader',
      //     ...loaders
      //   ],
      //   include: path.resolve(__dirname, 'src')
      // },
      {
        test: /\.vue$/, // vue文件 'thread-loader'
        use: ['cache-loader', {
          loader: 'vue-loader',
          options: {
            compilerOptions:{
              preserveWhitespace:false
            }
          }
        }]
      },
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
          },
          path.resolve(__dirname, '../webpack-loader/drop-console.js')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析原则
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options:{
            publicPath: "../dist/css/",
            hmr:devMode
          }
        }, 'css-loader', {
          loader:'postcss-loader',
          options:{
            plugins:[require('autoprefixer')]
          }
        }] // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            public: "../dist/css/",
            hmr: devMode
          }
        }, 'css-loader', 'less-loader', {
          loader: 'postcss-loader',
          options: {
            plugins:[require('autoprefixer')]
          }
        }] // 从右向左解析原则
      }
    ]
  },
  resolve: { // 配置模块如何解析
    alias: { // 创建☁引入的别名，让模块引入变得更简单
      'vue$': 'vue/dist/vue.runtime.esm.js', // 末尾添加$，表示精准匹配
      '@': path.resolve(__dirname,'../src') // 引入模块时可用@替代定位到src目录下
    },
    extensions: ['*','.js','.json','.vue'] // 自动解析确定的扩展。
  },
  plugins: [ // 插件
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      publicPath: path.resolve(__dirname, '../static'),
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new vueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new HappyPack({
      id: 'happyBabel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env']
            ],
            cacheDirectory: true
          }
        }
      ],
      threadPool: happyThreadPool
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../main-manifest.json')
    }),
    new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
      {from: 'static', to:'static'}
    ])
  ]
}