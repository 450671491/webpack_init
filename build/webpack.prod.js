const path = require('path')
const WebpackMerge = require('webpack-merge')
const WebpackConfig = require('./webpack.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = WebpackMerge(WebpackConfig, {
  mode: 'production', // 生产模式
  devtool: 'cheap-module-source-map',
  plugins: [
    new WebpackBundleAnalyzer({
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist')
      }
    ])
  ],
  optimization: {
    minimizer: [
      new WebpackParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      }),
      // new UglifyjsWebpackPlugin({
      //   sourceMap: true,
      //   cache: true,
      //   parallel: true // 是否并发，提高打包速度
      // }),
      new OptimizeCssAssetsWebpackPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups:{
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    }
  }
})