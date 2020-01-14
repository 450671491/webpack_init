const fs = require('fs')
const path = require('path');
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default // 遍历ast树方法
const { transformFromAst } = require('@babel/core')
const Parser = {
  getAst: path => {
    // 读取入口文件
    const file = fs.readFileSync(path, 'utf-8')
    // 将文件内容转换为AST抽象语法树
    return parser.parse(file, {
      sourceType: 'module'
    })
  },
  getDependecies: (ast, filename) => {
    const dependecies = {}
    // 遍历所有的import模块，存入dependecies
    traverse(ast, {
      // 类型为ImportDeclaration的节点 即 import 语句
      ImportDeclaration( { node }){
        const dirname = path.dirname(filename)
        const filepath = './' + path.join(dirname, node.source.value)
        // 保存依赖模块路径
        dependecies[node.source.value] = filepath
      }
    })
    return dependecies
  },
  getCode: ast => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return code
  }
}
module.exports = Parser