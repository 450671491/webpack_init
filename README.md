# webpack_init
## init
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

---

## vue开发环境搭建

- 解析.vue文件
  vue-loader：解析.vue文件 
  vue-template-compiler：编译模版

- 配置dev热更新
  webpack-dev-server
- 开发环境与生产环境区分
  npm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
  webpack-merge: 合并配置
  copy-webpack-plugin 拷贝静态资源
  optimize-css-assets-webpack-plugin： 压缩css
  uglifyjs-webpack-plugin： 压缩js
- happypack开启多进程打包
- 代码压缩增强
  `npm i -D webpack-parallel-uglify-plugin`
- 抽离第三方模块
  `webpack.dll.config.js`
- 配置缓存
  `npm i -D cache-loader`
- 打包文件体积分析
  `npm i -D webpack-bundle-analyzer`
- 引入一个已知cdn库不打包
  externals

---------

## 手写loader和plugin
  loader编写规则：
  - 单一原则：每个loader只做一件事
  - 链式调用：按顺序链式调用每一个loader
  - 统一原则：每个loader完全独立，输入与输出均为字符串，设计规则和结构一致，即插即用
  常用ast操作包：
  `npm i -D @babel/parser @babel/traverse @babel/generator @babel/types`
  - `@babel/parser`:将源代码转成`AST`
  - `@babel/traverse`:对`AST`节点进行递归遍历，生成一个便于操作、转换的`path`对象
  - `@babel/generator`: 将`AST`转换成js代码
  - `@babel/types`通过该模块对具体的`AST`节点进行进行增、删、改、查

------------

## git提交规范
`npm install -D commitizen conventional-changelog cz-conventional-changelog`

package.json添加
```
{
    //...
    "config": {
        "commitizen": {
          "path": "./node_modules/cz-conventional-changelog"
        }
    }
}
```
