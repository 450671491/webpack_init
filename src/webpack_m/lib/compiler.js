
const fs = require('fs');
const path = require('path');
const Parser = require('./Parser')
class Compiler {
  constructor (options) {
    // webpack配置
    const { entry, output } = options;
    // 入口
    this.entry = entry
    // 出口
    this.output = output
    // 模块
    this.modules = []
  }
  // 构建启动
  run () {
    // 解析文件入口
    const info = this.build(this.entry)
    this.modules.push(info)
    this.modules.forEach(({ dependecies }) => {
      // 判断有依赖对象，递归解析依赖对象
      if (dependecies) {
        for (const dependency in dependecies) {
          this.modules.push(this.build(dependecies[dependency]))
        }
      }
    })
    const dependencyGraph = this.modules.reduce((graph, item) => ({
      ...graph,
      [item.filename]: {
        dependecies: item.dependecies,
        code: item.code
      }
    }), {})
    this.generator(dependencyGraph)
  }
  build (filename) {
    const { getAst, getDependecies, getCode } = Parser
    const ast = getAst(filename)
    const dependecies = getDependecies(ast, filename)
    const code = getCode(ast)
    return {
      // 文件路径，每个模块的唯一标识符
      filename,
      // 依赖模块，保存所有依赖模块路径
      dependecies,
      // 文件的内容
      code
    }
  }
  // 重写require函数 (浏览器不能识别commonjs语法)，输出bundle
  generator (code) {
    // 输入文件路径
    const filepath = path.join(this.output.path, this.output.filename)
    const bundle = `(function(graph){
      function require(module){ 
        function localRequire(relativePath){
          return require(graph[module].dependecies[relativePath])        
        }        
        var exports = {};        
        (function(require,exports,code){
           eval(code)      
        })(localRequire,exports,graph[module].code);
        return exports;      
      }      
      require('${this.entry}')
    })(${JSON.stringify(code)})`
    // 文件内容写入文件系统
    console.log(bundle);
    fs.writeFileSync(filepath, bundle, 'utf-8')
  }
}
module.exports = Compiler