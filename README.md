# webpack_init
init
项目名以webpack命名去安装webpack会报错
npm i -D 为npm install --save-dev的缩写
npm i -S 为npm install --save的缩写

html-webpack-plugin:html打包模版，可以插入生成的js文件

---
- 多入口文件配置：
  实例化多个html-webpack-plugin
- 清空打包之前的文件插件：
  clean-webpack-plugin
- 引入css
  style-loader css-loader
- less支持
  less less-loader
- css添加浏览器前缀
  postcss-loader autoprefixer,可以用两种方式使用：1.新增postcss.config.js，在里面引入autoprefixer 2.直接配置
- 拆分css
  mini-css-extract-plugin(4.0+)
- 静态文件(图片，文字，媒体等)处理
  file-loader,url-loader
- js文件转义
  babel-loader babel-core： npm i babel-loader @babel/preset-env @babel/core
  babel-loader 8.x 对应 babel-core 7.x
  babel-loader 7.x 对应 babel-core 6.x
- babel-polyfill 转义新型api 如 Promise,Maps,Set等
