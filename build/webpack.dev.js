const webpack = require('webpack')
const WebpackConfig = require('./webpack.config')
const WebpackMerge = require('webpack-merge')
module.exports = WebpackMerge(WebpackConfig, {
  mode: 'development', // 开发模式
  devtool:'cheap-module-eval-source-map',
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})